<template>
<div id="app">
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >

  <div>global:{{global}}</div>
  <button @click="sendGlobal">全局发送</button>
  <button @click="emitTest">emit</button>
  <div>state:{{state}}</div>
  <HelloWorld msg="This is child1" />
  <micro-app
    :src="appConfig.url"
    frameborder="0"
    class="container-item"
    :microAppCode="appConfig.microAppCode"
    @edit="onEdit"
  >
  </micro-app>
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
          url: IP + ':7003',
          microAppCode: 'grand1'
        },
        state: {},
        global: ''
      }
    },
    mounted() {
      this.$connector.onState(res => {
        console.warn('onState----------------', res);
        this.state = res;
      })
      this.$connector.$on(({ data }) => {
        if (data.type === 'message') {
          this.global = data.data
          console.warn('callback global send success-----------------', data, this.$connector.getMicroAppCode());
        }
      })
    },
    methods: {
      sendGlobal() {
        this.$connector.$send({
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
