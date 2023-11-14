import { createApp } from 'vue'
import App from './App.vue'
import Message from '@gislife/micro-message'

const app = createApp(App);
app.config.productionTip = false;

app.use(Message).mount('#app');

