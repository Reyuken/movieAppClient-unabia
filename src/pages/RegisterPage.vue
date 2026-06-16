<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '@/api'
import { useGlobalStore } from '@/stores/global'

const router = useRouter()
const store = useGlobalStore()
const notyf = new Notyf()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isEnabled = ref(false)

watch([email, password, confirmPassword], ([e, p, c]) => {
    isEnabled.value = e && p && c && p === c
})

async function handleRegister(e) {
    e.preventDefault()

    if (password.value !== confirmPassword.value) {
        return notyf.error('Passwords do not match')
    }

    try {
        await api.post('/users/register', {
            email: email.value,
            password: password.value
        })

        notyf.success('Account created successfully 🎬')

        router.push({ name: 'Login' })

    } catch (err) {
        const message =
            err.response?.data?.message ||
            'Registration failed'

        notyf.error(message)
    }
}
</script>

<template>
    <div class="register-page">

        <h1 class="title">Create Account</h1>

        <form class="register-card" @submit="handleRegister">

            <label>Email</label>
            <input v-model="email" type="email" placeholder="Enter email" />

            <label>Password</label>
            <input v-model="password" type="password" placeholder="Enter password" />

            <label>Confirm Password</label>
            <input v-model="confirmPassword" type="password" placeholder="Confirm password" />

            <button type="submit" :disabled="!isEnabled" :class="isEnabled ? 'btn-primary' : 'btn-disabled'">
                Register
            </button>

            <p class="footer">
                Already have an account?
                <router-link :to="{ name: 'Login' }">Login</router-link>
            </p>

        </form>

    </div>
</template>

<style scoped>
.register-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: radial-gradient(circle at top,
            #0b0b0f,
            #111827 60%,
            #1f2937 140%);

    color: #fff;
    padding: 2rem;
}

.title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #60a5fa;
    margin-bottom: 2rem;
    text-transform: uppercase;
}

.register-card {
    width: 320px;
    background: rgba(17, 24, 39, 0.9);
    border: 1px solid rgba(96, 165, 250, 0.2);
    border-radius: 16px;
    padding: 2rem;
}

label {
    display: block;
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #cbd5e1;
}

input {
    width: 100%;
    margin-top: 0.3rem;
    padding: 0.6rem;
    border-radius: 8px;
    border: none;
    background: #1f2937;
    color: white;
    outline: none;
}

input:focus {
    border: 1px solid #60a5fa;
}

.btn-primary {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.7rem;
    border-radius: 999px;
    border: none;
    background: #60a5fa;
    color: #0b0b0f;
    font-weight: bold;
    cursor: pointer;
}

.btn-disabled {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.7rem;
    border-radius: 999px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: #64748b;
    cursor: not-allowed;
}

.footer {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #94a3b8;
    text-align: center;
}

.footer a {
    color: #60a5fa;
}
</style>