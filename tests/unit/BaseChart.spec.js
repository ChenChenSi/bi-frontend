import { shallowMount } from '@vue/test-utils';
import BaseChart from '@/components/report_designer/BaseChart.vue';

// Mock ECharts
const mockSetOption = jest.fn();
const mockResize = jest.fn();
const mockDispose = jest.fn();

jest.mock('echarts', () => ({
  init: jest.fn(() => ({
    setOption: mockSetOption,
    resize: mockResize,
    dispose: mockDispose
  }))
}));

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  disconnect() {}
};

describe('BaseChart.vue', () => {
  const defaultConfig = {
    title: 'Test Chart',
    type: 'bar',
    styleConfig: {
      textColor: '#333',
      showLegend: true,
      colorPalette: ['#fff']
    }
  };
  const defaultData = [{ name: 'A', value: 10 }];

  it('renders correctly', () => {
    const wrapper = shallowMount(BaseChart, {
      propsData: {
        config: defaultConfig,
        data: defaultData
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.chart-container').exists()).toBe(true);
  });

  it('initializes chart on mount', () => {
    shallowMount(BaseChart, {
      propsData: {
        config: defaultConfig,
        data: defaultData
      }
    });
    // Verify echarts.init was called
    const echarts = require('echarts');
    expect(echarts.init).toHaveBeenCalled();
  });

  it('updates chart when config changes', async () => {
    const wrapper = shallowMount(BaseChart, {
      propsData: {
        config: defaultConfig,
        data: defaultData
      }
    });

    // Reset mock calls from mount
    mockSetOption.mockClear();

    // Update props
    await wrapper.setProps({
      config: { ...defaultConfig, title: 'New Title' }
    });

    expect(mockSetOption).toHaveBeenCalled();
    const option = mockSetOption.mock.calls[0][0];
    expect(option.title.text).toBe('New Title');
  });

  it('disposes chart on destroy', () => {
    const wrapper = shallowMount(BaseChart, {
      propsData: {
        config: defaultConfig,
        data: defaultData
      }
    });
    wrapper.destroy();
    expect(mockDispose).toHaveBeenCalled();
  });
});
