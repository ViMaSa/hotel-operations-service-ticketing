<template>
  <div class="container">
    <div class="card mt-5 shadow-lg">
      <div class="card-header d-flex flex-row justify-content-center">
        <font-awesome-icon icon="bell-concierge" class="fa-3x me-2" style="color: #2aad29;"/>
        <h1 class="ms-2">H.O.S.T.</h1>
      </div>
      <form class="m-5">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email">
        </div>
        <div class="mb-3 row">
          <div class="col me-5">
            <label for="first_name" class="form-label">First name</label>
            <input type="text" class="form-control" id="first_name">
          </div>
          <div class="col">
            <label for="last_name" class="form-label">Last name</label>
            <input type="text" class="form-control" id="last_name">
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" aria-describedby="passwordHelp">
          <div id="passwordHelp" class="form-text"> We'll never share your password with anyone else.</div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
}
</script>

<style>
</style>
