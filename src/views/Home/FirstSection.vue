<script setup></script>

<template>
  <section
    class="relative h-[85vh] flex items-center justify-center overflow-hidden z-10"
  >
    <div
      class="absolute inset-0 flex items-center justify-center opacity-[0.1] pointer-events-none"
    >
      <div class="w-166 h-166 border-20 border-accent rounded-full">
        <div class="font-bold -translate-y-42 translate-x-9 text-[600px]">ॐ</div>
      </div>
    </div>
    <div class="relative z-10 text-center px-6 max-w-5xl">
      <div class="flex items-center justify-center gap-4 mb-8">
        <div class="h-px w-12 bg-accent/40"></div>
        <h2 class="text-primary font-bold tracking-[0.5em] uppercase text-xs">
          Jai Sri Ram
        </h2>
        <div class="h-px w-12 bg-accent/40"></div>
      </div>
      <h1
        class="text-6xl md:text-8xl font-logo text-secondary mb-10 leading-tight drop-shadow-sm"
      >
        The Sacred Epic of <br />
        <span class="text-primary italic">Dharma</span>
      </h1>
      <p
        class="max-w-2xl mx-auto text-xl md:text-2xl text-secondary/80 font-serif italic mb-12 leading-relaxed"
      >
        "Where there is Rama, there is Righteousness." <br />
        Experience the eternal journey that has shaped the soul of humanity.
      </p>
      <div class="flex flex-col sm:flex-row gap-8 justify-center items-center">
        <RouterLink to="/ramayana">
          <button
            class="group relative rounded-xl px-12 py-4 bg-secondary text-white font-bold tracking-[0.2em] overflow-hidden transition-all shadow-2xl"
          >
            <span class="relative z-10 uppercase">Read Kandas</span>
            <div
              class="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            ></div>
          </button>
        </RouterLink>
        <RouterLink to="/shlokas">
          <button
            class="text-secondary font-bold tracking-widest border-b-2 border-accent/40 hover:border-primary transition-all pb-1 uppercase"
          >
            Explore Shlokas
          </button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
