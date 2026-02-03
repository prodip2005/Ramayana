<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar sticky top-0 z-[100] px-6 md:px-16 bg-secondary/95 backdrop-blur-md border-b border-accent/20 shadow-2xl">
    
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden text-primary p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-secondary rounded-box w-64 text-primary border border-accent/20 font-bold gap-4">
          <li><RouterLink to="/" exact-active-class="nav-active" class="nav-link-hover">Home</RouterLink></li>
          <li><RouterLink to="/kandas" active-class="nav-active" class="nav-link-hover">The Kandas</RouterLink></li>
          <li><RouterLink to="/shlokas" active-class="nav-active" class="nav-link-hover">Shlokas</RouterLink></li>
        </ul>
      </div>

      <RouterLink to="/" class="flex flex-col group ml-2 lg:ml-0">
        <span class="text-2xl font-logo font-black tracking-tight text-primary group-hover:text-accent transition-all duration-300 italic">
          RAMAYANA
        </span>
        <span class="text-[9px] tracking-[0.4em] uppercase opacity-70 text-accent font-medium">
          The Eternal Epic
        </span>
      </RouterLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-10 text-[13px] font-bold tracking-widest uppercase text-primary/90">
        <li>
          <RouterLink to="/" class="nav-link-hover bg-transparent! p-0" exact-active-class="nav-active">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/kandas" class="nav-link-hover bg-transparent! p-0" active-class="nav-active">The Kandas</RouterLink>
        </li>
        <li>
          <RouterLink to="/shlokas" class="nav-link-hover bg-transparent! p-0" active-class="nav-active">Shlokas</RouterLink>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <button class="btn btn-sm md:btn-md bg-primary hover:bg-accent text-secondary border-none font-bold px-8 rounded-none shadow-lg transform active:scale-95 transition-all">
        Login
      </button>
    </div>
  </nav>
</template>

<style scoped>
@reference "../assets/main.css";

nav .nav-active {
  color: var(--color-accent);
  opacity: 1;
  font-weight: 700;
  transform: scale(1.05);
}

nav .nav-active::after {
  width: 100%;
}
</style>1