import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/index.js'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

createApp(App).use(router).use(store).use(VueSweetalert2).mount('#app')
