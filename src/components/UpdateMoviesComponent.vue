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
const movieId = ref(null)

const title = ref('')
const genre = ref('')
const director = ref('')
const year = ref('')
const description = ref('')

function openAddModal() {
    if (!store.user.token) {
        notyf.error("Please login to add movies")
        router.push({ name: 'Login' })
        return
    }

    isEditMode.value = false
    movieId.value = null

    title.value = ''
    genre.value = ''
    director.value = ''
    year.value = ''
    description.value = ''

    isOpen.value = true
}

function openEditModal(movie) {
    if (!store.user.token) {
        notyf.error("Please login")
        router.push({ name: 'Login' })
        return
    }

    isEditMode.value = true
    movieId.value = movie._id

    title.value = movie.title
    genre.value = movie.genre
    director.value = movie.director
    year.value = movie.year
    description.value = movie.description

    isOpen.value = true
}

function closeModal() {
    isOpen.value = false

    title.value = ''
    genre.value = ''
    director.value = ''
    year.value = ''
    description.value = ''

    movieId.value = null
}

async function submitMovie() {

    if (!title.value || !genre.value || !director.value || !year.value) {
        return notyf.error("Please complete all required fields")
    }

    try {

        const payload = {
            title: title.value,
            genre: genre.value,
            director: director.value,
            year: year.value,
            description: description.value
        }

        if (isEditMode.value) {

            await api.patch(`/movies/updateMovie/${movieId.value}`, payload)
            notyf.success("Movie updated")

        } else {

            await api.post('/movies/addMovie', payload)
            notyf.success("Movie added")
        }

        closeModal()
        emit('refresh')

    } catch (err) {
        notyf.error("Operation failed")
        console.error(err)
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

            <h3 class="title">
                {{ isEditMode ? 'Update Movie' : 'Add Movie' }}
            </h3>

            <input v-model="title" placeholder="Movie title" />
            <input v-model="director" placeholder="Director" />
            <input v-model="year" type="number" placeholder="Year (e.g. 2024)" />
            <input v-model="genre" placeholder="Genre" />

            <textarea v-model="description" placeholder="Description"></textarea>

            <div class="actions">

                <button class="submit" @click="submitMovie">
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
    background: #111827;
    padding: 2rem;
    border-radius: 14px;
    width: 360px;
    border: 1px solid rgba(96, 165, 250, 0.3);
}

.title {
    color: #60a5fa;
    margin-bottom: 1rem;
}

input,
textarea {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 8px;
    border: none;
    background: #1f2937;
    color: white;
}

textarea {
    min-height: 80px;
    resize: none;
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
    color: white;
}

.cancel {
    background: #ef4444;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    cursor: pointer;
    color: white;
}
</style>