<template>
  <div id="app">
    <HelloWorld msg="This is main " />
    <button @click="show = !show">关闭</button>
    <div class="container">
      <microApp
        v-if="show"
        :src="child1Config.url"
        frameborder="0"
        class="container-item"
        :microAppCode="child1Config.microAppCode"
        :state="child1Config.state"
      >
      </microApp>
      <microApp
        :src="child2Config.url"
        frameborder="0"
        class="container-item"
        :microAppCode="child2Config.microAppCode"
      >
      </microApp>

    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      child1Config: {
        url: 'http://127.0.0.1:7000/?microAppCode=child1',
        microAppCode: 'child1',
        state: {
          name: 'state'
        }
      },
      child2Config: {
        url: 'http://127.0.0.1:7001/?microAppCode=child2',
        microAppCode: 'child2'
      },
      show: true
    }
  }
}
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
