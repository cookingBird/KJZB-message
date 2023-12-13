<template>
<div id="app">
  <HelloWorld msg="This is grand1-1" />
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  />
  <div>
    <template v-for="btn of btns">
      <button @click="btn.onClick">{{ btn.label }}</button>
    </template>
  </div>
</div>
</template>

<script>
import { connector } from '@gislife/micro-message';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    return {
    };
  },
  computed: {
    btns() {
      return [
        { label: '发送grand1-2', onClick: this.sendSibling },
        { label: '发送grand2-1', onClick: this.sendGrand2_1 },
      ];
    },
  },
  methods: {
    sendSibling() {
      connector.$send({
        target: 'grand1-2',
        type: 'hello',
        data: ' world!',
      });
    },
    sendGrand2_1() {
      connector.$send({
        target: 'grand2-1',
        type: 'hello',
        data: ' world!',
      });
    },
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
