<template>
    <div>
        <h2>Watchlist</h2>
        <ul>
            <li v-for="item in watchlist" :key="item.id" @click="viewStockData(item.symbol)">
                {{ item.symbol }}
            </li>
        </ul>
        <p>This is a basic watchlist that displays your previously searched stocks.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tiphlesxbpsbcravzisp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcGhsZXN4YnBzYmNyYXZ6aXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYzNjcsImV4cCI6MjAyNzgxMjM2N30.xSmje4zch2Z4urmZ_Kj3yx9qeuZe8_6guQnXk_bCtJ0'

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const router = useRouter();
const watchlist = ref([]);

const fetchWatchlist = async () => {
    console.log('fetchWatchlist working watchlist');
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        console.log('User watchlist authenticated:', user);
        const { data: searchHistory, error } = await supabase
            .from('search_history')
            .select('*')
            .eq('user_id', user.id)
            .order('timestamp', { ascending: false });

        if (error) {
            console.error('Error fetching watchlist:', error);
        } else {
            watchlist.value = searchHistory;
        }
    }
};

onMounted(() => {
    fetchWatchlist();
});
</script>