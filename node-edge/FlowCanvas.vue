<template>
  <Canvas>
    <div
      v-for="group in groups"
      :key="group.id"
      class="group"
      :style="{ left: group.x + 'px', top: group.y + 'px' }"
    >
      <header class="group-label">{{ group.label }}</header>
      <div
        v-for="flow in group.flows"
        :key="flow"
        class="flow"
      >
        {{ state.flows[flow]?.label || flow }}
      </div>
    </div>
  </Canvas>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import Canvas from './Canvas.vue';
// FlowMapper uses CommonJS exports; most bundlers interop automatically.
// @ts-ignore
import { FlowMapper } from '../canvas-store/flowMapper.js';

export default defineComponent({
  name: 'FlowCanvas',
  components: { Canvas },
  setup() {
    const mapper = new FlowMapper();
    const state = reactive(mapper.store.getState());
    mapper.store.subscribe((s: any) => Object.assign(state, s));
    const groups = computed(() => Object.values(state.groups));
    // expose API for parent components to manipulate flows/groups
    return { state, mapper, groups };
  },
});
</script>

<style scoped>
.group {
  position: absolute;
  padding: 8px;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid #ccc;
  border-radius: 4px;
}
.group-label {
  font-size: 12px;
  margin-bottom: 4px;
}
.flow {
  background: #fff;
  color: #000;
  padding: 2px 4px;
  margin-top: 2px;
  border-radius: 2px;
}
</style>

