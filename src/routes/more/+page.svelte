<script>
  import Icon from "@iconify/svelte";
</script>

<ul class="mt-5 [&>li]:border-y [&>li]:border-gray-600">
  <li>
    <a href="/more/settings">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <Icon icon="ic:round-settings" class="w-6 h-6 ml-1 mr-2 bg-gray-400 rounded-md p-0.5" />
          <span class="text-xl mb-1">Settings</span>
        </div>
        <Icon icon="material-symbols:arrow-forward-ios-rounded" class="w-6 h-6 mr-1" />
      </div>
    </a>
  </li>
</ul>
