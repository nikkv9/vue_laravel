import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css';

import { useUserStore } from "./stores/user";

import Vue3EasyDataTable from 'vue3-easy-data-table';
import "vue3-easy-data-table/dist/style.css";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)

app.use(createPinia())
const userStore = useUserStore();
userStore.getUser();
userStore.checkToken(); 


app.use(router)
app.use(vuetify)

// console.log(userStore)

app.component('EasyDataTable', Vue3EasyDataTable);

app.mount('#app')
