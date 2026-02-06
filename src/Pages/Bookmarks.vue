<script setup>
import { ref, onMounted, watch } from 'vue'; 
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { useAuthProvider } from '@/Authentication/AuthProvider';
import axiosSecure from '@/hooks/axiosSecure';

const { user } = useAuthProvider();
const bookmarks = ref([]);
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

const fetchBookmarks = async () => {
  if (!user.value?.email) return;
  
  try {
    loading.value = true;
    const response = await axiosSecure.get(`/bookmarks?email=${user.value.email}`);
    bookmarks.value = response.data;
  } catch (err) {
    showToast("Failed to load collection", "error");
  } finally {
    loading.value = false;
  }
};

watch(user, (newUser) => {
  if (newUser?.email) {
    fetchBookmarks();
  }
}, { immediate: true });

const removeBookmark = async (id) => {
  try {
    const response = await axiosSecure.delete(`/bookmarks/${id}`);
    if (response.data.deletedCount > 0) {
      bookmarks.value = bookmarks.value.filter(b => b._id !== id);
      showToast("Removed from collection");
    }
  } catch (err) {
    showToast("Could not remove verse", "error");
  }
};

onMounted(() => {
  if (user.value?.email) {
    fetchBookmarks();
  }
});
</script>

<template>
  <div class="min-h-screen py-12 md:py-24 px-4 md:px-6 relative">
    
    <div class="fixed top-24 right-4 md:right-10 z-[100] flex flex-col gap-3 pointer-events-none">
      <transition-group name="list">
        <div v-for="alert in alerts" :key="alert.id" 
          :class="alert.type === 'success' ? 'bg-secondary text-primary border-primary' : 'bg-[#4a1414] text-white border-red-500'"
          class="pointer-events-auto px-8 py-3 rounded-xl border-b-4 font-logo text-[10px] tracking-[0.2em] uppercase font-bold shadow-2xl backdrop-blur-md min-w-[200px]"
        >
          {{ alert.msg }}
        </div>
      </transition-group>
    </div>

    <header class="max-w-7xl mx-auto text-center mb-16 md:mb-28">
      <div class="flex items-center justify-center gap-4 mb-6">
        <div class="h-[2px] w-8 md:w-12 bg-primary/60"></div>
        <span class="text-secondary font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-[8px] md:text-[10px]">
          Sacred Collection
        </span>
        <div class="h-[2px] w-8 md:w-12 bg-primary/60"></div>
      </div>
      <h1 class="text-4xl md:text-8xl font-serif font-bold italic text-secondary mb-6 md:mb-8 drop-shadow-sm">
        My <span class="text-primary">Bookmarks</span>
      </h1>
    </header>

    <div v-if="loading && !bookmarks.length" class="flex justify-center py-20">
      <div class="w-10 h-10 border-4 border-t-primary border-secondary/20 rounded-full animate-spin"></div>
    </div>

    <div v-else-if="bookmarks.length === 0" class="max-w-2xl mx-auto text-center p-12 md:p-20 bg-[#fdf2da] border-2 border-[#eda917] rounded-[3rem] shadow-xl">
       <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
         <i class="fa-solid fa-book-bookmark text-3xl text-primary"></i>
       </div>
       <h2 class="text-2xl font-logo text-secondary mb-4 italic font-black uppercase tracking-widest">No Verses Saved</h2>
       <p class="text-secondary/60 font-serif mb-10 italic">Explore the divine Ramayana to save your favorite verses.</p>
       <RouterLink to="/ramayana">
         <button class="px-10 py-4 bg-secondary text-primary font-bold uppercase tracking-widest text-xs rounded-xl border-2 border-primary hover:bg-primary hover:text-secondary transition-all shadow-lg">
           Start Exploring
         </button>
       </RouterLink>
    </div>

    <main v-else class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
      <article v-for="shloka in bookmarks" :key="shloka._id" class="relative">
        <div class="relative h-full bg-[#fdf2da] p-8 md:p-12 flex flex-col justify-between border-2 border-[#eda917] hover:border-primary shadow-xl rounded-[2.5rem] overflow-hidden transition-all duration-500">
          
          <div class="relative z-10 flex justify-between items-start mb-10">
            <div class="flex flex-col gap-2">
              <span class="text-primary font-logo font-black tracking-[0.2em] text-[11px] uppercase">
                {{ shloka.kanda_name }}
              </span>
              <div class="flex items-center gap-3">
                <div class="bg-secondary/5 px-3 py-1.5 rounded-lg border border-primary/10 flex items-center gap-3">
                  <p class="text-[10px] text-secondary font-bold tracking-widest uppercase">
                    Sarga {{ shloka.shloka_number.split('.')[1] }}
                  </p>
                </div>
              </div>
            </div>
            
            <button @click="removeBookmark(shloka._id)" class="bg-secondary/10 text-secondary hover:bg-red-600 hover:text-white p-3 rounded-xl transition-all shadow-sm">
              <i class="fa-solid fa-trash-can text-sm"></i>
            </button>
          </div>

          <div class="relative z-10 space-y-8 mb-10 text-center">
            <p class="text-xl md:text-2xl font-serif font-bold text-secondary leading-relaxed italic whitespace-pre-line">
              {{ shloka.sanskrit }}
            </p>
            <div class="flex justify-center items-center gap-4">
               <div class="h-[1px] w-12 bg-primary/30"></div>
               <span class="text-primary text-[9px] font-logo uppercase tracking-widest font-black opacity-70">Translation</span>
               <div class="h-[1px] w-12 bg-primary/30"></div>
            </div>
            <p class="text-secondary/80 font-serif italic leading-relaxed text-sm md:text-lg line-clamp-4">
              "{{ shloka.translation }}"
            </p>
          </div>

          <RouterLink :to="shloka.link" class="relative z-10 mt-auto group">
            <button class="w-full relative px-8 py-4 bg-primary text-white font-logo font-black tracking-[0.3em] overflow-hidden transition-all shadow-lg rounded-xl border-2 border-primary">
              <div class="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span class="relative z-10 uppercase text-[10px] md:text-xs transition-colors duration-300 group-hover:text-primary">
                Read Full Context
              </span>
            </button>
          </RouterLink>

          <div class="absolute -right-6 -bottom-8 text-[12rem] font-logo text-primary opacity-[0.06] pointer-events-none select-none">ॐ</div>
        </div>
      </article>
    </main>

    <footer class="mt-24 text-center">
      <div class="inline-flex items-center gap-6 opacity-40">
        <div class="h-[1px] w-24 bg-gradient-to-r from-transparent to-primary"></div>
        <span class="text-primary text-4xl italic font-serif font-bold">ॐ</span>
        <div class="h-[1px] w-24 bg-gradient-to-l from-transparent to-primary"></div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from { opacity: 0; transform: translateX(30px); }
.list-leave-to { opacity: 0; transform: scale(0.9); }
.list-move { transition: transform 0.5s ease; }

article { animation: divineFade 0.8s ease-out forwards; }
@keyframes divineFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>