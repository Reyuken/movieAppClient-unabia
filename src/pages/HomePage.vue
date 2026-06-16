<script>
import BannerComponent from '../components/BannerComponent.vue';

export default {
  components: {
    BannerComponent
  },
  data() {
    return {
      bannerProps: {
        title: "FitForge",
        tagline: "Train smarter. Track every rep. Build discipline that lasts.",
        destination: "workouts",
        buttonLabel: "Start Training"
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

        <div class="badge">🔥 Fitness Tracking System</div>

        <BannerComponent :bannerProps="bannerProps" />

        <p class="subtext">
          Log workouts, monitor progress, and stay consistent — every single day.
        </p>

      </div>

    </section>

  </div>
</template>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top,
      #0f172a,
      #0b0b0b 55%,
      #111827 120%);
  color: #e2e8f0;
  overflow-x: hidden;
}

/* HERO */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

/* glowing background blobs */
.glow {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.25;
}

.glow-1 {
  background: #ff6b00;
  top: -100px;
  left: -100px;
}

.glow-2 {
  background: #38bdf8;
  bottom: -120px;
  right: -120px;
}

/* hero content */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

/* small badge */
.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 1px;
  text-transform: uppercase;

  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #38bdf8;

  margin-bottom: 1rem;
}

/* extra tagline under banner */
.subtext {
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #94a3b8;
  line-height: 1.6;
}

/* highlights section */
.highlights-section {
  padding: 5rem 1rem;
  background: linear-gradient(180deg,
      rgba(15, 23, 42, 0.8),
      rgba(17, 24, 39, 1));
  border-top: 1px solid rgba(56, 189, 248, 0.15);
}

/* responsive */
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