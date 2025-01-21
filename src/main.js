import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/router/navigation';
import vuetify from './plugins/vuetify'
import './assets/css/style.css'
import '@/plugins/axios'
import axios from "axios";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')

import { useAccessStore } from "@/stores/access";
// Stores incilizados
const useAuth = useAccessStore();
// esta suscripción se mantendrá incluso después de desmontar el componente
useAuth.$subscribe((mutation, state) => {
    if (state.accessToken) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.accessToken
        localStorage.setItem('access', JSON.stringify(state.access));
        localStorage.setItem('token', JSON.stringify(state.accessToken));
    } else {
        localStorage.removeItem('access')
        localStorage.removeItem('token')
        localStorage.removeItem('menu')
        router.push({ name: 'Login' })
    }
})