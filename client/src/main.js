import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

const app = createApp(App).use(store).use(router);

app.provide('API_URL', 'http://localhost:3000/api');

app.mount('#app');
