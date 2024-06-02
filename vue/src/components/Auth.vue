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

export default {
  setup() {
    const email = ref ("")
    const password = ref ("")
    const errorMessage = ref ("")

    const login = async () => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        })

        if (error) {
          errorMessage.value = error.message
        } else {
          console.log("Login successful:", data)
        }
      } catch (error) {
        errorMessage.value = "Error ocurred during login"
      }
    }

    return {
      email,
      password,
      errorMessage,
      login,
    }


  }
}




</script>

<style lang="scss" scoped>

</style>