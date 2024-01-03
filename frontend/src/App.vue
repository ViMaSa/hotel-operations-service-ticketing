<template>
  <div id="app">
    <header>
      <NavBar></NavBar>
    </header>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { initializeUserState, clearUser } from "@/store/userState";
import { jwtDecode } from "jwt-decode";

export default {
  name: "App",
  data() {
    return {
      tokenCheckInterval: null,
    }
  },
  created() {
    initializeUserState();
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
        this.handleExpiredToken();
        return;
      }

      const tokenExpires = this.decodeTokenExpiry(token);
      const now = Date.now();

      if(tokenExpires < now) {
        this.handleExpiredToken();
      }
    },
    decodeTokenExpiry(token) {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000;
    },
    handleExpiredToken() {
      clearUser();
      clearInterval(this.tokenCheckInterval);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      this.$router.push('/')
    }
  },
  beforeUnmount() {
    clearUser();
    clearInterval(this.tokenCheckInterval);
  }
}
</script>

<style>
</style>
