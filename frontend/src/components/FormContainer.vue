<template>
  <div class="container">
    <div class="card mt-5 shadow-lg">
      <div class="card-header d-flex flex-row justify-content-center">
        <font-awesome-icon :icon="this.icon" class="fa-3x me-2" style="color: #2aad29;"></font-awesome-icon>
        <h1 class="ms-2">{{ this.headerText }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormContainer",
  props: {
    icon: String,
    headerText: String,
  }
}
</script>

<style>
</style>
