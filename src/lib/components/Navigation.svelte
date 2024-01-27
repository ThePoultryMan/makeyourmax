<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Icon from "@iconify/svelte";

  import { lastUpdate } from "$lib/assets/meta/news.json";
  import { preferences } from "$lib/indy";

  let links: any[] = [];
  let slide = false;
  let xPosition = 0;
  let newNews = false;

  $: {
    if (links[0] && links[1] && links[2]) {
      setTimeout(() => {
        slide = true;
        handleHighlight($page.url.pathname);
        setTimeout(() => (slide = false), 200);
      }, 1);
    }
  }

  onMount(() => {
    window.addEventListener("resize", () => {
      handleHighlight($page.url.pathname);
    });
    handleHighlight($page.url.pathname);

    preferences.getItem<number>("lastNewsCheck").then((lastNewsCheck) => {
      if (lastNewsCheck) {
        if (lastUpdate > lastNewsCheck) {
          newNews = true;
        }
      } else {
        preferences.setItem("lastNewsCheck", Date.now());
      }
    });
  });

  function handleHighlight(page: string) {
    let currentPage: number;
    switch (page) {
      case "/news":
        currentPage = 0;
        break;
      case "/settings":
        currentPage = 2;
        break;
      default:
        currentPage = 1;
        break;
    }

    xPosition = links[currentPage].offsetLeft - (96 - links[currentPage].offsetWidth) / 2;
  }

  function setNewsCheck() {
    preferences.setItem("lastNewsCheck", Date.now());
    newNews = false;
  }
</script>

<div
  class="flex justify-around items-center sticky bottom-0 w-full px-1.5 py-4 bg-background-950 text-text-400 text-center leading-none text-sm overflow-hidden"
>
  <a href="/news" on:click={setNewsCheck} bind:this={links[0]} class="z-10">
    <div class="relative">
      <Icon icon="ion:newspaper" class="w-8 h-8 mx-auto" />
      {#if newNews}
        <Icon icon="ic:sharp-circle" class="absolute top-0 right-0 text-primary-500" />
      {/if}
      <p>News</p>
    </div>
  </a>
  <a href="/" bind:this={links[1]} class="z-10">
    <div>
      <Icon icon="ion:barbell" class="w-10 h-10 mx-auto -my-1" />
      <p>PRs</p>
    </div>
  </a>
  <a href="/settings" bind:this={links[2]} class="z-10">
    <div>
      <Icon icon="ic:round-settings" class="w-8 h-8 mx-auto" />
      <p>Settings</p>
    </div>
  </a>
  <div
    class="absolute -top-[9px] w-24 h-24 bg-background-1000 rounded-[3rem]"
    class:slide
    style={"left: " + xPosition + "px"}
  />
</div>

<style>
  .slide {
    transition: left ease-in-out 0.2s;
  }
</style>
