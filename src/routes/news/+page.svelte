<script lang="ts">
  import { items } from "$lib/assets/meta/news.json";
  import { versions } from "$lib/assets/meta/changelog.json";
  import { version as currentVersion } from "$lib/assets/meta/info.json";
  import TabBar from "$components/TabBar.svelte";

  let currentTab: number = $state(0);
</script>

<TabBar tabs={["news", "changelog"]} bind:currentTab initialWidth={60} />
<div class="p-3">
  {#if currentTab === 0}
    <div class="w-full mb-3 p-2 bg-accent-400 rounded-lg">
      <span class="text-lg">Feedback or Issues?</span>
      <p>Let me know <a href="https://forms.gle/JHEXobJ9Uhaa41319" class="underline">here</a>!</p>
    </div>
    {#each items as item}
      <div class="w-full mb-3 p-2 bg-accent-400 rounded-lg">
        <span class="text-lg">{item.title}</span>
        <p>{item.content}</p>
        <span class="text-sm">{item.date}</span>
      </div>
    {/each}
  {:else}
    {#each versions as version}
      <div class="w-full mb-3 p-2 bg-accent-400 rounded-lg">
        <span class="text-lg">
          {version.version}
          {#if version.version === currentVersion}
            <i> - Current Version</i>
          {/if}
        </span>
        <ul class="list-inside list-['-']">
          {#each version.changes as change}
            <li><span class="ml-2">{change}</span></li>
          {/each}
        </ul>
      </div>
    {/each}
  {/if}
</div>
