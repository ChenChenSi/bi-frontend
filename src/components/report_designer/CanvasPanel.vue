<template>
  <div class="canvas-panel" @dragover.prevent @drop="onDrop">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated="onLayoutUpdated"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        @click.native="selectWidget(item.i)"
        :class="{ active: item.i === activeWidgetId }"
      >
        <div class="widget-content">
          <div class="widget-header">
            <span>{{ item.title }}</span>
            <button class="close-btn" @click.stop="removeWidget(item.i)">×</button>
          </div>
          <div class="widget-body">
            <BaseChart :config="item" :data="getMockData(item.type)" />
            <!-- Overlay for resizing/dragging performance -->
            <div class="interaction-mask"></div>
          </div>
        </div>
      </grid-item>
    </grid-layout>
    <div v-if="layout.length === 0" class="empty-state">
      从左侧面板拖拽组件到此处
    </div>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import BaseChart from './BaseChart.vue';
import { mapGetters, mapActions } from 'vuex';
import { createDefaultWidget } from './types';

/**
 * CanvasPanel Component
 * Main area where widgets are dropped and arranged.
 */
export default {
  name: 'CanvasPanel',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    BaseChart
  },
  computed: {
    ...mapGetters(['layout', 'activeWidget']),
    activeWidgetId() {
      return this.activeWidget ? this.activeWidget.i : null;
    }
  },
  methods: {
    ...mapActions(['addWidget', 'selectWidget', 'removeWidget', 'updateLayout']),
    
    /**
     * Handle drop event from MaterialPanel
     * @param {DragEvent} e 
     */
    onDrop(e) {
      const type = e.dataTransfer.getData('widgetType');
      if (type) {
        const widget = createDefaultWidget(type);
        // Calculate position based on drop coordinates if needed, 
        // but for now let's just append to end or find first empty space.
        // vue-grid-layout handles collision automatically.
        // We need to calculate the correct Y position to append to the bottom
        let y = 0;
        if (this.layout.length > 0) {
          y = Math.max(...this.layout.map(item => item.y + item.h));
        }
        widget.y = y;
        
        this.addWidget(widget);
      }
    },
    
    /**
     * Handle layout updates from grid layout
     * @param {Array} newLayout 
     */
    onLayoutUpdated(newLayout) {
      // In a real app, you might want to sync this back to Vuex more explicitly
      // But :layout.sync handles the local mutation.
      // If we need to save to backend, we'd do it here.
      console.log('Layout updated:', newLayout);
    },

    /**
     * Get mock data for demonstration
     * @param {string} type 
     * @returns {Array} Mock data
     */
    getMockData(type) {
      if (type === 'pie') {
        return [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' }
        ];
      }
      return [
        { name: '周一', value: 120 },
        { name: '周二', value: 200 },
        { name: '周三', value: 150 },
        { name: '周四', value: 80 },
        { name: '周五', value: 70 },
        { name: '周六', value: 110 },
        { name: '周日', value: 130 }
      ];
    }
  }
};
</script>

<style scoped>
.canvas-panel {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  overflow-y: auto;
  position: relative;
  min-height: 500px;
}
.vue-grid-item {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
}
.vue-grid-item.active {
  border: 2px solid #1890ff;
  box-shadow: 0 0 8px rgba(24, 144, 255, 0.5);
  z-index: 100;
}
.widget-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.widget-header {
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
  cursor: move; /* Indicate draggable area */
}
.close-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #999;
}
.close-btn:hover {
  color: #ff4d4f;
}
.widget-body {
  flex: 1;
  position: relative;
  overflow: hidden;
  padding: 10px;
}
.interaction-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: none; /* Show only when resizing/dragging via parent class if needed */
}
.vue-grid-item.vue-grid-placeholder {
  background: #1890ff !important;
  opacity: 0.2 !important;
}
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #999;
  font-size: 1.2em;
}
</style>
