const assert = require('assert');

// Run tests with native structuredClone present
(function () {
  const { FlowMapper } = require('./flowMapper');
  const mapper = new FlowMapper();

  // add two flows
  mapper.addFlow('flow-1', 'Example Flow 1');
  mapper.addFlow('flow-2', 'Example Flow 2');

  // embed flow-2 as pattern role inside flow-1
  mapper.setRole('flow-1', 'INS', { type: 'inline', value: 'Manager' });
  mapper.setRole('flow-1', 'P', { type: 'flow', reference: 'flow-2' });
  mapper.setRole('flow-1', 'REC', { type: 'inline', value: 'Report' });

  assert(mapper.isTriadComplete('flow-1'), 'flow-1 should have a complete triad');

  // incomplete flow
  mapper.addFlow('flow-3');
  mapper.setRole('flow-3', 'INS', { type: 'inline', value: 'User' });
  assert.strictEqual(
    mapper.isTriadComplete('flow-3'),
    false,
    'flow-3 should be incomplete'
  );

  console.log('flowMapper tests passed');
})();

// Simulate environment without structuredClone
(function () {
  const original = global.structuredClone;
  delete global.structuredClone;
  delete require.cache[require.resolve('./store')];
  delete require.cache[require.resolve('./flowMapper')];
  const { FlowMapper } = require('./flowMapper');
  const mapper = new FlowMapper();
  mapper.addFlow('fallback');
  assert(mapper.getFlow('fallback'), 'flow should be added without structuredClone');
  console.log('flowMapper fallback test passed');
  global.structuredClone = original; // restore
})();
