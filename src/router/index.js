import Root from '@/Layouts/Root/Root.vue'
import Kandas from '@/Pages/Kandas.vue'
import Shlokas from '@/Pages/Shlokas.vue'
import Home from '@/views/Home/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          path: '',
          name: 'home',
          component:Home
        },
        {
          path: '/kandas',
          name: 'kandas',
          component:Kandas
        },
        {
          path: '/shlokas',
          name: 'shlokas',
          component:Shlokas
        }
      ]
    },
    
  ],
})

export default router
