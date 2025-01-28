<script setup lang="tsx">
useHead({
  link: [{ rel: "manifest", href: "manifest.json" }],
});
</script>

<template>
  <div class="!h-[100svh] flex flex-col overflow-hidden">
    <NuxtPage />
    <AppConfirmDialog />
    <AppNotification />
  </div>
</template>
