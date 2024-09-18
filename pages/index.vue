<script setup>
import { ref, computed, onMounted } from 'vue';

const uri =
  'https://newsapi.org/v2/everything?q=tesla&from=2024-08-17&sortBy=publishedAt&apiKey=1faf257ab7724e57b4500211c9067770';

let news = ref(null);
let pending = ref(true);
let error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(uri);
    const data = await response.json();
    console.log('Raw API response:', data);

    if (data && data.articles && data.articles.length > 0) {
      news.value = data.articles;
      console.log('Processed news data:', news.value);
      pending.value = false;
    } else {
      error.value = new Error('No articles found in the response');
      pending.value = false;
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = err;
    pending.value = false;
  }
});

const currentPage = ref(1);
const itemsPerPage = 12;

const searchQuery = ref('');

const filteredNews = computed(() => {
  if (!news.value || !news.value.articles) return [];
  return news.value.articles.filter((article) =>
    article?.title?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedNews = computed(() => {
  if (!news.value || !Array.isArray(news.value)) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return news.value.slice(start, end);
});

const newsAvailable = computed(() => {
  return news.value && Array.isArray(news.value) && news.value.length > 0;
});

const totalPages = computed(() => {
  if (!filteredNews.value) return 0;
  return Math.ceil(filteredNews.value.length / itemsPerPage);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<template>
  <div class="relative min-h-[100vh]">
    <div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search news..."
        class="w-[30%] border rounded py-2 px-3 mb-5"
      />
    </div>

    <h2 class="text-[30px] font-bold my-2">Latest posts</h2>

    <div
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
    >
      <div
        v-if="pending"
        class="col-span-full flex justify-center items-center"
      >
        <div class="spinner"></div>
      </div>

      <div v-else-if="error" class="col-span-full">
        Error: {{ error.message }}
      </div>

      <div v-else-if="!newsAvailable" class="col-span-full">
        <p class="text-center">No news available</p>
      </div>

      <template v-else>
        <NewsCard
          v-for="(article, index) in paginatedNews"
          :key="index"
          :news="article"
        />
      </template>
    </div>

    <div class="w-full mt-9 flex justify-center items-center gap-x-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-[#12b488] text-white rounded disabled:bg-gray-300"
      >
        Previous
      </button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-[#12b488] text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped></style>
