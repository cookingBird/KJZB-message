<template>
<router-view />
</template>

<script>


  export default {
    name: 'App',
    data() {
      const IP = 'http://localhost';

      return {
        child1Config: {
          url: IP + ':7000/?microAppCode=child1',
          microAppCode: 'child1',
          state: {
            name: 'state',
            route: this.$route
          }
        },
        child2Config: {
          url: IP + ':7001/?microAppCode=child2',
          microAppCode: 'child2'
        },
        show: true
      }
    },
    mounted() {
    },
    methods: {
      changeState() {
        this.child1Config.state = { ...this.child1Config.state, value: Math.floor(Math.random() * 1021000) }
      },
      globalSend() {
        this.$connector.$send({
          target: 'global',
          type: 'message',
          data: Math.floor(Math.random() * 100000)
        })
      },

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
