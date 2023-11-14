<template>
<div id="app">
  <HelloWorld msg="This is main " />
  <a-space>
    <a-button @click="() => sendToByWujie('child1')">发送child1--Wujie</a-button>
    <a-button @click="() => sendToByWujie('grand1')">发送grand1--Wujie</a-button>
    <a-button @click="() => sendTo('child1')">发送child1</a-button>
    <a-button @click="() => sendTo('grand1')">grand1</a-button>
    <a-button @click="globalSend">全局发送</a-button>
  </a-space>
  <div class="container">
    <WujieVue
      :url="child1Config.url"
      class="container-item"
      :name="child1Config.microAppCode"
      :sync="true"
    >
    </WujieVue>
    <MicroMessageApp
      :src="child2Config.url"
      class="container-item"
      :microAppCode="child2Config.microAppCode"
    >
    </MicroMessageApp>
  </div>
</div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { connector, use, plugins, components } from "@gislife/micro-message";
const { MicroMessageApp } = components
const { createWujieVue3Plugin } = plugins;
import WUjieVue3 from "wujie-vue3";
import { onBeforeUnmount } from 'vue';

use(createWujieVue3Plugin({
  wujieName: "child1",
}));
export default {
  name: "App",
  components: {
    HelloWorld,
    MicroMessageApp
  },
  data() {
    const IP = "http://localhost";

    return {
      child1Config: {
        url: `${ IP }:7001/?microAppCode=child1`,
        microAppCode: "child1",
      },
      child2Config: {
        url: `${ IP }:7002/?microAppCode=child2`,
        microAppCode: "child2",
      },
      show: true,
      global: "",
    };
  },
  setup() {
    onBeforeUnmount(connector.$on('testGet', ({ responser }) => {
      responser('----------------')
    }))
    onBeforeUnmount(connector.$on('getToken', ({ responser, msg }) => {
      console.log('onGetToken', msg);
      responser("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpcCI6IjE5Mi4xNjguMS4yMzYiLCJleHAiOjE3MDAwNDA5ODcsInVzZXJJZCI6NTU1NSwidXNlcm5hbWUiOiJhZG1pbjUifQ.GqfOh_bn41zqMPJLmeZWVJjKIuzYk0sVaPbp2ldkkd4")
    }))
    onBeforeUnmount(connector.$on('config', ({ responser, msg }) => {
      console.log('on config', msg);
      responser({appCode:"GHGQSB"})
    }))
  },
  methods: {
    sendTo(target) {
      connector.$send({
        target,
        type: "test",
        data: "i am main",
      });
    },
    sendToByWujie(target) {
      WUjieVue3.bus.$emit(target, {
        type: 'test',
        data: "i am main",
      });
    },
    globalSend() {
      connector.$send({
        target: "global",
        type: "message",
        data: Math.floor(Math.random() * 100000),
      });
    },
    excludeFunc(obj, judgeCb) {
      const res = {};
      Object.entries(obj).forEach(([key, value]) => {
        if (judgeCb?.(value, key)) {
          res[key] = value;
        }
      });
      return res;
    },
  },
};
</script>

<style>
.container {
  display: flex;
  height: 100%;
}

.container-item {
  flex-grow: 1;
  display: block;
  border: none;
}

html,
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
  height: 100%;
}
</style>
