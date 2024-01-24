<template>
  <div class="container">
    <div class="card mt-5 shadow-lg">
      <div class="card-header d-flex flex-row justify-content-center">
        <font-awesome-icon icon="bell-concierge" class="fa-3x me-2" style="color: #2aad29;"/>
        <h1 class="ms-2">H.O.S.T.</h1>
      </div>
      <form class="m-5" @submit.prevent="handleSubmit" novalidate>
        <div class="mb-3" :class="{ 'has-validation': submitted && !form.email }">
          <label for="email" class="form-label">Email address</label>
          <input v-model="form.email" type="email" class="form-control" id="email" placeholder="example@email.com" required>
          <div v-if="submitted && !form.email" class="invalid-feedback">
            Email is required.
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col me-5" :class="{ 'has-validation': submitted && !form.first_name }">
            <label for="first_name" class="form-label">First name</label>
            <input v-model="form.first_name" type="text" class="form-control" id="first_name" placeholder="First name" required>
            <div v-if="submitted && !form.first_name" class="invalid-feedback">
              First name is required.
            </div>
          </div>
          <div class="col" :class="{ 'has-validation': submitted && !form.last_name }">
            <label for="last_name" class="form-label">Last name</label>
            <input v-model="form.last_name" type="text" class="form-control" id="last_name" required>
            <div v-if="submitted && !form.last_name" class="invalid-feedback">
              Last name is required.
            </div>
          </div>
        </div>
        <div class="mb-3" :class="{ 'has-validation': submitted && !form.password }">
          <label for="password" class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control" id="password" aria-describedby="passwordHelp" placeholder="Password" required>
          <div id="passwordHelp" class="form-text"> We'll never share your password with anyone else.</div>
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
  name: 'RegisterPage',
  data() {
    return {
      form: {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
      },
      submitted: false,
    }
  },
  methods: {
    async handleSubmit () {
      this.submitted = true;
      if(this.form.email && this.form.first_name && this.form.last_name && this.form.password) {
        try {
          console.log(process.env.VUE_APP_BASE_URL);
          const response = await this.$http.post('/api/user/register', this.form);
          const username = response.data.user.first_name + " " + response.data.user.last_name;

          setUser(username);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("username", username);

          this.$root.initializeTokenInterval();
          this.$router.push('/dashboard');
        } catch (err) {
          console.error(err.response ? err.response.data : err.message);
        }
      }
    }
  }
}
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
