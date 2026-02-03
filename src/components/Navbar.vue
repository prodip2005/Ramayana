<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav
    class="navbar sticky top-0 z-[100] px-6 md:px-16 bg-secondary/95 backdrop-blur-lg border-b border-accent/20 shadow-2xl"
  >
    <div class="navbar-start">
      <div class="dropdown">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost lg:hidden text-primary p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-secondary rounded-box w-64 text-primary border border-accent/20 font-bold gap-4"
        >
          <li>
            <RouterLink
              to="/"
              exact-active-class="nav-active"
              class="nav-link-hover"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/kandas"
              active-class="nav-active"
              class="nav-link-hover"
              >The Kandas</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/shlokas"
              active-class="nav-active"
              class="nav-link-hover"
              >Shlokas</RouterLink
            >
          </li>
        </ul>
      </div>

      <RouterLink to="/" class="flex flex-col group ml-2 lg:ml-0">
        <span
          class="text-2xl font-logo font-black tracking-tight text-primary group-hover:text-accent transition-all duration-300 italic uppercase leading-none"
        >
          Valmiki Ramayana
        </span>
        <span
          class="text-[9px] tracking-[0.4em] uppercase opacity-70 text-accent font-medium mt-1"
        >
          The Adi Kavya
        </span>
      </RouterLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul
        class="menu menu-horizontal px-1 gap-10 text-[13px] font-bold tracking-widest uppercase text-primary/90"
      >
        <li class="relative">
          <RouterLink
            to="/"
            class="nav-link-hover bg-transparent! p-0"
            exact-active-class="nav-active"
            >Home</RouterLink
          >
        </li>
        <li class="relative">
          <RouterLink
            to="/kandas"
            class="nav-link-hover bg-transparent! p-0"
            active-class="nav-active"
            >The Kandas</RouterLink
          >
        </li>
        <li class="relative">
          <RouterLink
            to="/shlokas"
            class="nav-link-hover bg-transparent! p-0"
            active-class="nav-active"
            >Shlokas</RouterLink
          >
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <button
        class="btn btn-sm md:btn-md bg-primary hover:bg-accent rounded-xl text-secondary border-none font-bold px-8 shadow-lg transform active:scale-95 transition-all uppercase tracking-widest"
      >
        Login
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav-link-hover {
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: 4px;
}

.nav-link-hover:hover {
  color: var(--color-accent) !important;
}

nav .nav-active {
  color: var(--color-accent) !important;
  opacity: 1;
  font-weight: 800;
  transform: translateY(-1px);
}

nav .nav-active::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-accent);
  border-radius: 2px;
  animation: slideIn 0.5s ease-out forwards;
  box-shadow: 0 0 8px var(--color-accent); /* গ্লো ইফেক্ট */
}

@keyframes slideIn {
  from {
    width: 0;
    left: 50%;
    opacity: 0;
  }
  to {
    width: 100%;
    left: 0;
    opacity: 1;
  }
}

.nav-link-hover:not(.nav-active)::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: all 0.3s ease;
  opacity: 0.5;
}

.nav-link-hover:not(.nav-active):hover::after {
  width: 100%;
}
</style>
