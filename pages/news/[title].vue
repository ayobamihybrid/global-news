<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const article = ref(null);

onMounted(async () => {
  const title = route.params.title;

  if (title) {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        title
      )}&apiKey=1faf257ab7724e57b4500211c9067770`
    );
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      article.value = data.articles[0];
    } else {
      console.log('No articles found or data.articles is empty');
    }
  }
});
</script>

<template>
  <NuxtLink to="/" class="mb-2 flex items-center gap-1">
    <i class="pi pi-arrow-left"></i>
    <p>Back to home</p>
  </NuxtLink>

  <div class="w-full min-h-[100vh] mt-9 flex justify-center">
    <div
      class="max-w-[1000px] p-3 rounded-md bg-[#fff] shadow-md"
      v-if="article"
    >
      <img :src="`${article.urlToImage}`" class="w-[100%] h-[70%]" />

      <p class="text-[18px] lg:text-[20px] xl:text-[24px] font-bold my-4">
        {{ article.title }}
      </p>

      <div class="my-5 flex justify-between items-center">
        <div class="flex items-center gap-1">
          <i class="pi pi-user text-[#12b488] text-[30px] cursor-pointer"></i>
          <p class="text-[18px] font-bold">{{ article.author }}</p>
        </div>

        <p class="text-center text-sm">
          Published on: {{ article.publishedAt.slice(0, 10) }}
        </p>
      </div>

      <p>{{ article.content }}</p>
    </div>

    <div v-else class="col-span-full flex justify-center items-center">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<style scoped></style>
