const { Store, clone } = require('./store');

class FlowMapper {
  constructor(initialFlows = {}) {
    this.store = new Store({ flows: clone(initialFlows) });
  }

  addFlow(id, label = '') {
    const flows = clone(this.store.getState().flows);
    if (flows[id]) throw new Error(`Flow ${id} already exists`);
    flows[id] = {
      id,
      label,
      roles: {
        INS: null,
        P: null,
        REC: null,
      },
    };
    this.store.setState({ flows });
    return flows[id];
  }

  setRole(flowId, role, value) {
    const flows = clone(this.store.getState().flows);
    if (!flows[flowId]) throw new Error(`Flow ${flowId} missing`);
    if (!['INS', 'P', 'REC'].includes(role)) throw new Error(`Invalid role ${role}`);
    flows[flowId].roles[role] = value;
    this.store.setState({ flows });
  }

  getFlow(flowId) {
    return this.store.getState().flows[flowId];
  }

  isTriadComplete(flowId) {
    const flow = this.getFlow(flowId);
    if (!flow) throw new Error(`Flow ${flowId} missing`);
    return ['INS', 'P', 'REC'].every(r => flow.roles[r]);
  }
}

module.exports = { FlowMapper };
