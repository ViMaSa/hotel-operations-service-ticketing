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
import { jwtDecode } from "jwt-decode";

export default {
  name: "App",
  created() {
    this.checkTokenExpiry();
    this.tokenCheckInterval = setInterval(this.checkTokenExpiry, 5 * 60 * 1000);
  },
  components: {
    NavBar
  },
  methods: {
    checkTokenExpiry() {
      const token = sessionStorage.getItem("token");
      if(!token) {
        this.handleExpiredToen();
        return;
      }

      const tokenExpires = this.decodeTokenExpiry(token);
      const now = Date.now();
      console.log(tokenExpires);
      console.log(now);
      // finish global check && then before route navigation check
    },
    decodeTokenExpiry(token) {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000;
    },
  },
  beforeUnmount() {
    clearInterval(this.tokenCheckInterval);
  }
}
</script>

<style>
</style>
