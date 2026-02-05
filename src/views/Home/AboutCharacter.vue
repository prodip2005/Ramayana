<script setup>
import { ref } from 'vue';

const characters = ref([
  {
    id: 1,
    name: 'Lord Rama',
    title: 'Maryada Purushottam',
    description:
      'Lord Rama is the seventh avatar of Lord Vishnu, symbolizing righteousness, duty, and ideal kingship. He is the central figure of the Ramayana and represents moral perfection.',
    image:
      'https://imgs.search.brave.com/draYJq1JkZosX1e3IwnnF9CL_0tOznjvxqNlK158C1A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2LzYxLzM2LzA1/LzM2MF9GXzE2NjEz/NjA1Nzhfb056eDkw/QWNkODRJbTJPRkFw/NVBFbDdvYThyajNo/Y0guanBn',
  },
  {
    id: 2,
    name: 'Mata Sita',
    title: 'Symbol of Purity',
    description:
      'Mata Sita is the incarnation of Goddess Lakshmi, representing purity, devotion, patience, and inner strength. She is admired for her unwavering faith and moral courage.',

    image:
      'https://imgs.search.brave.com/yTxbA1RkOkHNyiA5gKnTIa3s8DLV_UPa9HDNEWPaUvY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY5Lzg3/L2E1LzY5ODdhNTVm/YzFiNzZmYjMzYzhj/Mzg4NDdiNGM0N2Jk/LmpwZw',
  },
  {
    id: 3,
    name: 'Hanuman Ji',
    title: 'The Ultimate Devotee',
    description:
      'Hanuman Ji is the embodiment of devotion, strength, and selfless service. He is the greatest devotee of Lord Rama and played a crucial role in the victory over Ravana.',

    image:
      'https://imgs.search.brave.com/TAfRXEwOnHtb158ozn2zg4c-tpVzqgCOsmZX3cG6EGo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waG90/b3Nub3cub3JnL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzA0/LzcwMTAzZTExMzYw/N2YxY2Q4MGQ0ODhi/NWJkOTY4M2ZlLmpw/Zw',
  },
  {
    id: 4,
    name: 'Lakshmana',
    title: 'The Loyal Brother',
    description:
      'Lakshmana is the symbol of loyalty and sacrifice. He followed Lord Rama into exile and remained a steadfast protector of Rama and Sita throughout their journey.',

    image:
      'https://w0.peakpx.com/wallpaper/199/685/HD-wallpaper-lord-rama-blue-lord-ram-god-jai-shri-ram-thumbnail.jpg',
  },
  {
    id: 5,
    name: 'Ravana',
    title: 'The Scholar King',
    description:
      'Ravana was a powerful and learned king of Lanka, known for his intelligence, devotion to Shiva, and mastery of scriptures. His arrogance ultimately led to his downfall.',

    image:
      'https://imgs.search.brave.com/KjT-ovwjFkJPFhOBlX2Ao53gptqzSvShUxiQ5MKhm-M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzEzL2I5/LzIzLzEzYjkyM2Vl/NjlhODJmYzMxMTY3/OGUyNGVhZTJlZWQy/LmpwZw',
  },
]);

const flippedCards = ref({});

const toggleFlip = (id) => {
  flippedCards.value[id] = !flippedCards.value[id];
};
</script>

<template>
  <section class="py-24 px-4 relative overflow-hidden">
    <div class="text-center mb-16">
      <h2
        class="text-5xl font-serif text-[#3d0c02] italic font-bold tracking-tight"
      >
        The Souls of Ramayana
      </h2>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-full mx-auto px-4 lg:px-12"
    >
      <div
        v-for="char in characters"
        :key="char.id"
        @click="toggleFlip(char.id)"
        class="hover-3d"
      >
        <div class="card-container">
          <div class="card-flipper" :class="{ flipped: flippedCards[char.id] }">
            <div class="card-face card-front">
              <div
                class="relative w-full aspect-3/4 rounded-2xl border border-[#c5a059]/30 shadow-2xl bg-[#e6ddc5] overflow-hidden"
              >
                <div
                  class="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')]"
                ></div>

                <figure class="w-full h-full p-2">
                  <img
                    :src="char.image"
                    :alt="char.name"
                    class="w-full h-full object-cover rounded-xl filter sepia-[0.2]"
                  />
                </figure>

                <div
                  class="absolute bottom-0 inset-x-0 p-6 bg-linear-to-t from-[#3d0c02]/90 via-[#3d0c02]/40 to-transparent"
                >
                  <h3
                    class="text-2xl font-serif font-bold text-[#f1e9d5] italic mb-1"
                  >
                    {{ char.name }}
                  </h3>
                  <p
                    class="text-[10px] text-[#c5a059] font-bold tracking-widest uppercase"
                  >
                    {{ char.title }}
                  </p>
                </div>
              </div>
            </div>

            <div class="card-face card-back">
              <div
                class="relative w-full aspect-3/4 rounded-2xl border-2 border-[#c5a059]/40 shadow-2xl bg-[#3d0c02] overflow-hidden flex flex-col justify-center items-center p-8 text-center"
              >
                <div
                  class="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"
                ></div>

                <div
                  class="absolute inset-4 border border-[#c5a059]/20 rounded-xl pointer-events-none"
                ></div>

                <div class="relative z-10 flex flex-col items-center">
                  <span class="text-[#c5a059] text-2xl mb-2">~ ॐ ~</span>

                  <h3
                    class="text-3xl font-serif font-bold text-[#f1e9d5] italic mb-1 tracking-wide"
                  >
                    {{ char.name }}
                  </h3>

                  <div class="w-12 h-px bg-[#c5a059] mb-4"></div>

                  <p
                    class="text-[9px] text-[#c5a059] font-bold tracking-[0.2em] uppercase mb-5 leading-none"
                  >
                    {{ char.title }}
                  </p>

                  <p
                    class="text-[15px] font-serif italic text-[#f1e9d5]/80 leading-relaxed px-2"
                  >
                    "{{ char.description }}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-container {
  perspective: 1000px;
  cursor: pointer;
}

.card-flipper {
  position: relative;
  width: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-flipper.flipped {
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-front {
  position: relative;
}

.card-back {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(180deg);
}
</style>
