<script setup>
import { watch, ref, onBeforeMount } from 'vue';
import { Notyf } from 'notyf';
import { useGlobalStore } from '../stores/global';
import api from '@/api';
import { useRouter } from 'vue-router';

const store = useGlobalStore();
const router = useRouter();
const notyf = new Notyf();

const email = ref("");
const password = ref("");
const isEnabled = ref(false);

onBeforeMount(() => {
    if (store.user.token) {
        router.push({ path: '/movies' });
    }
});

watch([email, password], ([e, p]) => {
    isEnabled.value = e !== "" && p !== "";
});

async function handleSubmit(e) {
    e.preventDefault();

    try {
        const res = await api.post('/users/login', {
            email: email.value,
            password: password.value
        });

        const token = res.data.access;

        notyf.success("Login Successful");

        store.setUser(token);
        await store.getUserDetails();

        email.value = "";
        password.value = "";

        router.push({ path: '/movies' });

    } catch (err) {
        const message =
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Login Failed. Please contact administrator.";

        notyf.error(message);
    }
}
</script>

<template>
    <div class="login-page">

        <h1 class="title">Login</h1>

        <div class="login-container">

            <form @submit="handleSubmit" class="login-card">

                <div class="mb-3">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-control custom-input" v-model="email" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control custom-input" v-model="password" />
                </div>

                <div class="d-grid mt-4">

                    <button type="submit" class="btn-primary" v-if="isEnabled">
                        Login
                    </button>

                    <button type="submit" class="btn-disabled" disabled v-else>
                        Login
                    </button>

                </div>

            </form>

            <div class="footer-text">
                Don't have an account yet?
                <router-link :to="{ name: 'Register' }">Click here</router-link>
                to register
            </div>

        </div>

    </div>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: radial-gradient(circle at top,
            #0b0b0f,
            #111827 60%,
            #1f2937 140%);

    color: #ffffff;
    padding: 2rem 1rem;
}

/* TITLE */
.title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #60a5fa;
    margin-bottom: 2rem;
    letter-spacing: 1px;
    text-transform: uppercase;
}

/* CARD */
.login-card {
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(12px);

    border: 1px solid rgba(96, 165, 250, 0.25);
    border-radius: 16px;

    padding: 2rem;

    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* LABELS */
.form-label {
    color: #cbd5e1;
    font-size: 0.9rem;
}

/* INPUTS */
.custom-input {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #fff;
}

.custom-input:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.2);
}

/* BUTTON */
.btn-primary {
    background: #60a5fa;
    border: none;
    color: #0b0b0f;

    padding: 0.8rem;
    border-radius: 999px;
    font-weight: 700;

    transition: 0.2s ease;
}

.btn-primary:hover {
    background: #3b82f6;
    transform: translateY(-2px);
}

.btn-disabled {
    background: rgba(255, 255, 255, 0.08);
    color: #64748b;
    padding: 0.8rem;
    border-radius: 999px;
}

/* FOOTER */
.footer-text a {
    color: #60a5fa;
}
</style>