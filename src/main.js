//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'; // Styles CSS
import 'bootstrap'; // JS Bootstrap (nécessite Popper pour certains composants comme dropdowns)

createApp(App).mount('#app')
