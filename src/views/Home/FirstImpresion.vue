<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/hooks/useAxios';
import { RouterLink } from 'vue-router';
import KandaCard from '@/components/KandaCard.vue';

const kandas = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    const response = await axiosInstance.get('/kandas');
    kandas.value = response.data;
  } catch (err) {
    error.value = 'Failed to load sacred data.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen">
    <section
      class="relative h-[85vh] flex items-center justify-center overflow-hidden"
    >
      <div
        class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none"
      >
        <div class="w-150 h-150 border-20 border-accent rounded-full"></div>
      </div>
      <div class="relative z-10 text-center px-6 max-w-5xl">
        <div class="flex items-center justify-center gap-4 mb-8">
          <div class="h-px w-12 bg-accent/40"></div>
          <h2 class="text-primary font-bold tracking-[0.5em] uppercase text-xs">
            Jai Sri Ram
          </h2>
          <div class="h-px w-12 bg-accent/40"></div>
        </div>
        <h1
          class="text-6xl md:text-8xl font-logo text-secondary mb-10 leading-tight drop-shadow-sm"
        >
          The Sacred Epic of <br />
          <span class="text-primary italic">Dharma</span>
        </h1>
        <p
          class="max-w-2xl mx-auto text-xl md:text-2xl text-secondary/80 font-serif italic mb-12 leading-relaxed"
        >
          "Where there is Rama, there is Righteousness." <br />
          Experience the eternal journey that has shaped the soul of humanity.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          <RouterLink to="/kandas">
            <button
              class="group relative px-12 py-4 bg-secondary text-white font-bold tracking-[0.2em] overflow-hidden transition-all shadow-2xl"
            >
              <span class="relative z-10 uppercase">Read Kandas</span>
              <div
                class="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              ></div>
            </button>
          </RouterLink>
          <RouterLink to="/shlokas">
            <button
              class="text-secondary font-bold tracking-widest border-b-2 border-accent/40 hover:border-primary transition-all pb-1 uppercase"
            >
              Explore Shlokas
            </button>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="py-32 max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-12 gap-16 items-center mb-40 relative">
        <div class="lg:col-span-7 relative order-2 lg:order-1">
          <div class="relative z-10 space-y-8">
            <div class="flex items-center gap-4 animate-pulse">
              <span class="text-primary text-2xl">ॐ</span>
              <div
                class="h-px w-20 bg-linear-to-r from-primary to-transparent"
              ></div>
            </div>
            <h3
              class="text-5xl md:text-7xl font-logo text-secondary leading-[1.1] tracking-tight"
            >
              Legacy of the <br />
              <span class="text-primary italic">Seventh Avatar</span>
            </h3>
            <div class="max-w-xl">
              <p
                class="text-secondary/70 leading-relaxed text-xl font-serif italic border-l-4 border-accent/30 pl-6 py-2"
              >
                "Every verse of the Ramayana is a step towards self-realization.
                It is more than a story; it is a spiritual map for every human
                heart seeking truth."
              </p>
            </div>
            <div class="flex flex-wrap gap-12 pt-6">
              <div class="relative group">
                <span
                  class="text-5xl font-logo text-secondary group-hover:text-primary transition-colors duration-500"
                  >24,000</span
                >
                <p
                  class="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mt-2"
                >
                  Divine Verses
                </p>
                <div
                  class="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"
                ></div>
              </div>
              <div class="relative group">
                <span
                  class="text-5xl font-logo text-secondary group-hover:text-primary transition-colors duration-500"
                  >06</span
                >
                <p
                  class="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mt-2"
                >
                  Sacred Kandas
                </p>
                <div
                  class="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 relative order-1 lg:order-2">
          <div class="relative group">
            <div
              class="absolute -inset-4 border border-accent/20 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700"
            ></div>
            <div
              class="relative aspect-4/5 overflow-hidden bg-white shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.15)]"
            >
              <img
                src="https://imgs.search.brave.com/mtYH1JBc_UsB2ULPf1avlwEPjZZbFmZKWXVMJ2ZqQvQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzI2LzA0Lzc0/LzM2MF9GXzkyNjA0/NzQ1Nl8yWjJmNzJC/ODhkQk9GS0F1c3Ra/RThRSDZkblpGV3FC/Ui5qcGc"
                alt="Lord Rama"
                class="w-full h-full object-cover rounded-xl grayscale-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-secondary/40 via-transparent to-transparent opacity-60"
              ></div>
            </div>
            <div
              class="absolute -bottom-6 -left-6 bg-secondary rounded-xl text-white p-6 shadow-2xl hidden md:block animate-bounce-slow"
            >
              <p class="font-logo text-2xl italic tracking-widest text-primary">
                The Ramayana
              </p>
            </div>
          </div>
        </div>
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 text-[15rem] font-logo opacity-[0.02] pointer-events-none select-none"
        >
          RAMA
        </div>
      </div>

      <div class="text-center mb-20">
        <h3 class="text-5xl font-serif text-[#3d0c02] italic font-bold tracking-tight"">
          The Six Chapters
        </h3>
        <p class="text-[#3d0c02] font-serif italic tracking-[0.2em] text-lg">
          Explore the stages of the divine narrative
        </p>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>
      <div v-else-if="error" class="text-center text-red-700 font-serif py-10">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <KandaCard
          v-for="(kanda, index) in kandas"
          :key="kanda.id"
          :kanda="kanda"
          :index="index"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
h1 {
  animation: divineFade 2s ease-out;
}

@keyframes divineFade {
  from {
    opacity: 0;
    transform: scale(0.98);
    letter-spacing: -2px;
  }
  to {
    opacity: 1;
    transform: scale(1);
    letter-spacing: normal;
  }
}
</style>
