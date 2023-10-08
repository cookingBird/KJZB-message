import { createApp } from 'vue'
import App from './App.vue'
import Message from '@gislife/micro-message'
import WujieVue from 'wujie-vue3';

const app = createApp(App);
app.config.productionTip = false;

app
	.use(WujieVue)
	.use(Message);
app.mount('#app');

