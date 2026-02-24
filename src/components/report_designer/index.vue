<template>
  <div class="report-designer">
    <MaterialPanel class="left-panel" />
    <CanvasPanel class="center-panel" />
    <ConfigPanel class="right-panel" />
  </div>
</template>

<script>
import MaterialPanel from './MaterialPanel.vue';
import CanvasPanel from './CanvasPanel.vue';
import ConfigPanel from './ConfigPanel.vue';

/**
 * ReportDesigner Component
 * Main container for the report designer tool.
 * Layouts the Material, Canvas, and Config panels.
 */
export default {
  name: 'ReportDesigner',
  components: {
    MaterialPanel,
    CanvasPanel,
    ConfigPanel
  }
};
</script>

<style scoped>
.report-designer {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.left-panel {
  flex: 0 0 200px;
}
.center-panel {
  flex: 1;
  overflow: auto;
}
.right-panel {
  flex: 0 0 250px;
}
</style>
