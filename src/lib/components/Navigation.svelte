<script>
	import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="p-3 bg-background-950 text-text-400">
  <div class="w-full flex items-center gap-3 justify-between text-lg">
    <span class="font-semibold">Max & Maxer</span>
    <button on:click={() => dispatch("sidebar-open", true)} class="text-2xl">&plus;</button>
  </div>
</div>
