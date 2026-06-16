<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '@/api'
import { useGlobalStore } from '@/stores/global'

const emit = defineEmits(['refresh'])

const router = useRouter()
const store = useGlobalStore()
const notyf = new Notyf()

const isOpen = ref(false)
const isEditMode = ref(false)
const workoutId = ref(null)

const name = ref('')
const duration = ref('')

function openAddModal() {
    if (!store.user.token) {
        notyf.error("Please login to add workouts")
        router.push({ name: 'Login' })
        return
    }

    isEditMode.value = false
    workoutId.value = null

    name.value = ''
    duration.value = ''

    isOpen.value = true
}

function openEditModal(workout) {
    if (!store.user.token) {
        notyf.error("Please login")
        router.push({ name: 'Login' })
        return
    }

    isEditMode.value = true
    workoutId.value = workout._id

    // 🔥 THIS IS WHAT FILLS THE FORM
    name.value = workout.name
    duration.value = workout.duration

    isOpen.value = true
}

function closeModal() {
    isOpen.value = false
    name.value = ''
    duration.value = ''
    workoutId.value = null
}

async function submitWorkout() {

    if (!name.value || !duration.value) return

    try {

        if (isEditMode.value) {

            await api.patch(`/workouts/updateWorkout/${workoutId.value}`, {
                name: name.value,
                duration: duration.value
            })

            notyf.success("Workout updated")

        } else {

            await api.post('/workouts/addWorkout', {
                name: name.value,
                duration: duration.value
            })

            notyf.success("Workout added")
        }

        closeModal()
        emit('refresh')

    } catch (err) {
        notyf.error("Operation failed")
    }
}

defineExpose({
    openAddModal,
    openEditModal
})
</script>

<template>

    <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">

        <div class="modal-box">

            <h3>
                {{ isEditMode ? 'Update Workout' : 'Add Workout' }}
            </h3>

            <input v-model="name" placeholder="Workout name" />
            <input v-model="duration" placeholder="Duration (e.g. 30 mins)" />

            <div class="actions">

                <button class="submit" @click="submitWorkout">
                    {{ isEditMode ? 'Update' : 'Save' }}
                </button>

                <button class="cancel" @click="closeModal">
                    Cancel
                </button>

            </div>

        </div>

    </div>

</template>

<style scoped>
.open-btn {
    background: #ff6b00;
    border: none;
    padding: 0.7rem 1rem;
    border-radius: 999px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 1rem;
}


.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}


.modal-box {
    background: #111;
    padding: 2rem;
    border-radius: 12px;
    width: 320px;
    border: 1px solid rgba(255, 107, 0, 0.3);
}


input {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 8px;
    border: none;
    background: #1f1f1f;
    color: white;
}


.actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.submit {
    background: #22c55e;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    cursor: pointer;
}

.cancel {
    background: #ef4444;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    cursor: pointer;
}
</style>