import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)

  async function getUser() {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw error
      currentUser.value = data.user
    } catch (err) {
      console.error(error)
    }
  }

  async function loginUser(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      currentUser.value = data.user
    } catch (err) {
      console.error('Error logging in user:', err)
    }
  }

  async function logoutUser() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      currentUser.value = null
    } catch (err) {
      console.error('Error logging out user:', err)
    }
  }

  async function registerUser(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      currentUser.value = data.user
    } catch (err) {
      console.error('Error registering user:', err)
    }
  }

  return {
    currentUser,
    getUser,
    loginUser,
    logoutUser,
    registerUser,
  }
})