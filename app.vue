<script setup lang="tsx">
const { locale, t } = useI18n();

watch(
  () => locale.value,
  () => {
    useHead({
      link: [{ rel: "manifest", href: "manifest.json" }],
      meta: [
        {
          name: "description",
          content: t("description"),
        },
      ],
      htmlAttrs: {
        lang: locale.value,
      },
    });
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="!h-screen flex flex-col overflow-hidden">
    <NuxtPage />
    <AppConfirmDialog />
    <AppNotification />
  </div>
</template>
