const assert = require('assert');

// Simple tests for Store functionality
(function testStore() {
  const { Store } = require('./store');
  const store = new Store({ count: 0 });
  let observed = null;
  store.subscribe((state) => {
    observed = state.count;
  });

  store.setState({ count: 1 });
  assert.strictEqual(store.getState().count, 1);
  assert.strictEqual(observed, 1);

  store.setState({ count: 2 });
  store.undo();
  assert.strictEqual(store.getState().count, 1);

  store.redo();
  assert.strictEqual(store.getState().count, 2);

  store.replaceState({ count: 5 });
  assert.strictEqual(store.getState().count, 5);

  console.log('All tests passed');
})();

// Verify behavior without structuredClone
(function testFallback() {
  const original = global.structuredClone;
  delete global.structuredClone;
  delete require.cache[require.resolve('./store')];
  const { Store } = require('./store');
  const store = new Store({ count: 1 });
  store.setState({ count: 2 });
  assert.strictEqual(store.getState().count, 2);
  console.log('Fallback tests passed');
  global.structuredClone = original; // restore
})();
