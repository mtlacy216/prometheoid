# Canvas Store Scaffold

A minimal reactive store with undo/redo support for canvas-like applications.

## Features
- Subscribe to state changes.
- `setState` merges partial updates and records history for undo/redo.
- `replaceState` swaps state entirely.
- `undo`/`redo` operations with history stacks.

## Usage
```
const { Store } = require('./store');
const store = new Store({ count: 0 });
store.subscribe((state) => console.log(state));
store.setState({ count: 1 });
store.undo();
```

Run tests with:
```
node store.test.js
```
