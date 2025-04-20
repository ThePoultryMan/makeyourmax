<script lang="ts">
  interface Props {
    tabs: string[];
    currentTab: number;
    initialWidth?: number,
  }

  let { tabs, currentTab = $bindable(), initialWidth }: Props = $props();

  let tabButtons: HTMLElement[] = $state([]);
  const margin = $derived(parseInt(getComputedStyle(tabButtons[currentTab]).marginLeft));
  const xPosition = $derived(tabButtons[currentTab] ? tabButtons[currentTab].offsetLeft - margin : 0);
  const width = $derived(tabButtons[currentTab] ? tabButtons[currentTab].offsetWidth + margin * 2 : (initialWidth ? initialWidth : 0));

  function switchTab(tab: number) {
    currentTab = tab;
  }
</script>

<div class="flex flex-col items-center p-3">
  <div class="relative w-fit bg-accent-500 p-2 rounded-lg">
    {#each tabs as tab, index}
      <button
        bind:this={tabButtons[index]}
        onclick={() => switchTab(index)}
        class="relative z-10 mx-3"
      >
        {tab}
      </button>
    {/each}
    <div
      class="absolute top-2 h-[1.6rem] bg-accent-400 rounded-lg slide"
      style:left={xPosition + "px"}
      style:width={width + "px"}
    ></div>
  </div>
</div>

<style>
  .slide {
    transition:
      left ease-in-out 0.1s,
      width linear 0.1s;
  }
</style>
