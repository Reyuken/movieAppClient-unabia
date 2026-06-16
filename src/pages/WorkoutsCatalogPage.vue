<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api.js'
import { useGlobalStore } from '@/stores/global.js'
import AddWorkoutComponent from '@/components/AddWorkoutComponent.vue'
import UpdateWorkoutComponent from '@/components/UpdateWorkoutComponent.vue'

const router = useRouter()
const store = useGlobalStore()
const notyf = new Notyf()

const workouts = ref([])
const loading = ref(true)

const { user } = useGlobalStore()

async function loadWorkouts() {

  try {
    const res = await api.get('/workouts/getMyWorkouts')
    workouts.value = res.data.workouts
    // console.log(res.data)
  } catch (err) {
    notyf.error('Failed to load workouts')
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadWorkouts)

const workoutModal = ref(null)

function editWorkout(workout) {
  if (!workoutModal.value) return
  workoutModal.value.openEditModal(workout)
}

async function deleteWorkout(id) {
  if (!confirm("Delete this workout?")) return

  try {
    await api.delete(`/workouts/deleteWorkout/${id}`)
    notyf.success("Workout deleted")
    loadWorkouts()
  } catch (err) {
    notyf.error("Delete failed")
  }
}

async function completeWorkout(id) {
  try {
    await api.patch(`/workouts/completeWorkoutStatus/${id}`)
    notyf.success("Workout completed")
    loadWorkouts()
  } catch (err) {
    notyf.error("Failed to update status")
  }
}

function requireLogin() {
  if (!user.token) {
    router.push('/login')
  }
}
</script>

<template>
  <div class="workouts-wrapper">

    <div class="header">
      <h1 class="title">My Workouts</h1>

      <AddWorkoutComponent @refresh="loadWorkouts" />

    </div>

    <div v-if="loading" class="loading">
      Loading workouts...
    </div>

    <div v-else-if="!user.token" class="empty">
      Login to see your workouts 🔐
    </div>

    <div v-else-if="workouts.length === 0" class="empty">
      No workouts yet. Start your training 💪
    </div>

    <div v-else class="grid">

      <div v-for="w in workouts" :key="w._id" class="card">

        <div class="card-body">
          <h3 class="name">{{ w.name }}</h3>
          <p class="duration">Duration: {{ w.duration }}</p>
          <p class="status" :class="w.status">
            {{ w.status }}
          </p>
        </div>

        <div class="actions">

          <button class="btn complete" @click="completeWorkout(w._id)">
            Complete
          </button>

          <button class="btn edit" @click="editWorkout(w)">
            Edit
          </button>

          <button class="btn delete" @click="deleteWorkout(w._id)">
            Delete
          </button>

        </div>

      </div>

    </div>

    <UpdateWorkoutComponent ref="workoutModal" @refresh="loadWorkouts" />

  </div>
</template>

<style scoped>
.workouts-wrapper {
  min-height: 100vh;
  padding: 3rem 1rem;

  background: radial-gradient(circle at top,
      #111111,
      #0b0b0b 60%,
      #1f2937 140%);

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
  color: #ff6b00;
  text-transform: uppercase;
}

.add-btn {
  background: #ff6b00;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  background: rgba(20, 20, 20, 0.85);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  transition: 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  border-color: #ff6b00;
}

.name {
  color: #ff6b00;
  font-weight: 800;
}

.duration {
  color: #cbd5e1;
  margin-top: 0.5rem;
}

.status {
  margin-top: 0.5rem;
  color: #fbbf24;
}

.status.pending {
  color: #fbbf24;
}

.status.completed {
  color: #22c55e;
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

.complete {
  background: #22c55e;
}

.edit {
  background: #3b82f6;
  color: #fff;
}

.delete {
  background: #ef4444;
  color: #fff;
}

.loading,
.empty {
  text-align: center;
  color: #94a3b8;
}
</style>