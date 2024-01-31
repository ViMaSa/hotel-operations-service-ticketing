<template>
  <div class="dashboard-page-container container-fluid full-height py-4">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">My Tickets</h5>
        <router-link to="/tickets/create" class="btn btn-warning">Create New Ticket</router-link>
      </div>
      <form class="d-flex my-3 px-3">
        <input class="form-control me-2" type="search" placeholder="Search by room number" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div class="card-body p-0">
        <div class="table-container table-responsive-sm container-fluid p-0">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Ticket #</th>
                <th scope="col">Priority</th>
                <th scope="col">Room Number</th>
                <th scope="col">Guest Name</th>
                <th scope="col">Request Type</th>
              </tr>
            </thead>
            <tbody v-for="ticket in tickets" :key="ticket.id" class="position-relative">
              <tr>
                <th scope="col">{{ ticket.id }}</th>
                <td scope="col">{{ ticket.priority }}</td>
                <td scope="col">{{ ticket.room_number }}</td>
                <td scope="col">{{ ticket.guest_first_name + " " + ticket.guest_last_name }}</td>
                <td scope="col">{{ ticket.ticket_request_type }}</td>
              </tr>
              <router-link :to="'/tickets/' + ticket.id" class="stretched-link"></router-link>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardPage",
  data () {
    return {
      tickets: []
    };
  },
  created() {
    this.loadTickets();
  },
  methods: {
    loadTickets() {
      const token = sessionStorage.getItem("token");

      this.$http.get(process.env.VUE_APP_BASE_URL + '/tickets', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => {
        const dataArray = Object.values(response.data);
        this.tickets = dataArray.sort((a,b) => b.id - a.id)
      }).catch(err => {
        console.error(err.message);
        this.$router.push('/');
      });
    },
  }
};
</script>

<style>
.dashboard-page-container {
  background-color: #f1f1f1;
}

.full-height {
  min-height: 100vh;
}
</style>
