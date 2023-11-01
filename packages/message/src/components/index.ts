import { type App } from 'vue';
import MicroMessageApp from './MicroAppVue.vue';

export {
  MicroMessageApp
}


export const vuePlugin = {
  install(app: App) {
    // 注册全局组件
    app.component(MicroMessageApp.name, MicroMessageApp);
  }
}
