<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import themeData from "$lib/assets/themes.json";

  export let open = false;
  export let currentTheme = "";

  const dispatch = createEventDispatcher();

  const themes = Object.keys(themeData);

  function openDropdown() {}

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
    <button on:click={() => openDropdown()} class="mx-12 p-2 bg-accent-600 rounded-lg text-left">
      <div>{themeData[currentTheme ? currentTheme : "myProd"].meta.name}</div>
      <div class:min-h-0={true}>
        {#each themes.filter((str) => str !== currentTheme) as theme}
          <button on:click={() => setTheme(theme)}>{themeData[theme].meta.name}</button>
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
</style>
