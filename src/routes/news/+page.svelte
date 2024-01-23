<script lang="ts">
  import { onMount } from "svelte";

  let currentTab = "news";

  let slide = false;
  let xPosition = 0;
  let width = 15;
  let news: any;
  let changelog: any;

  onMount(() => {
    handleHighlight();
  });

  function handleHighlight() {
    let margin;
    switch (currentTab) {
      case "news":
        margin = parseInt(getComputedStyle(news).marginLeft);
        xPosition = news.offsetLeft - margin;
        width = news.offsetWidth + margin * 2;
        break;
      case "changelog":
        margin = parseInt(getComputedStyle(changelog).marginLeft);
        xPosition = changelog.offsetLeft - margin;
        width = changelog.offsetWidth + margin * 2;
        break;
    }
  }

  function switchTab(tab: string) {
    currentTab = tab;
    if (news && changelog) {
      setTimeout(() => {
        slide = true;
        handleHighlight();
        setTimeout(() => (slide = false), 100);
      }, 1);
    }
  }
</script>

<div class="flex justify-center p-3">
  <div class="relative bg-accent-500 p-2 rounded-lg">
    <button bind:this={news} on:click={() => switchTab("news")} class="relative z-10 mx-3"
      >News</button
    >
    <button bind:this={changelog} on:click={() => switchTab("changelog")} class="relative z-10 mx-3"
      >Changelog</button
    >
    <div
      class="absolute top-2 h-[1.6rem] bg-accent-400 rounded-lg"
      class:slide
      style:left={xPosition + "px"}
      style:width={width + "px"}
    />
  </div>
</div>

<style>
  .slide {
    transition: left ease-in-out 0.1s, width linear 0.1s;
  }
</style>
