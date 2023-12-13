import { createApp } from 'vue';
import App from './App.vue';

window.parent.postMessage('message from grand 1-1', '*')

const app = createApp(App);
app.mount('#app');
