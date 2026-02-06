<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/hooks/useAxios';
import axios from 'axios';
import { useAuthProvider } from '@/Authentication/AuthProvider';
import axiosSecure from '@/hooks/axiosSecure';

const { user } = useAuthProvider();
const route = useRoute();
const sarga = ref(null);
const shlokas = ref([]);
const userBookmarks = ref([]);
const loading = ref(true);

const alerts = ref([]);

const showToast = (msg, type = 'success') => {
  const id = Date.now();
  const newAlert = { id, msg, type };
  
  alerts.value.unshift(newAlert);

  setTimeout(() => {
    alerts.value = alerts.value.filter(alert => alert.id !== id);
  }, 3000);
};

const fetchUserBookmarks = async () => {
  if (user.value?.email) {
    try {
      const response = await axiosSecure.get(`/bookmarks?email=${user.value.email}`);
      userBookmarks.value = response.data.map(b => b.shloka_number);
    } catch (err) {
      console.error("Error fetching bookmarks", err);
    }
  }
};

const isBookmarked = (shlokaId) => {
  if (!sarga.value) return false;
  const shlokaNo = `${sarga.value.chapter}.${shlokaId}`;
  return userBookmarks.value.includes(shlokaNo);
};

const handleBookmark = async (shloka) => {
  if (!user.value) {
    showToast("Login required to save", "error");
    return;
  }
  const shlokaNo = `${sarga.value.chapter}.${shloka.id}`;
  if (isBookmarked(shloka.id)) {
    showToast("Already in collection", "success");
    return;
  }
  const bookmarkData = {
    userEmail: user.value.email,
    shloka_number: shlokaNo,
    sanskrit: shloka.sanskrit,
    translation: shloka.tat,
    kanda_name: sarga.value.kanda?.name || "Ramayana",
    link: route.fullPath
  };
  try {
    const response = await axiosSecure.post('/bookmarks', bookmarkData);
    if (response.data.insertedId) {
      userBookmarks.value.push(shlokaNo);
      showToast("Verse saved successfully");
    }
  } catch (err) {
    showToast("System error", "error");
  }
};

const fetchSargaDetails = async (page = 1) => {
  try {
    loading.value = true;
    const response = await axiosInstance.get(`/sarga/${route.params.id}`, {
      params: { with_shloka: 1, with_kanda: 1, paginate: perPage, page: page },
    });
    sarga.value = response.data;
    shlokas.value = response.data.shlokas.data;
    currentPage.value = response.data.shlokas.current_page;
    totalPages.value = response.data.shlokas.last_page;
    await fetchUserBookmarks();
  } catch (err) {
    showToast("Connection failed", "error");
  } finally {
    loading.value = false;
  }
};

