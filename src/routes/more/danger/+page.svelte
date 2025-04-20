<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import Icon from "@iconify/svelte";

  async function removeAllScores() {
    const message = prompt(
      "Are you sure that you want to delete *all* movements. There is no way of undoing this action.\nIf you are sure, type DELETE below."
    );
    if (message === "DELETE") {
      await invoke("remove_all_scores");
    }
  }
</script>

<div class="mt-5">
  <ul class="mt-5 [&>li]:border-y [&>li]:border-gray-600">
    <li class="pl-2">
      <button onclick={removeAllScores}>
        <div class="flex items-center justify-between">
          <div class="flex items-center text-xl mb-1">Remove All Scores</div>
          <Icon icon="material-symbols:arrow-forward-ios-rounded" class="w-6 h-6 mr-1" />
        </div>
      </button>
    </li>
  </ul>
</div>
