<template>
  <div class="config-panel" v-if="activeWidget">
    <h3>组件配置</h3>
    
    <div class="config-group">
      <label>标题</label>
      <input 
        v-model="localTitle" 
        @input="updateTitle" 
        placeholder="请输入图表标题"
      />
    </div>

    <div class="config-group">
      <label>图表类型</label>
      <select disabled :value="activeWidget.type">
        <option value="bar">柱状图</option>
        <option value="line">折线图</option>
        <option value="pie">饼图</option>
      </select>
    </div>

    <div class="config-group">
      <label>数据源</label>
      <select v-model="localSourceId" @change="updateDataSource">
        <option value="">选择数据源</option>
        <option value="source1">2023 销售数据</option>
        <option value="source2">用户访问量</option>
      </select>
    </div>

    <div class="config-group">
      <label>主题颜色</label>
      <div class="color-picker">
        <div 
          v-for="color in colors" 
          :key="color" 
          class="color-swatch"
          :style="{ backgroundColor: color }"
          @click="updateColor(color)"
          :class="{ active: localColor === color }"
        ></div>
      </div>
    </div>

    <div class="config-group">
      <label>
        <input 
          type="checkbox" 
          v-model="localShowLegend" 
          @change="updateLegend"
        />
        显示图例
      </label>
    </div>
  </div>
  <div class="config-panel empty" v-else>
    请选择一个组件进行配置
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { debounce } from 'lodash'; // Assuming lodash is available or I should implement simple debounce

/**
 * ConfigPanel Component
 * Allows editing properties of the selected widget.
 */
export default {
  name: 'ConfigPanel',
  computed: {
    ...mapGetters(['activeWidget']),
  },
  data() {
    return {
      localTitle: '',
      localSourceId: '',
      localShowLegend: true,
      localColor: '',
      colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4']
    };
  },
  watch: {
    activeWidget: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.localTitle = newVal.title;
          this.localSourceId = newVal.dataConfig?.sourceId || '';
          this.localShowLegend = newVal.styleConfig?.showLegend !== false;
          this.localColor = newVal.styleConfig?.colorPalette?.[0] || this.colors[0];
        }
      }
    }
  },
  methods: {
    ...mapActions(['updateWidget']),

    updateTitle: function() {
       // Simple debounce could be added here
       this.commitUpdate({ title: this.localTitle });
    },
    
    updateDataSource() {
      this.commitUpdate({ 
        dataConfig: { 
          ...this.activeWidget.dataConfig,
          sourceId: this.localSourceId 
        } 
      });
    },

    updateColor(color) {
      this.localColor = color;
      this.commitUpdate({
        styleConfig: {
          ...this.activeWidget.styleConfig,
          colorPalette: [color, ...this.colors.filter(c => c !== color)]
        }
      });
    },

    updateLegend() {
      this.commitUpdate({
        styleConfig: {
          ...this.activeWidget.styleConfig,
          showLegend: this.localShowLegend
        }
      });
    },

    commitUpdate(updates) {
      if (this.activeWidget) {
        this.updateWidget({
          id: this.activeWidget.i,
          updates
        });
      }
    }
  }
};
</script>

<style scoped>
.config-panel {
  width: 250px;
  background: #fff;
  border-left: 1px solid #e8e8e8;
  padding: 15px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
.empty {
  color: #999;
  text-align: center;
  padding-top: 50px;
}
.config-group {
  margin-bottom: 20px;
}
.config-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}
.config-group input[type="text"],
.config-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
}
.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
}
.color-swatch.active {
  border-color: #333;
}
</style>
