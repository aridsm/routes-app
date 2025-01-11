<script lang="tsx" setup>
const locomotions = [
  {
    id: "car",
    text: "Carro",
    icon: "fa-solid fa-car",
  },
  {
    id: "bicycle",
    text: "Bicicleta",
    icon: "fa-solid fa-bicycle",
  },
  {
    id: "feet",
    text: "A pé",
    icon: "fa-solid fa-person-walking",
  },
];

const routeForm = ref({
  locomotion: "car",
  destinies: [
    {
      id: 1,
      value: "",
    },
    {
      id: 2,
      value: "",
    },
  ],
});
</script>

<template>
  <main class="flex-1 min-h-0 flex flex-col">
    <div class="px-6 flex justify-between mb-4">
      <div
        class="bg-primary-1/[.1] h-8 rounded-full leading-none pr-6 pl-2 text-primary-1 text-sm gap-3 flex items-center"
      >
        <button title="Voltar">
          <font-awesome-icon
            icon="fa-solid fa-circle-chevron-left"
            class="text-xl"
          />
          Voltar
        </button>
        <span class="pt-1">Minha nova rota</span>
      </div>

      <button
        class="w-9 h-9 rounded-full hover:bg-base-100 flex items-center justify-center"
        title="Opções"
      >
        <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
      </button>
    </div>
    <div class="flex-1 overflow-auto flex flex-col gap-8 pb-8">
      <section class="px-6">
        <h2 class="font-bold tracking-wide mb-2">Meio de locomoção</h2>

        <div class="flex gap-3 w-full">
          <button
            v-for="locomotion in locomotions"
            :key="locomotion.id"
            class="flex-1 bg-base-100 transition rounded-md h-11 flex items-center justify-center text-xl hover:bg-primary-2 hover:text-base-0"
            :class="{
              '!bg-primary-2 !text-base-0':
                routeForm.locomotion === locomotion.id,
            }"
            @click="routeForm.locomotion = locomotion.id"
          >
            <font-awesome-icon :icon="locomotion.icon" />
          </button>
        </div>
      </section>

      <section class="px-6">
        <h2 class="font-bold tracking-wide mb-2">
          Destinos ({{ routeForm.destinies.length }})
        </h2>

        <div class="flex flex-col gap-3">
          <div
            v-for="(destiny, index) in routeForm.destinies"
            :key="destiny.id"
            class="flex gap-2"
          >
            <AppInputText
              v-model="destiny.value"
              icon="fa-solid fa-location-dot"
              drag
              placeholder="Localização ou coordenada"
              class="flex-1"
            />
            <button
              v-if="index >= 2"
              class="w-9 h-9 rounded-full hover:bg-base-100 flex items-center justify-center"
              title="excluir"
              @click="routeForm.destinies.splice(index, 1)"
            >
              <font-awesome-icon icon="fa-regular fa-trash-can" />
            </button>
          </div>
        </div>

        <div class="flex justify-between items-center mt-3">
          <button
            class="bg-primary-1/[.1] rounded-full px-6 text-primary-1 hover:bg-primary-1/[.2] active:hover:bg-primary-1/[.3] pb-1 pt-2 text-sm gap-3 flex"
          >
            <font-awesome-icon icon="fa-solid fa-map-pin" />
            Usar localização atual
          </button>
          <AppBtn
            @click="
              () => routeForm.destinies.push({ id: Math.random(), value: '' })
            "
          >
            <font-awesome-icon icon="fa-solid fa-circle-plus" class="mr-2" />
            Adicionar destino
          </AppBtn>
        </div>
      </section>

      <section class="px-6">
        <h2 class="font-bold tracking-wide mb-2">Como chegar</h2>
        <ul class="flex flex-col gap-4 list-decimal pl-4">
          <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
          <li>
            Laboriosam rerum culpa maiores voluptatum ex explicabo deleniti
          </li>
          <li>Doloribus dicta ex sint quaerat aspernatur!</li>
          <li>Odio accusamus at accusantium dignissimos dolorem nisi quod</li>
          <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
          <li>
            Laboriosam rerum culpa maiores voluptatum ex explicabo deleniti
          </li>
          <li>Doloribus dicta ex sint quaerat aspernatur!</li>
          <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
          <li>Odio accusamus at accusantium dignissimos dolorem nisi quod</li>
        </ul>
      </section>
    </div>
    <div class="flex h-12 w-full">
      <button
        class="w-14 bg-primary-3 text-base-0 flex items-center justify-center"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" />
      </button>
      <button class="bg-primary-2 hover:bg-primary-3 text-base-0 flex-1 pt-1">
        Salvar
      </button>
    </div>
  </main>
</template>

<style scoped></style>
