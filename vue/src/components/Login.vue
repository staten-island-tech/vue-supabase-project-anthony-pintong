<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tiphlesxbpsbcravzisp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcGhsZXN4YnBzYmNyYXZ6aXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYzNjcsImV4cCI6MjAyNzgxMjM2N30.xSmje4zch2Z4urmZ_Kj3yx9qeuZe8_6guQnXk_bCtJ0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const emailLogin = ref('')
const passwordLogin = ref('')

const login = async () => {
  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: emailLogin.value,
      password: passwordLogin.value,
    })

    if (error) {
    } else {
      console.log('Success:', user)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>