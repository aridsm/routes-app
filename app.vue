<script setup lang="tsx">
useHead({
  link: [{ rel: "manifest", href: "manifest.json" }],
});
</script>

<template>
  <div class="h-screen">
    <NuxtPage />
    <AppConfirmDialog />
    <AppNotification />
  </div>
</template>
