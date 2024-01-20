<script lang="ts">
  import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let brandLogo: any;
</script>

<div
  class="flex justify-around items-center sticky bottom-0 w-full p-1.5 bg-background-950 text-text-400"
>
  <a href="/">PRs</a>
</div>
