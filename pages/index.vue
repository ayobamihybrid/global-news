<script setup>
import { ref, computed } from 'vue';

const uri =
  'https://newsapi.org/v2/everything?q=tesla&from=2024-07-29&sortBy=publishedAt&apiKey=708479740d004a9c95f336573c72d503';
const { data: news, pending, error } = await useFetch(uri);

const currentPage = ref(1);
const itemsPerPage = 12;

const searchQuery = ref('');

const filteredNews = computed(() => {
  if (!news.value || !news.value.articles) return [];
  return news.value.articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredNews.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredNews.value.length / itemsPerPage)
);

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
      class="grid grid-cols-1 md:grid-cols-2 xl:grids-col-3 2xl:grid-cols-4 gap-5"
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
      <div v-else-if="paginatedNews.length === 0" class="col-span-full">
        No results found.
      </div>
      <div v-else v-for="n in paginatedNews" :key="n.url">
        <NewsCard :news="n" />
      </div>
    </div>

    <div
      class="absolute w-full bottom-[50px] flex justify-center items-center gap-x-4"
    >
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
