<template>
  <div id="app">
    <ReportDesigner />
  </div>
</template>

<script>
import ReportDesigner from './components/report_designer/index.vue'

export default {
  name: 'App',
  components: {
    ReportDesigner
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
}
</style>
