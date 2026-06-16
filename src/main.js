import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import 'notyf/notyf.min.css';

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import HomePage from './pages/HomePage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LoginPage from './pages/LoginPage.vue';
import LogoutPage from './pages/LogoutPage.vue';
import MoviesPage from './pages/MoviesPage.vue';
import ErrorPage from './pages/ErrorPage.vue';

import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({

	history: createWebHashHistory(),

	routes: [
		{
			path: '/',
			name: 'Home',
			component: HomePage
		},
		{
			path: '/register',
			name: 'Register',
			component: RegisterPage
		},
		{
			path: '/login',
			name: 'Login',
			component: LoginPage
		},
		{
			path: '/logout',
			name: 'Logout',
			component: LogoutPage
		},
		{
			path: '/movies',
			name: 'Movies',
			component: MoviesPage
		},
		{
			path: '/:catchAll(.*)*',
			name: 'Error',
			component: ErrorPage
		}
	]
})


const app = createApp(App);

app.use(createPinia());

app.use(router);
app.mount('#app'); 
