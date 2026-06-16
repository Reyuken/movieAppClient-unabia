<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api.js'
import { useGlobalStore } from '@/stores/global.js'

import AddMoviesComponent from '@/components/AddMoviesComponent.vue'
import UpdateMoviesComponent from '@/components/UpdateMoviesComponent.vue'
import ViewMoviesComponent from '@/components/ViewMoviesComponent.vue'

const router = useRouter()
const store = useGlobalStore()
const notyf = new Notyf()

const movies = ref([])
const loading = ref(true)

const viewModal = ref(null)

async function loadMovies() {
  try {
    const res = await api.get('/movies/getMovies')
    movies.value = res.data.movies
  } catch (err) {
    notyf.error('Failed to load movies')
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadMovies)

function viewMovie(movie) {
  viewModal.value?.openViewModal(movie)
}
</script>

<template>
  <div class="movies-wrapper">

    <div class="header">
      <h1 class="title">Movies Catalog</h1>
    </div>

    <div v-if="loading" class="loading">
      Loading movies...
    </div>

    <!-- <div v-else-if="!store.user.token" class="empty">
      Login to view movies 🎬
    </div> -->

    <div v-else-if="!movies || movies.length === 0" class="empty">
      No movies found 🍿
    </div>

    <div v-else class="grid">

      <div v-for="m in movies" :key="m._id" class="card">

        <div class="card-body">

          <h3 class="title-text">{{ m.title }}</h3>

          <p class="meta">🎬 Director: {{ m.director }}</p>
          <p class="meta">📅 Year: {{ m.year }}</p>

        </div>

        <div class="actions">

          <button class="btn view" @click="viewMovie(m)">
            View
          </button>

        </div>

      </div>

    </div>

    <!-- VIEW MODAL -->
    <ViewMoviesComponent ref="viewModal" />

  </div>
</template>

<style scoped>
.movies-wrapper {
  min-height: 100vh;
  padding: 3rem 1rem;
  background: radial-gradient(circle at top, #0b0b0f, #111827 60%, #1f2937 140%);
  color: #fff;
}

.header {
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: 800;
  color: #60a5fa;
  text-transform: uppercase;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  background: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  transition: 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  border-color: #60a5fa;
}

.title-text {
  color: #60a5fa;
  font-weight: 800;
}

.meta {
  color: #cbd5e1;
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.actions {
  display: flex;
  margin-top: 1rem;
}

.btn {
  flex: 1;
  padding: 0.5rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
}

.view {
  background: #6366f1;
  color: white;
}

.loading,
.empty {
  text-align: center;
  color: #94a3b8;
}
</style>