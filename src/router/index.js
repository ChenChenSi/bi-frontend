import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'WorkspaceList',
        component: () => import('../views/WorkspaceList.vue')
      },
      {
        path: 'workspace/:id',
        name: 'ReportList',
        component: () => import('../views/ReportList.vue')
      },
      {
        path: 'workspace/:id/members',
        name: 'MemberManagement',
        component: () => import('../views/MemberManagement.vue')
      },
      {
        path: 'workspace/:id/groups',
        name: 'UserGroupManagement',
        component: () => import('../views/UserGroupManagement.vue')
      }
    ]
  },
  {
    path: '/design/:id?',
    name: 'ReportDesigner',
    component: () => import('../components/report_designer/index.vue')
  },
  {
    path: '/view/:id',
    name: 'ReportViewer',
    component: () => import('../views/ReportViewer.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
