<template>
  <div>
    <div class="hero d-flex align-items-center justify-content-center" :style="{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),' + 'url(' + heroImage + ')' }">
      <div class="hero-content d-flex flex-column align-items-center">
        <h2>Welcome to Hotel Operations System Ticketing! </h2>
        <h3>H.O.S.T.</h3>
      </div>
      <button type="button" class="btn btn-warning" @Click="">Click Me</button>
    </div>
  </div>
</template>

<script>
import heroImage from "@/assets/host_hero.png"
export default {
  name: 'HomePage',
  data() {
    return {
      heroImage: heroImage,
    };
  },
  methods: {
    async findError () {
      const response = await this.$http.get('/api/hello');
      console.log(response);
    }
  }
}
</script>

<style scoped>
.hero {
  height: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.hero-content {
  color: white;
}

@media (max-width: 768px) {
  .hero {
    height: 200px;
  }
  h2 {
    font-size: medium;
  }
  h3 {
    font-size: small;
  }
}
</style>
