<template>
  <div class="container">
    <div class="card mt-5 shadow-lg">
      <div class="card-header d-flex flex-row justify-content-center">
        <font-awesome-icon icon="bell-concierge" class="fa-3x me-2" style="color: #2aad29;"></font-awesome-icon>
        <h1 class="ms-2">Create New Ticket</h1>
      </div>
      <form class="m-5" @submit.prevent="handleSubmit" novalidate>
        <div class="d-flex justify-content-between mb-3">
          <router-link type="button" class="btn btn-secondary" to="/dashboard">
            <font-awesome-icon icon="fa-table-columns" class="me-2"/>
            Dashboard
          </router-link>
        </div>
        <div class="mb-3">
          <div :class="['form-control', { 'is-invalid': submitted && !form.priority}]">
            <span class="form-check-inline">Priority</span>
            <div class="form-check form-check-inline" v-for="i in 5" :key="i">
              <input class="form-check-input" type="radio"
              :id="`inlineRadio${i}`"
              v-model="form.priority"
              :value="i"
              :name="`inlineRadioOptions`">
              <label class="form-check-label" :for="`inlineRadio${i}`">{{ i }}</label>
            </div>
          </div>
          <div v-if="submitted && !form.priority" class="invalid-feedback">
            Priority is required.
          </div>
        </div>
        <div class="input-group mb-3" >
          <label class="input-group-text" for="inputGroupSelect01">Ticket Request Type</label>
          <select v-model="form.ticket_request_type"
            :class="['form-control', { 'is-invalid': submitted && !form.ticket_request_type}]"
            id="inputGroupSelect01"
          required>
            <option value="House Keeping">House Keeping</option>
            <option value="Dinning Service">Dinning Service</option>
            <option value="Facilities">Facilities</option>
            <option value="Vendor">Vendor</option>
          </select>
          <div v-if="submitted && !form.ticket_request_type" class="invalid-feedback">
            Ticket request type is required.
          </div>
        </div>
        <div class="input-group mb-3">
          <span for="guest_first_name" class="input-group-text">Guest First Name</span>
          <input v-model="form.guest_first_name"
            :class="['form-control', { 'is-invalid': submitted && !form.guest_first_name }]"
            type="text"
            id="guest_first_name"
            placeholder="Ex: John"
          required>
          <div v-if="submitted && !form.guest_first_name" class="invalid-feedback">
            Guest first name is required.
          </div>
        </div>
        <div class="input-group mb-3">
          <span for="guest_last_name" class="input-group-text">Guest Last Name</span>
          <input v-model="form.guest_last_name"
            type="text"
            :class="['form-control', { 'is-invalid': submitted && !form.guest_last_name }]"
            id="guest_last_name"
            placeholder="Ex: Smith"
          required>
          <div v-if="submitted && !form.guest_last_name" class="invalid-feedback">
            Guest last name is required.
          </div>
        </div>
        <div class="input-group mb-3">
          <span for="room_number" class="input-group-text">Room Number</span>
          <input v-model="form.room_number"
            type="number"
            :class="['form-control', { 'is-invalid': submitted && !form.room_number }]"
            id="room_number"
            placeholder="Ex: 19301"
          required>
          <div v-if="submitted && !form.room_number" class="invalid-feedback">
            Room number is required.
          </div>
        </div>
        <div class="mb-3">
          <span for="description" class="form-label">Description</span>
          <textarea v-model="form.description"
            :class="['form-control', { 'is-invalid': submitted && !form.description }]"
            id="description"
            placeholder="Ex: Issue Explanation"
          required> </textarea>
          <div v-if="submitted && !form.description" class="invalid-feedback">
            Issue description is required.
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateTicketPage",
  data() {
    return {
      form: {
        priority: '',
        guest_first_name: '',
        guest_last_name: '',
        room_number: '',
        check_in_date: new Date(),
        ticket_request_type: '',
        description: '',
        status: 'open',
      },
      submitted: false,
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;

      if (this.isFormValid()) {
        try {
          await this.$http.post(process.env.VUE_APP_BASE_URL + '/tickets', this.form, {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
          });

          this.$router.push('/dashboard');
        } catch (error) {
          this.handleError(error);
        }
      }
    },
    handleError(error) {
      if(error.response && error.response.status === 401) {
        this.redirectBasedOnToken();
      }
    },
    isFormValid() {
      return this.form.priority &&
        this.form.guest_first_name &&
        this.form.guest_last_name &&
        this.form.room_number &&
        this.form.check_in_date &&
        this.form.ticket_request_type &&
        this.form.description &&
        this.form.status
    },
    redirectBasedOnToken() {
      const token = sessionStorage.getItem("token") || null;

      if(token) {
        this.$router.push('/dashboard');
      }
      else {
        this.$router.push('/');
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