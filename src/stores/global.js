import { defineStore } from 'pinia'
import { reactive } from 'vue'
import api from '../api.js'

export const useGlobalStore = defineStore('global', () => {

    const user = reactive({
        token: localStorage.getItem('token') || null,
        email: null,
        isAdmin: false
    })

    async function getUserDetails() {
        const token = localStorage.getItem('token')
        user.token = token

        if (!token) {
            clearUser()
            return
        }

        try {
            const { data } = await api.get('/users/details')

            user.email = data.user.email
            user.isAdmin = data.user.isAdmin || false

        } catch (err) {
            console.error('Failed to fetch user details:', err)
            clearUser()
        }
    }

    function setUser(token) {
        user.token = token
        localStorage.setItem('token', token)

        getUserDetails()
    }

    function clearUser() {
        user.token = null
        user.email = null
        user.isAdmin = false
        localStorage.removeItem('token')
    }

    return {
        user,
        getUserDetails,
        setUser,
        clearUser
    }
})