<template>
  <div class="container">
    <div class="card mt-5 shadow-lg">
      <div class="card-header d-flex flex-row justify-content-center">
        <font-awesome-icon icon="fa-ticket" class="fa-3x me-2" style="color: #2aad29;"></font-awesome-icon>
        <h1 class="ms-2">Ticket ID: {{ this.ticketId }}</h1>
      </div>
      <form class="m-5" @submit.prevent="handleSubmit" novalidate>
        <div class="d-flex justify-content-between mb-3">
          <router-link type="button" class="btn btn-secondary" to="/dashboard">
            <font-awesome-icon icon="fa-table-columns" class="me-2"/>
            Dashboard
          </router-link>
          <div>
            <button type="submit" v-if="!this.isEditMode" class="btn btn-success me-2">
              <font-awesome-icon icon="fa-check" style="color: white;"/>
              Save
            </button>
            <button type="button" @click="editMode" class="btn btn-primary" v-if="this.isEditMode">
              <font-awesome-icon icon="fa-pencil" style="color: white;"/>
              Edit
            </button>
            <button type="button" @click="editMode" class="btn btn-info" v-else>
              <font-awesome-icon icon="fa-x" style="color: black;"/>
              Cancel
            </button>
          </div>
        </div>
        <div class="mb-3">
          <div :class="['form-control', { 'is-invalid': submitted && !this.ticketDetails.priority}]">
            <span class="form-check-inline">Priority</span>
            <div class="form-check form-check-inline" v-for="i in 5" :key="i">
              <input class="form-check-input" type="radio"
              :id="`inlineRadio${i}`"
              v-model="this.ticketDetails.priority"
              :value="i"
              :disabled="isEditMode"
              :name="`inlineRadioOptions`"
            >
              <label class="form-check-label" :for="`inlineRadio${i}`">{{ i }}</label>
            </div>
          </div>
          <div v-if="submitted && !this.ticketDetails.priority" class="invalid-feedback">
            Priority is required.
          </div>
        </div>
        <div class="input-group mb-3" >
          <label class="input-group-text" for="inputGroupSelect01">Ticket Request Type</label>
          <select v-model="this.ticketDetails.ticket_request_type"
            :class="['form-control', { 'is-invalid': submitted && !this.ticketDetails.ticket_request_type}]"
            id="inputGroupSelect01"
            :disabled="isEditMode"
            required
          >
            <option value="house_keeping">House Keeping</option>
            <option value="dinning_service">Dinning Service</option>
            <option value="facilities">Facilities</option>
            <option value="vendor">Vendor</option>
          </select>
          <div v-if="submitted && !this.ticketDetails.ticket_request_type" class="invalid-feedback">
            Ticket request type is required.
          </div>
        </div>
        <div class="input-group mb-3">
          <span for="guest_first_name" class="input-group-text">Guest First Name</span>
          <input v-model="this.ticketDetails.guest_first_name"
            :class="['form-control', { 'is-invalid': submitted && !this.ticketDetails.guest_first_name }]"
            type="text"
            id="guest_first_name"
            placeholder="Ex: John"
            :disabled="isEditMode"
            required
          >
          <div v-if="submitted && !this.ticketDetails.guest_first_name" class="invalid-feedback">
            Guest first name is required.
          </div>
        </div>
        <div class="input-group mb-3">
          <span for="guest_last_name" class="input-group-text">Guest Last Name</span>
          <input v-model="this.ticketDetails.guest_last_name"
            type="text"
            :class="['form-control', { 'is-invalid': submitted && !this.ticketDetails.guest_last_name }]"
            id="guest_last_name"
            placeholder="Ex: Smith"
            :disabled="isEditMode"
            required
          >
          <div v-if="submitted && !this.ticketDetails.guest_last_name" class="invalid-feedback">
            Guest last name is required.
          </div>
        </div>
        <div class="input-group mb-3">
          <span for="room_number" class="input-group-text">Room Number</span>
          <input v-model="this.ticketDetails.room_number"
            type="number"
            :class="['form-control', { 'is-invalid': submitted && !this.ticketDetails.room_number }]"
            id="room_number"
            placeholder="Ex: 19301"
            disabled
            required
          >
          <div v-if="submitted && !this.ticketDetails.room_number" class="invalid-feedback">
            Room number is required.
          </div>
        </div>
        <div class="mb-3">
          <span for="description" class="form-label">Description</span>
          <textarea v-model="this.ticketDetails.description"
            :class="['form-control', { 'is-invalid': submitted && !this.ticketDetails.description }]"
            id="description"
            placeholder="Ex: Issue Explanation"
            :disabled="this.isEditMode"
            required
          ></textarea>
          <div v-if="submitted && !this.ticketDetails.description" class="invalid-feedback">
            Issue description is required.
          </div>
        </div>
        <div class="mb-3">
          <span>Created at: {{ sanitizeDate(this.ticketDetails.createdAt) || '' }}</span>
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-danger">
            <font-awesome-icon icon="fa-trash-can" style="color: white;"/>
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketDetailsPage",
  beforeMount() {
    this.loadTicketDetails(this.ticketId);
  },
  data() {
    return {
      ticketId: this.$route.params.ticketId,
      ticketDetails: {},
      submitted: false,
      isEditMode: true,
    }
  },
  methods: {
    loadTicketDetails(ticketId) {
      const token = sessionStorage.getItem("token");

      this.$http.get('/api/tickets/'+ ticketId, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => {
        this.ticketDetails = response.data;
      }).catch(err => {
        console.error(err.message);
      });
    },
    sanitizeDate(date) {
      return new Date(date).toLocaleDateString();
    },
    editMode() {
      this.isEditMode = !this.isEditMode;
    },
    async handleSubmit() {
      this.submitted = true;

      if (this.isFormValid()) {
        try {
          await this.$http.post('/api/tickets', this.form, {
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
  },
}
</script>

<style>
</style>