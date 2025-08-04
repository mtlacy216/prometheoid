# Node Edge Components

This directory contains a minimal extraction of the canvas components used for building node graphs, inspired by the n8n editor UI.

## Components

- `Canvas.vue` – provides simple pan/zoom navigation similar to n8n's editor. Drag the background or use the mouse wheel to move around the canvas.
- `CanvasEdge.vue` – renders bezier edges behind nodes with a non-scaling stroke to keep them flat.
- `FlowCanvas.vue` – integrates the canvas-store `FlowMapper` so flows and groups can be managed reactively.

Source code is adapted from the n8n project and is subject to the [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/LICENSE.md).
