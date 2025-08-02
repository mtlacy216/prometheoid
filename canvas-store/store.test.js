const assert = require('assert');
const { Store } = require('./store');

// Simple tests for Store functionality
(function testStore() {
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
