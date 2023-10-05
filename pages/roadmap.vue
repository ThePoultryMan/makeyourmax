<template>
  <div class="flex p-3 gap-3 flex-wrap">
    <div v-for="item, key, index in roadmap" class="flex items-center gap-3">
      <div class="border border-accent-100 rounded-lg p-3">
        <div class="flex justify-between text-xl">
          <h2 class="mb-1 font-bold">{{ item.name }}</h2>
          <div v-if="item.status == Status.FINISHED" class="flex gap-2 items-center text-lg">
            <Icon name="ep:finished" />
            <div class="w-px h-[20px] bg-accent-100" />
            <span>Finished</span>
          </div>
          <div v-else-if="item.status == Status.IN_PROGRESS" class="flex gap-2 items-center text-lg">
            <Icon name="streamline:computer-connection-signal-loading-bracket-loading-internet-angle-signal-server-network-connecting" />
            <div class="w-px h-[20px] bg-accent-100" />
            <span>In Progress</span>
          </div>
          <div v-else-if="item.status == Status.STARTED" class="flex gap-2 items-center text-lg">
            <Icon name="ic:round-start" />
            <div class="w-px h-[20px] bg-accent-100" />
            <span>Started</span>
          </div>
          <div v-else-if="item.status == Status.PLANNING" class="flex gap-2 items-center text-lg">
            <Icon name="solar:notes-outline" />
            <div class="w-px h-[20px] bg-accent-100" />
            <span>Planning</span>
          </div>
          <div v-else-if="item.status == Status.NOT_STARTED" class="flex gap-2 items-center text-lg">
            <Icon name="material-symbols:stop-rounded" />
            <div class="w-px h-[20px] bg-accent-100" />
            <span>Not Started</span>
          </div>
        </div>
        <p>{{ item.description }}</p>
      </div>
      <!--bar-->
      <div v-if="index != Object.keys(roadmap).length - 1" class="h-3 w-56 rounded-lg bg-background-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import roadmap from "~/assets/roadmap.json";

enum Status {
  FINISHED = "finished",
  IN_PROGRESS = "inProgress",
  STARTED = "started",
  PLANNING = "planning",
  NOT_STARTED = "notStarted",
}
</script>
