<template>
  <div class="container">
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input">
          <input id="email" type="email" placeholder="Email" v-model="email" required />
        </div>
        <div>
          <input id="password" type="password" placeholder="Password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <RouterLink to="/signup">Sign Up!</RouterLink></p>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'
const supabaseUrl = 'https://tiphlesxbpsbcravzisp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcGhsZXN4YnBzYmNyYXZ6aXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYzNjcsImV4cCI6MjAyNzgxMjM2N30.xSmje4zch2Z4urmZ_Kj3yx9qeuZe8_6guQnXk_bCtJ0'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

function hide() {
   errorMessage.value = '';
}

const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) {
    console.error('Error:', error)
    errorMessage.value = 'Invalid login credentials. Please try again.'
    setTimeout(hide, 1500);
  } else {
    successMessage.value = 'Login successful. Redirecting...'
    setTimeout(() => {
      router.push('/stock-search')
    }, 2000)
    localStorage.setItem('isLoggedin', 'true')
  }
}
</script>

<style>
.form-container{
  width: 90%;
  max-width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
  padding: 50px 60px 70px;
  text-align: center;
}
.form-container h2{
  font-size: 30px;
  margin-bottom: 60px;
  color: green;
}
.form-container h2::after{
  content: '';
  width: 50px;
  height: 5px;
  border-radius: 10rem;
  background: green;
  position: absolute;
  bottom: 240px;
  left: 50%;
  transform: translateX(-50%);
}
input {
  margin-bottom: 5px;
}
.error-message {
  color: red;
  margin-top: 10px;
}
.success-message {
  color: green;
  margin-top: 10px;
}
</style>