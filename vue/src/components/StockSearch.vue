<template>
      <button @click="logout">Log Out</button>
  <div class="top">
    <div class="search-container">
      <form @submit.prevent="fetchData">
        <input id="search-input" v-model="symbol" type="text" placeholder="AAPL" />
        <button type="submit">Search</button>
        <label for="search-input">Enter a Stock Ticker</label>

        <div class="filter-container">
          <input type="checkbox" id="Open" v-model="openCheckbox" />
          <label for="Open"> Open</label><br />
          <input type="checkbox" id="High" v-model="highCheckbox" />
          <label for="High"> High</label><br />
          <input type="checkbox" id="Low" v-model="lowCheckbox" />
          <label for="Low"> Low</label><br />
          <input type="checkbox" id="Close" v-model="closeCheckbox" />
          <label for="Close"> Close</label><br />
          <input type="checkbox" id="Volume" v-model="volumeCheckbox" />
          <label for="Volume"> Volume</label><br />
        </div>
      </form>
    </div>
  </div>

  <div class="centered-content">
    <h1>Finds Information on Stocks</h1>
    <div id="results" ref="resultsContainer"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'

const supabaseUrl = 'https://tiphlesxbpsbcravzisp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcGhsZXN4YnBzYmNyYXZ6aXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYzNjcsImV4cCI6MjAyNzgxMjM2N30.xSmje4zch2Z4urmZ_Kj3yx9qeuZe8_6guQnXk_bCtJ0'

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const symbol = ref('AAPL')
const openCheckbox = ref(true)
const highCheckbox = ref(true)
const lowCheckbox = ref(true)
const closeCheckbox = ref(true)
const volumeCheckbox = ref(true)
const resultsContainer = ref(null)
const router = useRouter()

const fetchData = async () => {
  try {
    const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol.value}&interval=1min&outputsize=1&apikey=929916a64d344125af4e6f6b6ee54b21`);
    const data = await response.json();
    console.log(data);

    if (data.status === 'ok') {
      Printx(data);
      console.log('Ticker saved good:', symbol.value);
      await saveSearchToSupabase(symbol.value);
    } else {
      resultsContainer.value.insertAdjacentHTML('afterbegin', '<p>Stock ticker is not valid.</p>');
    }
  } catch (error) {
    console.error('Problem:', error.message);
  }
};

const Printx = (data) => {
  resultsContainer.value.innerHTML = '';
  data.values.forEach((x) => {
    let INSERTING = `
      <div class='cell'>
        <div class='text-container'>
          <h2>Datetime: ${x.datetime}</h2>
          ${openCheckbox.value ? `<p>Open: ${x.open}</p>` : ''}
          ${highCheckbox.value ? `<p>High: ${x.high}</p>` : ''}
          ${lowCheckbox.value ? `<p>Low: ${x.low}</p>` : ''}
          ${closeCheckbox.value ? `<p>Close: ${x.close}</p>` : ''}
          ${volumeCheckbox.value ? `<p>Volume: ${x.volume}</p>` : ''}
        </div>
      </div>
    `
    resultsContainer.value.insertAdjacentHTML('afterbegin', INSERTING)
  })
}

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

fetchData()

const saveSearchToSupabase = async (ticker) => {
  console.log('Saved:', ticker);
  
  const { data: { user } } = await supabase.auth.getUser();
  console.log('User:', user);
  
  if (user) {
    const { data, error } = await supabase
      .from('search_history')
      .insert({ user_id: user.id, symbol: ticker, timestamp: new Date().toISOString() });
    
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Success:', data);
    }
  }
};

fetchData();
</script>

<style scoped>
body {
  display: grid;
  text-align: center;
  place-items: center;
  min-height: 100vh;
  font-size: 1.1em;
  color: #000000;
}

.page {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 3px solid gray;
  padding: 10px;
  text-align: center;
  border-radius: 15px;
  margin: 0 auto;
  background-color: #f0f0f0;
  font-size: 1.2em;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
}

#results {
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-size: 1.1em;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: #ffffff;
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 5px;
}
</style>