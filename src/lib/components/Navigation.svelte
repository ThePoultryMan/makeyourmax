<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import Icon from "@iconify/svelte";

  export let brandLogo: any;
</script>

<div
  class="flex justify-around items-center sticky bottom-0 w-full p-1.5 bg-background-950 text-text-400 text-center leading-none text-sm"
>
  <a href="/news">
    <div>
      <Icon icon="ion:newspaper" class="w-8 h-8 mx-auto" />
      <p>News</p>
    </div>
  </a>
  <a href="/">
    <div>
      <Icon icon="ion:barbell" class="w-10 h-10 mx-auto -my-1" />
      <p>PRs</p>
    </div>
  </a>
  <a href="/settings">
    <div>
      <Icon icon="ic:round-settings" class="w-8 h-8 mx-auto" />
      <p>Settings</p>
    </div>
  </a>
</div>
