<template>
<div id="app">
  <HelloWorld msg="This is grand1-2" />
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
</template>

<script>
import { connector } from '@gislife/micro-message';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      reactiveData: {
        number: 100000,
      },
      global: '',
    };
  },
  computed: {
    btns() {
      return [
        { label: 'greet grand2-2', onClick: this.greetGrand2_1 }
      ];
    },
  },
  mounted() {
    connector.$on('hello', ({ data }) => {
      alert(`hello ${ data }`);
    });
  },
  methods: {
    greetGrand2_1() {
      connector.$send({
        target: 'grand2-2',
        type: 'greet',
      }).then(data => {
        alert(data)
      })
    },
  },
};
</script>

<style>
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
}
</style>
