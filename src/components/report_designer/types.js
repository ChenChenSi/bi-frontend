/**
 * @typedef {Object} Widget
 * @property {string} i - UUID, unique identifier
 * @property {number} x - Grid x coordinate (0-11)
 * @property {number} y - Grid y coordinate
 * @property {number} w - Grid width
 * @property {number} h - Grid height
 * @property {'bar' | 'line' | 'pie' | 'text' | 'image'} type - Widget type
 * @property {string} title - Widget title
 * @property {DataConfig} dataConfig - Data configuration
 * @property {StyleConfig} styleConfig - Style configuration
 */

/**
 * @typedef {Object} DataConfig
 * @property {string} sourceId - Data source ID
 * @property {string[]} dimensions - Dimension fields
 * @property {string[]} metrics - Metric fields
 * @property {'asc' | 'desc'} sort - Sort order
 * @property {number} limit - Data limit
 */

/**
 * @typedef {Object} StyleConfig
 * @property {string} backgroundColor - Background color
 * @property {string} textColor - Text color
 * @property {boolean} showLegend - Whether to show legend
 * @property {string[]} colorPalette - Color palette
 * @property {boolean} xAxisLabel - Whether to show X axis label
 */

export const WIDGET_TYPES = {
  BAR: 'bar',
  LINE: 'line',
  PIE: 'pie',
  TEXT: 'text',
  IMAGE: 'image'
};

const DEFAULT_SIZES = {
  [WIDGET_TYPES.BAR]: { w: 6, h: 8 },    // 柱状图通常需要较宽的空间
  [WIDGET_TYPES.LINE]: { w: 6, h: 8 },   // 折线图与柱状图类似
  [WIDGET_TYPES.PIE]: { w: 4, h: 8 },    // 饼图可以稍微窄一点
  [WIDGET_TYPES.TEXT]: { w: 4, h: 4 },   // 文本通常作为标题或说明，较小
  [WIDGET_TYPES.IMAGE]: { w: 4, h: 6 }   // 图片适中
};

const DEFAULT_TITLES = {
  [WIDGET_TYPES.BAR]: '柱状图',
  [WIDGET_TYPES.LINE]: '折线图',
  [WIDGET_TYPES.PIE]: '饼图',
  [WIDGET_TYPES.TEXT]: '文本组件',
  [WIDGET_TYPES.IMAGE]: '图片组件'
};

/**
 * Creates a default widget configuration
 * @param {string} type - Widget type
 * @returns {Widget} Default widget object
 */
export function createDefaultWidget(type) {
  const size = DEFAULT_SIZES[type] || { w: 6, h: 6 };
  
  return {
    i: generateUUID(),
    x: 0,
    y: 0,
    w: size.w,
    h: size.h,
    type,
    title: DEFAULT_TITLES[type] || '新图表',
    dataConfig: {
      sourceId: '',
      dimensions: [],
      metrics: [],
      sort: 'asc',
      limit: 10
    },
    styleConfig: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      showLegend: true,
      colorPalette: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
      xAxisLabel: true
    }
  };
}

/**
 * Generates a UUID
 * @returns {string} UUID
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
