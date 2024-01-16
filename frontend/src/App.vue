<template>
  <div id="app">
    <header>
      <NavBar></NavBar>
    </header>
    <div class="modal" id="refreshModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Token Resetting</h5>
          </div>
          <div class="modal-body">
            <p>Hello! If you would like to keep extend your visit, please confirm below.</p>
            <p>You will be logged out if no major changes are made to your dashboard/tickets.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="confirmPresence">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { initializeUserState, clearUser } from "@/store/userState";
import { jwtDecode } from "jwt-decode";
import { Modal } from 'bootstrap';

export default {
  name: "App",
  data() {
    return {
      tokenCheckInterval: null,
      myModal: null,
      minimumWarningTime: null,
    }
  },
  mounted() {
    this.initializeModal();
  },
  created() {
    initializeUserState();
    if(sessionStorage.getItem("token")) {
      this.initializeTokenInterval();
    }
  },
  components: {
    NavBar,
  },
  methods: {
    initializeModal() {
      this.minimumWarningTime = (59 * 60 * 1000);

      const modalElement = document.getElementById('refreshModal');
      if(modalElement) {
        this.myModal = new Modal(modalElement, {
          keyboard: false,
          focus: true,
          backdrop: "static"
        });
      }
    },
    initializeTokenInterval() {
      this.tokenCheckInterval = setInterval(this.checkTokenExpiry, 5000);
    },
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
      } else if (tokenExpires - now <= this.minimumWarningTime) {
        this.showModal();
      }
    },
    showModal() {
      if(this.myModal) {
        this.myModal.show();
      }
    },
    hideModal() {
      if(this.myModal) {
        this.myModal.hide();
      }
    },
    confirmPresence() {
      this.hideModal();
      this.refreshToken();
    },
    refreshToken() {
      console.log("Refreshing token");
    },
    decodeTokenExpiry(token) {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000;
    },
    handleExpiredToken() {
      this.hideModal();
      clearUser();
      clearInterval(this.tokenCheckInterval);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      this.$router.push('/')
    }
  },
  beforeUnmount() {
    this.hideModal();
    clearUser();
    clearInterval(this.tokenCheckInterval);
  },
}
</script>

<style>
</style>
