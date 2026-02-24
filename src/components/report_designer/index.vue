<template>
  <div class="designer-container">
    <div class="toolbar">
      <div class="left">
        <button class="icon-btn" @click="goBack" title="返回">⬅</button>
        <span class="title">报表设计器</span>
      </div>
      <div class="right">
        <button class="secondary-btn" @click="previewReport">预览</button>
        <button class="primary-btn" @click="saveReport">保存</button>
      </div>
    </div>
    <div class="report-designer">
      <MaterialPanel class="left-panel" />
      <CanvasPanel class="center-panel" />
      <ConfigPanel class="right-panel" />
    </div>
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
  },
  methods: {
    goBack() {
      if (confirm('确定要退出编辑吗？未保存的更改将丢失。')) {
        this.$router.back();
      }
    },
    saveReport() {
      // Mock save logic
      console.log('Saving report configuration...');
      alert('报表保存成功！');
    },
    previewReport() {
      // Mock preview logic - could open a new tab or modal
      // For now, let's just use the viewer route with a mock ID if new, or current ID
      const id = this.$route.params.id || 'preview';
      const routeData = this.$router.resolve({ name: 'ReportViewer', params: { id } });
      window.open(routeData.href, '_blank');
    }
  }
};
</script>

<style scoped>
.designer-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
.toolbar {
  height: 50px;
  background: #001529;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10;
}
.toolbar .left {
  display: flex;
  align-items: center;
  gap: 15px;
}
.toolbar .title {
  font-size: 16px;
  font-weight: 500;
}
.icon-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
}
.icon-btn:hover {
  opacity: 0.8;
}
.toolbar .right {
  display: flex;
  gap: 10px;
}
.primary-btn {
  background: #1890ff;
  color: #fff;
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.primary-btn:hover {
  background: #40a9ff;
}
.secondary-btn {
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.report-designer {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.left-panel {
  flex: 0 0 200px;
  border-right: 1px solid #e8e8e8;
}
.center-panel {
  flex: 1;
  overflow: auto;
  background: #f0f2f5;
}
.right-panel {
  flex: 0 0 250px;
  border-left: 1px solid #e8e8e8;
}
</style>
