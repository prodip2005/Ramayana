<script setup>
defineProps({
  kanda: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div
    class="group relative p-10 bg-[#fdf2e9] border border-[#c5a059]/30 cursor-pointer overflow-hidden transition-shadow duration-500 hover:shadow-[0_30px_70px_-15px_rgba(61,12,2,0.2)] flex flex-col items-center min-h-[420px]"
  >
    <div class="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')]"></div>

   

    <div class="absolute inset-5 border border-[#c5a059]/20 pointer-events-none group-hover:border-[#c5a059]/40 transition-colors duration-500"></div>

    <div class="relative mb-6 text-5xl drop-shadow-sm">
      🪔
    </div>

    <div class="relative z-10 flex flex-col items-center w-full">
      <div class="flex items-center gap-4 mb-4">
        <div class="h-px w-6 bg-[#c5a059]/40"></div>
        <span class="text-[10px] font-bold tracking-[0.5em] text-[#c5a059] uppercase">Kanda 0{{ kanda.id }}</span>
        <div class="h-px w-6 bg-[#c5a059]/40"></div>
      </div>

      <h5 class="text-4xl font-serif text-[#3d0c02] mb-2 text-center italic font-bold tracking-tight group-hover:text-[#c5a059] transition-colors duration-500">
        {{ kanda.name }} Kanda
      </h5>

      <p class="text-[#c5a059] font-serif italic text-sm tracking-widest uppercase mb-6">
        "{{ kanda.english_name }}"
      </p>

      <div class="flex items-center justify-center w-full gap-3 mb-8">
        <div class="h-px w-10 bg-gradient-to-r from-transparent to-[#c5a059]/40"></div>
        <div class="w-2 h-2 rotate-45 border border-[#c5a059]/60 bg-transparent group-hover:bg-[#c5a059] transition-all duration-500"></div>
        <div class="h-px w-10 bg-gradient-to-l from-transparent to-[#c5a059]/40"></div>
      </div>

      <div class="flex flex-col items-center gap-1 border border-[#c5a059]/10 px-6 py-3 rounded-full bg-white/30 backdrop-blur-sm">
        <span class="text-[#3d0c02] font-bold text-xl font-serif leading-none">
          {{ kanda.sarga_count }}
        </span>
        <span class="text-[9px] uppercase tracking-[0.2em] font-bold text-[#c5a059]">
          Sacred Sargas
        </span>
      </div>
    </div>

    <div class="absolute -bottom-8 -left-8 text-[11rem] font-serif  text-[#3d0c02] pointer-events-none select-none opacity-[0.1] transition-opacity duration-500">
      ॐ
    </div>

    <div class="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></div>
  </div>
</template>

