<template>
  <div class="text-xl">
    <div>
      <header class="flex flex-col items-center my-8 font-semibold">
        <h1 class="font-semibold">{{ toTitle(route.params.movement) }}</h1>
      </header>
      <div class="flex flex-col items-center">
        <LabeledInput label="Max" input-id="max-input">
          <NumberInput
            @value-change="(weight) => saveMax(weight)"
            :object-keys="[
              !customMovement ? 'prs' : 'customMovements',
              route.params.movement,
            ]"
          />
        </LabeledInput>
        <Percentages
          v-show="
            !customMovement
              ? prs[route.params.movement]
              : customMovements[route.params.movement]
          "
          :weight="
            !customMovement
              ? typeof prs[route.params.movement] === 'number'
                ? prs[route.params.movement]
                : 0
              : typeof customMovements[route.params.movement] === 'number'
              ? customMovements[route.params.movement]
              : 0
          "
          class="w-5/6 md:w-2/3 max-md:text-2xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { movements } from "~/assets/movements.json";

const { $getSaveData, $setSaveData } = useNuxtApp();
const route = useRoute();

let prs = ref(await $getSaveData("prs"));
const customMovements = ref(
  await $getSaveData("customMovements").then((customMovements) =>
    customMovements ? customMovements : {}
  )
);
const customMovement = ref(!movements.includes(route.params.movement));

watch(prs.value, (newPrs) => {
  $setSaveData("prs", toRaw(newPrs));
});
watch(customMovements.value, (newCustomMovements) => {
  $setSaveData("customMovements", toRaw(newCustomMovements));
});

function saveMax(weight: number) {
  if (!customMovement.value) {
    prs.value[route.params.movement] = weight;
  } else {
    customMovements.value[route.params.movement] = weight;
  }
}

function toTitle(s: string) {
  return s
    .replace(/([A-Z])/g, " $1")
    .replace(/^./g, (str) => str.toUpperCase());
}
</script>
