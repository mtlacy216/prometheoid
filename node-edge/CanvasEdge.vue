<!-- Adapted from n8n's editor-ui under the Sustainable Use License. -->
<template>
  <svg class="edge" :width="width" :height="height">
    <path
      :d="path"
      :stroke="color"
      fill="none"
      stroke-width="2"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { Point } from './bezierHelpers';
import { getBezierPath } from './bezierHelpers';

export default defineComponent({
  name: 'CanvasEdge',
  props: {
    start: { type: Object as () => Point, required: true },
    end: { type: Object as () => Point, required: true },
    color: { type: String, default: '#000' },
  },
  setup(props) {
    const path = computed(() => getBezierPath(props.start, props.end));
    const width = computed(() => Math.abs(props.end.x - props.start.x) + 100);
    const height = computed(() => Math.abs(props.end.y - props.start.y) + 100);
    return { path, width, height };
  },
});
</script>

<style scoped>
.edge {
  overflow: visible;
  position: absolute;
  pointer-events: none;
  z-index: 0;
}
</style>
