<template>
  <div
    ref="wrapper"
    class="canvas"
    @mousedown="onMouseDown"
    @wheel.prevent="onWheel"
  >
    <div class="inner" :style="transform" ref="inner">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  name: 'Canvas',
  setup() {
    const state = reactive({
      x: 0,
      y: 0,
      scale: 1,
      panning: false,
      lastX: 0,
      lastY: 0,
    });
    const wrapper = ref<HTMLDivElement | null>(null);

    const transform = computed(() => `transform: translate(${state.x}px, ${state.y}px) scale(${state.scale});`);

    function onWheel(e: WheelEvent) {
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      state.scale = Math.min(Math.max(state.scale + delta, 0.2), 2);
    }

    function onMouseDown(e: MouseEvent) {
      // middle click or left-click on empty space starts panning
      if (e.button === 1 || (e.button === 0 && e.target === wrapper.value)) {
        state.panning = true;
        state.lastX = e.clientX;
        state.lastY = e.clientY;
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (!state.panning) return;
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      state.x += dx;
      state.y += dy;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
    }

    function onMouseUp() {
      state.panning = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    onMounted(() => {
      // ensure we cleanup if component is destroyed during pan
      onBeforeUnmount(() => onMouseUp());
    });

    return { wrapper, transform, onMouseDown, onWheel };
  },
});
</script>

<style scoped>
.canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  cursor: grab;
}
.canvas:active {
  cursor: grabbing;
}
.inner {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
}
</style>

