<template>
<div id="app">
  <HelloWorld msg="This is grand2-1" />
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <div>
    <template v-for="btn of btns">
      <button @click="btn.onclick">{{ btn.label }}</button>
    </template>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import { connector } from '@gislife/micro-message';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  setup(props) {
    return {
      msg: '',
      global: '',
      btns: [
        { label: 'send2Grand2_2', onclick: send2Grand2_2 },
      ],
    };
    function send2Grand2_2() {
      connector.$send({
        target: 'grand2-2',
        type: 'hello',
        data: 'world',
      });
    }
  },
  // grand2
  mounted() {
    connector.$on('hello', ({ data, msg, responser }) => {
      console.log('msg', msg);
      alert(`hello ${ data }`);
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
