<template>
  <div>
    <div class="d-flex justify-content-end">
      <button type="button" data-bs-toggle="modal" data-bs-target="#confirmationModal" class="btn btn-danger">
        <font-awesome-icon icon="fa-trash-can" style="color: white;"/>
        Delete
      </button>
    </div>
    <div class="modal" id="confirmationModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ this.modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>{{ modalBodyText }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteTicket">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: {
    ticketId: String,
    modalTitle: String,
    modalBodyText: String,
    url: String,
  },
  data() {
    return {
      isDeleting: false,
    }
  },
  methods: {
    async deleteTicket() {
      try {
        await this.$http.delete(this.url, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
          }
        });

        this.$router.push('/dashboard');
      } catch (error) {
        this.handleError(error)
      }
    },
  }
}
</script>

<style>
</style>
