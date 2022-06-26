import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/index.js'
import BaseButton from './components/UI/BaseButton.vue'
import BaseCard from './components/UI/BaseCard.vue'


createApp(App)
  .use(router)
  .use(store)
  .component('BaseButton', BaseButton)
  .component('BaseCard', BaseCard)
  .mount('#app')
