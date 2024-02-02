<template>
  <div class="container">
    <div class="card mt-5 shadow-lg">
      <div class="card-header d-flex flex-row justify-content-center">
        <font-awesome-icon icon="bell-concierge" class="fa-3x me-2" style="color: #2aad29;"></font-awesome-icon>
        <h1 class="ms-2">H.O.S.T</h1>
      </div>
      <form class="m-5" @submit.prevent="handleSubmit" novalidate>
        <div v-if="errorMessage" class="alert alert-danger"> {{ errorMessage }}</div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input v-model="form.email"
            :class="['form-control', { 'is-invalid': submitted && !form.email }]"
            type="email"
            id="email"
            placeholder="example@email.com"
          required>
          <div v-if="submitted && !form.email" class="invalid-feedback">
            Email is required.
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="form.password"
            :class="['form-control', { 'is-invalid': submitted && !form.password }]"
            type="password"
            id="password"
            aria-describedby="passwordHelp"
            placeholder="Password"
          required>
          <div v-if="submitted && !form.password" class="invalid-feedback">
            Password is required.
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { setUser } from "@/store/userState";

export default {
  name: "LogInPage",
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      submitted: false,
      errorMessage: '',
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;
      if(this.form.email && this.form.password) {
        try {
          const response = await this.$http.post(process.env.VUE_APP_BASE_URL + '/user/login', this.form);
          const username = response.data.user.first_name + " " + response.data.user.last_name;

          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("username", username);
          setUser(username);

          this.$root.initializeTokenInterval();
          this.$router.push('/dashboard');
        } catch (err) {
          this.errorMessage = err.response && err.response.data.message ? err.response.data.message
          : "An error occurred. Please try again.";

          this.form.email = '';
          this.form.password = '';
        }
      }
    },
  }
}
</script>

<style>
.invalid-feedback {
  display: block;
}
</style>
