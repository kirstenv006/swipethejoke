import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import store from './store'; // Importeer de store

const app = createApp(App)

app.use(router)
app.use(store) // Gebruik de store

app.mount('#app')
