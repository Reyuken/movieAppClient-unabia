<script setup>
import { useGlobalStore } from '../stores/global';
import { storeToRefs } from 'pinia';

const store = useGlobalStore();
const { user } = storeToRefs(store);
</script>

<template>
	<nav class="navbar navbar-expand-lg sticky-top custom-navbar shadow-sm">
		<div class="container">

			<router-link :to="{ path: '/' }" class="navbar-brand fw-bold brand-text d-flex align-items-center gap-2">
				MovieVault
			</router-link>

			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNavAltMarkup"> 
				<div class="navbar-nav ms-auto">

					<div v-if="user?.isAdmin" class="admin-badge">
						<span class="dot"></span>
						Admin
					</div>

					<router-link :to="{ name: 'Movies' }" class="nav-link nav-item-custom">
						Movies
					</router-link>

					<!-- <router-link v-if="user?.token && !user?.isAdmin" :to="{ name: 'Watchlist' }"
						class="nav-link nav-item-custom">
						My List
					</router-link> -->

					<!-- Admin dashboard -->
					<!-- <router-link v-if="user?.isAdmin" :to="{ name: 'AdminMoviesCatalogPage' }"
						class="nav-link nav-item-custom">
						Admin Dashboard
					</router-link> -->

					<router-link v-if="!user?.token" :to="{ name: 'Register' }" class="nav-link nav-item-custom">
						Register
					</router-link>

					<router-link v-if="!user?.token" :to="{ name: 'Login' }" class="nav-link nav-item-custom">
						Login
					</router-link>

					<router-link v-if="user?.token" :to="{ name: 'Logout' }"
						class="nav-link nav-item-custom text-danger">
						Logout
					</router-link>

				</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.admin-badge {
	color: #38bdf8;
	font-weight: 700;
	font-size: 0.85rem;
	letter-spacing: 0.8px;

	display: flex;
	align-items: center;
	gap: 6px;

	padding: 6px 10px;
	margin-right: 10px;

	border: 1px solid rgba(56, 189, 248, 0.4);
	background: rgba(56, 189, 248, 0.08);
	border-radius: 999px;
	text-transform: uppercase;
}

.admin-badge .dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #22c55e;
	box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}

.custom-navbar {
	background: #0b0b0f;
	padding: 0.8rem 1rem;
}

.brand-text {
	color: #f1f5f9 !important;
	font-size: 1.4rem;
	letter-spacing: 0.5px;
}

.nav-item-custom {
	color: #e2e8f0 !important;
	font-weight: 500;
	padding: 6px 12px;
	border-radius: 8px;
	transition: 0.2s ease;
}

.nav-item-custom:hover {
	background: rgba(59, 130, 246, 0.15);
	color: #60a5fa !important;
	transform: translateY(-1px);
}

.router-link-active {
	color: #60a5fa !important;
	background: rgba(59, 130, 246, 0.2);
	border-radius: 8px;
}

.text-danger:hover {
	background: rgba(239, 68, 68, 0.15);
	color: #ef4444 !important;
}
</style>