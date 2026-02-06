<script setup>
import { useAuthProvider } from '@/Authentication/AuthProvider';
import { RouterLink } from 'vue-router';

const { user, logout } = useAuthProvider();

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
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
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-secondary rounded-xl w-[85vw] max-w-sm text-primary border border-accent/20 font-bold gap-4"
        >
          <li class="border-b border-accent/10 pb-2">
            <span class="text-[10px] uppercase tracking-widest text-accent/60">Menu</span>
          </li>
          <li><RouterLink to="/" exact-active-class="nav-active-mobile" class="py-3 text-lg">Home</RouterLink></li>
          <li><RouterLink to="/ramayana" active-class="nav-active-mobile" class="py-3 text-lg">Read Ramayana</RouterLink></li>
          
          <li v-if="user"><RouterLink to="/bookmarks" active-class="nav-active-mobile" class="py-3 text-lg">Bookmarks</RouterLink></li>
          
          <li v-if="user" class="border-t border-accent/10 pt-4 mt-2">
            <div class="flex items-center gap-3 p-2">
              <img :src="user.photoURL" class="w-10 h-10 rounded-full border border-primary/50" />
              <div class="flex flex-col">
                <span class="text-xs text-primary">{{ user.displayName }}</span>
                <button @click="handleLogout" class="text-[10px] text-accent uppercase text-left">Logout</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <RouterLink to="/" class="flex flex-col group transition-transform active:scale-95">
        <span class="text-lg md:text-2xl whitespace-nowrap font-logo font-black tracking-tight text-primary group-hover:text-accent transition-all duration-300 italic uppercase leading-none">
          Valmiki Ramayana
        </span>
        <span class="text-[7px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-70 text-accent font-medium mt-1">
          The Adi Kavya
        </span>
      </RouterLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-10 text-[13px] font-bold tracking-widest uppercase text-primary/90">
        <li class="relative">
          <RouterLink to="/" class="nav-link-hover bg-transparent! p-0" exact-active-class="nav-active">Home</RouterLink>
        </li>
        <li class="relative">
          <RouterLink to="/ramayana" class="nav-link-hover bg-transparent! p-0" active-class="nav-active">Read Ramayana</RouterLink>
        </li>
        <li v-if="user" class="relative">
          <RouterLink to="/bookmarks" class="nav-link-hover bg-transparent! p-0" active-class="nav-active">Bookmarks</RouterLink>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <RouterLink v-if="!user" to="/login">
        <button class="hidden md:flex btn btn-md bg-primary hover:bg-accent rounded-xl text-secondary border-none font-bold px-8 shadow-lg transform active:scale-95 transition-all uppercase tracking-widest">
          Login
        </button>
      </RouterLink>

      <div v-else class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="flex items-center gap-3 group cursor-pointer">
          <div class="hidden md:flex flex-col items-end">
            <span class="text-[10px] font-bold text-primary group-hover:text-accent transition-colors uppercase tracking-widest">{{ user.displayName.split(' ')[0] }}</span>
          </div>
          <div class="w-10 h-10 md:w-11 md:h-11 rounded-xl border-2 border-primary/30 group-hover:border-primary transition-all overflow-hidden shadow-lg p-0.5 bg-secondary">
            <img :src="user.photoURL" class="w-full h-full rounded-[10px] object-cover" alt="Profile" />
          </div>
        </div>
        <ul tabindex="0" class="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-secondary border border-accent/20 rounded-xl w-52 text-primary font-bold">
          <li class="p-3 border-b border-accent/10 mb-1">
            <p class="text-[10px] text-accent uppercase tracking-widest leading-none">User Account</p>
            <p class="text-xs truncate opacity-70 mt-1.5 font-medium">{{ user.email }}</p>
          </li>
          <li>
            <button @click="handleLogout" class="py-3 text-red-400 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 flex items-center justify-between group">
              <span>Logout Account</span>
              <i class="fa-solid fa-right-from-bracket text-[10px] opacity-50 group-hover:opacity-100 transition-opacity"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
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
  from { width: 0; left: 50%; opacity: 0; }
  to { width: 100%; left: 0; opacity: 1; }
}

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