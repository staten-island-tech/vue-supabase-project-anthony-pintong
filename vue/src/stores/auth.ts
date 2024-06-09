import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase, User } from '../supabase'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)

  async function getUser() {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw error
      currentUser.value = data.user
    } catch (err) {
      console.error(err)
    }
  }

  async function loginUser(email: string, password: string) {
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

  async function registerUser(email: string, password: string) {
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