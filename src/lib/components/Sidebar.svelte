<script lang="ts">
  import Icon from "@iconify/svelte";

  import { createEventDispatcher, onMount } from "svelte";

  import themeData from "$lib/assets/themes.json";
  import Dropdown from "$components/Dropdown.svelte";

  export let open = false;
  export let currentTheme = "";
  export let showThemeSelect = false;

  let dropdown = false;

  const dispatch = createEventDispatcher();

  const themes = Object.keys(themeData);

  onMount(() => {
    document
      .getElementById("theme-dropdown")
      ?.style.setProperty("--dropdown-height", (themes.length - 1) * 24 + "px");
  });

  function setTheme(theme: string) {
    currentTheme = theme;
    dispatch("set-theme", currentTheme);
  }
</script>

<div
  class="fixed top-0 right-0 h-screen bg-accent-800 text-on-accent-400 overflow-x-hidden sidebar"
  class:open-sidebar={open}
  class:close-sidebar={!open}
>
  <div class="px-12 py-24">
    <button
      on:click={() => dispatch("sidebar-close", false)}
      class="absolute top-0 right-0 m-3 text-2xl">&times;</button
    >
    <nav class="text-2xl">
      <div class="flex flex-col gap-3 mb-3">
        <a on:click={() => dispatch("sidebar-close", false)} href="/">Home</a>
        <a on:click={() => dispatch("sidebar-close", false)} href="/prs">PRs</a>
      </div>
      <hr class="my-3" />
      <div class="flex flex-col gap-3 mb-3">
        <a on:click={() => dispatch("sidebar-close", false)} href="/roadmap">Roadmap</a>
      </div>
    </nav>
    {#if showThemeSelect}
      <div class="mt-16 text-text-400">
        <Dropdown
          options={themes}
          currentOption={currentTheme}
          on:select={(theme) => setTheme(theme.detail)}
        />
      </div>
    {/if}
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

  .text-on-accent-400 {
    color: var(--text-on-accent-400);
  }
</style>
