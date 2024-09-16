<template>
  <div class="relative min-h-[100vh]">
    <header class="shadow-sm bg-white">
      <nav class="max-w-[2000px] mx-auto py-4 px-9 flex justify-between">
        <NuxtLink to="/" class="text-[36px] font-bold">
          <div class="flex gap-1 items-center">
            <p>Global news</p>
            <img src="../public/glob.jpeg" alt="" class="w-[40px] h-[40px]" />
          </div>
        </NuxtLink>

        <ul class="flex gap-4 items-center">
          <li class="text-[18px]"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="text-[18px]"><NuxtLink to="/about">About</NuxtLink></li>
          <i class="pi pi-user text-[25px] cursor-pointer"></i>
        </ul>
      </nav>
    </header>

    <div class="max-w-[2000px] mx-auto p-9">
      <slot />
    </div>

    <footer
      class="absolute w-full bottom-[-50px] shadow-sm bg-white flex justify-center"
    >
      <nav class="max-w-[2000px] mx-auto py-4 px-9 flex justify-between">
        <!-- <NuxtLink to="/https://github.com/ayobamihybrid/global-news">
          <p class="text-[24px] font-bold">View repo</p>
        </NuxtLink> -->

        <a href="https://github.com/ayobamihybrid/global-news" target="_blank"
          >View repo</a
        >
      </nav>
    </footer>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
