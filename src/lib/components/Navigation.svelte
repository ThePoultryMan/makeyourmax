<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Icon from "@iconify/svelte";

  export let brandLogo: any;

  let links: any[] = [];
  let slide = false;
  let xPosition = 0;

  $: {
    if (links[0] && links[1] && links[2]) {
      setTimeout(() => {
        slide = true;
        handleHighlight($page.url.pathname);
        setTimeout(() => slide = false, 200);
      }, 1);
    }
  }

  onMount(() => {
    window.addEventListener("resize", () => {
      handleHighlight($page.url.pathname);
    });
    handleHighlight($page.url.pathname);
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
</script>

<div
  class="flex justify-around items-center sticky bottom-0 w-full p-1.5 bg-background-950 text-text-400 text-center leading-none text-sm overflow-hidden"
>
  <a href="/news" bind:this={links[0]} class="z-10">
    <div>
      <Icon icon="ion:newspaper" class="w-8 h-8 mx-auto" />
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
  <div class="absolute -top-[11px] w-24 h-20 bg-background-1000 rounded-[3rem]" class:slide={slide} style={"left: " + xPosition + "px"} />
</div>

<style>
  .slide {
    transition: left ease-in-out 0.2s;
  }
</style>
