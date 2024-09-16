<template>
  <div class="card">
    <img :src="`${news.urlToImage}`" class="h-[60%]" />

    <p class="font-bold text-gray-500 my-4">
      {{
        news.title.length > 80 ? news.title.slice(0, 70) + '...' : news.title
      }}
    </p>

    <div class="flex justify-between items-center">
      <div class="flex items-center gap-1">
        <i class="pi pi-user text-[#12b488] cursor-pointer"></i>

        <p>
          {{
            news.author.length > 30
              ? news.author.slice(0, 30) + '...'
              : news.author
          }}
        </p>
      </div>

      <NuxtLink :to="{ name: 'news-title', params: { title: news.title } }">
        <p class="btn my-4">Read more</p>
      </NuxtLink>
    </div>

    <!-- <p class="text-center text-sm">
      Published on: {{ news.publishedAt.slice(0, 10) }}
    </p> -->
  </div>
</template>

<script setup>
const { news } = defineProps(['news']);
</script>

<style scoped></style>
