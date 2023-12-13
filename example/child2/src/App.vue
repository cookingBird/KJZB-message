<template>
<div id="child2">
  <div class="flex-grow-0">
    <HelloWorld msg="This is child2" />
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    />
    <div>
      <!-- <button @click="globalSend">全局发送</button> -->
    </div>
  </div>
  <div class="flex flex-grow">
    <MicroMessageApp
      :src="appConfig.url"
      class="item"
      :microAppCode="appConfig.microAppCode"
    >
    </MicroMessageApp>
    <MicroMessageApp
      :src="appConfig2.url"
      class="item"
      :microAppCode="appConfig2.microAppCode"
    >
    </MicroMessageApp>
  </div>
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
  setup(props) {
    const IP = 'http://localhost';
    return {
      appConfig: {
        url: IP + ':8005',
        microAppCode: 'grand2-1'
      },
      appConfig2: {
        url: IP + ':8007',
        microAppCode: 'grand2-2'
      },
      global: ''
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
}

.flex-grow-0 {
  flex-grow: 0;
}

.flex-grow {
  flex-grow: 1;
}

.flex {
  display: flex;
}

#child2 {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
