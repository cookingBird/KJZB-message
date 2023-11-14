<template>
<div id="app">
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  />

  <div>global:{{ global }}</div>
  <button @click="sendGlobal">全局发送</button>
  <button @click="emitTest">emit</button>
  <div>state:{{ state }}</div>
  <HelloWorld msg="This is child1" />
  <WujieVue
    :url="appConfig.url"
    class="container-item"
    :name="appConfig.microAppCode"
    :sync="true"
  >
  </WujieVue>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { connector } from '@gislife/micro-message';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    const IP = 'http://localhost';
    return {
      appConfig: {
        url: IP + ':7003/?microAppCode=grand1',
        microAppCode: 'grand1'
      },
      state: {},
      global: ''
    }
  },
  mounted() {
    connector.$on('test', ({ data }) => {
      console.log('data', data);
      alert('there is child1, ' + data);
    })
  },
  methods: {
    sendGlobal() {
      connector.$send({
        target: 'global',
        type: 'message',
        data: Math.floor(Math.random() * 100000)
      })
    },
    onEdit(data) {
      console.warn('this is child1, i received--------------', data)
    },
    emitTest() {
      connector.$emit("test:parent", "emit test!")
    }
  }
}
</script>

<style>
html,
body {
  height: 100vh;
  margin: 0;
}

iframe {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
