<template>
    <div>
      <h2>Logout</h2>
      <form @submit.prevent="logout">
        <button @click="signOut">Log Out</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  

<script setup>
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tiphlesxbpsbcravzisp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcGhsZXN4YnBzYmNyYXZ6aXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYzNjcsImV4cCI6MjAyNzgxMjM2N30.xSmje4zch2Z4urmZ_Kj3yx9qeuZe8_6guQnXk_bCtJ0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function signOut() {
  console.log('Signing out')
  const { error } = await supabase.auth.signOut({ scope: 'local' })
}


</script>

<style lang="scss" scoped>

</style>