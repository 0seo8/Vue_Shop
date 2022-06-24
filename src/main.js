import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/index.js'
import BaseButton from './components/UI/BaseButton.vue'


createApp(App)
  .use(router)
  .use(store)
  .component('BaseButton', BaseButton)
  .mount('#app')
