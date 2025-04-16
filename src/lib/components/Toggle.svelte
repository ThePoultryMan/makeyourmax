<script lang="ts">
  interface Props {
    value?: boolean;
    id: string;
  }

  let { value = $bindable(), id }: Props = $props();
</script>

<label class="relative inline-block w-16 h-8 cursor-pointer">
  <input type="checkbox" class="opacity-0 w-0 h-0" bind:checked={value} {id} />
  <span
    class={"absolute w-7 h-7 transition-all rounded-lg " +
      (value ? "left-[calc(50%)] bg-white" : "left-1 bg-accent-900")}
  ></span>
</label>
