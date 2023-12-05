<template>
  <div class="dashboard-page-container container-fluid full-height py-4">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Work Tickets</h5>
        <h6 class="card-subtitle">My Tickets</h6>
        <form class="row mx-0 my-2">
          <input class="col-11 ml-1" type="search" placeholder="Search by room number" aria-label="Search">
          <button class="btn btn-outline-success col-auto mx-sm-2" type="submit">Search</button>
        </form>
      </div>
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
            <tbody v-for="ticket in tickets" :key="ticket.id">
              <tr>
                <th scope="col">{{ ticket.id }}</th>
                <td scope="col">{{ ticket.priority }}</td>
                <td scope="col">{{ ticket.room_number }}</td>
                <td scope="col">{{ ticket.guest_first_name + " " + ticket.guest_last_name }}</td>
                <td scope="col">{{ ticket.ticket_request_type }}</td>
              </tr>
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

      this.$http.get('/api/tickets', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => {
          this.tickets = response.data;
        })
        .catch(err => {
          console.error(err.message);
        });
    }
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
