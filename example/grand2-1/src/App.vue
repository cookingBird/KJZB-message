<template>
<div id="app">
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <div>global:{{ global }}</div>
  <button @click="responserTest">Responser Test</button>
  <button @click="globalSend">全局发送</button>
  <button @click="getFromParents">getFromParents</button>
  <div>{{ msg }}</div>
  <HelloWorld msg="This is grand2" />
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { connector } from '@gislife/micro-message'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: '',
      global: ''
    }
  },
  //grand2
  created() {
    connector.$on('callback', (res) => {
      console.warn('success------callback--------', res)
    })
  },
  methods: {
    responserTest() {
      connector.$send({
        target: 'main',
        type: 'responser',
        timeout: 3000
      }).then(res => {
        console.error('test responser success--------------', res)
      })
    },
    globalSend() {
      connector.$send({
        target: 'global',
        type: 'message',
        data: Math.floor(Math.random() * 100000)
      })
    },
    getFromParents() {
      connector.$send({
        target: 'main',
        type: 'testGet'
      }).then((r) => {
        console.log('---------get success', r)
      })
    }
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
