class Store {
  constructor(initialState = {}) {
    this.state = structuredClone(initialState);
    this.listeners = new Set();
    this.history = [];
    this.future = [];
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  setState(partial) {
    // Save snapshot for undo
    this.history.push(structuredClone(this.state));
    // Clear redo stack
    this.future.length = 0;
    Object.assign(this.state, partial);
    this.notify();
  }

  replaceState(nextState) {
    this.history.push(structuredClone(this.state));
    this.future.length = 0;
    this.state = structuredClone(nextState);
    this.notify();
  }

  getState() {
    return this.state;
  }

  undo() {
    if (this.history.length === 0) return;
    const prev = this.history.pop();
    this.future.push(structuredClone(this.state));
    this.state = prev;
    this.notify();
  }

  redo() {
    if (this.future.length === 0) return;
    const next = this.future.pop();
    this.history.push(structuredClone(this.state));
    this.state = next;
    this.notify();
  }
}

module.exports = { Store };
