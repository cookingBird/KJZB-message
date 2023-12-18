<template>
<div id="child1">
  <div class="flex-grow-0">
    <HelloWorld msg="This is child1（单独子应用）" />
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
  <div class="flex flex-grow">
    <WujieVue
      :url="appConfig.url"
      :name="appConfig.microAppCode"
      class="container-item"
      :degrade="false"
    >
    </WujieVue>
    <!-- <MicroMessageApp
      :src="appConfig.url"
      :microAppCode="appConfig.microAppCode"
      class="container-item"
    >
    </MicroMessageApp> -->
    <div class="container-item">
      <MicroMessageApp
        :src="appConfig2.url"
        :microAppCode="appConfig2.microAppCode"
      >
      </MicroMessageApp>
    </div>

    <!-- <WujieVue
      :url="appConfig2.url"
      :name="appConfig2.microAppCode"
      class="container-item"
      :degrade="false"
    >
    </WujieVue> -->
  </div>
</div>
</template>

<script>
// @ts-ignore ignore wujie
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
        url: IP + ':8001?microAppCode=grand1-1',
        microAppCode: 'grand1-1'
      },
      appConfig2: {
        url: IP + ':8009?microAppCode=grand1-2',
        microAppCode: 'grand1-2'
      },
      state: {},
      global: ''
    }
  },
  computed: {
    btns() {
      return []
    }
  },
  mounted() {
    // console.log('window query all mounted',
    //   document.querySelectorAll('iframe'),
    // window.__WUJIE_RAW_WINDOW__.document.querySelectorAll('iframe')
    // );
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
  display: flex;
  flex-direction: column;
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

.container-item {
  flex-grow: 1;
}

#child1 {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
