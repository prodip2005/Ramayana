<script setup>
import { ref } from 'vue';

const characters = ref([
  {
    id: 1,
    name: 'Lord Rama',
    title: 'Maryada Purushottam',
    description: 'Lord Rama is the seventh avatar of Lord Vishnu, symbolizing righteousness and ideal kingship.',
    image: 'https://imgs.search.brave.com/draYJq1JkZosX1e3IwnnF9CL_0tOznjvxqNlK158C1A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2LzYxLzM2LzA1/LzM2MF9GXzE2NjEz/NjA1Nzhfb056eDkw/QWNkODRJbTJPRkFw/NVBFbDdvYThyajNo/Y0guanBn',
  },
  {
    id: 2,
    name: 'Mata Sita',
    title: 'Symbol of Purity',
    description: 'Mata Sita represents purity, devotion, and inner strength as the incarnation of Goddess Lakshmi.',
    image: 'https://imgs.search.brave.com/yTxbA1RkOkHNyiA5gKnTIa3s8DLV_UPa9HDNEWPaUvY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY5Lzg3/L2E1LzY5ODdhNTVm/YzFiNzZmYjMzYzhj/Mzg4NDdiNGM0N2Jk/LmpwZw',
  },
  {
    id: 3,
    name: 'Hanuman Ji',
    title: 'The Ultimate Devotee',
    description: 'Hanuman Ji is the embodiment of devotion, strength, and selfless service to Lord Rama.',
    image: 'https://imgs.search.brave.com/TAfRXEwOnHtb158ozn2zg4c-tpVzqgCOsmZX3cG6EGo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waG90/b3Nub3cub3JnL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzA0/LzcwMTAzZTExMzYw/N2YxY2Q4MGQ0ODhi/NWJkOTY4M2ZlLmpw/Zw',
  },
  {
    id: 4,
    name: 'Lakshmana',
    title: 'The Loyal Brother',
    description: 'Lakshmana is the symbol of loyalty and sacrifice, the steadfast protector of Rama and Sita.',
    image: 'https://w0.peakpx.com/wallpaper/199/685/HD-wallpaper-lord-rama-blue-lord-ram-god-jai-shri-ram-thumbnail.jpg',
  },
  {
    id: 5,
    name: 'Ravana',
    title: 'The Scholar King',
    description: 'Ravana was a powerful king of Lanka, known for his intelligence and mastery of scriptures.',
    image: 'https://imgs.search.brave.com/KjT-ovwjFkJPFhOBlX2Ao53gptqzSvShUxiQ5MKhm-M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzEzL2I5/LzIzLzEzYjkyM2Vl/NjlhODJmYzMxMTY3/OGUyNGVhZTJlZWQy/LmpwZw',
  },
]);

const flippedCards = ref({});
const tiltStyles = ref({});

const toggleFlip = (id) => {
  flippedCards.value[id] = !flippedCards.value[id];
  
  tiltStyles.value[id] = null;
};

const handleTilt = (e, id) => {
  if (flippedCards.value[id]) return;

  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -15;
  const rotateY = ((x - centerX) / centerX) * 15;

  tiltStyles.value[id] = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const resetTilt = (id) => {
  tiltStyles.value[id] = null;
};
</script>

<template>
  <section class="py-24 px-4  min-h-screen overflow-hidden">
    <div class="text-center mb-16">
      <h2 class="text-5xl font-serif text-[#3d0c02] italic font-bold tracking-tight">
        The Souls of Ramayana
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-full mx-auto px-4 lg:px-12">
      <div
        v-for="char in characters"
        :key="char.id"
        class="card-perspective"
        @mousemove="handleTilt($event, char.id)"
        @mouseleave="resetTilt(char.id)"
        @click="toggleFlip(char.id)"
      >
        <div 
          class="card-flipper shadow-2xl" 
          :style="!flippedCards[char.id] ? { transform: tiltStyles[char.id] } : {}"
          :class="{ 'is-flipped': flippedCards[char.id] }"
        >
          
          <div class="card-face card-front">
            <div class="inner-content bg-[#e6ddc5] border border-[#c5a059]/30">
              <div class="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')]"></div>
              <figure class="w-full h-full p-2">
                <img :src="char.image" :alt="char.name" class="w-full h-full object-cover rounded-xl filter sepia-[0.2]" />
              </figure>
              <div class="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#3d0c02] via-[#3d0c02]/40 to-transparent">
                <h3 class="text-2xl font-serif font-bold text-[#f1e9d5] italic">{{ char.name }}</h3>
                <p class="text-[10px] text-[#c5a059] font-bold tracking-widest uppercase">{{ char.title }}</p>
              </div>
            </div>
          </div>

          <div class="card-face card-back">
            <div class="inner-content bg-[#3d0c02] border-2 border-[#c5a059]/40 p-6 flex flex-col justify-center items-center text-center">
              <div class="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>
              <div class="absolute inset-4 border border-[#c5a059]/20 rounded-xl pointer-events-none"></div>
              <div class="relative z-10">
                <span class="text-[#c5a059] text-2xl mb-2 block">~ ॐ ~</span>
                <h3 class="text-2xl font-serif font-bold text-[#f1e9d5] italic mb-1">{{ char.name }}</h3>
                <div class="w-12 h-px bg-[#c5a059] mx-auto mb-4"></div>
                <p class="text-[9px] text-[#c5a059] font-bold tracking-[0.2em] uppercase mb-4 leading-none">{{ char.title }}</p>
                <p class="text-[13px] font-serif italic text-[#f1e9d5]/80 leading-relaxed">{{ char.description }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-perspective {
  perspective: 1200px;
  cursor: pointer;
  aspect-ratio: 3/4;
}

.card-flipper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-style: preserve-3d;
  will-change: transform;
  border-radius: 1rem; 
}

.card-perspective:active .card-flipper,
.card-perspective:hover .card-flipper:not(.is-flipped) {
  transition: transform 0.4s ease-out;
}

.card-flipper.is-flipped {
  transform: rotateY(180deg);
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 1rem;
  overflow: hidden;
}

.inner-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
}

.card-back {
  transform: rotateY(180deg);
}
</style>