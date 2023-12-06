import { createApp } from 'vue'
import App from './App.vue'
import WujieVue from 'wujie-vue3';


// @ts-expect-error
console.log('window query all main setup', window.__WUJIE_RAW_WINDOW__ === window.__WUJIE_RAW_WINDOW__.parent);

const app = createApp(App);


app
	.use(WujieVue)
app.mount('#app');
