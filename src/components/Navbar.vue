<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav
    class="navbar sticky top-0 z-[100] px-4 md:px-16 bg-secondary/95 backdrop-blur-lg border-b border-accent/20 shadow-2xl"
  >
    <div class="navbar-start flex items-center">
      <div class="dropdown lg:hidden">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost text-primary p-2 mr-1 hover:bg-accent/10"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-secondary rounded-xl w-[85vw] max-w-sm text-primary border border-accent/20 font-bold gap-4"
        >
          <li class="border-b border-accent/10 pb-2">
            <span class="text-[10px] uppercase tracking-widest text-accent/60"
              >Menu</span
            >
          </li>
          <li>
            <RouterLink
              to="/"
              exact-active-class="nav-active-mobile"
              class="py-3 text-lg"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/kandas"
              active-class="nav-active-mobile"
              class="py-3 text-lg"
              >Read Ramayana</RouterLink
            >
          </li>
          <li class="mt-4">
            <button class="btn btn-primary w-full text-secondary font-bold">
              Contact Us
            </button>
          </li>
        </ul>
      </div>

      <RouterLink
        to="/"
        class="flex flex-col group transition-transform active:scale-95"
      >
        <span
          class="text-lg md:text-2xl whitespace-nowrap font-logo font-black tracking-tight text-primary group-hover:text-accent transition-all duration-300 italic uppercase leading-none"
        >
          Valmiki Ramayana
        </span>
        <span
          class="text-[7px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-70 text-accent font-medium mt-1"
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
            to="/ramayana"
            class="nav-link-hover bg-transparent! p-0"
            active-class="nav-active"
            >Read Ramayana</RouterLink
          >
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <button
        class="hidden md:flex btn btn-md bg-primary hover:bg-accent rounded-xl text-secondary border-none font-bold px-8 shadow-lg transform active:scale-95 transition-all uppercase tracking-widest"
      >
        Login
      </button>
    </div>
  </nav>
</template>

<style scoped>
/* Desktop Active Style */
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
  box-shadow: 0 0 8px var(--color-accent);
}

/* Mobile Active Style */
.nav-active-mobile {
  background-color: rgba(var(--color-primary-rgb), 0.1) !important;
  color: var(--color-accent) !important;
  border-left: 4px solid var(--color-accent);
}

.nav-link-hover {
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: 4px;
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

/* Hover effects for Desktop */
@media (min-width: 1024px) {
  .nav-link-hover:hover {
    color: var(--color-accent) !important;
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
}
</style>
