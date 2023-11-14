<template>
<div id="app">
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  />

  <div>global:{{ global }}</div>
  <button @click="globalSend">全局发送</button>
  <HelloWorld msg="This is child2" />
  <MicroMessageApp
    :src="appConfig.url"
    class="item"
    :microAppCode="appConfig.microAppCode"
  >
  </MicroMessageApp>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { connector, components } from "@gislife/micro-message";
const { MicroMessageApp } = components

export default {
  name: 'App',
  components: {
    HelloWorld,
    MicroMessageApp
  },
  data() {
    const IP = 'http://192.168.3.5';
    return {
      appConfig: {
        url: IP + ':8081/mission/messageCenter?microAppCode=grand2',
        microAppCode: 'grand2'
      },
      global: ''
    }
  },
  methods: {
    globalSend() {
      connector.$send({
        target: 'global',
        type: 'message',
        data: Math.floor(Math.random() * 100000)
      })
    },
    onEdit(data) {
      console.log('onEdit,this is child2--------------', data)
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

.item {
  width: 100%;
  border: none;
}
</style>
