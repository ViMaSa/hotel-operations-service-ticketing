<template>
  <nav class="navbar navbar-expand-lg shadow bg-white">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <font-awesome-icon icon="bell-concierge" style="color: #2aad29;"/>
        H.O.S.T.
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup" ref="navbarCollapse">
        <div class="navbar-nav ms-auto">
          <router-link class="nav-link" aria-current="page" to="/register" @click="closeNavbar">Register</router-link>
          <router-link class="nav-link" to="/login" @click="closeNavbar">Log In</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    closeNavbar() {
      if(this.$refs.navbarCollapse.classList.contains('show')) {
        this.$refs.navbarCollapse.classList.remove('show');
      }
    }
  },
}
</script>

<style scoped>
</style>
