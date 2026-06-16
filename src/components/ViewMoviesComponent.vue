<script setup>
import { ref } from 'vue'
import { Notyf } from 'notyf'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/global'
import api from '@/api'

const router = useRouter()
const store = useGlobalStore()
const notyf = new Notyf()

const isOpen = ref(false)
const movie = ref(null)

const comments = ref([])
const commentInput = ref('')
const loadingComments = ref(false)

function openViewModal(selectedMovie) {
  if (!store.user.token) {
    notyf.error('Please login to view movie details')
    router.push({ name: 'Login' })
    return
  }
  movie.value = selectedMovie
  isOpen.value = true

  loadComments(selectedMovie._id)
}

function closeModal() {
  isOpen.value = false
  movie.value = null
  comments.value = []
  commentInput.value = ''
}

async function loadComments(movieId) {
  loadingComments.value = true

  try {
    const res = await api.get(`/movies/getComments/${movieId}`)
    comments.value = res.data.comments
  } catch (err) {
    console.error(err)
    notyf.error('Failed to load comments')
  } finally {
    loadingComments.value = false
  }
}

async function submitComment() {
  if (!commentInput.value.trim()) return

  try {
    await api.post(`/movies/addComment/${movie.value._id}`, {
      comment: commentInput.value
    })

    commentInput.value = ''
    await loadComments(movie.value._id)

  } catch (err) {
    notyf.error('Failed to add comment')
  }
}

defineExpose({
  openViewModal
})
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">

    <div class="modal-box">

      <h2 class="title">{{ movie?.title }}</h2>

      <div class="content">
        <p><strong>Director:</strong> {{ movie?.director }}</p>
        <p><strong>Year:</strong> {{ movie?.year }}</p>
        <p><strong>Genre:</strong> {{ movie?.genre }}</p>

        <hr />

        <p class="desc">{{ movie?.description }}</p>
      </div>

      <div class="comment-box" id="addComment">
        <input v-model="commentInput" placeholder="Write a comment..." class="input" />

        <button class="btn" @click="submitComment">
          Post
        </button>
      </div>

      <div class="comments-section">

        <h3 class="comments-title">Comments</h3>

        <div v-if="loadingComments" class="loading">
          Loading comments...
        </div>

        <div v-else class="comments-scroll">

          <div v-if="comments.length === 0" class="empty">
            No comments yet
          </div>

          <div v-else>
            <div v-for="c in comments" :key="c._id" class="comment">
              {{ c.comment }}
            </div>
          </div>

        </div>

      </div>

      <button class="close-btn" @click="closeModal">
        Close
      </button>

    </div>

  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  width: 420px;
  max-height: 85vh;
  overflow: hidden;

  background: #111827;
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 14px;
  padding: 1.5rem;
  color: white;

  display: flex;
  flex-direction: column;
}

.title {
  color: #60a5fa;
  margin-bottom: 1rem;
}

.content p {
  margin: 0.3rem 0;
  color: #cbd5e1;
}

.desc {
  margin-top: 1rem;
  color: #94a3b8;
}

.comment-box {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background: #1f2937;
  color: white;
}

.btn {
  background: #10b981;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  color: white;
  cursor: pointer;
}

.comments-section {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.comments-title {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.comments-scroll {
  flex: 1;
  overflow-y: auto;
  max-height: 180px;
  padding-right: 5px;
}

.comment {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.4rem;
  border-radius: 6px;
  margin-bottom: 0.3rem;
  color: #cbd5e1;
  font-size: 0.85rem;
}

/* STATES */
.loading,
.empty {
  font-size: 0.8rem;
  color: #64748b;
}

.close-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 999px;
  border: none;
  background: #ef4444;
  color: white;
  cursor: pointer;
}
</style>