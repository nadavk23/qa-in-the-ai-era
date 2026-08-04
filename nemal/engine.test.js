/* Unit tests for the Nemal landed-cost engine.
 *
 * The engine is the single source of truth inside index.html (between the
 * ENGINE START/END markers). This test extracts that exact code and exercises
 * it, so the tests validate the code that actually ships — no duplicate copy.
 *
 * Run:  node --test nemal/engine.test.js   (from the repo root)
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function loadEngine(){
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const start = html.indexOf('// ===ENGINE START===');
  const end = html.indexOf('// ===ENGINE END===');
  assert.ok(start !== -1 && end !== -1, 'engine markers must exist in index.html');
  const src = html.slice(start, end);
  const factory = new Function('module', 'exports', src + '\nreturn NemalEngine;');
  const mod = { exports: {} };
  return factory(mod, mod.exports);
}
const E = loadEngine();

// shared baseline: a FOB SKU with real freight/insurance/fees allocated
function baseInputs(over){
  return Object.assign({
    unitPriceMinor: 210,      // $2.10
    currency: 'USD',
    qty: 5000,
    incoterm: 'FOB',
    dutyRatePct: 12,
    purchaseTaxRatePct: 0,
    hasFtaCert: false,
    vatRatePct: 18,
    includeVatInBasis: false,
    freightMinor: 85000,      // allocated
    insuranceMinor: 7300,
    otherCostsMinor: 43000,
    fxRateToIls: 3.7180
  }, over || {});
}

test('FOB: landed cost matches a hand-computed value', () => {
  const r = E.computeLandedCost(baseInputs());
  // customs = 210*5000 + 85000 + 7300 = 1,142,300 cents
  assert.equal(r.customsValueMinor, 1142300);
  // duty 12% = round(137076) = 137076
  assert.equal(r.dutyMinor, 137076);
  // total minor = customs + duty + other = 1,142,300 + 137,076 + 43,000
  assert.equal(r.totalMinor, 1322376);
  // agorot = round(1,322,376 * 3.7180) via segment partition
  const expected = Math.round(1050000*3.7180) + Math.round((85000+7300)*3.7180)
                 + Math.round((137076+0)*3.7180) + Math.round(43000*3.7180);
  assert.equal(r.landedAgorot, expected);
  assert.equal(r.seg.fob + r.seg.freight + r.seg.duty + r.seg.fees, r.landedAgorot);
});

test('all money outputs are integers (minor units) — no float cents', () => {
  const r = E.computeLandedCost(baseInputs());
  ['customsValueMinor','dutyMinor','purchaseTaxMinor','vatMinor','totalMinor','landedAgorot'].forEach(k=>{
    assert.equal(Number.isInteger(r[k]), true, k + ' must be an integer, got ' + r[k]);
  });
  ['fob','freight','duty','fees'].forEach(k=>{
    assert.equal(Number.isInteger(r.seg[k]), true, 'seg.'+k+' must be an integer');
  });
});

test('INCOTERM guard: CIF does NOT double-count freight/insurance', () => {
  const fob = E.computeLandedCost(baseInputs({ incoterm:'FOB' }));
  const cif = E.computeLandedCost(baseInputs({ incoterm:'CIF' })); // same freight/ins passed in
  // CIF must exclude freight+insurance from the customs value
  assert.equal(cif.customsValueMinor, 210*5000, 'CIF customs value = FOB goods only');
  assert.equal(cif.seg.freight, 0, 'CIF freight segment must be zero');
  // and therefore CIF landed cost is strictly lower than FOB with the same inputs
  assert.ok(cif.landedAgorot < fob.landedAgorot);
});

test('INCOTERM guard: DDP excludes freight, insurance AND duty', () => {
  const ddp = E.computeLandedCost(baseInputs({ incoterm:'DDP' }));
  assert.equal(ddp.seg.freight, 0);
  assert.equal(ddp.dutyMinor, 0, 'DDP already includes duty');
  assert.equal(ddp.seg.duty, 0);
});

test('no cost component is counted twice (per incoterm, segment sum == total)', () => {
  ['EXW','FOB','CIF','DDP'].forEach(ic=>{
    const r = E.computeLandedCost(baseInputs({ incoterm: ic }));
    assert.equal(r.seg.fob + r.seg.freight + r.seg.duty + r.seg.fees, r.landedAgorot,
      'segments must partition the total exactly for ' + ic);
  });
});

test('FTA origin certificate takes duty to 0%', () => {
  const noFta = E.computeLandedCost(baseInputs({ hasFtaCert:false }));
  const fta   = E.computeLandedCost(baseInputs({ hasFtaCert:true }));
  assert.ok(noFta.dutyMinor > 0);
  assert.equal(fta.dutyMinor, 0);
  assert.equal(fta.seg.duty, 0);
  assert.ok(fta.landedAgorot < noFta.landedAgorot);
});

test('VAT is excluded from the basis by default, included only when asked', () => {
  const excl = E.computeLandedCost(baseInputs({ includeVatInBasis:false }));
  const incl = E.computeLandedCost(baseInputs({ includeVatInBasis:true }));
  assert.ok(excl.vatMinor > 0, 'VAT is still computed for the cash-flow line');
  // excluded: VAT not in fees segment
  assert.equal(incl.landedAgorot - excl.landedAgorot, Math.round(incl.vatMinor * excl.fxRateToIls));
  assert.ok(incl.landedAgorot > excl.landedAgorot);
});

test('FX is frozen per snapshot: same inputs, different rate -> different total', () => {
  const lo = E.computeLandedCost(baseInputs({ fxRateToIls:3.47 }));
  const hi = E.computeLandedCost(baseInputs({ fxRateToIls:3.7180 }));
  assert.ok(hi.landedAgorot > lo.landedAgorot);
  assert.equal(lo.fxRateToIls, 3.47);
});

test('freight allocation conserves the total exactly (integer, largest-remainder)', () => {
  const lines = [{cbmMilli:11200},{cbmMilli:7200},{cbmMilli:4100}];
  const shares = E.allocateBy(140001, lines, 'cbm'); // odd total to force remainder handling
  assert.equal(shares.reduce((a,b)=>a+b,0), 140001, 'shares must sum to the exact total');
  shares.forEach(s=>assert.equal(Number.isInteger(s), true));
  // larger CBM gets a larger share
  assert.ok(shares[0] > shares[1] && shares[1] > shares[2]);
});

test('allocation basis matters: by-weight differs from by-cbm', () => {
  const lines = [{cbmMilli:11200, weightG:1000000},{cbmMilli:7200, weightG:9000000}];
  const byCbm    = E.allocateBy(100000, lines, 'cbm');
  const byWeight = E.allocateBy(100000, lines, 'weight');
  assert.notDeepEqual(byCbm, byWeight);
  assert.equal(byWeight[1] > byCbm[1], true, 'heavier line pays more freight by weight');
});

test('attribution: uniform scaling is reported as FX, not supplier price', () => {
  const prev = E.computeLandedCost(baseInputs({ fxRateToIls:3.47 }));
  const cur  = E.computeLandedCost(baseInputs({ fxRateToIls:3.7180 }));
  assert.equal(E.attribute(cur, prev).driver, 'fx');
});

test('attribution: a freight-only change is reported as freight', () => {
  const prev = E.computeLandedCost(baseInputs({ freightMinor:70000 }));
  const cur  = E.computeLandedCost(baseInputs({ freightMinor:90000 }));
  assert.equal(E.attribute(cur, prev).driver, 'freight');
});

test('attribution: an FTA duty drop is reported as duty', () => {
  const prev = E.computeLandedCost(baseInputs({ hasFtaCert:false }));
  const cur  = E.computeLandedCost(baseInputs({ hasFtaCert:true }));
  assert.equal(E.attribute(cur, prev).driver, 'duty');
});

test('attribution: a supplier price change is reported as price', () => {
  const prev = E.computeLandedCost(baseInputs({ unitPriceMinor:210 }));
  const cur  = E.computeLandedCost(baseInputs({ unitPriceMinor:240 }));
  assert.equal(E.attribute(cur, prev).driver, 'price');
});

test('attribution: no change is reported as flat, not price', () => {
  const same = E.computeLandedCost(baseInputs());
  assert.equal(E.attribute(same, same).driver, 'flat');
});

test('zero quantity does not divide-by-zero', () => {
  const r = E.computeLandedCost(baseInputs({ qty:0 }));
  assert.equal(r.landedPerUnitAgorot, 0);
});
