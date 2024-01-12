<template>
  <div id="app">
    <header>
      <NavBar></NavBar>
    </header>
    <div class="modal" id="hello" tabindex="-1">
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
      showModalTimer: null,
      myModal: null,
    }
  },
  mounted() {
    this.initializeModal();
  },
  created() {
    initializeUserState();
    this.checkTokenExpiry();
    this.tokenCheckInterval = setInterval(this.checkTokenExpiry, 30 * 1000)
    setTimeout(() => {
      this.initializeAndShowModal();
    }, 1000)
  },
  components: {
    NavBar,
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
      } else if (tokenExpires - now <= 59.5 * 60 * 1000) {
        this.initializeAndShowModal();
      }
    },
    initializeAndShowModal() {
      if(!this.myModal) {
        const modalElement = document.getElementById('hello');
        if(modalElement) {
          this.myModal = new Modal(modalElement);
          this.showModalAfterDelay();
        }
      } else {
        this.myModal.show()
      }
    },
    showModalAfterDelay() {
      setTimeout(() => {
        if(this.myModal) {
          this.myModal.show();
        }
      }, 300)
    },
    showRefreshTokenModal() {
      if(this.myModal) {
        this.myModal.show()
      } else {
        console.error('Modal element not found')
      }
      this.showModalTimer = setTimeout(() => {
        if(this.refreshTokenModalVisible) {
          this.handleExpiredToken();
        }
      }, 10 * 60 * 1000)
    },
    confirmPresence() {
      this.myModal.hide();
      clearTimeout(this.showModalTimer);
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
      clearUser();
      clearInterval(this.tokenCheckInterval);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      this.$router.push('/')
    }
  },
  beforeUnmount() {
    if(this.myModal) {
      this.myModal.hide();
    }
    clearUser();
    clearInterval(this.tokenCheckInterval);
    clearTimeout(this.showModalTimer);
  },
}
</script>

<style>
</style>
