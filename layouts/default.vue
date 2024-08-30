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
          <li class="text-[18px]">
            <NuxtLink to="/">Latest news</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <div class="max-w-[2000px] mx-auto p-9">
      <slot />
    </div>

    <footer
      class="absolute w-full bottom-0 shadow-sm bg-white flex justify-center"
    >
      <nav class="max-w-[2000px] mx-auto py-4 px-9 flex justify-between">
        <NuxtLink to="/" class="text-[24px] font-bold">
          <p>View repo</p>
        </NuxtLink>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
