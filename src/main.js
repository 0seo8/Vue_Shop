import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/index.js'
import VueSweetalert2 from 'vue-sweetalert2'

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

createApp(App).use(router).use(store).use(VueSweetalert2, options).mount('#app')
