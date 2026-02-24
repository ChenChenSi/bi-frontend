# 报表设计 (Report Designer) 技术方案与最佳实践

## 1. 核心技术选型

为满足“拖拽布局”、“组件对齐”、“响应式”及“高性能”的需求，本模块采用以下技术栈组合：

- **网格布局引擎**: `vue-grid-layout`
  - **理由**: Vue 2 生态中最成熟的网格布局方案，内置磁贴吸附、防碰撞算法、响应式断点支持。
  - **核心功能**: 提供 `<grid-layout>` 和 `<grid-item>` 组件，管理组件的 `x, y, w, h`。
- **物料拖拽源**: `vuedraggable` (基于 Sortable.js)
  - **理由**: 处理左侧物料区到右侧画布的“拖入”动作。
  - **交互**: 左侧列表配置 `group` 属性，拖出时生成临时 ghost 元素。
- **图表渲染**: `ECharts 5.x` + `ResizeObserver`
  - **理由**: ECharts 5 性能更优。配合 `ResizeObserver` 仅在组件真实尺寸变化时触发 `echarts.resize()`。
- **状态管理**: `Vuex`
  - **理由**: 集中管理 `reportConfig`（画布配置）和 `activeWidget`（当前选中组件），实现配置面板与画布的解耦。

## 2. 详细设计与交互流程

### 2.1 布局架构

设计器页面采用经典的 **左-中-右** 三栏布局：

1.  **左侧：物料区 (Material Panel)**
    - 展示可用组件列表（柱状图、折线图、文本、图片等）。
    - 使用 `vuedraggable` 包装，设置 `clone` 模式，拖拽时不改变原列表。
2.  **中间：画布区 (Canvas)**
    - 核心容器，使用 `vue-grid-layout`。
    - **交互优化**: 
        - 支持 **8方向** 缩放 (Resize)。
        - 支持 **内容区拖拽** (Drag by `.widget-content`)。
    - 接受来自左侧的拖放事件 (`drop`)。
    - 渲染具体的 `<grid-item>`，每个 Item 内部包裹 `BaseChart` 组件。
    - **标尺与辅助线**: 可选集成 `vue-ruler-tool` 或自定义 SVG 标尺。
3.  **右侧：配置区 (Config Panel)**
    - 根据当前选中的组件 (`activeWidget`) 动态渲染配置表单。
    - 分为三个 Tab：
        - **数据 (Data)**: 数据源、维度、指标、过滤。
        - **样式 (Style)**: 标题、颜色、字体、边框。
        - **高级 (Advanced)**: 刷新频率、交互跳转。

### 2.2 核心交互逻辑

#### A. 从物料区拖入画布
1.  用户从左侧拖动“柱状图”图标。
2.  拖入中间画布区域。
3.  **事件处理**:
    - 画布容器监听 `dragover` (允许放置)。
    - 监听 `drop` 事件，获取拖入组件的类型 (`type`)。
47→    - 计算鼠标落点对应的网格坐标 (`x, y`)。
    - **Y轴坐标修正**: 为防止新组件覆盖现有组件，自动计算当前布局最大 `y` 值 (`maxY`)，将新组件放置在 `maxY + defaultH` 处（自动追加到底部）。
    - **生成新组件**:
        - 生成唯一 `id` (UUID)。
        - 设置默认尺寸 (`w: 6, h: 4`)。
        - 设置默认配置 (Title: "新图表")。
    - 将新组件对象 `push` 到 Vuex 的 `layout` 数组中。

#### B. 画布内操作
- **选中**: 点击组件，更新 Vuex `activeWidgetId`，右侧面板显示对应配置。
- **移动/缩放**:
    - `vue-grid-layout` 自动处理 DOM 变化。
    - **性能优化**: 拖拽/缩放过程中 (**dragging/resizing**)，ECharts 组件应显示**遮罩层 (Mask)**，避免频繁触发重绘和鼠标事件冲突（ECharts 内部也有鼠标事件）。
    - **事件结束**: 监听 `layout-updated` 或 `resized` 事件，仅在动作结束时调用 `echarts.resize()`。

#### C. 右侧配置更新
- 用户修改标题或颜色。
- 通过 `v-model` 或 Vuex Mutation 实时更新 `layout` 中的对应组件数据。
- 画布内的 `BaseChart` 监听 `props` 变化，调用 `echarts.setOption(..., { notMerge: false })` 更新视图。

### 2.3 数据结构设计 (Schema)

#### 组件模型 (Widget Item)
```typescript
interface Widget {
  // 基础布局属性 (vue-grid-layout)
  i: string;      // UUID, 唯一标识
  x: number;      // 网格横坐标 (0-11)
  y: number;      // 网格纵坐标
  w: number;      // 网格宽度
  h: number;      // 网格高度
  
  // 组件元数据
  type: 'bar' | 'line' | 'pie' | 'text' | 'image';
  title: string;
  
  // 数据配置
  dataConfig: {
    sourceId: string;       // 数据源 ID
    dimensions: string[];   // 维度字段
    metrics: string[];      // 指标字段
    sort: 'asc' | 'desc';
    limit: number;
  };
  
  // 样式配置 (ECharts Option 映射)
  styleConfig: {
    backgroundColor: string;
    textColor: string;
    showLegend: boolean;
    colorPalette: string[]; // 预设色盘
    xAxisLabel: boolean;
    // ...
  };
}
```

## 3. 性能优化最佳实践

1.  **按需加载**: ECharts 体积较大，应按需引入图表类型和组件（如 `GridComponent`, `TooltipComponent`）。
2.  **防抖与节流**:
    - 窗口 `resize` 监听器需加 `debounce(200ms)`。
    - 配置面板的输入框（如标题修改）需加 `debounce`，避免每输入一个字符就触发 Vuex 更新和图表重绘。
3.  **Canvas 渲染**: ECharts 默认使用 Canvas，性能优于 SVG，适合大数据量。
4.  **数据冻结**: 从后端获取的大型数据集，使用 `Object.freeze()` 冻结，避免 Vue 2.x 对其进行响应式劫持 (Observer)，大幅减少内存开销。
5.  **组件销毁**: 报表销毁 (`beforeDestroy`) 时，务必调用 `echartsInstance.dispose()` 防止内存泄漏。

## 4. 关键代码片段 (示例)

### 4.1 BaseChart.vue (ECharts 封装)

```javascript
<template>
  <div class="chart-container" ref="chartRef"></div>
</template>

<script>
import * as echarts from 'echarts';
// 按需引入...

export default {
  props: {
    config: Object, // 包含 styleConfig, dataConfig
    data: Array     // 图表数据
  },
  watch: {
    config: {
      deep: true,
      handler() { this.updateChart(); }
    },
    data() { this.updateChart(); }
  },
  mounted() {
    this.initChart();
    // 使用 ResizeObserver 监听容器大小变化
    this.resizeObserver = new ResizeObserver(() => {
      this.chartInstance && this.chartInstance.resize();
    });
    this.resizeObserver.observe(this.$refs.chartRef);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chartRef);
      this.updateChart();
    },
    updateChart() {
      if (!this.chartInstance) return;
      const option = this.generateOption(this.config, this.data);
      this.chartInstance.setOption(option);
    },
    generateOption(config, data) {
      // 将配置转换为 ECharts Option
      return {
        title: { text: config.title },
        // ...
      };
    }
  }
}
</script>
```
