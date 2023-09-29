<template>
  <nav class="p-3 flex justify-between bg-background-950">
    <div class="w-full flex gap-3 justify-between md:justify-normal md:w-auto">
      <span><NuxtLink to="/">Max & Maxer</NuxtLink></span>
      <NuxtLink to="/calculator">Calculator</NuxtLink>
    </div>
    <div class="hidden md:flex gap-3">
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/sign-up">Sign-Up</NuxtLink>
    </div>
  </nav>
</template>
