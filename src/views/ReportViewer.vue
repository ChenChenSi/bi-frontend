<template>
  <div class="report-viewer">
    <div class="viewer-header" v-if="!fullscreen">
      <div class="left">
        <button @click="$router.back()">返回</button>
        <h2>{{ reportTitle }}</h2>
      </div>
      <div class="right">
        <button @click="toggleFullscreen">全屏</button>
        <button @click="refreshData">刷新数据</button>
      </div>
    </div>
    
    <div class="canvas-container" :class="{ fullscreen: fullscreen }">
      <div v-if="fullscreen" class="fullscreen-exit-btn">
        <button @click="toggleFullscreen">退出全屏</button>
      </div>
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="false"
        :is-resizable="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
        >
          <div class="widget-wrapper">
            <BaseChart :config="item" :data="getMockData(item.type)" />
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import BaseChart from '../components/report_designer/BaseChart.vue';

export default {
  name: 'ReportViewer',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    BaseChart
  },
  data() {
    return {
      reportTitle: '加载中...',
      layout: [],
      fullscreen: false
    };
  },
  created() {
    this.loadReport();
  },
  methods: {
    loadReport() {
      // Mock loading data
      const id = this.$route.params.id;
      this.reportTitle = `报表 ${id} 详情`;
      
      // Mock layout data
      this.layout = [
        { i: '1', x: 0, y: 0, w: 6, h: 8, type: 'bar', title: '销售趋势', styleConfig: { showLegend: true } },
        { i: '2', x: 6, y: 0, w: 6, h: 8, type: 'pie', title: '渠道占比', styleConfig: { showLegend: true } },
        { i: '3', x: 0, y: 8, w: 12, h: 6, type: 'line', title: '访问量分析', styleConfig: { showLegend: true } }
      ];
    },
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen;
      // In a real app, use the Fullscreen API
    },
    refreshData() {
      // Mock refresh
      this.$forceUpdate();
    },
    getMockData(type) {
      if (type === 'pie') {
        return [
          { value: Math.random() * 1000, name: '搜索引擎' },
          { value: Math.random() * 1000, name: '直接访问' },
          { value: Math.random() * 1000, name: '邮件营销' },
          { value: Math.random() * 1000, name: '联盟广告' }
        ];
      }
      return [
        { name: '周一', value: Math.random() * 200 },
        { name: '周二', value: Math.random() * 200 },
        { name: '周三', value: Math.random() * 200 },
        { name: '周四', value: Math.random() * 200 },
        { name: '周五', value: Math.random() * 200 },
        { name: '周六', value: Math.random() * 200 },
        { name: '周日', value: Math.random() * 200 }
      ];
    }
  }
}
</script>

<style scoped>
.report-viewer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}
.viewer-header {
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 10;
}
.left {
  display: flex;
  align-items: center;
  gap: 15px;
}
.left button {
  background: none;
  border: 1px solid #d9d9d9;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 4px;
}
.right button {
  margin-left: 10px;
  padding: 5px 15px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.canvas-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
.canvas-container.fullscreen {
  padding: 0;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
.widget-wrapper {
  height: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.fullscreen-exit-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 200;
}
.fullscreen-exit-btn button {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}
.fullscreen-exit-btn button:hover {
  background: rgba(0, 0, 0, 0.7);
}
</style>
