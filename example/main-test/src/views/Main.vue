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
      <WujieVue
        :url="child2Config.url"
        class="container-item"
        :name="child2Config.microAppCode"
        :sync="true"
      >
      </WujieVue>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { connector, use } from "@gislife/micro-message";
import createWujieVue3Plugin from "@gislife/micro-message/plugins/wujieVue3.js";
import WUjieVue3 from "wujie-vue3";

use(
  createWujieVue3Plugin({
    wujieName: "child1",
  })
);
use(
  createWujieVue3Plugin({
    wujieName: "grand1",
  })
);
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    const IP = "http://localhost";

    return {
      child1Config: {
        url: `${IP}:7001/?microAppCode=child1`,
        microAppCode: "child1",
      },
      child2Config: {
        url: `${IP}:7002/?microAppCode=child2`,
        microAppCode: "child2",
      },
      show: true,
      global: "",
    };
  },
  mounted() {},
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
        type:'test',
        data: "i am main",
      });
    },
    globalSend() {
      this.$connector.$send({
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
