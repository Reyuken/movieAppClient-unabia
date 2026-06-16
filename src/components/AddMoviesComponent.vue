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

const title = ref('')
const genre = ref('')

function openModal() {
    if (!store.user.token) {
        notyf.error("Please login to add movies")
        router.push({ name: 'Login' })
        return
    }

    isOpen.value = true
}

function closeModal() {
    isOpen.value = false
    title.value = ''
    genre.value = ''
}

async function submitMovie() {

    if (!title.value || !genre.value) return

    try {
        await api.post('/movies/addMovie', {
            title: title.value,
            genre: genre.value
        })

        notyf.success("Movie added")

        closeModal()
        emit('refresh')

    } catch (err) {
        notyf.error("Failed to add movie")
    }
}
</script>

<template>

    <button class="open-btn" @click="openModal">
        + Add Movie
    </button>

    <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">

        <div class="modal-box">

            <h3>Add Movie</h3>

            <input v-model="title" placeholder="Movie title" />
            <input v-model="genre" placeholder="Genre (e.g. Action, Drama)" />

            <div class="actions">

                <button class="submit" @click="submitMovie">
                    Save
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
    background: #60a5fa;
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
    background: #111827;
    padding: 2rem;
    border-radius: 12px;
    width: 320px;
    border: 1px solid rgba(96, 165, 250, 0.3);
}

input {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 8px;
    border: none;
    background: #1f2937;
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