import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './style.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App)
.use(router)
.use(createPinia())
.mount('#app')