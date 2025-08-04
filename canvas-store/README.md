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

## Flow Mapper

`flowMapper.js` builds on the store to model flows with triadic roles and optional grouping. Each role (INS, P, REC) can embed an inline value or reference another flow by id. Groups are simple containers with x/y coordinates that hold a list of flow ids.

### Example
```js
const { FlowMapper } = require('./flowMapper');
const mapper = new FlowMapper();
mapper.addFlow('f1');
mapper.addFlow('f2');
mapper.setRole('f1', 'INS', { type: 'inline', value: 'Manager' });
mapper.setRole('f1', 'P', { type: 'flow', reference: 'f2' });
mapper.setRole('f1', 'REC', { type: 'inline', value: 'Report' });
console.log(mapper.isTriadComplete('f1')); // true
mapper.addGroup('team', 'Team A', 100, 100);
mapper.addFlowToGroup('f1', 'team');
console.log(mapper.getGroup('team'));
```

Run tests:
```bash
node flowMapper.test.js
```
