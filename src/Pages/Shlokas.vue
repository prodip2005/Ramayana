<script setup>
import { ref, onMounted, computed } from 'vue';
import axiosInstance from '@/hooks/useAxios';

const shlokas = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = 15;
const searchQuery = ref('');

const fetchAllShlokas = async (page = 1) => {
  try {
    loading.value = true;
    const response = await axiosInstance.get('/shlokas', {
      params: { 
        paginate: perPage, 
        page: page,
        search: searchQuery.value,
        with_kanda: 1, 
        with_sarga: 1  
      }
    });
    shlokas.value = response.data.data;
    currentPage.value = response.data.current_page;
    totalPages.value = response.data.last_page;
  } catch (err) {
    console.error("Error fetching shlokas:", err);
  } finally {
    loading.value = false;
  }
};

// ১ থেকে ১০ বা তার বেশি পেজ সিরিয়ালি দেখানোর লজিক
const visiblePages = computed(() => {
  const pages = [];
  const count = 10; 
  
  let start = Math.max(1, currentPage.value - Math.floor(count / 2));
  let end = start + count - 1;

  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(1, end - count + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchAllShlokas(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => fetchAllShlokas());
</script>

<template>
  <div class="min-h-screen  py-12 md:py-20 px-4">
    <main class="max-w-4xl mx-auto">
      
      <div class="flex justify-start mb-10">
        <button 
          @click="$router.back()" 
          class="group flex items-center gap-3 text-secondary/70 hover:text-primary transition-all"
        >
          <span class="w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 bg-[#f9e6c1] group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
            ←
          </span>
          <span class="font-logo text-[10px] tracking-[0.2em] uppercase font-bold">Back</span>
        </button>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-40">
        <div class="w-10 h-10 border-4 border-t-primary border-primary/10 rounded-full animate-spin"></div>
        <p class="font-logo text-[9px] mt-4 tracking-widest text-primary/60">LOADING SHLOKAS...</p>
      </div>

      <div v-else class="space-y-6">
        <router-link 
          v-for="shloka in shlokas" 
          :key="shloka.id" 
          :to="`/shloka/${shloka.id}`"
          class="block bg-[#f9e6c1] p-6 md:p-8 border border-primary/5 rounded-[2rem] hover:border-primary/20 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
        >
          <div class="flex gap-2 mb-4">
            <span class="text-[8px] font-logo px-2 py-0.5 bg-secondary/10 text-secondary rounded uppercase tracking-wider">
              KANDA {{ shloka.kanda?.id || '?' }}
            </span>
            <span class="text-[8px] font-logo px-2 py-0.5 bg-primary/10 text-primary rounded uppercase tracking-wider">
              SARGA {{ shloka.sarga?.id || '?' }}
            </span>
          </div>

          <p class="text-lg md:text-xl font-serif text-secondary leading-relaxed line-clamp-2 italic pr-6">
            {{ shloka.sanskrit }}
          </p>

          <p v-if="shloka.tat" class="mt-3 text-secondary/40 font-serif text-xs line-clamp-1 italic">
            {{ shloka.tat }}
          </p>

          <div class="absolute right-6 top-1/2 -translate-y-1/2 text-primary/20 group-hover:text-primary group-hover:translate-x-1 transition-all">
            →
          </div>
        </router-link>
      </div>

      <nav v-if="totalPages > 1 && !loading" class="mt-20">
        <div class="flex flex-col items-center gap-6">
          <div class="flex flex-wrap justify-center items-center gap-1.5 md:gap-2">
            
            <button 
              @click="changePage(currentPage - 1)" 
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-xl bg-[#f9e6c1] border border-primary/20 text-secondary disabled:opacity-20 hover:bg-primary hover:text-white transition-all font-logo text-[10px] tracking-widest"
            >
              PREV
            </button>
            
            <div class="flex flex-wrap justify-center gap-1.5 md:gap-2">
              <button 
                v-for="page in visiblePages" 
                :key="page" 
                @click="changePage(page)"
                :class="[
                  'w-9 h-9 md:w-11 md:h-11 rounded-xl font-logo text-xs transition-all flex items-center justify-center border-2', 
                  currentPage === page 
                    ? 'bg-primary text-white border-primary shadow-md scale-110 z-10' 
                    : 'bg-[#f9e6c1] text-secondary/60 border-primary/5 hover:border-primary hover:text-primary'
                ]"
              >
                {{ page }}
              </button>
            </div>

            <button 
              @click="changePage(currentPage + 1)" 
              :disabled="currentPage === totalPages"
              class="px-4 py-2 rounded-xl bg-[#f9e6c1] border border-primary/20 text-secondary disabled:opacity-20 hover:bg-primary hover:text-white transition-all font-logo text-[10px] tracking-widest"
            >
              NEXT
            </button>
          </div>

          <div class="font-serif italic text-secondary/40 text-[10px] tracking-[0.2em] uppercase">
            Viewing Page {{ currentPage }} of {{ totalPages }}
          </div>
        </div>
      </nav>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap');

.font-serif {
  font-family: 'Crimson Pro', serif;
}

/* শ্লোক লিস্টের এনিমেশন */
.block {
  animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>