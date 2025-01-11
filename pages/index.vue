<script lang="tsx" setup>
const modelValue = ref("");
</script>

<template>
  <div class="p-6">
    <AppInputText
      v-model="modelValue"
      placeholder="Localização ou coordenada"
      icon="fa-solid fa-location-dot"
      drag
    />
    <AppBtn>testeando</AppBtn>
  </div>
</template>
