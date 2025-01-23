<script lang="tsx" setup>
const { t } = useI18n();
</script>

<template>
  <div class="flex gap-3 items-center justify-center">
    <div
      class="border-[3px] border-primary-1 border-t-transparent animate-spin w-5 h-5 rounded-full"
    />
    <span class="opacity-60 pt-1">{{ t("labels.loading") }}</span>
  </div>
</template>
