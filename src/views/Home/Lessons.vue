<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';

const originalTeachings = [
  {
    title: 'Filial Devotion',
    sanskrit: 'Pitrubhakti',
    description:
      "Rama's unwavering obedience to his father teaches us the sacred value of honoring parents.",
  },
  {
    title: 'Steadfast Truth',
    sanskrit: 'Satya-Vrata',
    description:
      "The commitment to one's word is the core of Rama's character, proving truth is the highest power.",
  },
  {
    title: 'Brotherly Love',
    sanskrit: 'Bhratrutva',
    description:
      'Lakshmana and Bharata symbolize selfless loyalty, showing that brotherhood transcends ego.',
  },
  {
    title: 'Selfless Service',
    sanskrit: 'Seva-Dharma',
    description:
      "Hanuman's surrender to the Divine illustrates how strength is magnified through pure devotion.",
  },
  {
    title: 'Ideal Leadership',
    sanskrit: 'Rajadharma',
    description:
      "Rama-rajya represents a state where the leader's primary duty is the welfare of the people.",
  },
  {
    title: 'Unwavering Chastity',
    sanskrit: 'Pativratya',
    description:
      "Mata Sita's resilience and purity through trials define the strength of a devoted soul.",
  },
  {
    title: 'Compassion',
    sanskrit: 'Karuna',
    description:
      "Rama's kindness toward Sabari and Guha shows that true greatness sees no caste or status.",
  },
  {
    title: 'Conquering Ego',
    sanskrit: 'Ahankara Nasha',
    description:
      'The fall of Ravana serves as a warning that knowledge without humility leads to destruction.',
  },
  {
    title: 'Forgiveness',
    sanskrit: 'Kshama',
    description:
      'Forgiving those who err, just as Rama forgave many, is a trait of a truly noble heart.',
  },
  {
    title: 'Righteousness',
    sanskrit: 'Dharma',
    description:
      'The core of Ramayana is the victory of Dharma over Adharma in every walk of life.',
  },
];

const teachings = computed(() => [
  ...originalTeachings,
  ...originalTeachings,
  ...originalTeachings,
]);
const activeIndex = ref(originalTeachings.length);
const isTransitioning = ref(true);
const windowWidth = ref(
  typeof window !== 'undefined' ? window.innerWidth : 1200,
);

let timer = null;

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  timer = setInterval(() => {
    isTransitioning.value = true;
    activeIndex.value++;

    if (activeIndex.value >= originalTeachings.length * 2) {
      setTimeout(() => {
        isTransitioning.value = false;
        activeIndex.value = originalTeachings.length;
      }, 700);
    }
  }, 4000);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (timer) clearInterval(timer);
});
</script>

<template>
  <section class="relative py-24 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 text-center mb-20">
      <h2
        class="text-4xl md:text-6xl font-serif text-[#3d0c02] italic font-bold"
      >
        Timeless Dharma Wisdom
      </h2>
      <div class="mt-4 flex justify-center items-center gap-4">
        <span class="h-[2px] w-12 bg-[#c5a059]"></span>
        <span class="text-[#c5a059] font-serif text-xl">ॐ</span>
        <span class="h-[2px] w-12 bg-[#c5a059]"></span>
      </div>
    </div>

    <div
      class="relative h-[550px] flex items-center justify-center container-3d"
    >
      <div
        v-for="(lesson, index) in teachings"
        :key="index"
        class="absolute w-[300px] md:w-[500px] transition-all duration-1000 ease-in-out"
        :style="{
          transform: `translateX(${(index - activeIndex) * (windowWidth < 768 ? 105 : 65)}%) 
                      scale(${index === activeIndex ? 1.05 : 0.8}) 
                      rotateY(${(index - activeIndex) * -30}deg)`,
          zIndex: 100 - Math.abs(index - activeIndex),
          opacity:
            Math.abs(index - activeIndex) > 2
              ? 0
              : index === activeIndex
                ? 1
                : 0.6,
        }"
      >
        <div
          class="manuscript-card relative p-10 md:p-14 rounded-sm border-2 border-[#c5a059]/40 shadow-xl bg-[#f4e4bc] overflow-hidden"
        >
          <div
            class="absolute top-2 left-2 right-2 bottom-2 border border-[#c5a059]/20 pointer-events-none"
          ></div>

          <div class="relative z-10 text-center">
            <p
              class="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.4em] mb-6"
            >
              ॥ Sacred Teaching ॥
            </p>

            <h3
              class="text-3xl md:text-5xl font-serif font-bold text-[#3d0c02] mb-3"
            >
              {{ lesson.title }}
            </h3>

            <p class="text-[#c5a059] font-bold text-lg italic mb-10">
              {{ lesson.sanskrit }}
            </p>

            <div class="relative inline-block">
              <div class="w-12 h-[1px] bg-[#c5a059]/30 mx-auto mb-6"></div>
              <p
                class="text-xl md:text-2xl font-serif italic text-[#3d0c02]/90 leading-relaxed px-2"
              >
                "{{ lesson.description }}"
              </p>
              <div class="w-12 h-[1px] bg-[#c5a059]/30 mx-auto mt-6"></div>
            </div>
          </div>

          <div
            class="absolute -bottom-4 -right-4 text-6xl text-[#c5a059]/10 font-serif rotate-12"
          >
            राम
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container-3d {
  perspective: 2500px;
}

.manuscript-card {
  background-image: url('https://www.transparenttextures.com/patterns/handmade-paper.png');
  box-shadow:
    0 10px 30px rgba(61, 12, 2, 0.15),
    inset 0 0 100px rgba(197, 160, 89, 0.1);
  border-radius: 4px;
}

.manuscript-card::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 40px rgba(61, 12, 2, 0.05);
  pointer-events: none;
}

h2,
h3 {
  letter-spacing: -0.02em;
}

.transition-all {
  will-change: transform, opacity;
}
</style>
