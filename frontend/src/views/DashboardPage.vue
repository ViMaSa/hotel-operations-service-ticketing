<template>
  <div class="dashboard-page-container container-fluid full-height py-4">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">My Tickets</h5>
        <router-link to="/tickets/create" class="btn btn-warning">Create New Ticket</router-link>
      </div>
      <form class="d-flex my-3 px-3" @submit.prevent="handleSubmit">
        <input v-model="form.searchValue"
          class="form-control me-2"
          type="number"
          id="searchValue"
          placeholder="Search by room number"
          aria-label="Search"
        >
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div class="px-3 filter-group" v-if="this.filterValue">
        <div class="d-inline-block p-1 rounded bg-success">
          {{ this.filterValue }}
          <button @click="clearFilter" class="badge p-1 border-0 bg-success">X</button>
        </div>
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
            <tbody v-for="ticket in tickets" :key="ticket.id" class="position-relative">
              <tr @click="navigateToTicket(ticket.id)">
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
      form: {
        searchValue: '',
      },
      filterValue: '',
      tickets: [],
    };
  },
  created() {
    this.loadTickets();
  },
  methods: {
    clearFilter() {
      this.filterValue = '';
      this.loadTickets();
    },
    setFilter(value) {
      this.filterValue = value;
    },
    handleSubmit() {
      this.setFilter(this.form.searchValue);
      this.form.searchValue = '';

      if(this.filterValue) {
        this.getFilteredTickets();
      }
      else {
        this.loadTickets();
      }
    },
    getFilteredTickets() {
      const token = sessionStorage.getItem("token");

      this.$http.get(process.env.VUE_APP_BASE_URL + '/tickets?room_number=' + this.filterValue , {
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
    navigateToTicket(ticketId) {
      this.$router.push(`/tickets/${ticketId}`)
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
