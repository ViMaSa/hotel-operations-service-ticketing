<template>
  <div id="app">
    <header>
      <NavBar></NavBar>
    </header>
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: "App",
  components: {
    NavBar
  }
}
</script>

<style>
</style>
