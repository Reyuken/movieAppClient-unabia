import { defineStore } from 'pinia'
import { reactive } from 'vue'
import api from '../api.js'

export const useGlobalStore = defineStore('global', () => {

    const user = reactive({
        token: localStorage.getItem('token') || null,
        email: null
    })

    async function getUserDetails() {

        user.token = localStorage.getItem('token')

        if (!user.token) {
            clearUser()
            return
        }

        try {
            const { data } = await api.get('/users/details')

            // console.log("DETAILS RESPONSE:", data)

            // backend: { user: { email: ... } }
            user.email = data.user.email

        } catch (err) {
            console.error('Failed to fetch user details:', err)
            clearUser()
        }
    }

    function setUser(token) {
        user.token = token
        localStorage.setItem('token', token)
    }

    function clearUser() {
        user.token = null
        user.email = null
        localStorage.removeItem('token')
    }

    return {
        user,
        getUserDetails,
        setUser,
        clearUser
    }
})