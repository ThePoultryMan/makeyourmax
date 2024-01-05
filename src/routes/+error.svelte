<script lang="ts">
  import { page } from "$app/stores";

  import { stripUrl } from "$lib/util";
</script>

{#if $page.status === 404}
  <div class="w-full text-center p-7">
    <h1 class="mb-5 text-3xl">(404) Page Not Found</h1>
    <p>
      The page
      <span class="p-1 bg-background-700 rounded-md">{stripUrl($page.url.toString())}</span>
      could not be found. Double check the URL.
    </p>
    <br class="my-2" />
    <a href="/" class="p-1.5 bg-background-950 rounded-lg">Go Home</a>
  </div>
{:else}
  <div class="w-full text-center p-7">
    <h1 class="mb-5 text-3xl">{$page.status}</h1>
    <p>{$page.error?.message}</p>
    <br class="my-2" />
    <a href="/" class="p-1.5 bg-background-950 rounded-lg">Go Home</a>
  </div>
{/if}
