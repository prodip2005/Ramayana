<script setup>
import { ref, onMounted, computed } from 'vue';

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

onMounted(() => {
  setInterval(() => {
    isTransitioning.value = true;
    activeIndex.value++;

    if (activeIndex.value >= originalTeachings.length * 2) {
      setTimeout(() => {
        isTransitioning.value = false;
        activeIndex.value = originalTeachings.length;
        setTimeout(() => {
          isTransitioning.value = true;
        }, 50);
      }, 800);
    }
  }, 3500);
});
</script>

<template>
  <section class="relative z-12 py-12 md:py-24 bg-transparent overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 md:px-6">
      <div class="text-center mb-10 md:mb-16 px-4">
        <h2
          class="text-3xl md:text-5xl font-serif text-[#3d0c02] italic font-bold tracking-tight"
        >
          Timeless Dharma Wisdom
        </h2>
        <p
          class="text-[#3d0c02]/70 font-serif italic tracking-[0.1em] md:tracking-[0.2em] text-sm md:text-lg mt-2"
        >
          Sacred Lessons from the Adi Kavya
        </p>
      </div>

      <div
        class="relative h-[400px] md:h-[450px] flex items-center justify-center perspective-mobile md:perspective-2000"
      >
        <div
          v-for="(lesson, index) in teachings"
          :key="index"
          class="slider-wrapper absolute w-[280px] sm:w-[350px] md:w-[480px] ease-in-out cursor-pointer"
          :class="{ 'transition-all duration-800': isTransitioning }"
          :style="{
            transform: `translateX(${(index - activeIndex) * (windowWidth < 768 ? 85 : 75)}%) scale(${index === activeIndex ? 1.1 : 0.8}) rotateY(${(index - activeIndex) * -35}deg) translateZ(${index === activeIndex ? (windowWidth < 768 ? 50 : 120) : 0}px)`,
            zIndex: 100 - Math.abs(index - activeIndex),
            opacity:
              Math.abs(index - activeIndex) > 1 && windowWidth < 768
                ? 0
                : Math.abs(index - activeIndex) > 2
                  ? 0
                  : index === activeIndex
                    ? 1
                    : 0.5,
            filter:
              index === activeIndex
                ? 'drop-shadow(0 20px 40px rgba(61, 12, 2, 0.2))'
                : 'brightness(0.5) blur(1px)',
          }"
          @click="activeIndex = index"
        >
          <div
            class="card-body relative bg-[#f1e9d5] p-6 md:p-10 rounded-xl border-2 border-accent/30 overflow-hidden group backface-hidden"
          >
            <div
              class="absolute -top-6 -left-6 w-16 md:w-24 h-16 md:h-24 border-4 md:border-8 border-accent/10 rounded-full"
            ></div>

            <div class="relative z-10 flex flex-col justify-between h-full">
              <div class="flex justify-between items-start mb-4 md:mb-6">
                <div class="relative">
                  <div
                    class="w-10 h-10 md:w-14 md:h-14 bg-[#3d0c02] text-accent rounded-lg flex items-center justify-center text-xl md:text-2xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform"
                  >
                    ✦
                  </div>
                  <div
                    class="absolute -inset-1 border border-accent/30 rounded-lg -rotate-3 group-hover:rotate-0 transition-transform"
                  ></div>
                </div>
                <div class="text-right">
                  <p
                    class="text-[8px] md:text-[10px] font-bold text-accent uppercase tracking-[0.2em]"
                  >
                    Valmiki Verse
                  </p>
                  <p
                    class="text-secondary font-serif italic text-[10px] md:text-xs"
                  >
                    Section {{ (index % originalTeachings.length) + 1 }}
                  </p>
                </div>
              </div>

              <div class="mb-2 md:mb-4">
                <h3
                  class="text-xl md:text-3xl font-serif font-bold text-secondary mb-1 tracking-tight"
                >
                  {{ lesson.title }}
                </h3>
                <p
                  class="text-accent font-bold text-[9px] md:text-[11px] uppercase tracking-widest mb-3 md:mb-6 flex items-center gap-2"
                >
                  <span class="w-3 h-[1px] bg-accent/40"></span>
                  {{ lesson.sanskrit }}
                </p>

                <p
                  class="text-sm md:text-[17px] font-serif italic text-secondary/90 leading-snug md:leading-relaxed antialiased"
                >
                  "{{ lesson.description }}"
                </p>
              </div>

              <div
                class="flex items-center justify-between mt-4 pt-4 border-t border-accent/10"
              >
                <div class="flex gap-1.5">
                  <div
                    v-for="i in 3"
                    :key="i"
                    class="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent/40 rounded-full"
                  ></div>
                </div>
                <span
                  class="text-2xl md:text-4xl text-accent opacity-20 font-serif"
                  >ॐ</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  },
};
</script>

<style scoped>
.perspective-2000 {
  perspective: 2500px;
  transform-style: preserve-3d;
}

@media (max-width: 768px) {
  .perspective-mobile {
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  .card-body {
    height: 280px !important;
  }
}

.card-body {
  height: 340px;
  box-shadow: inset 0 0 80px rgba(197, 160, 89, 0.08);
}

.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.backface-hidden {
  backface-visibility: hidden;
}

.slider-wrapper {
  will-change: transform, opacity;
}
</style>
