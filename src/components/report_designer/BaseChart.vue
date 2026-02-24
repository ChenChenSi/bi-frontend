<template>
  <div class="base-chart">
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

/**
 * BaseChart Component
 * Wraps ECharts to provide a reactive chart component.
 * 
 * @displayName BaseChart
 */
export default {
  name: 'BaseChart',
  props: {
    /**
     * Configuration object for the chart
     * Includes styleConfig and dataConfig
     */
    config: {
      type: Object,
      required: true
    },
    /**
     * Data for the chart
     * Format depends on the chart type
     */
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartInstance: null,
      resizeObserver: null
    };
  },
  watch: {
    // Watch for configuration changes and update chart
    config: {
      deep: true,
      handler() {
        this.updateChart();
      }
    },
    // Watch for data changes and update chart
    data: {
      deep: true,
      handler() {
        this.updateChart();
      }
    }
  },
  mounted() {
    this.initChart();
    // Use ResizeObserver to handle container resizing
    this.resizeObserver = new ResizeObserver(() => {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    });
    this.resizeObserver.observe(this.$refs.chartRef);
  },
  beforeDestroy() {
    // Clean up chart instance and observer
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  methods: {
    /**
     * Initialize the ECharts instance
     */
    initChart() {
      if (this.$refs.chartRef) {
        this.chartInstance = echarts.init(this.$refs.chartRef);
        this.updateChart();
      }
    },
    /**
     * Update the chart options based on config and data
     */
    updateChart() {
      if (!this.chartInstance) return;
      
      const option = this.generateOption(this.config, this.data);
      this.chartInstance.setOption(option, { notMerge: false }); // notMerge: false to merge updates, true to replace
    },
    /**
     * Generate ECharts option object
     * @param {Object} config - Widget configuration
     * @param {Array} data - Chart data
     * @returns {Object} ECharts option
     */
    generateOption(config, data) {
      // Basic option structure
      const option = {
        title: {
          text: config.title || '',
          left: 'center',
          textStyle: {
            color: config.styleConfig?.textColor || '#333'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: config.styleConfig?.showLegend !== false,
          bottom: 0,
          textStyle: {
            color: config.styleConfig?.textColor || '#333'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        color: config.styleConfig?.colorPalette || ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
      };

      // Handle different chart types
      if (config.type === 'bar' || config.type === 'line') {
        option.xAxis = {
          type: 'category',
          data: data.map(item => item.name || item.x), // Assume data has name or x property
          show: config.styleConfig?.xAxisLabel !== false,
          axisLabel: {
            color: config.styleConfig?.textColor || '#333'
          }
        };
        option.yAxis = {
          type: 'value',
          axisLabel: {
            color: config.styleConfig?.textColor || '#333'
          }
        };
        option.series = [{
          data: data.map(item => item.value || item.y), // Assume data has value or y property
          type: config.type,
          smooth: config.type === 'line'
        }];
      } else if (config.type === 'pie') {
        option.series = [{
          type: 'pie',
          radius: '50%',
          data: data, // Pie chart expects {name, value} objects directly
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }];
      }

      // Handle background color
      if (config.styleConfig?.backgroundColor) {
        option.backgroundColor = config.styleConfig.backgroundColor;
      }

      return option;
    }
  }
};
</script>

<style scoped>
.base-chart {
  width: 100%;
  height: 100%;
  position: relative;
}
.chart-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
