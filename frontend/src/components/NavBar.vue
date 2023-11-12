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
          <ul class="nav nav-pills flex-sm-row flex-column text-center">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" active-class="active" to="/register" @click="closeNavbar">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/login" @click="closeNavbar">Log In</router-link>
            </li>
          </ul>
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
.nav-link {
  color: black;
}

.nav-item > .nav-link.active {
  background-color: #FFFF;
  border: 2px solid #2aad29;
  margin: -2px;
  text-decoration: #0000;
}
.nav-link:hover {
  background-color: #2aad29;
  border: 2px solid #2aad29;
  margin: -2px;
  color: #FFFF;
}
</style>
