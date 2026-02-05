<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/hooks/useAxios';

const route = useRoute();
const sarga = ref(null);
const shlokas = ref([]);
const loading = ref(true);
const error = ref(null);

const currentPage = ref(1);
const totalPages = ref(1);
const perPage = 10;

const fetchSargaDetails = async (page = 1) => {
  try {
    loading.value = true;
    error.value = null;
    
    const response = await axiosInstance.get(`/sarga/${route.params.id}`, {
      params: { 
        with_shloka: 1,
        with_kanda: 1,
        paginate: perPage,
        page: page
      }
    });
    
    sarga.value = response.data;
    shlokas.value = response.data.shlokas.data; 
    currentPage.value = response.data.shlokas.current_page;
    totalPages.value = response.data.shlokas.last_page;
    
  } catch (err) {
    error.value = "Can't get the shalaks";
  } finally {
    loading.value = false;
  }
};

const visiblePages = computed(() => {
  const range = [];
  let start = Math.max(1, currentPage.value - 4);
  let end = Math.min(totalPages.value, start + 9);
  if (end - start < 9) start = Math.max(1, end - 9);
  for (let i = start; i <= end; i++) range.push(i);
  return range;
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchSargaDetails(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => fetchSargaDetails());
</script>

<template>
  <div class="min-h-screen py-8 md:py-20 px-3 md:px-6">
    
    <header v-if="sarga" class="max-w-7xl mx-auto mb-16 text-center">
      <div class="flex justify-start mb-8">
        <button @click="$router.back()" class="px-5 py-2.5 bg-secondary text-white rounded-full font-logo text-[10px] tracking-widest shadow-lg hover:bg-primary transition-all">
          ← BACK
        </button>
      </div>
      <span class="text-primary font-logo text-xs tracking-[0.4em] uppercase">Chapter {{ sarga.chapter }}</span>
      <h1 class="text-3xl md:text-6xl font-logo text-secondary mt-4">{{ sarga.name }}</h1>
    </header>

    <main class="max-w-4xl mx-auto">
      <div v-if="loading" class="flex justify-center py-20">
        <div class="w-12 h-12 border-4 border-t-primary border-primary/20 rounded-full animate-spin"></div>
      </div>

      <div v-else-if="shlokas.length" class="space-y-16">
        <div v-for="(shloka, index) in shlokas" :key="shloka.id" class="group">
          
          <div class="flex justify-center mb-6">
            <span class="font-logo text-primary text-lg">॥ {{ (currentPage - 1) * perPage + (index + 1) }} ॥</span>
          </div>

          <div class=" p-6 md:p-12 border-2 border-[#feaa04] rounded-3xl relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
             
             <p class="text-xl md:text-3xl text-center font-serif text-secondary leading-[1.8] whitespace-pre-line mb-10">
               {{ shloka.sanskrit }}
             </p>

             <div v-if="shloka.pratipada" class="mt-8 p-5 bg-[#fdf2da]/60 rounded-xl border border-[#df9a0f]">
               <h4 class="text-xs font-logo text-primary tracking-widest uppercase mb-3">Word Meanings (Pratipada)</h4>
               <p class="text-secondary/80 font-serif text-sm md:text-base leading-relaxed whitespace-pre-line">
                 {{ shloka.pratipada }}
               </p>
             </div>

             <div v-if="shloka.tat" class="mt-8 pt-8 border-t border-primary/10">
               <h4 class="text-xs font-logo text-primary tracking-widest uppercase mb-3 text-center">Translation</h4>
               <p class="text-accent font-serif italic text-lg md:text-xl text-center leading-relaxed">
                 "{{ shloka.tat.trim() }}"
               </p>
             </div>

             <div v-if="shloka.comment" class="mt-8 p-5 bg-secondary/5 rounded-xl border-l-4 border-primary/40">
               <h4 class="text-xs font-logo text-secondary tracking-widest uppercase mb-2 italic">Commentary</h4>
               <p class="text-secondary/70 font-serif text-sm italic leading-relaxed">
                 {{ shloka.comment }}
               </p>
             </div>

             <div class="absolute -right-4 -bottom-4 text-9xl font-logo text-primary opacity-[0.05] pointer-events-none">ॐ</div>
          </div>
        </div>
      </div>

      <nav v-if="totalPages > 1 && !loading" class="mt-20">
        <div class="flex flex-wrap justify-center items-center gap-2">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-4 py-2 rounded-lg border border-primary/30 text-secondary bg-[#f9e6c1] hover:bg-primary hover:text-white disabled:opacity-30 transition-all font-logo text-[10px]">PREV</button>
          
          <button v-for="page in visiblePages" :key="page" @click="changePage(page)"
            :class="['w-10 h-10 rounded-lg font-logo text-sm transition-all border flex items-center justify-center', 
            currentPage === page ? 'bg-primary text-white border-primary shadow-md scale-110' : 'bg-[#f9e6c1] text-secondary border-primary/20 hover:border-primary']">
            {{ page }}
          </button>

          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-4 py-2 rounded-lg border border-primary/30 text-secondary bg-[#f9e6c1] hover:bg-primary hover:text-white disabled:opacity-30 transition-all font-logo text-[10px]">NEXT</button>
        </div>
        <div class="text-center mt-6 font-serif italic text-secondary/50 text-xs tracking-widest uppercase">Page {{ currentPage }} of {{ totalPages }}</div>
      </nav>
    </main>
  </div>
</template>

