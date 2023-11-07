<template>
  <div>
    <div class="hero" :style="{ backgroundImage: 'url(' + heroImage + ')' }">
    </div>
    <h1>Welcome to the website!</h1>
    <p>This is the homepage content</p>
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
}
</script>

<style scoped>
.hero {
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 768px) {
  .hero {
    height: 200px;
  }
}
</style>
