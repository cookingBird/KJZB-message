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
        <button @click="() => btn.onClick(btn)">{{ btn.label(btn) }}</button>
      </template>
    </div>
  </div>
  <div class="flex flex-grow">
    <WujieVue
      v-if="isExist1"
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
    <div
      class="container-item"
      v-if="isExist"
    >
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

<script lang="ts">
/* eslint-disable */
import HelloWorld from './components/HelloWorld.vue'
import { defineComponent, ref, computed } from 'vue'
import { connector, components } from "@gislife/micro-message";
const { MicroMessageApp } = components;


export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    MicroMessageApp
  },
  setup() {
    const IP = 'http://localhost';
    const btns = ref([
      {
        state: 0,
        label: (btn: { state: number }) => ((btn.state === 0 ? '关闭' : '打开') + 'grand1-1'),
        onClick: switchState
      },
      {
        state: 0,
        label: (btn: { state: number }) => ((btn.state === 0 ? '关闭' : '打开') + 'grand1-2'),
        onClick: switchState
      },
    ]);
    const isExist1 = computed(() => btns.value[0].state === 0);
    const isExist2 = computed(() => btns.value[1].state === 0);
    return {
      appConfig: {
        url: IP + ':8001?microAppCode=grand1-1',
        microAppCode: 'grand1-1'
      },
      appConfig2: {
        url: IP + ':8009?microAppCode=grand1-2',
        microAppCode: 'grand1-2'
      },
      btns,
      isExist: isExist2,
      isExist1
    };
    function switchState(btn: { state: number }, step = 2) {
      btn.state = (btn.state + 1) % step;
    }
  }
})
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
