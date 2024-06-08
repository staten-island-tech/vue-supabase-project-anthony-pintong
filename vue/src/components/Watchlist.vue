<template>
    <div>
        <h2>Watchlist</h2>
        <p>This is a basic watchlist that displays your previously searched stocks.</p>
        <button @click="deleteAllSearchHistory">Delete All</button>
        <ul>
            <li v-for="item in watchlist" :key="item.id">
                <div class="stock-symbol" @click="viewStockData">{{ item.symbol }}</div>
                <button @click="deleteSearchHistory(item.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tiphlesxbpsbcravzisp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcGhsZXN4YnBzYmNyYXZ6aXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYzNjcsImV4cCI6MjAyNzgxMjM2N30.xSmje4zch2Z4urmZ_Kj3yx9qeuZe8_6guQnXk_bCtJ0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const router = useRouter();
const watchlist = ref([]);

const fetchWatchlist = async () => {
    const { data: { user } } = await supabase.auth.getUser(); 

    if (user) {
        const { data: searchHistory } = await supabase
            .from('search_history')
            .select('')
            .eq('user_id', user.id) 
            .order('timestamp', { ascending: false }); 

        watchlist.value = searchHistory;
    }
};
fetchWatchlist();
const deleteSearchHistory = async (itemId) => {
    await supabase.from('search_history').delete().eq('id', itemId);
    fetchWatchlist();
};

const deleteAllSearchHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        await supabase.from('search_history').delete().eq('user_id', user.id);
        fetchWatchlist();
    }
};

const viewStockData = () => {
    router.push({ name: 'stock-search' });
};

fetchWatchlist();
</script>

<style scoped>
.stock-symbol {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
}
</style>