const currentPage = ref(1);
const totalPages = ref(1);
const perPage = 10;

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
  <div class="min-h-screen py-8 md:py-20 px-3 md:px-6 relative ">
    
    <div class="fixed top-24 right-4 md:right-10 z-[100] flex flex-col gap-3 pointer-events-none">
      <transition-group name="list">
        <div v-for="alert in alerts" :key="alert.id" 
          :class="alert.type === 'success' ? 'bg-secondary text-primary border-primary shadow-primary/20' : 'bg-[#4a1414] text-white border-red-500 shadow-black/40'"
          class="pointer-events-auto px-8 py-3 rounded-xl border-b-4 font-logo text-[10px] tracking-[0.2em] uppercase font-bold shadow-2xl backdrop-blur-md min-w-[200px]"
        >
          {{ alert.msg }}
        </div>
      </transition-group>
    </div>

    <header v-if="sarga" class="max-w-7xl mx-auto mb-16 text-center">
      <div class="flex justify-start mb-8">
        <button @click="$router.back()" class="group flex items-center gap-3 text-secondary/70 hover:text-primary transition-all">
          <span class="w-10 h-10 flex items-center justify-center rounded-full border border-[#eda917]/30 bg-[#eda917]/10 group-hover:bg-primary group-hover:text-secondary transition-all font-bold">←</span>
          <span class="font-logo text-[10px] tracking-[0.2em] uppercase font-bold">Back</span>
        </button>
      </div>
      <span class="text-primary font-logo text-xs tracking-[0.4em] uppercase font-bold">Chapter {{ sarga.chapter }}</span>
      <h1 class="text-3xl md:text-6xl font-logo text-secondary mt-4 uppercase tracking-tighter">{{ sarga.name }}</h1>
    </header>

    <main class="max-w-4xl mx-auto">
      <div v-if="loading" class="flex justify-center py-20">
        <div class="w-10 h-10 border-4 border-t-primary border-secondary/20 rounded-full animate-spin"></div>
      </div>

      <div v-else-if="shlokas.length" class="space-y-20">
        <div v-for="(shloka, index) in shlokas" :key="shloka.id" class="group relative">
          
          <div class="flex justify-center mb-6">
             <span class="font-logo text-primary text-sm tracking-widest font-bold">॥ {{ (currentPage - 1) * perPage + (index + 1) }} ॥</span>
          </div>

          <div class="p-8 md:p-16 border-2 border-[#eda917] rounded-[3rem] relative shadow-xl overflow-hidden bg-[#fdf2da] transition-all duration-300">
            
            <p class="text-xl md:text-3xl text-center font-serif text-secondary leading-[1.8] mb-12 italic font-medium whitespace-pre-line">
              {{ shloka.sanskrit }}
            </p>

            <div v-if="shloka.pratipada" class="mt-8 p-6 bg-[#eda917]/10 rounded-2xl border-l-4 border-primary/50 shadow-inner">
              <h4 class="text-[9px] font-logo text-primary tracking-[0.3em] uppercase mb-3 font-black">Pratipada</h4>
              <p class="text-secondary/80 font-serif text-sm leading-relaxed whitespace-pre-line">{{ shloka.pratipada }}</p>
            </div>

            <div v-if="shloka.tat" class="mt-10 pt-10 border-t border-[#eda917]/20">
              <h4 class="text-[9px] font-logo text-primary tracking-[0.3em] uppercase mb-4 text-center font-black">Translation</h4>
              <p class="text-secondary font-serif text-lg md:text-xl text-center leading-relaxed font-medium">"{{ shloka.tat.trim() }}"</p>
            </div>

            <div v-if="shloka.comment" class="mt-10 p-6 bg-secondary/5 rounded-2xl border-t-2 border-primary/20">
              <h4 class="text-[9px] font-logo text-secondary/60 tracking-[0.3em] uppercase mb-3 font-black italic">Commentary</h4>
              <p class="text-secondary/70 font-serif text-sm leading-relaxed italic">{{ shloka.comment }}</p>
            </div>

            <div class="flex justify-end mt-12 relative z-10">
              <button 
                @click="handleBookmark(shloka)"
                class="flex items-center gap-3 px-8 py-4 rounded-2xl border-2 transition-all duration-300 font-logo text-[10px] tracking-[0.2em] uppercase font-bold"
                :class="isBookmarked(shloka.id) ? 'bg-primary text-secondary border-primary shadow-lg shadow-primary/30' : 'bg-secondary text-primary border-secondary'"
              >
                <i :class="[isBookmarked(shloka.id) ? 'fa-solid' : 'fa-regular', 'fa-bookmark text-base']"></i>
                {{ isBookmarked(shloka.id) ? 'Bookmarked' : 'Save Verse' }}
              </button>
            </div>

            <div class="absolute -right-6 -bottom-8 text-[12rem] font-logo text-primary opacity-[0.07] pointer-events-none select-none">ॐ</div>
          </div>
        </div>
      </div>

      <nav v-if="totalPages > 1 && !loading" class="mt-24 pb-12">
        <div class="flex flex-wrap justify-center items-center gap-3">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-6 py-3 rounded-xl border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary disabled:opacity-20 transition-all font-logo text-[10px] font-bold">PREV</button>
          <button v-for="page in visiblePages" :key="page" @click="changePage(page)" :class="['w-12 h-12 rounded-xl font-logo text-xs transition-all border-2 flex items-center justify-center font-bold', currentPage === page ? 'bg-secondary text-primary border-secondary' : 'bg-transparent text-secondary border-secondary/20 hover:border-secondary']">{{ page }}</button>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-6 py-3 rounded-xl border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary disabled:opacity-20 transition-all font-logo text-[10px] font-bold">NEXT</button>
        </div>
      </nav>
    </main>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.list-move {
  transition: transform 0.5s ease;
}
</style>