<script setup>
import { ref } from 'vue'
import api from '@/api.js'
import { Notyf } from 'notyf'

const emit = defineEmits(['found', 'clear'])

const notyf = new Notyf()

const searchId = ref('')
const isSearching = ref(false)

async function searchMovie() {
    if (!searchId.value.trim()) return

    isSearching.value = true

    try {
        const res = await api.get(`/movies/getMovie/${searchId.value}`)

        const movie = res.data.movie || res.data

        emit('found', movie)
    } catch (err) {
        notyf.error('Movie not found')
        emit('clear')
    } finally {
        isSearching.value = false
    }
}

function clearSearch() {
    searchId.value = ''
    emit('clear')
}
</script>

<template>
    <div class="search-bar">
        <input v-model="searchId" type="text" placeholder="Search movie by ID..." />

        <button @click="searchMovie" :disabled="isSearching">
            {{ isSearching ? 'Searching...' : 'Search' }}
        </button>

        <button v-if="searchId" @click="clearSearch">
            Clear
        </button>
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 2rem;
}

input {
    flex: 1;
    padding: 0.6rem;
    border-radius: 8px;
    border: 1px solid #ccc;
}

button {
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
</style>