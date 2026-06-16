<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api.js'
import { useGlobalStore } from '@/stores/global.js'

import AddMoviesComponent from '@/components/AddMoviesComponent.vue'
import UpdateMoviesComponent from '@/components/UpdateMoviesComponent.vue'

const router = useRouter()
const store = useGlobalStore()
const notyf = new Notyf()

const movies = ref([])
const loading = ref(true)

const movieModal = ref(null)

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

function editMovie(movie) {
  if (!store.user.token) {
    notyf.error('Please login first')
    router.push({ name: 'Login' })
    return
  }

  movieModal.value?.openEditModal(movie)
}

async function deleteMovie(id) {
  if (!store.user.token) {
    notyf.error('Please login first')
    router.push({ name: 'Login' })
    return
  }

  if (!confirm('Delete this movie?')) return

  try {
    await api.delete(`/movies/deleteMovie/${id}`)
    notyf.success('Movie deleted')
    loadMovies()
  } catch (err) {
    notyf.error('Delete failed')
  }
}
</script>

<template>
  <div class="movies-wrapper">

    <div class="header">
      <h1 class="title">Admin Movies Panel</h1>

      <AddMoviesComponent @refresh="loadMovies" />
    </div>

    <div v-if="loading" class="loading">
      Loading movies...
    </div>

    <div v-else-if="movies.length === 0" class="empty">
      No movies found 🍿
    </div>

    <div v-else class="table-wrapper">

      <table class="movies-table">

        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="m in movies" :key="m._id">

            <td>{{ m.title }}</td>
            <td>{{ m.director }}</td>
            <td>{{ m.year }}</td>
            <td>{{ m.genre }}</td>

            <td class="desc-cell">
              {{ m.description }}
            </td>

            <td class="actions">

              <button class="btn edit" @click="editMovie(m)">
                Edit
              </button>

              <button class="btn delete" @click="deleteMovie(m._id)">
                Delete
              </button>

            </td>

          </tr>
        </tbody>

      </table>

    </div>

    <UpdateMoviesComponent ref="movieModal" @refresh="loadMovies" />

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: 800;
  color: #60a5fa;
  text-transform: uppercase;
}

/* TABLE */
.table-wrapper {
  overflow-x: auto;
}

.movies-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(17, 24, 39, 0.85);
  border-radius: 12px;
  overflow: hidden;
}

.movies-table th,
.movies-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
}

.movies-table th {
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
  font-weight: 700;
}

.movies-table tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

.desc-cell {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* BUTTONS */
.actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 6px 12px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
}

.edit {
  background: #3b82f6;
  color: white;
}

.delete {
  background: #ef4444;
  color: white;
}

/* STATES */
.loading,
.empty {
  text-align: center;
  color: #94a3b8;
}
</style>