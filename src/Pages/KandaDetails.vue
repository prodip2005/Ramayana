<script setup>
import { ref, onMounted, watch, computed } from 'vue'; // computed যুক্ত করা হয়েছে
import { useRoute } from 'vue-router';
import axiosInstance from '@/hooks/useAxios';

const route = useRoute();
const kanda = ref(null);
const sargas = ref([]);
const loading = ref(true);
const isSearching = ref(false);
const error = ref(null);

const currentPage = ref(1);
const totalPages = ref(1);
const totalSargas = ref(0);
const searchQuery = ref('');

let timeoutId = null;

const fetchKandaDetails = async (page = 1, silent = false) => {
  try {
    if (!silent) loading.value = true;
    else isSearching.value = true;

    error.value = null;
    const response = await axiosInstance.get(`/kanda/${route.params.id}`, {
      params: {
        with_sarga: 1,
        paginate: 12,
        page: page,
        search: searchQuery.value,
      },
    });

    kanda.value = response.data;
    sargas.value = response.data.sargas.data;
    currentPage.value = response.data.sargas.current_page;
    totalPages.value = response.data.sargas.last_page;
    totalSargas.value = response.data.sarga_count;
  } catch (err) {
    error.value = 'Sacred texts are being retrieved. Please wait.';
  } finally {
    loading.value = false;
    isSearching.value = false;
  }
};

// ১ থেকে ১০ পর্যন্ত পেজ নম্বর দেখানোর লজিক
const pageNumbers = computed(() => {
  const pages = [];
  // সর্বোচ্চ ১০টি পেজ দেখাবে, যদি মোট পেজ সংখ্যা ১০ এর কম হয় তবে সেই পর্যন্ত দেখাবে
  const limit = Math.min(totalPages.value, 10);
  for (let i = 1; i <= limit; i++) {
    pages.push(i);
  }
  return pages;
});

watch(searchQuery, () => {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    fetchKandaDetails(1, true);
  }, 400);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchKandaDetails(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => fetchKandaDetails());
</script>

<template>
  <div class="min-h-screen py-8 md:py-20 px-3 md:px-6 ">
    <header v-if="kanda" class="max-w-7xl mx-auto mb-12 relative">
      <div class="flex justify-start mb-8">
        <router-link
          to="/ramayana"
          class="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-full font-logo text-[10px] tracking-widest shadow-lg hover:bg-primary transition-all duration-300"
        >
          <span>←</span> BACK TO KANDAS
        </router-link>
      </div>

      <div class="text-center space-y-4">
        <h1 class="text-5xl md:text-8xl font-logo text-secondary drop-shadow-sm">
          {{ kanda.name }} <span class="text-primary italic">Kanda</span>
        </h1>
        <p class="text-accent font-serif italic text-lg md:text-2xl opacity-80 uppercase tracking-widest">
          {{ kanda.english_name }}
        </p>
        <div class="inline-block px-6 py-1 border-y border-primary/30">
          <span class="text-secondary font-logo text-xs md:text-sm tracking-[0.2em]">
            Total Sargas: {{ totalSargas }}
          </span>
        </div>
      </div>

      <div class="max-w-2xl mx-auto mt-12 relative px-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by Sarga name..."
          class="w-full bg-[#fdf2da] border-2 border-primary/20 p-4 pl-12 rounded-xl focus:border-primary text-secondary font-serif text-lg outline-none shadow-md transition-all"
        />
        <div class="absolute left-6 top-1/2 -translate-y-1/2">
          <span v-if="!isSearching" class="opacity-40">🔍</span>
          <div v-else class="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="w-12 h-12 border-4 border-accent/20 border-t-primary rounded-full animate-spin"></div>
      </div>

      <div v-else-if="sargas.length" class="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
        <router-link
          v-for="sarga in sargas"
          :key="sarga.id"
          :to="{ name: 'sarga-details', params: { id: sarga.id } }"
          class="group cursor-pointer block"
        >
          <div class="relative h-full bg-[#fdf2da] p-4 md:p-10 border-2 border-accent/20 transition-all duration-500 hover:border-primary/60 hover:shadow-[0_10px_30px_-5px_rgba(255,69,0,0.2)] flex flex-col justify-between overflow-hidden">
            <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/30 group-hover:border-primary"></div>
            <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/30 group-hover:border-primary"></div>
            <div class="relative z-10">
              <div class="flex items-center gap-2 mb-4 md:mb-6">
                <span class="text-[8px] md:text-[11px] font-logo font-bold text-primary tracking-widest uppercase">
                  Chapter {{ sarga.chapter }}
                </span>
                <div class="h-px flex-grow bg-accent/20"></div>
              </div>
              <h3 class="text-sm md:text-2xl font-logo text-secondary group-hover:text-primary transition-colors leading-tight line-clamp-3 mb-6">
                {{ sarga.name }}
              </h3>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-accent/10 mt-auto">
              <span class="hidden md:inline text-[9px] font-logo text-accent tracking-tighter uppercase">Valmiki Ramayana</span>
              <div class="w-full md:w-auto text-center md:text-right">
                <span class="text-primary font-bold text-lg group-hover:translate-x-2 transition-transform inline-block">→</span>
              </div>
            </div>
            <div class="absolute -right-2 -top-2 text-5xl font-logo text-primary opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none transition-opacity">
              ॐ
            </div>
          </div>
        </router-link>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-secondary/50 font-serif text-xl italic mb-6">
          "{{ searchQuery }}" - No sacred verses found.
        </p>
        <button @click="searchQuery = ''" class="px-8 py-3 bg-primary text-white font-logo text-xs rounded-lg shadow-lg">
          RESET SEARCH
        </button>
      </div>
    </main>

    <nav v-if="totalPages > 1 && !loading" class="max-w-7xl mx-auto mt-20">
      <div class="flex flex-wrap justify-center items-center gap-2 md:gap-3">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg font-logo text-[10px] tracking-widest border border-primary/30 text-secondary hover:bg-primary hover:text-white disabled:opacity-20 transition-all bg-[#fdf2da] shadow-sm"
        >
          PREV
        </button>

        <button
          v-for="page in pageNumbers"
          :key="page"
          @click="changePage(page)"
          :class="[
            'w-8 h-8 md:w-11 md:h-11 rounded-lg font-logo text-xs md:text-sm transition-all border flex items-center justify-center shadow-sm',
            currentPage === page 
              ? 'bg-primary text-white border-primary shadow-lg scale-110 z-10' 
              : 'bg-[#fdf2da] text-secondary border-primary/20 hover:border-primary hover:text-primary'
          ]"
        >
          {{ page }}
        </button>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-lg font-logo text-[10px] tracking-widest border border-primary/30 text-secondary hover:bg-primary hover:text-white disabled:opacity-20 transition-all bg-[#fdf2da] shadow-sm"
        >
          NEXT
        </button>
      </div>

      <div v-if="totalPages > 10" class="text-center mt-4 font-serif italic text-secondary/40 text-[10px] uppercase tracking-widest">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
    </nav>
  </div>
</template>