<template>
<div id="app">
  <HelloWorld
    msg="This is main "
    class="header-content"
  />
  <a-space>
  </a-space>
  <div class="container">
    <WujieVue
      :url="child1Config.url"
      :name="child1Config.microAppCode"
      class="container-item"
    >
    </WujieVue>
    <WujieVue
      :url="child2Config.url"
      :name="child2Config.microAppCode"
      class="container-item"
    >
    </WujieVue>
    <!-- <div class="container-item">
      <MicroMessageApp
        class="container-item"
        :src="child2Config.url"
        :microAppCode="child2Config.microAppCode"
      >
      </MicroMessageApp>
    </div> -->
  </div>
</div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import {
  connector, use, plugins, components,
} from '@gislife/micro-message';
const { MicroMessageApp } = components;
// const { createWujieVue3Plugin } = plugins;
import { onBeforeUnmount } from 'vue';




export default {
  name: 'App',
  components: {
    HelloWorld,
    MicroMessageApp,
  },
  setup(props) {
    const IP = 'http://localhost';

    return {
      child1Config: {
        url: `${ IP }:7001/?microAppCode=child1`,
        // url: `${ IP }:7001/`, // sub can not mount
        microAppCode: 'child1'
      },
      child2Config: {
        url: `${ IP }:7002/`,
        microAppCode: 'child2',
      },
      show: true,
      global: '',
    };
  }

};
</script>

<style>
.container {
  display: flex;
  height: 100%;
}

.header-content {
  border: 1px solid red;
}

.container-item {
  flex-grow: 1;
  display: block;
  border: none;
  width: 100%;
  height: 100%;
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
