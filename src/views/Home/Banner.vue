<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import axiosInstance from '@/hooks/useAxios';
import axios from 'axios';
import { RouterLink } from 'vue-router';

// State Management
const apiKandas = ref([]);
const localKandas = ref([]);
const loading = ref(true);
const error = ref(null);
const activeIndex = ref(0);
const isTransitioning = ref(false);
let timer = null;

const combinedKandas = computed(() => {
  return apiKandas.value.map((apiItem) => {
    const localItem = localKandas.value.find(
      (local) => local.id === apiItem.id,
    );
    return {
      ...apiItem,
      image: localItem ? localItem.image : apiItem.image || '/Yuddha.png',
    };
  });
});

const startTimer = () => {
  stopTimer();
  timer = setInterval(nextSlide, 7000);
};

const stopTimer = () => {
  if (timer) clearInterval(timer);
};

const nextSlide = () => {
  if (isTransitioning.value || combinedKandas.value.length === 0) return;
  isTransitioning.value = true;
  activeIndex.value = (activeIndex.value + 1) % combinedKandas.value.length;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 1000);
};

const prevSlide = () => {
  if (isTransitioning.value || combinedKandas.value.length === 0) return;
  isTransitioning.value = true;
  activeIndex.value =
    (activeIndex.value - 1 + combinedKandas.value.length) %
    combinedKandas.value.length;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 1000);
};

onMounted(async () => {
  try {
    loading.value = true;
    const apiRes = await axiosInstance.get('/kandas');
    apiKandas.value = apiRes.data;

    try {
      const localRes = await axios.get('/kanda.json');
      localKandas.value = localRes.data;
    } catch (localErr) {
      console.warn('Local kanda.json not found, using API data only.');
    }

    if (combinedKandas.value.length > 0) startTimer();
  } catch (err) {
    error.value = 'Failed to load sacred data.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});

onUnmounted(stopTimer);
</script>

<template>
  <section class="py-32 w-full mx-auto px-6 z-10 overflow-x-hidden">
    <div class="text-center mb-16">
      <h3 class="text-5xl font-serif text-[#3d0c02] italic font-bold tracking-tight">
        The Six Chapters
      </h3>
      <p class="text-[#3d0c02]/70 font-serif italic tracking-[0.2em] text-lg">
        Explore the stages of the divine narrative
      </p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="error" class="text-center text-red-700 font-serif py-10">
      {{ error }}
    </div>

    <div
      v-else
      class="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[600px] md:h-[750px] bg-[#0a0a0a] overflow-hidden group/main z-10"
    >
      <div
        v-for="(kanda, index) in combinedKandas"
        :key="kanda.id"
        class="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
        :class="
          index === activeIndex
            ? 'opacity-100 z-10'
            : 'opacity-0 z-0 pointer-events-none'
        "
      >
        <div class="absolute inset-0">
          <img
            :src="kanda.image"
            class="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear"
            :class="index === activeIndex ? 'scale-110' : 'scale-100'"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        </div>

        <div class="relative h-full max-w-7xl mx-auto px-10 flex flex-col justify-center">
          <div class="max-w-2xl space-y-6">
            <div
              class="flex items-center gap-4 transform transition-all duration-1000 delay-300"
              :class="index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
            >
              <span class="text-accent text-3xl font-serif italic">॥ ০{{ index + 1 }} ॥</span>
              <div class="h-px w-16 bg-accent/50"></div>
            </div>
            <h4
              class="text-6xl md:text-8xl font-logo text-white leading-tight transform transition-all duration-1000 delay-500"
              :class="index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
            >
              {{ kanda.name }} <br />
              <span class="text-accent italic text-4xl md:text-6xl">Kanda</span>
            </h4>
            <p
              class="text-xl text-white/80 font-serif italic leading-relaxed transform transition-all duration-1000 delay-700"
              :class="index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
            >
              {{ kanda.description || '"Where there is Rama, there is Righteousness."' }}
            </p>
            <div
              class="pt-6 transform transition-all duration-1000 delay-1000"
              :class="index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
            >
              <RouterLink :to="`/kandas/${kanda.id}`">
                <button
                  class="group relative rounded-xl px-12 py-4 bg-primary text-white font-bold tracking-[0.2em] overflow-hidden transition-all shadow-2xl"
                >
                  <span class="relative z-10 uppercase">Read this Kanda</span>
                  <div class="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="prevSlide(); startTimer();"
        class="absolute left-12 top-1/2 -translate-y-1/2 z-30 p-4 border border-white/20 rounded-full text-white hover:bg-accent hover:text-[#3d0c02] transition-all opacity-0 group-hover/main:opacity-100"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button
        @click="nextSlide(); startTimer();"
        class="absolute right-12 top-1/2 -translate-y-1/2 z-30 p-4 border border-white/20 rounded-full text-white hover:bg-accent hover:text-[#3d0c02] transition-all opacity-0 group-hover/main:opacity-100"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        <button
          v-for="(_, i) in combinedKandas"
          :key="i"
          @click="activeIndex = i; startTimer();"
          class="h-1 transition-all duration-500"
          :class="i === activeIndex ? 'w-16 bg-accent' : 'w-8 bg-white/20'"
        ></button>
      </div>
    </div>
  </section>
</template>