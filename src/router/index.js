import Root from '@/Layouts/Root/Root.vue'
import KandaDetails from '@/Pages/KandaDetails.vue'
import Ramayana from '@/Pages/Ramayana.vue'
import SargaDetails from '@/Pages/SargaDetails.vue'
import ShlokaDetailsPage from '@/Pages/ShlokaDetailsPage.vue'
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
          component: Home
        },
        {
          path: '/ramayana',
          name: 'ramayana',
          component: Ramayana
        },
        {
          path: '/kandas/:id',
          name: 'kanda-details',
          component: KandaDetails,
          props: true
        },

        {
          path: '/sarga/:id',
          name: 'sarga-details',
          component: SargaDetails,
          props: true
        },

        {
          path: '/shlokas',
          name: 'shlokas',
          component: Shlokas
        },

        {
          path: '/shloka/:id',
          name:'shloka',
          component: ShlokaDetailsPage
        },




      ]
    },

  ],
})

export default router
