<script setup>

import { watch, ref } from 'vue';
import { Notyf } from 'notyf';
import { useGlobalStore } from '../stores/global';
import { onBeforeMount } from 'vue';
import api from '@/api';

import { useRouter } from 'vue-router';

const store = useGlobalStore();
const getUserDetails = store.getUserDetails;

const router = useRouter();

const email = ref("");
const password = ref("");
const isEnabled = ref(false);

const notyf = new Notyf();
onBeforeMount(() => {
    if (store.user.token) {
        router.push({ path: '/workouts' })
    }
})
watch([email, password], (currentValue, oldValue) => {

    if (currentValue.every(input => input !== "")) {
        isEnabled.value = true
    } else {
        isEnabled.value = false
    }
});

async function handleSubmit(e) {
    e.preventDefault();

    try {

        let res = await api.post('/users/login', {

            email: email.value,
            password: password.value
        })

        if (res.data) {
            notyf.success("Login Successful");

            localStorage.setItem("token", res.data.access);

            await getUserDetails(res.data.access);

            email.value = "";
            password.value = "";

            router.push({ path: '/workouts' })

        }

    } catch (err) {

        console.log("FULL ERROR:", err)
        const message = err.response?.data?.message || err.response?.data?.error || "Login Failed. Please contact administrator.";
        if (err.response) {

            console.log("STATUS:", err.response.status)
            console.log("DATA:", err.response.data)

        } else {

            console.log("No response from backend")
            console.log(err.message)

        }
        notyf.error(message);
    }

}
</script>

<template>
    <div class="login-page">

        <h1 class="title">Login Page</h1>

        <div class="login-container">

            <form @submit="handleSubmit" class="login-card">

                <div class="mb-3">
                    <label for="emailInput" class="form-label">Email Address</label>
                    <input type="email" class="form-control custom-input" id="emailInput" v-model="email" />
                </div>

                <div class="mb-3">
                    <label for="passwordInput" class="form-label">Password</label>
                    <input type="password" class="form-control custom-input" id="passwordInput" v-model="password" />
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
            #111111,
            #0b0b0b 60%,
            #1f2937 140%);

    color: #ffffff;
    padding: 2rem 1rem;
}

.title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #ff6b00;
    margin-bottom: 2rem;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.login-card {
    background: rgba(20, 20, 20, 0.85);
    backdrop-filter: blur(12px);

    border: 1px solid rgba(255, 107, 0, 0.25);
    border-radius: 16px;

    padding: 2rem;

    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.form-label {
    color: #cbd5e1;
    font-size: 0.9rem;
}

.custom-input {
    background: rgba(10, 10, 10, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
}

.custom-input:focus {
    border-color: #ff6b00;
    box-shadow: 0 0 0 0.2rem rgba(255, 107, 0, 0.2);
}

.btn-primary {
    background: #ff6b00;
    border: none;
    color: #000;

    padding: 0.8rem;
    border-radius: 999px;
    font-weight: 700;

    transition: 0.2s ease;
}

.btn-primary:hover {
    background: #ff7a1a;
    transform: translateY(-2px);
}

.btn-disabled {
    background: rgba(255, 255, 255, 0.1);
    color: #888;
    padding: 0.8rem;
    border-radius: 999px;
}

.footer-text a {
    color: #ff6b00;
}
</style>