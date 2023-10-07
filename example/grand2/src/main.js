import { createApp } from 'vue'
import App from './App.vue'
import Message from '@gislife/micro-message'

const app = createApp(App);
app.config.productionTip = false;
console.log("app", app);
app.use(Message);
app.mount('#app');

