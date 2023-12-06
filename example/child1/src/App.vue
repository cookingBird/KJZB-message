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
  <MicroMessageApp
    :src="appConfig.url"
    :microAppCode="appConfig.microAppCode"
    class="container-item"
  >
  </MicroMessageApp>
</div>
</template>

<script>
/* eslint-disable */
import HelloWorld from './components/HelloWorld.vue'
import { connector, components } from "@gislife/micro-message";
const { MicroMessageApp } = components;


function querySelectBodyIframe(body) {
  return Array.from(body.querySelectorAll('iframe'))
}

function querySelectAllIframeIncludeShadow(el = document.body, result = []) {
  let _result = result.concat(querySelectBodyIframe(el));
  if (window.customElements?.get("wujie-app")) {

    _result = Array.from(el.querySelectorAll('wujie-app'))
      .reduce((pre, wujieApp) => {
        // @ts-expect-error
        return pre.concat(querySelectAllIframeIncludeShadow(wujieApp.shadowRoot.body))
      }, _result)
  }
  return _result;
}


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
        url: IP + ':7003',
        microAppCode: 'grand1'
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
