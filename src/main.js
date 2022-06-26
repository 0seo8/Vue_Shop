import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/index.js'

createApp(App).use(router).use(store).mount('#app')
