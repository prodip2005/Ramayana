<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div data-theme="ramayan" class="min-h-screen flex flex-col  bg-[#f1e9d5] selection:bg-primary selection:text-secondary">
    
    <header class="sticky top-0 z-50">
      <Navbar />
    </header>

    <main class="flex-grow">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <div :key="$route.path" class="max-w-7xl mx-auto p-4 md:p-8">
            <component :is="Component" />
          </div>
        </transition>
      </RouterView>
    </main>

    <Footer />

  </div>
</template>

