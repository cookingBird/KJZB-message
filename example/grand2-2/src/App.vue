<template>
<div id="app">
  <HelloWorld msg="This is grand2-2" />
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <div>
  </div>
</div>
</template>

<script>
/* eslint-disabled */
import { connector } from '@gislife/micro-message';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    return {
      msg: '',
      global: '',
    };
  },
  // grand2
  created() {
    connector.$on('greet', (res) => {
      const { msg, responser } = res;
      responser('hello, i am grand2-2');
    });
    connector.$on('hello', (res) => {
      const { data, msg } = res;
      alert(`from ${ msg.sourceCode }, ${ msg.type } ${ data }`);
    });
  },
};
</script>

<style>
body {
  height: 100vh;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
