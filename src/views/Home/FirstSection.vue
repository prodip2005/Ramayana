<script setup></script>

<template>
  <section
    class="relative h-[85vh] flex items-center justify-center overflow-hidden z-10"
  >
    <div
      class="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none select-none"
    >
      <div class="w-72 h-72 md:w-[600px] md:h-[600px] border-[10px] md:border-[20px] border-accent rounded-full flex items-center justify-center relative">
        <div class="font-bold text-[250px] md:text-[600px] leading-none text-secondary">
          ॐ
        </div>
      </div>
    </div>

    <div class="relative z-10 text-center px-6 max-w-5xl">
      <div class="flex items-center justify-center gap-4 mb-6 md:mb-8">
        <div class="h-px w-8 md:w-12 bg-accent/40"></div>
        <h2 class="text-primary font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs">
          Jai Sri Ram
        </h2>
        <div class="h-px w-8 md:w-12 bg-accent/40"></div>
      </div>

      <h1
        class="text-4xl md:text-8xl font-logo text-secondary mb-8 md:mb-10 leading-tight drop-shadow-sm"
      >
        The Sacred Epic of <br />
        <span class="text-primary italic">Dharma</span>
      </h1>

      <p
        class="max-w-2xl mx-auto text-lg md:text-2xl text-secondary/80 font-serif italic mb-10 md:mb-12 leading-relaxed"
      >
        "Where there is Rama, there is Righteousness." <br class="hidden md:block" />
        Experience the eternal journey that has shaped the soul of humanity.
      </p>

      <div class="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center">
        <RouterLink to="/ramayana" class="w-full sm:w-auto">
          <button
            class="group w-full sm:w-auto relative rounded-xl px-12 py-4 bg-secondary text-white font-bold tracking-[0.2em] overflow-hidden transition-all shadow-2xl"
          >
            <span class="relative z-10 uppercase text-sm">Read Kandas</span>
            <div
              class="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            ></div>
          </button>
        </RouterLink>
        <RouterLink to="/shlokas">
          <button
            class="text-secondary font-bold tracking-widest border-b-2 border-accent/40 hover:border-primary transition-all pb-1 uppercase text-sm"
          >
            Explore Shlokas
          </button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
