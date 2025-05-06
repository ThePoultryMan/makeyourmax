<script lang="ts">
  import Icon from "@iconify/svelte";

  import LabeledInput from "$components/LabeledInput.svelte";
  import PlateExplain from "$components/PercentageTable/PlateExplain.svelte";
  import { type Snippet } from "svelte";

  let { weight = 0, children }: { weight: number; children: Snippet } = $props();

  let round: number | false = $state(5);
  let weightPercentages: number[] = $derived.by(() => {
    const weightPercentages = [];
    for (let i = 100; i >= 0; i -= 5) {
      weightPercentages.push(calculatePercentage(i));
    }
    return weightPercentages;
  });
  let customPercentage = $state(0);

  function calculatePercentage(percent: number) {
    let weightPercentage = weight * (percent / 100);
    const roundedNumber = +(round
      ? Math.round(weightPercentage / round) * round
      : weightPercentage.toFixed(2));
    return roundedNumber ? roundedNumber : 0;
  }

  function toggleExplain(percentage: string) {
    let explain = document.getElementById(percentage + "Explain");
    if (explain?.classList.contains("hidden")) {
      explain.classList.remove("hidden");
    } else {
      explain?.classList.add("hidden");
    }
  }
</script>

<div class="w-full flex flex-col items-center">
  <div class="flex gap-3 mb-5">
    <LabeledInput inputId="round" label="Round To">
      <select id="round" bind:value={round}>
        <option value={false}>Nothing</option>
        <option value={1}>1</option>
        <option value={2.5}>2.5</option>
        <option value={5} selected>5</option>
        <option value={10}>10</option>
      </select>
    </LabeledInput>
    {@render children?.()}
  </div>
  <div
    class="w-5/6 md:w-2/3 max-h-[60vh] text-2xl md:text-lg text-text-400 border border-accent-100 rounded-lg overflow-y-scroll"
  >
    <table class="w-full border-separate border-spacing-0 table-fixed">
      <thead class="sticky top-0">
        <tr>
          <th class="bg-accent-600 border-r border-b">Percentage</th>
          <th class="bg-accent-600 border-b">Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr class="last:[&>td]:border-b-0 odd:bg-background-900 bg-background-950">
          <td class="p-2 md:p-1 border-r border-b">
            <LabeledInput inputId="customPercent" label="%" flipped>
              <input id="customPercent" type="number" bind:value={customPercentage} class="w-16" />
            </LabeledInput>
          </td>
          <td class="p-2 md:p-1 border-b">
            <div class="flex justify-between items-center">
              <span>{calculatePercentage(customPercentage)}</span>
              <button onclick={() => toggleExplain("custom")}
                ><Icon
                  icon="ion:barbell"
                  class="mr-3 p-1 w-8 h-8 border border-accent-100 rounded-md"
                /></button
              >
            </div>
            <PlateExplain
              targetWeight={calculatePercentage(customPercentage)}
              percentage="custom"
              class="mt-2"
            />
          </td>
        </tr>
        {#each weightPercentages as value, i}
          {#if i !== 0 && i !== weightPercentages.length - 1}
            <tr class="last:[&>td]:border-b-0 odd:bg-background-900 bg-background-950">
              <td class="p-2 md:p-1 border-r border-b">{(weightPercentages.length - i - 1) * 5}%</td
              >
              <td class="p-2 md:p-1 border-b">
                <div class="flex justify-between items-center">
                  <span>{value}</span>
                  <button
                    onclick={() =>
                      toggleExplain(((weightPercentages.length - i - 1) * 5).toString())}
                    ><Icon
                      icon="ion:barbell"
                      class="mr-3 p-1 w-8 h-8 border border-accent-100 rounded-md"
                    /></button
                  >
                </div>
                <PlateExplain
                  targetWeight={value}
                  percentage={(weightPercentages.length - i - 1) * 5}
                  class="mt-2"
                />
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</div>
