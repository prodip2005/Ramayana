<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/hooks/useAxios';
import { RouterLink } from 'vue-router';

const kandas = ref([]);
const loading = ref(true);
const error = ref(null);

// Fetch function separated for retry button
const fetchKandas = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await axiosInstance.get('/kandas');
    kandas.value = response.data;
  } catch (err) {
    error.value =
      'Unable to retrieve the sacred texts. Please check your connection.';
    console.error('API Error:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchKandas);
</script>

<template>
  <div class="min-h-screen py-12 md:py-24 px-4 md:px-6 overflow-x-hidden">
    <header class="max-w-7xl mx-auto text-center mb-16 md:mb-28">
      <div class="flex items-center justify-center gap-4 mb-6">
        <div class="h-[2px] w-8 md:w-12 bg-primary/60"></div>
        <span
          class="text-secondary font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-[8px] md:text-[10px]"
        >
          The Sacred Chronicles
        </span>
        <div class="h-[2px] w-8 md:w-12 bg-primary/60"></div>
      </div>
      <h1
        class="text-4xl md:text-8xl font-serif font-bold italic text-secondary mb-6 md:mb-8 drop-shadow-sm"
      >
        The Six <span class="text-primary">Kandas</span>
      </h1>
      <p
        class="max-w-3xl mx-auto text-base md:text-xl text-secondary/70 font-serif italic leading-relaxed px-4"
      >
        Journey through the divine verses of the Valmiki Ramayana, unrolling the
        path of Dharma.
      </p>
    </header>

    <div v-if="loading" class="flex flex-col justify-center items-center h-80">
      <div
        class="w-12 h-12 md:w-16 md:h-16 border-4 border-accent/30 border-t-primary rounded-full animate-spin mb-4"
      ></div>
      <p
        class="text-primary font-serif tracking-widest text-[10px] md:text-xs uppercase animate-pulse"
      >
        Loading Kandas...
      </p>
    </div>

    <div
      v-else-if="error"
      class="max-w-lg mx-auto text-center p-8 md:p-12 bg-[#fcf4e4] border border-accent rounded-sm shadow-xl"
    >
      <p class="text-secondary font-serif text-base md:text-lg mb-8">
        {{ error }}
      </p>
      <button
        @click="fetchKandas"
        class="px-8 py-3 md:px-10 md:py-4 bg-primary text-white font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-secondary transition-all"
      >
        Retry
      </button>
    </div>

    <main
      v-else
      class="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12"
    >
      <article
        v-for="(kanda, index) in kandas"
        :key="kanda.id"
        class="group relative"
      >
        <div
          class="relative h-full bg-[#fdf2da] p-5 md:p-10 flex flex-col justify-between min-h-[350px] md:min-h-[480px] transition-all duration-500 border-2 border-accent/20 hover:border-primary/40 shadow-[0_10px_20px_-10px_rgba(61,12,2,0.1)] overflow-hidden"
        >
          <div
            class="absolute inset-2 md:inset-4 border border-accent/10 pointer-events-none group-hover:border-primary/10 transition-colors"
          ></div>

          <div
            class="absolute top-0 left-0 w-6 h-6 md:w-10 md:h-10 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-primary/20 group-hover:border-primary/60 transition-all duration-500"
          ></div>
          <div
            class="absolute bottom-0 right-0 w-6 h-6 md:w-10 md:h-10 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-primary/20 group-hover:border-primary/60 transition-all duration-500"
          ></div>

          <div
            class="absolute -right-2 -top-4 md:-right-4 md:-top-6 text-7xl md:text-[11rem] font-logo text-secondary opacity-[0.09] select-none group-hover:opacity-[0.08] transition-opacity duration-700"
          >
            0{{ index + 1 }}
          </div>

          <div class="relative z-10">
            <div class="flex items-center gap-2 md:gap-3 mb-6 md:mb-10">
              <span
                class="text-primary font-bold tracking-[0.1em] md:tracking-[0.3em] text-[8px] md:text-[10px] uppercase"
              >
                0{{ index + 1 }}
              </span>
              <div class="h-px flex-grow bg-accent/30"></div>
            </div>

            <h2
              class="text-xl md:text-4xl font-logo text-secondary mb-3 md:mb-6 leading-tight group-hover:text-primary transition-colors duration-500"
            >
              {{ kanda.name }}
              <span
                class="block text-[8px] md:text-xs tracking-[0.2em] md:tracking-[0.5em] uppercase text-accent mt-1 md:mt-3 font-bold group-hover:text-secondary"
              >
                Kanda
              </span>
            </h2>

            <p
              class="text-secondary/70 font-serif italic leading-snug md:leading-relaxed text-xs md:text-lg line-clamp-3 md:line-clamp-4"
            >
              {{
                kanda.description ||
                'The eternal saga of Lord Rama, a timeless guide for humanity.'
              }}
            </p>
          </div>

          <RouterLink
            :to="`/kandas/${kanda.id}`"
            class="relative z-10 mt-6 md:mt-12"
          >
            <button
              class="group w-full relative rounded-lg md:rounded-xl px-4 md:px-12 py-3 md:py-4 bg-primary text-white font-bold tracking-[0.1em] md:tracking-[0.2em] overflow-hidden transition-all shadow-lg md:shadow-2xl"
            >
              <span class="relative z-10 uppercase text-[9px] md:text-xs"
                >Read Kanda</span
              >
              <div
                class="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              ></div>
            </button>
          </RouterLink>
        </div>

        <div
          class="absolute -bottom-4 inset-x-8 h-8 bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"
        ></div>
      </article>
    </main>

    <footer class="mt-24 md:mt-48 text-center">
      <div class="inline-flex items-center gap-4 md:gap-6">
        <div
          class="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-accent"
        ></div>
        <span
          class="text-accent text-2xl md:text-4xl italic font-serif opacity-40"
          >ॐ</span
        >
        <div
          class="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-accent"
        ></div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
article {
  background: #fdf2da;
}

/* Specific line clamps for mobile vs desktop */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 768px) {
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

button {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
