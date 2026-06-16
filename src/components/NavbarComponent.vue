<script setup>
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../stores/global';

const store = useGlobalStore();
const { user } = storeToRefs(store);
// console.log(user.email)
// console.log("USER:", user.value);
</script>

<template>
	<nav class="navbar navbar-expand-lg sticky-top custom-navbar shadow-sm">

		<div class="container">

			<router-link :to="{ path: '/' }" class="navbar-brand fw-bold brand-text d-flex align-items-center gap-2">

				<!-- <img src="/favicon/favicon-32x32.png" alt="FitForge Logo" class="logo-img" /> -->
				FitForge
			</router-link>

			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">

				<div class="navbar-nav ms-auto">

					<router-link :to="{ name: 'Workouts' }" class="nav-link nav-item-custom">
						Workouts
					</router-link>

					<router-link :to="{ name: 'Register' }" class="nav-link nav-item-custom" v-if="!user.email">
						Register
					</router-link>

					<router-link :to="{ name: 'Login' }" class="nav-link nav-item-custom" v-if="!user.email">
						Login
					</router-link>

					<router-link :to="{ name: 'Logout' }" class="nav-link nav-item-custom text-danger"
						v-if="user.email">
						Logout
					</router-link>

				</div>

			</div>

		</div>

	</nav>
</template>

<style scoped>
.navbar-toggler {
	border: none;
}

.navbar-toggler-icon {
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 107, 0, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.custom-navbar {
	background: #0b0b0b;
	padding: 0.8rem 1rem;
	border-bottom: 1px solid rgba(255, 107, 0, 0.2);
}

.brand-text {
	color: #ffffff !important;
	font-size: 1.4rem;
	letter-spacing: 0.5px;
}

.logo-img {
	width: 28px;
	height: 28px;
	object-fit: contain;
}

.nav-item-custom {
	color: #e2e8f0 !important;
	font-weight: 500;
	padding: 6px 12px;
	border-radius: 8px;
	transition: 0.2s ease;
}

.nav-item-custom:hover {
	background: rgba(255, 107, 0, 0.15);
	color: #ff6b00 !important;
	transform: translateY(-1px);
}

.router-link-active {
	color: #ff6b00 !important;
	background: rgba(255, 107, 0, 0.2);
	border-radius: 8px;
}

.text-danger:hover {
	background: rgba(239, 68, 68, 0.15);
	color: #ef4444 !important;
}
</style>