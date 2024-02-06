<template>
  <div class="container">
    <div class="card mt-5 shadow-lg">
      <div class="card-header d-flex flex-row justify-content-center">
        <font-awesome-icon icon="fa-ticket" class="fa-3x me-2" style="color: #2aad29;"></font-awesome-icon>
        <h1 class="ms-2">Ticket ID: {{ ticketId }}</h1>
      </div>
      <form class="m-5" @submit.prevent="handleSubmit" novalidate>
        <div class="d-flex justify-content-between mb-3">
          <router-link type="button" class="btn btn-secondary" to="/dashboard">
            <font-awesome-icon icon="fa-table-columns" class="me-2"/>
            Dashboard
          </router-link>
          <button type="button" @click="editMode" class="btn btn-primary" v-if="isEditMode">
            <font-awesome-icon icon="fa-pencil" style="color: white;"/>
            Edit
          </button>
          <div v-else class="d-flex flex-wrap justify-content-start ps-2">
            <button type="submit" class="btn btn-success">
              <font-awesome-icon icon="fa-check" style="color: white;"/>
              Save
            </button>
            <button type="button" @click="editMode" class="btn btn-info">
              <font-awesome-icon icon="fa-x" style="color: black;"/>
              Cancel
            </button>
          </div>
        </div>
        <div class="mb-3">
          <div :class="['form-control', { 'is-invalid': submitted && !ticketDetails.priority}]">
            <span class="form-check-inline">Priority</span>
            <div class="form-check form-check-inline" v-for="i in 5" :key="i">
              <input class="form-check-input" type="radio"
              :id="`inlineRadio${i}`"
              v-model="ticketDetails.priority"
              :value="i"
              :disabled="isEditMode"
              :name="`inlineRadioOptions`"
            >
              <label class="form-check-label" :for="`inlineRadio${i}`">{{ i }}</label>
            </div>
          </div>
          <div v-if="submitted && !ticketDetails.priority" class="invalid-feedback">
            Priority is required.
          </div>
        </div>
        <div class="input-group mb-3" >
          <label class="input-group-text" for="inputGroupSelect01">Ticket Request Type</label>
          <select v-model="ticketDetails.ticket_request_type"
            :class="['form-control', { 'is-invalid': submitted && !ticketDetails.ticket_request_type}]"
            id="inputGroupSelect01"
            :disabled="isEditMode"
            required
          >
            <option value="House Keeping">House Keeping</option>
            <option value="Dinning Service">Dinning Service</option>
            <option value="Facilities">Facilities</option>
            <option value="Vendor">Vendor</option>
          </select>
          <div v-if="submitted && !ticketDetails.ticket_request_type" class="invalid-feedback">
            Ticket request type is required.
          </div>
        </div>
        <div class="input-group mb-3">
          <span for="guest_first_name" class="input-group-text">Guest First Name</span>
          <input v-model="ticketDetails.guest_first_name"
            :class="['form-control', { 'is-invalid': submitted && !ticketDetails.guest_first_name }]"
            type="text"
            id="guest_first_name"
            placeholder="Ex: John"
            :disabled="isEditMode"
            required
          >
          <div v-if="submitted && !ticketDetails.guest_first_name" class="invalid-feedback">
            Guest first name is required.
          </div>
        </div>
        <div class="input-group mb-3">
          <span for="guest_last_name" class="input-group-text">Guest Last Name</span>
          <input v-model="ticketDetails.guest_last_name"
            type="text"
            :class="['form-control', { 'is-invalid': submitted && !ticketDetails.guest_last_name }]"
            id="guest_last_name"
            placeholder="Ex: Smith"
            :disabled="isEditMode"
            required
          >
          <div v-if="submitted && !ticketDetails.guest_last_name" class="invalid-feedback">
            Guest last name is required.
          </div>
        </div>
        <div class="input-group mb-3">
          <span for="room_number" class="input-group-text">Room Number</span>
          <input v-model="ticketDetails.room_number"
            type="number"
            :class="['form-control', { 'is-invalid': submitted && !ticketDetails.room_number }]"
            id="room_number"
            placeholder="Ex: 19301"
            disabled
            required
          >
          <div v-if="submitted && !ticketDetails.room_number" class="invalid-feedback">
            Room number is required.
          </div>
        </div>
        <div class="input-group mb-3">
          <span for="requestor" class="input-group-text">Requestor</span>
          <input v-model="ticketDetails.requestor"
            type="text"
            :class="['form-control', { 'is-invalid': submitted && !ticketDetails.requestor }]"
            id="requestor"
            placeholder="Requestor Name"
            disabled
            required
          >
          <div v-if="submitted && !ticketDetails.requestor" class="invalid-feedback">
            Requestor is required.
          </div>
        </div>
        <div class="mb-3">
          <span for="description" class="form-label">Description</span>
          <textarea v-model="ticketDetails.description"
            :class="['form-control', { 'is-invalid': submitted && !ticketDetails.description }]"
            id="description"
            placeholder="Ex: Issue Explanation"
            :disabled="isEditMode"
            required
          ></textarea>
          <div v-if="submitted && !ticketDetails.description" class="invalid-feedback">
            Issue description is required.
          </div>
        </div>
        <div class="mb-3">
          <span>Created at: {{ sanitizeDate(ticketDetails.createdAt) || '' }}</span>
        </div>
        <ConfirmationModal
          :ticketId="ticketId"
          modalTitle="Ticket Deletion"
          :modalBodyText="'Are you sure you want to delete ticket number: ' + ticketId + '?'"
          :url="deleteTicketUrl"
        />
      </form>
    </div>
  </div>
</template>

<script>
import ConfirmationModal from "@/components/ConfirmationModal.vue";

export default {
  name: "TicketDetailsPage",
  beforeMount() {
    this.loadTicketDetails(this.ticketId);
  },
  components: {
    ConfirmationModal,
  },
  data() {
    return {
      ticketId: this.$route.params.ticketId,
      ticketDetails: {},
      submitted: false,
      isEditMode: true,
      deleteTicketUrl: process.env.VUE_APP_BASE_URL + '/tickets/'+ this.$route.params.ticketId,
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;

      if (this.isTicketValid()) {
        try {
          await this.$http.put(process.env.VUE_APP_BASE_URL + '/tickets/' + this.ticketId, this.ticketDetails, {
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
    editMode() {
      this.isEditMode = !this.isEditMode;
    },
    isTicketValid() {
      return this.ticketDetails.priority &&
        this.ticketDetails.guest_first_name &&
        this.ticketDetails.guest_last_name &&
        this.ticketDetails.room_number &&
        this.ticketDetails.check_in_date &&
        this.ticketDetails.ticket_request_type &&
        this.ticketDetails.description &&
        this.ticketDetails.requestor &&
        this.ticketDetails.requestorId &&
        this.ticketDetails.status
    },
    loadTicketDetails(ticketId) {
      const token = sessionStorage.getItem("token");

      this.$http.get(process.env.VUE_APP_BASE_URL + '/tickets/'+ ticketId, {
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
  },
}
</script>

<style>
</style>