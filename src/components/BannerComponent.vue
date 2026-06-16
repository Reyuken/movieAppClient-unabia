<script>
export default {
  props: {
    bannerProps: Object
  }
}
</script>

<template>
  <div class="banner-wrapper">
    <div class="container">
      <div class="banner-content">

        <div class="title-row">
          <!-- <img :src="bannerProps.logo" class="title-logo" alt="Logo" /> -->
          <h1 class="title">{{ bannerProps.title }}</h1>
        </div>

        <p class="tagline">{{ bannerProps.tagline }}</p>

        <router-link :to="bannerProps.destination" class="btn banner-btn">
          {{ bannerProps.buttonLabel }}
          <i class="bi bi-arrow-right ms-2"></i>
        </router-link>

      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-wrapper {
  padding: 1rem 1rem 15rem;
  text-align: center;
}

.banner-content {
  max-width: 800px;
  margin: auto;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.title-logo {
  width: 75px;
  height: 100%;
  object-fit: contain;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  color: #e2e8f0;
  letter-spacing: 1px;
  margin: 0;
}

.tagline {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 2rem;
}

.banner-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  gap: 8px;

  background: rgba(56, 189, 248, 0.15);
  color: #e2e8f0;

  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 999px;

  padding: 0.85rem 1.8rem;

  font-weight: 600;
  letter-spacing: 0.5px;

  backdrop-filter: blur(10px);

  transition: all 0.25s ease;

  box-shadow: 0 0 0 transparent;
}

.banner-btn:hover {
  background: rgba(56, 189, 248, 0.25);
  border-color: rgba(56, 189, 248, 0.7);
  transform: translateY(-3px);
  box-shadow:
    0 0 20px rgba(56, 189, 248, 0.25),
    0 10px 25px rgba(0, 0, 0, 0.35);
  color: #ffffff;
}

.banner-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}
</style>