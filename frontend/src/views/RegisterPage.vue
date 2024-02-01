<template>
  <div class="container">
    <div class="card mt-5 shadow-lg">
      <div class="card-header d-flex flex-row justify-content-center">
        <font-awesome-icon icon="bell-concierge" class="fa-3x me-2" style="color: #2aad29;"/>
        <h1 class="ms-2">H.O.S.T.</h1>
      </div>
      <form class="m-5" @submit.prevent="handleSubmit" novalidate>
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
        <div class="mb-3 row">
          <div class="col me-5">
            <label for="first_name" class="form-label">First name</label>
            <input v-model="form.first_name"
              :class="['form-control', { 'is-invalid': submitted && !form.first_name }]"
              type="text"
              id="first_name"
              placeholder="First name"
            required>
            <div v-if="submitted && !form.first_name" class="invalid-feedback">
              First name is required.
            </div>
          </div>
          <div class="col">
            <label for="last_name" class="form-label">Last name</label>
            <input v-model="form.last_name"
              :class="['form-control', { 'is-invalid': submitted && !form.last_name }]"
              type="text"
              id="last_name"
              placeholder="Last name"
            required>
            <div v-if="submitted && !form.last_name" class="invalid-feedback">
              Last name is required.
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="form.password"
            :class="['form-control', { 'is-invalid': submitted && !form.password || !passwordValidation.valid }]"
            type="password"
            id="password"
            aria-describedby="passwordHelp"
            placeholder="Password"
            @input="validatePassword"
          required>
          <div v-if="!passwordValidation.valid" class="invalid-feedback">
            <ul>
              <li v-for="error in passwordValidation.errors" :key="error">{{ error }}</li>
            </ul>
          </div>
          <div v-if="submitted && !form.password" class="invalid-feedback">
            Password is required.
          </div>
          <div id="passwordHelp" class="form-text"> We'll never share your password with anyone else.</div>
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
      passwordRules: [
        { message:"8 characters minimum.", regex:/.{8,}/ },
        { message:"One number required.", regex:/[0-9]+/ },
        { message:'One lowercase letter required.', regex:/[a-z]+/ },
        { message:"One uppercase letter required.",  regex:/[A-Z]+/ },
        { message:"One special character required.", regex:/[@$!%*?&]+/ }
      ],
      passwordValidation: {
        valid: true,
        errors: [],
      },
    }
  },
  methods: {
    async handleSubmit () {
      this.submitted = true;
      this.validatePassword();

      if(this.form.email && this.form.first_name && this.form.last_name && this.form.password) {
        try {
          const response = await this.$http.post(process.env.VUE_APP_BASE_URL + '/user/register', this.form);
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
    },
    isFormValid() {
      return this.form.email &&
        this.form.first_name &&
        this.form.last_name &&
        this.form.password &&
        this.passwordValidation.valid;
    },
    validatePassword() {
      let errors = [];

      for (let condition of this.passwordRules) {
        if (!condition.regex.test(this.form.password)) {
          errors.push(condition.message);
        }
      }

      this.passwordValidation.valid = errors.length === 0;
      this.passwordValidation.errors = errors;
    }
  }
}
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
