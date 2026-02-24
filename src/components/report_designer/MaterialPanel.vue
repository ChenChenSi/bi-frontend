<template>
  <div class="material-panel">
    <h3>组件列表</h3>
    <draggable
      v-model="widgets"
      :group="{ name: 'widgets', pull: 'clone', put: false }"
      :sort="false"
      @start="onDragStart"
      class="widget-list"
    >
      <div
        v-for="widget in widgets"
        :key="widget.type"
        class="widget-item"
        :draggable="true"
        @dragstart="onNativeDragStart($event, widget)"
      >
        <span class="icon">{{ widget.icon }}</span>
        <span class="label">{{ widget.label }}</span>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { WIDGET_TYPES } from './types';

/**
 * MaterialPanel Component
 * Displays a list of available widgets that can be dragged onto the canvas.
 */
export default {
  name: 'MaterialPanel',
  components: {
    draggable
  },
  data() {
    return {
      widgets: [
        { type: WIDGET_TYPES.BAR, label: '柱状图', icon: '📊' },
        { type: WIDGET_TYPES.LINE, label: '折线图', icon: '📈' },
        { type: WIDGET_TYPES.PIE, label: '饼图', icon: '🍩' },
        { type: WIDGET_TYPES.TEXT, label: '文本', icon: '📝' },
        { type: WIDGET_TYPES.IMAGE, label: '图片', icon: '🖼️' }
      ]
    };
  },
  methods: {
    /**
     * Handle native drag start for HTML5 DnD compatibility with CanvasPanel
     * @param {DragEvent} e 
     * @param {Object} widget 
     */
    onNativeDragStart(e, widget) {
      e.dataTransfer.setData('widgetType', widget.type);
      e.dataTransfer.effectAllowed = 'copy';
    },
    onDragStart(e) {
      // vuedraggable specific logic if needed
    }
  }
};
</script>

<style scoped>
.material-panel {
  width: 200px;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
}
.widget-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.widget-item {
  padding: 10px;
  background: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: grab;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;
}
.widget-item:hover {
  background: #e6f7ff;
  border-color: #1890ff;
  color: #1890ff;
}
.icon {
  font-size: 1.2em;
}
</style>
