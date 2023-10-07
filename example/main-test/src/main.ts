import { createApp } from 'vue';
import Message from '@gislife/micro-message';
import Antd from 'ant-design-vue';
import router from '@/router/index';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(router);
app.use(Message);
app.use(Antd);
app.mount('#app');
