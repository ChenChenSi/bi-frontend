import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Vuex Store for Report Designer
 * Manages the state of the report layout and selected widget.
 */
export default new Vuex.Store({
  state: {
    // Current report configuration including layout
    reportConfig: {
      layout: [] // Array of Widget objects
    },
    // ID of the currently selected widget
    activeWidgetId: null,
    // Workspaces data
    workspaces: [
      { id: 1, name: '销售部工作区', description: '销售报表与数据分析', memberCount: 12, reportCount: 5 },
      { id: 2, name: '财务部工作区', description: '财务审计与预算报表', memberCount: 8, reportCount: 3 },
      { id: 3, name: '运营部工作区', description: '用户增长与留存分析', memberCount: 15, reportCount: 8 }
    ]
  },
  getters: {
    /**
     * Get all workspaces
     */
    workspaces: state => state.workspaces,
    
    /**
     * Get a specific workspace by ID
     */
    getWorkspaceById: (state) => (id) => {
      return state.workspaces.find(ws => ws.id === parseInt(id));
    },

    /**
     * Get the list of widgets in the layout
     * @param {Object} state 
     * @returns {Array} List of widgets
     */
    layout: state => state.reportConfig.layout,

    /**
     * Get the currently active widget object
     * @param {Object} state 
     * @returns {Object|null} The active widget or null if none selected
     */
    activeWidget: state => {
      return state.reportConfig.layout.find(w => w.i === state.activeWidgetId) || null
    }
  },
  mutations: {
    /**
     * Add a new widget to the layout
     * @param {Object} state 
     * @param {Object} widget - The widget object to add
     */
    ADD_WIDGET(state, widget) {
      state.reportConfig.layout.push(widget)
    },

    /**
     * Set the active widget ID
     * @param {Object} state 
     * @param {string} id - The ID of the widget to select
     */
    SET_ACTIVE_WIDGET(state, id) {
      state.activeWidgetId = id
    },

    /**
     * Update a specific widget's properties
     * @param {Object} state 
     * @param {Object} payload - { id, updates }
     */
    UPDATE_WIDGET(state, { id, updates }) {
      const widget = state.reportConfig.layout.find(w => w.i === id)
      if (widget) {
        Object.assign(widget, updates)
      }
    },
    
    /**
     * Remove a widget from the layout
     * @param {Object} state
     * @param {string} id - The ID of the widget to remove
     */
    REMOVE_WIDGET(state, id) {
      state.reportConfig.layout = state.reportConfig.layout.filter(w => w.i !== id)
      if (state.activeWidgetId === id) {
        state.activeWidgetId = null
      }
    },
    /**
     * Add a new workspace
     */
    ADD_WORKSPACE(state, workspace) {
      state.workspaces.push(workspace);
    }
  },
  actions: {
    addWorkspace({ commit }, workspace) {
      commit('ADD_WORKSPACE', workspace);
    },
    addWidget({ commit }, widget) {
      commit('ADD_WIDGET', widget)
      commit('SET_ACTIVE_WIDGET', widget.i)
    },
    selectWidget({ commit }, id) {
      commit('SET_ACTIVE_WIDGET', id)
    },
    updateWidget({ commit }, payload) {
      commit('UPDATE_WIDGET', payload)
    },
    removeWidget({ commit }, id) {
      commit('REMOVE_WIDGET', id)
    }
  }
})
