<script setup>
import { watch, ref, onBeforeMount } from 'vue';
import { Notyf } from 'notyf';
import { useGlobalStore } from '../stores/global';
import { useRouter } from 'vue-router';
import api from '../api.js';

const store = useGlobalStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPass = ref("");
const isEnabled = ref(false);

const notyf = new Notyf();

onBeforeMount(() => {
    if (store.user.token) {
        router.push({ path: '/workouts' });
    }
});

watch([email, password, confirmPass], (vals) => {
    isEnabled.value =
        vals.every(v => v !== "") &&
        password.value === confirmPass.value;
});

async function handleSubmit(e) {
    e.preventDefault();

    if (password.value.length < 8) {
        notyf.error("Password must be at least 8 characters");
        return;
    }

    if (password.value !== confirmPass.value) {
        notyf.error("Passwords do not match");
        return;
    }

    try {
        const res = await api.post('/users/register', {
            email: email.value,
            password: password.value
        });

        if (res.status === 201) {
            notyf.success("Account created");

            email.value = "";
            password.value = "";
            confirmPass.value = "";

            router.push({ path: '/login' });
        }

    } catch (err) {
        const message =
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Registration failed";

        notyf.error(message);
    }
}
</script>

<template>
    <div class="container-fluid">
        <h1 class="title my-5 text-center">Join FitForge</h1>

        <div class="row justify-content-center">
            <div class="col-md-5 border rounded-3 p-5">

                <form @submit="handleSubmit">

                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" v-model="email" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control" v-model="password" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" v-model="confirmPass" />
                    </div>

                    <div class="d-grid mt-4">
                        <button type="submit" class="btn btn-primary" v-if="isEnabled">
                            Create Account
                        </button>

                        <button type="button" class="btn btn-danger" disabled v-else>
                            Create Account
                        </button>
                    </div>

                </form>

            </div>
        </div>
    </div>
</template>
<style scoped>
.container-fluid {
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

.col-md-5 {
    width: 100%;
    max-width: 420px;

    background: rgba(20, 20, 20, 0.85);
    backdrop-filter: blur(12px);

    border: 1px solid rgba(255, 107, 0, 0.25) !important;
    border-radius: 16px !important;

    padding: 2rem !important;

    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.form-label {
    color: #cbd5e1;
    font-size: 0.9rem;
}

.form-control {
    background: rgba(10, 10, 10, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    border-radius: 10px;
    padding: 0.75rem;
}

.form-control:focus {
    border-color: #ff6b00;
    box-shadow: 0 0 0 0.2rem rgba(255, 107, 0, 0.2);
    background: rgba(10, 10, 10, 0.9);
    color: #fff;
}

.d-grid {
    margin-top: 2rem !important;
}

.btn-primary {
    background: #ff6b00;
    border: none;
    color: #000;

    font-weight: 700;
    border-radius: 999px;
    padding: 0.8rem;

    transition: 0.2s ease;
}

.btn-primary:hover {
    background: #ff7a1a;
    transform: translateY(-2px);
}

.btn-danger {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #888;

    border-radius: 999px;
    padding: 0.8rem;
}
</style>