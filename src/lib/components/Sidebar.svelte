<script lang="ts">
  import Icon from "@iconify/svelte";

  import { createEventDispatcher, onMount } from "svelte";

  import themeData from "$lib/assets/themes.json";

  export let open = false;
  export let currentTheme = "";

  let dropdown = false;

  const dispatch = createEventDispatcher();

  const themes = Object.keys(themeData);

  onMount(() => {
    document.getElementById("theme-dropdown")?.style.setProperty("--dropdown-height", (themes.length - 1) * 24 + "px");
  });

  function setTheme(theme: string) {
    currentTheme = theme;
    dispatch("set-theme", currentTheme);
  }
</script>

<div
  class="fixed top-0 right-0 h-screen bg-accent-800 text-text-400 overflow-x-hidden sidebar"
  class:open-sidebar={open}
  class:close-sidebar={!open}
>
  <div>
    <button
      on:click={() => dispatch("sidebar-close", false)}
      class="absolute top-0 right-0 m-3 text-2xl">&times;</button
    >
    <nav class="px-12 py-24 text-2xl">
      <div class="flex flex-col gap-3 mb-3">
        <a href="/">Home</a>
        <a href="/prs">PRs</a>
      </div>
      <hr />
      <div class="flex flex-col gap-3 mb-3">
        <a href="/roadmap">Roadmap</a>
      </div>
    </nav>
    <button on:click={() => dropdown = !dropdown} class="mx-12 p-2 bg-accent-600 rounded-lg w-48">
      <div class="flex justify-between items-center">
        <div>{themeData[currentTheme ? currentTheme : "myProd"].meta.name}</div>
        <Icon icon="iconamoon:arrow-up-2-fill" />
      </div>
      <div id="theme-dropdown" class:max-h-0={!dropdown} class:dropdown-open={dropdown} class="dropdown overflow-hidden">
        {#each themes.filter((str) => str !== currentTheme) as theme}
          <button on:click={() => setTheme(theme)} class="w-full text-left">{themeData[theme].meta.name}</button>
        {/each}
      </div>
      <div />
    </button>
  </div>
</div>

<style>
  :root {
    --sidebar-width: 33.333333vw;
  }

  @media (max-width: 1024px) {
    :root {
      --sidebar-width: 100vw;
    }
  }

  .sidebar {
    transition: width 0.5s;
  }

  .open-sidebar {
    width: var(--sidebar-width);
  }

  .close-sidebar {
    width: 0px;
  }

  .dropdown {
    transition: max-height 0.1s ease-in-out;
  }

  .dropdown-open {
    max-height: var(--dropdown-height);
  }
</style>
