<template>
<div id="app">
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  />

  <div>global:{{ global }}</div>
  <button @click="send">全局发送</button>
  <button @click="emit">emit</button>
  <button @click="emit2">emit to child2</button>
  <button @click="emitPop">emit pop</button>

  <HelloWorld msg="This is grand1-1" />
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import { connector } from '@gislife/micro-message';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      reactiveData: {
        number: 100000
      },
      global: ''
    }
  },
  mounted() {
    connector.$on('test', ({ data }) => {
      console.log('data', data);
      alert('there is grand1, ' + data);
    })
  },
  methods: {
    send() {
      connector.$send({
        target: 'global',
        type: 'message',
        data: Math.floor(Math.random() * 100000)
      })
    },
    emit() {
      connector.$emit('edit', 'hello i am grand1')
    },
    emit2() {
      connector.$emit('edit:child2', 'hello i am grand1')
    },
    emitPop() {
      connector.$emit('edit:main', 'hello i am grand1')
    },

  }
}
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
