<template>
  <div class="container">
    <div class="form-container">
      <h2>Sign Up</h2>
      <form @submit.prevent="signUp">
        <div class="input">
          <input id="email" type="email" placeholder="Email" v-model="email" required />
        </div>
        <div>
          <input id="password" type="password" placeholder="Password" v-model="password" required />
        </div>
        <button type="submit">Sign Up</button>
        <p>Already have an account? <RouterLink to="/login">Log in!</RouterLink></p>
      </form>
      <p v-if="errorMessage" class="success-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.ts'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

const signUp = async () => {
  try {
    const { error } = await authStore.registerUser(email.value, password.value)
    if (error) {
      errorMessage.value = 'Success. Redirecting to login page...'
    } else {
      successMessage.value = 'Success. Redirecting to login page...'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = 'Success. Redirecting to login page...'
    setTimeout(() => {
        router.push('/login')
      }, 2000)
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