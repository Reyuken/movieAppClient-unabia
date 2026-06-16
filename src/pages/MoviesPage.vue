<script>
import { useGlobalStore } from '../stores/global.js'
import MoviesCatalogPage from './MoviesCatalogPage.vue'
import AdminMoviesCatalogPage from './AdminMoviesCatalogPage.vue'

export default {
  components: {
    MoviesCatalogPage,
    AdminMoviesCatalogPage
  },
  setup() {
    const { user } = useGlobalStore()

    return {
      user,
    }
  }
}
</script>

<template>
  <div class="page-wrapper">

    <div class="page-container">

      <MoviesCatalogPage v-if="!user.isAdmin" />

      <AdminMoviesCatalogPage v-else />

    </div>

  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top,
      #0b0b0f,
      #111827 60%,
      #1f2937 140%);
  color: #ffffff;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.4s ease-in-out;
}

.page-container {
  width: 100%;
  max-width: 1400px;
  padding: 2rem 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>