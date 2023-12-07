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
  <div class=" w-full h-full flex">
    <MicroMessageApp
      :src="appConfig.url"
      :microAppCode="appConfig.microAppCode"
      class="container-item"
    >
    </MicroMessageApp>
    <MicroMessageApp
      :src="appConfig2.url"
      :microAppCode="appConfig2.microAppCode"
      class="container-item"
    >
    </MicroMessageApp>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import HelloWorld from './components/HelloWorld.vue'
import { connector, components } from "@gislife/micro-message";
const { MicroMessageApp } = components;


export default {
  name: 'App',
  components: {
    HelloWorld,
    MicroMessageApp
  },
  data() {
    const IP = 'http://localhost';
    return {
      appConfig: {
        url: IP + ':8001',
        microAppCode: 'grand1-1'
      },
      appConfig2: {
        url: IP + ':8003',
        microAppCode: 'grand1-2'
      },
      state: {},
      global: ''
    }
  },
  mounted() {
    // @ts-expect-error
    console.log('window query all mounted', window.__WUJIE_RAW_WINDOW__.document.querySelectorAll('iframe'));
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
