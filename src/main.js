import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import fetch from './utils/fetch'

createApp(App)
  .use(router)
  .use(store)
  .use(fetch)
  .mount('#app')
