<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let open = false;

  const dispatch = createEventDispatcher();
</script>

<div class="absolute top-0 right-0 h-screen bg-accent-800 text-text-400 overflow-x-hidden sidebar" class:open-sidebar={open} class:close-sidebar={!open} >
  <div>
    <button on:click={() => dispatch("sidebar-close", false)} class="absolute top-0 right-0 m-3 text-2xl">&times;</button>
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
  </div>
</div>

<style>
  :root {
    --sidebar-width: 33.333333vw;
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
