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
  data() {
    return {
      reactiveData: {
        number: 100000,
      },
      global: '',
    };
  },
  computed: {
    btns() {
      return [
        { label: '发送grand2-1', onClick: this.sendSibling },
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
    emit() {
      connector.$emit('edit', 'hello i am grand1');
    },
    emit2() {
      connector.$emit('edit:child2', 'hello i am grand1');
    },
    emitPop() {
      connector.$emit('edit:main', 'hello i am grand1');
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
