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
const director = ref('')
const year = ref('')
const genre = ref('')
const description = ref('')

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
    director.value = ''
    year.value = ''
    genre.value = ''
    description.value = ''
}

async function submitMovie() {

    if (!title.value || !director.value || !year.value || !genre.value) {
        return notyf.error("Please fill all required fields")
    }

    try {
        await api.post('/movies/addMovie', {
            title: title.value,
            director: director.value,
            year: year.value,
            genre: genre.value,
            description: description.value
        })

        notyf.success("Movie added 🎬")

        closeModal()
        emit('refresh')

    } catch (err) {
        notyf.error("Failed to add movie")
        console.error(err)
    }
}

defineExpose({
    openModal
})
</script>

<template>
    <button class="open-btn" @click="openModal">
        + Add Movie
    </button>

    <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">

        <div class="modal-box">

            <h3>Add Movie</h3>

            <input v-model="title" placeholder="Title" />
            <input v-model="director" placeholder="Director" />
            <input v-model.number="year" type="number" placeholder="Year (e.g. 2024)" />
            <input v-model="genre" placeholder="Genre" />

            <textarea v-model="description" placeholder="Description"></textarea>

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
    color: #0b0b0f;
}

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

input,
textarea {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.6rem;
    border-radius: 8px;
    border: none;
    background: #1f2937;
    color: white;
}

textarea {
    min-height: 90px;
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