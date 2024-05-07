<script lang="ts">
  import { onMount } from "svelte";

  import { items } from "$lib/assets/meta/news.json";
  import { versions } from "$lib/assets/meta/changelog.json";
  import { version as currentVersion } from "$lib/assets/meta/info.json";

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

<div class="flex flex-col items-center p-3">
  <div class="relative w-fit mb-3 bg-accent-500 p-2 rounded-lg">
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

  {#if currentTab === "news"}
    <div class="w-full mb-3 p-2 bg-accent-400 rounded-lg">
      <span class="text-lg">Feedback or Issues?</span>
      <p>Let me know <a href="https://forms.gle/JHEXobJ9Uhaa41319" class="underline">here</a>!</p>
    </div>
    {#each items as item}
      <div class="w-full mb-3 p-2 bg-accent-400 rounded-lg">
        <span class="text-lg">{item.title}</span>
        <p>{item.content}</p>
        <span class="text-sm">{item.date}</span>
      </div>
    {/each}
  {:else}
    {#each versions as version}
      <div class="w-full mb-3 p-2 bg-accent-400 rounded-lg">
        <span class="text-lg">
          {version.version}
          {#if version.version === currentVersion}
            <i> - Current Version</i>
          {/if}
        </span>
        <ul class="list-inside list-['-']">
          {#each version.changes as change}
            <li><span class="ml-2">{change}</span></li>
          {/each}
        </ul>
      </div>
    {/each}
  {/if}
</div>

<style>
  .slide {
    transition: left ease-in-out 0.1s, width linear 0.1s;
  }
</style>
