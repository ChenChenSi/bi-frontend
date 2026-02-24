# Report Designer Implementation Documentation

## Overview
The Report Designer module allows users to create reports by dragging and dropping widgets onto a canvas. It consists of three main panels:
1. **Material Panel**: List of available widgets.
2. **Canvas Panel**: The layout area where widgets are placed and resized.
3. **Config Panel**: Configuration options for the selected widget.

## Technical Architecture

### Tech Stack
- **Vue 2.x**: Core framework.
- **Vuex**: State management for report configuration and selected widget.
- **vue-grid-layout**: Grid system for the canvas.
- **vuedraggable**: Drag and drop functionality for the material panel.
- **ECharts 5.x**: Charting library.

### Directory Structure
```
src/components/report_designer/
├── index.vue           # Main container
├── MaterialPanel.vue   # Left panel (Source)
├── CanvasPanel.vue     # Center panel (Target)
├── ConfigPanel.vue     # Right panel (Configuration)
├── BaseChart.vue       # ECharts wrapper
└── types.js            # Type definitions and constants
```

### Data Model
The report layout is stored in Vuex as an array of `Widget` objects.
See `src/components/report_designer/types.js` for the `Widget` definition.

### Key Interactions
1. **Drag and Drop**: 
   - `MaterialPanel` uses `vuedraggable` (or native dragstart) to initiate drag.
   - `CanvasPanel` listens for `drop` events and creates a new widget instance using `createDefaultWidget`.
   - `vue-grid-layout` manages the positioning and resizing on the canvas.

2. **Configuration**:
   - Clicking a widget on the canvas sets `activeWidgetId` in Vuex.
   - `ConfigPanel` watches `activeWidget` and populates the form.
   - Changes in `ConfigPanel` dispatch `updateWidget` action to Vuex.
   - `BaseChart` watches for prop changes and updates the ECharts instance.

## Usage

### Adding a new Widget Type
1. Add the type constant to `WIDGET_TYPES` in `types.js`.
2. Add the icon and label to `MaterialPanel.vue`.
3. Update `BaseChart.vue` to handle the new type in `generateOption`.
4. Update `createDefaultWidget` in `types.js` to provide default configuration.

### Testing
Run unit tests with:
```bash
npm run test:unit
```
