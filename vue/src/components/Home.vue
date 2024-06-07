<template>
  <div class="home-container">
    <div class="text-container">
      <h1>Welcome to Our Stock Watcher Application</h1>
      <p>
        Our Stock Watcher application allows you to monitor and track your favorite stocks in real-time. Stay up to date with this ripoff.
      </p>
      <p>
        To get started, please sign up for an account or log in if you already have one. Once logged in, you can access the free tools and programs that will allow you to track your favorite stocks.
      </p>
      <ul class="links-container">
        <li v-if="!isLoggedin">
          <RouterLink to="/signup">Sign Up</RouterLink>
        </li>
        <li v-if="!isLoggedin">
          <RouterLink to="/login">Log In</RouterLink>
        </li>
        <li v-if="isLoggedin">
          <RouterLink to="/stock-search">Stock Search</RouterLink>
        </li> 
      </ul>
    </div>    
    <div class="img-container">
      <img src="https://t4.ftcdn.net/jpg/01/80/00/87/360_F_180008799_LrxYrSZdSzhnnGFK7do33AZffgJz9owL.jpg" alt="Stock Market">
    </div>
    <div v-if="isLoggedin" class="watchlist-container">
      <button @click="logout">Log Out</button>
      <Watchlist />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
import Watchlist from '../components/Watchlist.vue'

const supabaseUrl = 'https://tiphlesxbpsbcravzisp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcGhsZXN4YnBzYmNyYXZ6aXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYzNjcsImV4cCI6MjAyNzgxMjM2N30.xSmje4zch2Z4urmZ_Kj3yx9qeuZe8_6guQnXk_bCtJ0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const router = useRouter()

const isLoggedin = computed(() => {
  return localStorage.getItem('isLoggedin') === 'true'
})

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

<style scoped>
.home-container {
  height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  color: #333;
}

.text-container,
.img-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-container {
  padding: 0 20px;
}

p {
  max-width: 80%;
  text-align: center;
  margin-bottom: 20px;
}

.img-container img {
  max-width: 100%;
  max-height: 80vh;
}

.links-container {
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
}

.links-container li {
  margin-bottom: 10px;
}

.links-container a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.watchlist-container {
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
}
</style>