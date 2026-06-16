<script>
import BannerComponent from '../components/BannerComponent.vue';

export default {
  components: {
    BannerComponent
  },
  data() {
    return {
      bannerProps: {
        title: "MovieVault",
        tagline: "Discover films. Track your watchlist. Build your own cinematic universe.",
        destination: "movies",
        buttonLabel: "Explore Movies"
      }
    }
  }
}
</script>

<template>
  <div class="home-wrapper">

    <section class="hero">

      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>

      <div class="hero-content">

        <div class="badge">🎬 Movie Library System</div>

        <BannerComponent :bannerProps="bannerProps" />

        <p class="subtext">
          Browse movies, manage your collection, and keep track of everything you watch.
        </p>

      </div>

    </section>

  </div>
</template>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top,
      #0b0b0f,
      #111827 55%,
      #1f2937 120%);
  color: #e2e8f0;
  overflow-x: hidden;
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.glow {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.25;
}

.glow-1 {
  background: #60a5fa;
  top: -100px;
  left: -100px;
}

.glow-2 {
  background: #ef4444;
  bottom: -120px;
  right: -120px;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 1px;
  text-transform: uppercase;

  background: rgba(96, 165, 250, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.3);
  color: #60a5fa;

  margin-bottom: 1rem;
}

.subtext {
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #94a3b8;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .glow {
    width: 250px;
    height: 250px;
  }

  .subtext {
    font-size: 0.9rem;
  }
}
</style>