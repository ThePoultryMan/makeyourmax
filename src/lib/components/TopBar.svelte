<script lang="ts">
  import { page as pageState } from "$app/state";

  const page = $derived(pageState.url.pathname);

  function isDisabled() {
    return page === "/" || page === "/news" || page === "/more";
  }
</script>

<div class="sticky top-0 left-0 mb-1 p-1.5 text-lg bg-background-950">
  <button
    onclick={() => history.back()}
    class="ml-2 font-semibold"
    class:opacity-0={isDisabled()}
    disabled={isDisabled()}>Back</button
  >
</div>
