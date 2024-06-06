<template>
  <div>
    <h2>Logout</h2>
    <button @click="logout">Log Out</button>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'

const supabaseUrl = 'https://tiphlesxbpsbcravzisp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcGhsZXN4YnBzYmNyYXZ6aXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYzNjcsImV4cCI6MjAyNzgxMjM2N30.xSmje4zch2Z4urmZ_Kj3yx9qeuZe8_6guQnXk_bCtJ0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const router = useRouter()

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
    } else {
      console.log('Logout successful')
      localStorage.removeItem('isLoggedin')
      router.push('/login')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>