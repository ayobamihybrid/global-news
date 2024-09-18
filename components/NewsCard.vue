<script setup>
const props = defineProps({
  news: {
    type: Object,
    required: true,
  },
});

const hasTitle = computed(() => Boolean(props.news?.title));
const hasAuthor = computed(() => Boolean(props.news?.author));
const hasImage = computed(() => Boolean(props.news?.urlToImage));
</script>

<template>
  <div class="card">
    <img
      v-if="hasImage"
      :src="news.urlToImage"
      class="h-[60%]"
      alt="News image"
    />
    <div v-else class="h-[60%] bg-gray-200 flex items-center justify-center">
      No image available
    </div>

    <p v-if="hasTitle" class="font-bold text-gray-500 my-4">
      {{
        news.title.length > 80 ? news.title.slice(0, 70) + '...' : news.title
      }}
    </p>
    <p v-else class="font-bold text-gray-500 my-4">No title available</p>

    <div class="flex justify-between items-center">
      <div class="flex items-center gap-1">
        <i class="pi pi-user text-[#12b488] cursor-pointer"></i>
        <p v-if="hasAuthor">
          {{
            news.author.length > 30
              ? news.author.slice(0, 30) + '...'
              : news.author
          }}
        </p>
        <p v-else>Unknown author</p>
      </div>

      <NuxtLink
        :to="{ name: 'news-title', params: { title: news.title || 'news' } }"
      >
        <p class="btn my-4">Read more</p>
      </NuxtLink>
    </div>
  </div>
</template>
