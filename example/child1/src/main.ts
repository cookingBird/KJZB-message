import { createApp } from 'vue'
import App from './App.vue'
import WujieVue from 'wujie-vue3';

const app = createApp(App);
app
  .use(WujieVue)
app.mount('#app');

console.log('%c child1 window --------------', 'color:blue');
console.log(window);
// @ts-expect-error
window.addEventListener('message', (ev) => {
  console.log('child1 message', ev.data);
})
window.parent.postMessage('message from child 1', '*')



