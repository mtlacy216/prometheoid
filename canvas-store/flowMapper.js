const { Store, clone } = require('./store');

class FlowMapper {
  constructor(initialFlows = {}, initialGroups = {}) {
    this.store = new Store({
      flows: clone(initialFlows),
      groups: clone(initialGroups),
    });
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

  addGroup(id, label = '', x = 0, y = 0) {
    const groups = clone(this.store.getState().groups);
    if (groups[id]) throw new Error(`Group ${id} already exists`);
    groups[id] = { id, label, x, y, flows: [] };
    this.store.setState({ groups });
    return groups[id];
  }

  addFlowToGroup(flowId, groupId) {
    const { flows, groups } = this.store.getState();
    if (!flows[flowId]) throw new Error(`Flow ${flowId} missing`);
    if (!groups[groupId]) throw new Error(`Group ${groupId} missing`);
    if (!groups[groupId].flows.includes(flowId)) {
      const next = clone(groups);
      next[groupId].flows.push(flowId);
      this.store.setState({ groups: next });
    }
  }

  removeFlowFromGroup(flowId, groupId) {
    const { groups } = this.store.getState();
    if (!groups[groupId]) throw new Error(`Group ${groupId} missing`);
    const next = clone(groups);
    next[groupId].flows = next[groupId].flows.filter((f) => f !== flowId);
    this.store.setState({ groups: next });
  }

  getGroup(id) {
    return this.store.getState().groups[id];
  }

  getFlowsInGroup(groupId) {
    const group = this.getGroup(groupId);
    if (!group) throw new Error(`Group ${groupId} missing`);
    return group.flows.map((id) => this.getFlow(id)).filter(Boolean);
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
