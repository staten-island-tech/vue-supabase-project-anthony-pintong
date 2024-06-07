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
        <li v-if="isLoggedin">
          <RouterLink to="/logout">Log Out</RouterLink>
        </li>
      </ul>
    </div>
    <div class="img-container">
      <img src="https://t4.ftcdn.net/jpg/01/80/00/87/360_F_180008799_LrxYrSZdSzhnnGFK7do33AZffgJz9owL.jpg" alt="Stock Market">
    </div>
    <div v-if="isLoggedin" class="watchlist-container">
      <Watchlist />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import Watchlist from '../components/Watchlist.vue'

const isLoggedin = computed(() => {
  return localStorage.getItem('isLoggedin') === 'true';
});
</script>

<style scoped>
.home-container {
  width: 100vw;
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
  max-height: 300px; 
  overflow-y: auto; 
}
</style>