<script lang="ts">
  import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let brandLogo: any;
</script>

<div
  class="flex justify-around items-center absolute bottom-0 w-full bg-background-950 text-text-400"
>
  <a href="/">PRs</a>
</div>
