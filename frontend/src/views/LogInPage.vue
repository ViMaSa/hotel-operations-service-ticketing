<template>
  <div class="container">
    <div class="card mt-5 shadow-lg">
      <div class="card-header d-flex flex-row justify-content-center">
        <font-awesome-icon icon="bell-concierge" class="fa-3x me-2" style="color: #2aad29;"></font-awesome-icon>
        <h1 class="ms-2">H.O.S.T</h1>
      </div>
      <form class="m-5" @submit.prevent="handleSubmit" novalidate>
        <div class="mb-3" :class="{ 'has-validation': submitted && !form.email }">
          <label for="email" class="form-label">Email address</label>
          <input v-model="form.email" type="email" class="form-control" id="email" placeholder="example@email.com" required>
          <div v-if="submitted && !form.email" class="invalid-feedback">
            Email is required.
          </div>
        </div>
        <div class="mb-3" :class="{ 'has-validation': submitted && !form.password}">
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

export default {
  name: "LogInPage",
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      submitted: false,
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;
      if(this.form.email && this.form.password) {
        try {
          const response = await this.$http.post('/api/user/login', this.form);

          console.log(response.data);

          this.$router.push('/dashboard');
        } catch (err) {
          console.error(err.response ? err.response.data : err.message);
        }
      }
    }
  }
}
</script>

<style>
.invalid-feedback {
  display: block;
}
</style>
