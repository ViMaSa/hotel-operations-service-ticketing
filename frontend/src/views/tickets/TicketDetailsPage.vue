<template>
  <FormContainer icon="fa-ticket" :headerText="'Ticket ID: ' + this.ticketId">
    <div>Hello</div>
  </FormContainer>
</template>

<script>
import FormContainer from '@/components/FormContainer.vue';

export default {
  name: "TicketDetailsPage",
  data() {
    return {
      ticketId: this.$route.params.ticketId,
      ticketDetails: null,
    }
  },
  created() {
    this.loadTicketDetails(this.ticketId);
  },
  components: {
    FormContainer,
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
  },
}
</script>

<style>
</style>