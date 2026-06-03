import { createRouter, createWebHistory } from 'vue-router'
import ConfiguratorView from '../views/ConfiguratorView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'configurator',
      component: ConfiguratorView,
    },
  ],
})

export default router