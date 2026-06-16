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

// COMMENTS STATE
const commentsMap = ref({})
const commentInputs = ref({})

/* =========================
   LOAD MOVIES
========================= */
async function loadMovies() {
  try {
    const res = await api.get('/movies/getMovies')
    movies.value = res.data.movies

    // load comments faster (parallel)
    await Promise.all(
      movies.value.map(movie => loadComments(movie._id))
    )

  } catch (err) {
    notyf.error('Failed to load movies')
    console.error(err)
  } finally {
    loading.value = false
  }
}

/* =========================
   LOAD COMMENTS
========================= */
async function loadComments(movieId) {
  try {
    const res = await api.get(`/movies/getComments/${movieId}`)
    commentsMap.value[movieId] = res.data.comments
  } catch (err) {
    console.error("Failed to load comments", err)
  }
}

/* =========================
   ADD COMMENT
========================= */
async function submitComment(movieId) {
  const text = commentInputs.value[movieId]

  if (!text || !text.trim()) return

  try {
    await api.post(`/movies/addComment/${movieId}`, {
      comment: text
    })

    commentInputs.value[movieId] = ''
    await loadComments(movieId)

  } catch (err) {
    notyf.error("Failed to add comment")
  }
}

/* =========================
   INIT
========================= */
onMounted(loadMovies)

/* =========================
   EDIT MOVIE
========================= */
function editMovie(movie) {
  if (!store.user.token) {
    notyf.error('Please login first')
    router.push({ name: 'Login' })
    return
  }

  movieModal.value?.openEditModal(movie)
}

/* =========================
   DELETE MOVIE
========================= */
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
      <h1 class="title">My Movies</h1>

      <AddMoviesComponent @refresh="loadMovies" />
    </div>

    <div v-if="loading" class="loading">
      Loading movies...
    </div>

    <div v-else-if="!store.user.token" class="empty">
      Login to see your movies 🎬
    </div>

    <div v-else-if="movies.length === 0" class="empty">
      No movies found 🍿
    </div>

    <div v-else class="grid">

      <div v-for="m in movies" :key="m._id" class="card">

        <div class="card-body">

          <h3 class="title-text">{{ m.title }}</h3>

          <p class="meta">🎬 Director: {{ m.director }}</p>
          <p class="meta">📅 Year: {{ m.year }}</p>
          <p class="meta">🎭 Genre: {{ m.genre }}</p>

          <p class="desc">{{ m.description }}</p>

        </div>

        <div class="actions">
          <button class="btn edit" @click="editMovie(m)">
            Edit
          </button>

          <button class="btn delete" @click="deleteMovie(m._id)">
            Delete
          </button>
        </div>

        <!-- 💬 COMMENT INPUT -->
        <div class="comment-box">

          <input v-model="commentInputs[m._id]" placeholder="Write a comment..." class="comment-input" />

          <button class="btn comment-btn" @click="submitComment(m._id)">
            Post
          </button>

        </div>

        <!-- 💬 COMMENTS DISPLAY -->
        <div class="comments-section">

          <h4 class="comments-title">Comments</h4>

          <div v-if="commentsMap[m._id] && commentsMap[m._id].length">

            <div v-for="c in commentsMap[m._id]" :key="c._id" class="comment-item">
              {{ c.comment }}
            </div>

          </div>

          <div v-else class="no-comments">
            No comments yet
          </div>

        </div>

      </div>

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

.desc {
  margin-top: 0.8rem;
  color: #94a3b8;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn {
  flex: 1;
  padding: 0.5rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
}

.edit {
  background: #3b82f6;
  color: #fff;
}

.delete {
  background: #ef4444;
  color: #fff;
}

.comment-box {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.comment-input {
  flex: 1;
  padding: 0.4rem;
  border-radius: 8px;
  border: none;
  background: #1f2937;
  color: white;
}

.comment-btn {
  background: #10b981;
  color: white;
  border-radius: 999px;
}

.comments-section {
  margin-top: 1rem;
}

.comments-title {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.comment-item {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  padding: 0.4rem;
  border-radius: 6px;
  margin-bottom: 0.3rem;
  font-size: 0.85rem;
}

.no-comments {
  font-size: 0.8rem;
  color: #64748b;
  font-style: italic;
}

.loading,
.empty {
  text-align: center;
  color: #94a3b8;
}
</style>