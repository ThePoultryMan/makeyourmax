<script lang="ts">
  export let weight = 0;
  let weightPercentages: number[] = [];
  for (let i = 100; i >= 0; i -= 5) {
    weightPercentages.push(weight * (i / 100));
  }
</script>

<div class="w-5/6 md:w-2/3 max-h-[60vh] text-2xl md:text-lg text-text-400 border border-accent-100 rounded-lg overflow-y-scroll">
  <table class="w-full border-separate border-spacing-0">
    <thead class="sticky top-0">
      <tr>
        <th class="bg-accent-600 border-r border-b">Percentage</th>
        <th class="bg-accent-600 border-b">Weight</th>
      </tr>
    </thead>
    {#each weightPercentages as value, i}
      {#if i !== 0 && i !== weightPercentages.length - 1}
        <tr class="[&>td]:last:border-b-0 odd:bg-background-900 bg-background-950">
          <td class="p-2 md:p-1 border-r border-b">{(weightPercentages.length - i - 1) * 5}%</td>
          <td class="p-2 md:p-1 border-b">{value}</td>
        </tr>
      {/if}
    {/each}
  </table>
</div>
