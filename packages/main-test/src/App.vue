<template>
<router-view />
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      show: true
    }
  },
  mounted() {
  },
  methods: {
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
