import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuthProvider } from './Authentication/AuthProvider'

const app = createApp(App)



const authState = useAuthProvider()

app.provide('authContext',authState)

app.use(router)

app.mount('#app')
