import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import WujieVue from 'wujie-vue3';
import App from './App.vue';
import '@gislife/micro-message';

const app = createApp(App);
app
  .use(WujieVue)
  .use(Antd)
  .mount('#app');
