<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/hooks/useAxios';
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
    alerts.value = alerts.value.filter((alert) => alert.id !== id);
  }, 3000);
};

const fetchUserBookmarks = async () => {
  if (user.value?.email) {
    try {
      const response = await axiosSecure.get(
        `/bookmarks?email=${user.value.email}`,
      );
      userBookmarks.value = response.data.map((b) => b.shloka_number);
    } catch (err) {
      console.error('Error fetching bookmarks', err);
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
    showToast('Login required to save', 'error');
    return;
  }
  const shlokaNo = `${sarga.value.chapter}.${shloka.id}`;
  if (isBookmarked(shloka.id)) {
    showToast('Already in collection', 'success');
    return;
  }
  const bookmarkData = {
    userEmail: user.value.email,
    shloka_number: shlokaNo,
    sanskrit: shloka.sanskrit,
    translation: shloka.tat,
    kanda_name: sarga.value.kanda?.name || 'Ramayana',
    link: route.fullPath,
  };
  try {
    const response = await axiosSecure.post('/bookmarks', bookmarkData);
    if (response.data.insertedId) {
      userBookmarks.value.push(shlokaNo);
      showToast('Verse saved successfully');
    }
  } catch (err) {
    showToast('System error', 'error');
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
    showToast('Connection failed', 'error');
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
  <div
    class="min-h-screen py-10 md:py-20 px-4 md:px-10 relative bg-transparent"
  >
    <div
      class="fixed top-24 right-4 md:right-10 z-100 flex flex-col gap-3 pointer-events-none"
    >
      <transition-group name="list">
        <div
          v-for="alert in alerts"
          :key="alert.id"
          :class="
            alert.type === 'success'
              ? 'bg-secondary text-primary border-primary shadow-lg'
              : 'bg-[#4a1414] text-white border-red-500'
          "
          class="pointer-events-auto px-6 py-3 rounded-lg border-b-4 font-logo text-[9px] tracking-[0.2em] uppercase font-bold shadow-2xl backdrop-blur-md min-w-[200px]"
        >
          {{ alert.msg }}
        </div>
      </transition-group>
    </div>

    <header v-if="sarga" class="max-w-425 mx-auto mb-16">
      <div class="flex justify-start mb-8">
        <button
          @click="$router.back()"
          class="group flex items-center gap-3 text-secondary/60 hover:text-primary transition-all"
        >
          <div
            class="w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 group-hover:bg-primary group-hover:text-secondary transition-all"
          >
            <i class="fa-solid fa-arrow-left text-xs"></i>
          </div>
          <span
            class="font-logo text-[9px] tracking-[0.3em] uppercase font-bold"
            >Back</span
          >
        </button>
      </div>

      <div class="text-left border-l-2 border-primary/30 pl-6">
        <span
          class="text-primary font-logo text-[11px] tracking-[0.5em] uppercase font-bold opacity-70"
          >Chapter {{ sarga.chapter }}</span
        >
        <h1
          class="text-4xl md:text-6xl font-logo text-secondary uppercase tracking-tighter mt-1"
        >
          {{ sarga.name }}
        </h1>
      </div>
    </header>

    <main class="max-w-[1700px] mx-auto">
      <div v-if="loading" class="flex justify-center py-32">
        <div
          class="w-10 h-10 border-4 border-t-primary border-secondary/10 rounded-full animate-spin"
        ></div>
      </div>

      <div v-else-if="shlokas.length" class="space-y-16">
        <div
          v-for="(shloka, index) in shlokas"
          :key="shloka.id"
          class="group relative"
        >
          <div class="absolute -top-4 left-8 z-20">
            <div
              class="bg-secondary px-6 py-1.5 rounded-md border border-primary/40 shadow-md"
            >
              <span
                class="font-logo text-primary text-[10px] tracking-[0.3em] font-bold"
                >VERSE {{ (currentPage - 1) * perPage + (index + 1) }}</span
              >
            </div>
          </div>

          <div
            class="relative p-8 md:p-14 bg-[#fdf2da] rounded-xl border border-primary/10 shadow-sm transition-all duration-500 hover:shadow-xl group-hover:border-primary/30"
          >
            <div class="relative z-10 text-center mb-10">
              <p
                class="text-xl md:text-2xl font-serif text-secondary leading-[1.8] font-medium whitespace-pre-line px-4"
              >
                {{ shloka.sanskrit }}
              </p>
            </div>

            <div
              class="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10 items-start"
            >
              <div
                v-if="shloka.pratipada"
                class="p-6 bg-primary/5 rounded-lg border-l-2 border-primary/30"
              >
                <h4
                  class="text-[9px] font-logo text-primary tracking-[0.3em] uppercase mb-3 font-bold opacity-70"
                >
                  Word Meaning
                </h4>
                <p
                  class="text-secondary/70 font-serif text-[15px] leading-relaxed italic"
                >
                  {{ shloka.pratipada }}
                </p>
              </div>

              <div class="space-y-8">
                <div v-if="shloka.tat">
                  <h4
                    class="text-[9px] font-logo text-primary tracking-[0.3em] uppercase mb-3 font-bold opacity-50"
                  >
                    Purport
                  </h4>
                  <p
                    class="text-secondary font-serif text-lg md:text-xl leading-relaxed italic font-light"
                  >
                    "{{ shloka.tat.trim() }}"
                  </p>
                </div>

                <div
                  v-if="shloka.comment"
                  class="p-5 bg-secondary/5 border-t border-primary/5 italic"
                >
                  <h4
                    class="text-[8px] font-logo text-secondary/40 tracking-[0.3em] uppercase mb-2 font-bold"
                  >
                    Context
                  </h4>
                  <p
                    class="text-secondary/50 font-serif text-[13px] leading-relaxed"
                  >
                    {{ shloka.comment }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="flex justify-between items-center mt-12 pt-6 border-t border-primary/5 relative z-10"
            >
              <span
                class="font-logo text-[8px] text-primary/30 tracking-[0.4em] uppercase italic"
              >
                The Adi Kavya
              </span>

              <button
                @click="handleBookmark(shloka)"
                class="group relative overflow-hidden px-8 py-3 rounded-xl transition-all shadow-xl font-logo text-[9px] tracking-[0.2em] uppercase font-bold flex items-center gap-2"
                :class="
                  isBookmarked(shloka.id)
                    ? 'bg-secondary text-primary'
                    : 'bg-secondary text-white'
                "
              >
                <div
                  class="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"
                  v-if="!isBookmarked(shloka.id)"
                ></div>

                <span
                  class="relative z-10 flex items-center gap-2 transition-colors duration-300"
                  :class="
                    !isBookmarked(shloka.id) ? 'group-hover:text-secondary' : ''
                  "
                >
                  <i
                    :class="[
                      isBookmarked(shloka.id) ? 'fa-solid' : 'fa-regular',
                      'fa-bookmark',
                    ]"
                  ></i>
                  {{ isBookmarked(shloka.id) ? 'Saved' : 'Bookmark' }}
                </span>
              </button>
            </div>

            <div
              class="absolute -right-10 -bottom-10 text-[15rem] font-logo text-primary opacity-[0.02] pointer-events-none select-none"
            >
              ॐ
            </div>
          </div>
        </div>
      </div>

      <nav v-if="totalPages > 1 && !loading" class="mt-32 pb-20">
        <div class="flex flex-col items-center gap-6">
          <div
            class="text-[9px] font-logo text-primary/40 tracking-[0.4em] uppercase font-bold"
          >
            Page {{ currentPage }} of {{ totalPages }}
          </div>

          <div
            class="flex flex-wrap justify-center items-center gap-3 md:gap-5"
          >
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 bg-[#fdf2da] text-secondary/70 shadow-sm transition-all hover:bg-primary hover:text-secondary disabled:opacity-20 active:scale-95"
            >
              <span
                class="text-xs group-hover:-translate-x-1 transition-transform"
                >←</span
              >
              <span
                class="font-logo text-[9px] font-black tracking-[0.2em] uppercase"
                >Prev</span
              >
            </button>

            <div
              class="flex flex-wrap justify-center items-center gap-2 px-3 py-2 bg-primary/5 rounded-2xl border border-primary/10 backdrop-blur-sm"
            >
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="changePage(page)"
                :class="[
                  'w-9 h-9 md:w-11 md:h-11 rounded-xl font-logo text-[11px] md:text-xs transition-all flex items-center justify-center font-bold shadow-sm',
                  currentPage === page
                    ? 'bg-primary text-secondary border-primary shadow-md scale-110 z-10'
                    : 'bg-[#fdf2da] text-secondary/60 border-primary/10 hover:border-primary/40 hover:text-primary',
                ]"
              >
                {{ page }}
              </button>
            </div>

            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 bg-[#fdf2da] text-secondary/70 shadow-sm transition-all hover:bg-primary hover:text-secondary disabled:opacity-20 active:scale-95"
            >
              <span
                class="font-logo text-[9px] font-black tracking-[0.2em] uppercase"
                >Next</span
              >
              <span
                class="text-xs group-hover:translate-x-1 transition-transform"
                >→</span
              >
            </button>
          </div>

          <div
            class="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          ></div>
        </div>
      </nav>
    </main>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
