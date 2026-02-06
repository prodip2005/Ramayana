<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '@/hooks/useAxios';

const route = useRoute();
const router = useRouter();
const shloka = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchShlokaDetail = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await axiosInstance.get(`/shloka/${route.params.id}`, {
      params: { with_kanda: 1, with_sarga: 1 }
    });
    shloka.value = response.data;
  } catch (err) {
    error.value = "শ্লোকটির বিস্তারিত তথ্য পাওয়া যায়নি।";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchShlokaDetail());
</script>

<template>
  <div class="min-h-screen  py-12 md:py-24 px-4 overflow-x-hidden">
    <div class="max-w-4xl mx-auto">
      
      <nav class="flex justify-between items-center mb-12">
        <button 
          @click="router.back()" 
          class="group flex items-center gap-3 text-secondary/70 hover:text-primary transition-all"
        >
          <span class="w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 bg-[#f9e6c1] group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
            ←
          </span>
          <span class="font-logo text-[10px] tracking-[0.2em] uppercase">Back to List</span>
        </button>

        <div v-if="shloka" class="hidden md:flex gap-4">
          <span class="font-logo text-[10px] text-primary tracking-widest uppercase">Kanda {{ shloka.kanda?.id }}</span>
          <span class="text-secondary/20">•</span>
          <span class="font-logo text-[10px] text-primary tracking-widest uppercase">Sarga {{ shloka.sarga?.id }}</span>
        </div>
      </nav>

      <div v-if="loading" class="flex flex-col items-center justify-center py-40">
        <div class="w-12 h-12 border-4 border-t-primary border-primary/10 rounded-full animate-spin"></div>
        <p class="font-logo text-[10px] mt-6 tracking-[0.3em] text-primary">RETRIEVING HOLY VERSE...</p>
      </div>

      <div v-else-if="shloka" class="relative group">
        <div class="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
          <div class="bg-secondary text-[#f1e9d5] font-logo px-8 py-2 rounded-full text-sm shadow-xl border-4 border-[#f7eedc] tracking-widest">
            VERSE {{ shloka.id }}
          </div>
        </div>

        <article class="bg-[#f9e6c1] border border-primary/10 rounded-[3rem] shadow-[0_20px_50px_rgba(61,4,4,0.05)] overflow-hidden">
          
          <div class="p-10 md:p-20 text-center bg-white/10 relative">
            <p class="text-2xl md:text-4xl font-serif text-secondary leading-[1.8] md:leading-[2] whitespace-pre-line relative z-10 drop-shadow-sm">
              {{ shloka.sanskrit }}
            </p>
            <div class="absolute inset-0 flex items-center justify-center text-[15rem] font-logo text-primary/[0.03] pointer-events-none select-none italic">ॐ</div>
          </div>

          <div v-if="shloka.pratipada" class="p-8 md:p-14 border-t border-primary/5">
            <div class="flex items-center gap-4 mb-8">
              <div class="h-px flex-1 bg-primary/10"></div>
              <h4 class="font-logo text-[10px] text-primary tracking-[0.4em] uppercase">Word Meanings</h4>
              <div class="h-px flex-1 bg-primary/10"></div>
            </div>
            
            <div class="bg-[#fdf2da]/50 rounded-3xl p-6 md:p-10 border border-primary/5">
              <p class="text-secondary/80 font-serif text-sm md:text-lg leading-[2] whitespace-pre-line">
                {{ shloka.pratipada }}
              </p>
            </div>
          </div>

          <div v-if="shloka.tat" class="p-8 md:p-14 bg-secondary/[0.02] border-t border-primary/5">
            <h4 class="font-logo text-[10px] text-primary tracking-[0.4em] uppercase mb-8 text-center">Translation</h4>
            <div class="relative">
              <span class="absolute -top-6 -left-4 text-6xl font-serif text-primary/10">“</span>
              <p class="text-xl md:text-3xl font-serif text-secondary italic leading-relaxed text-center px-4">
                {{ shloka.tat.trim() }}
              </p>
              <span class="absolute -bottom-10 -right-4 text-6xl font-serif text-primary/10">”</span>
            </div>
          </div>

          <div v-if="shloka.comment" class="p-8 md:p-14 bg-primary/[0.03] border-t border-primary/10">
            <div class="flex flex-col items-center">
              <div class="mb-6 px-4 py-1 bg-primary/10 rounded-full">
                <h4 class="font-logo text-[9px] text-primary tracking-widest uppercase">Commentary</h4>
              </div>
              <p class="text-secondary/70 font-serif text-sm md:text-base italic leading-relaxed text-center max-w-2xl">
                {{ shloka.comment }}
              </p>
            </div>
          </div>

          <footer class="p-8 bg-secondary/5 flex flex-col items-center gap-2 border-t border-primary/5">
            <p class="font-logo text-[10px] text-secondary/40 tracking-[0.3em] uppercase">
              {{ shloka.kanda?.name || 'Bala' }} Kanda • Sarga {{ shloka.sarga?.id || '1' }}
            </p>
          </footer>
        </article>
      </div>

      <div v-else class="text-center py-20">
        <p class="font-serif text-secondary/50 italic">{{ error || 'শ্লোকটি খুঁজে পাওয়া যায়নি।' }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap');

.font-serif {
  font-family: 'Crimson Pro', serif;
}

article {
  animation: fadeInVerse 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInVerse {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>