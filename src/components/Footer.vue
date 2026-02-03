<template>
  <footer class="relative bg-secondary pt-24 pb-12 overflow-hidden border-t border-accent/20">
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>
    
    <div class="max-w-7xl mx-auto px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        
        <div class="space-y-6">
          <div class="flex flex-col">
            <span class="text-3xl font-serif font-black text-primary italic tracking-tight uppercase">
              Valmiki <span class="text-accent">Ramayana</span>
            </span>
            <span class="text-[9px] tracking-[0.4em] uppercase text-accent font-medium mt-1">
              The Eternal Adi Kavya
            </span>
          </div>
          <p class="text-primary/60 font-serif italic leading-relaxed text-sm">
            "As long as the mountains stand and the rivers flow, so long shall the Ramayana be cherished among men."
          </p>
          <div class="flex gap-4 pt-2">
            <div v-for="i in 3" :key="i" class="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-accent cursor-pointer hover:bg-primary hover:text-secondary transition-all duration-500">
              <span class="text-xs">ॐ</span>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Sacred Path</h4>
          <ul class="space-y-4">
            <li v-for="link in ['Home', 'The Seven Kandas', 'Divine Shlokas', 'Valmiki’s Legacy']" :key="link">
              <a href="#" class="text-primary/80 hover:text-accent transition-colors font-serif italic text-sm group flex items-center gap-3">
                <span class="w-0 h-px bg-accent group-hover:w-4 transition-all duration-300"></span>
                {{ link }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Devotion</h4>
          <div class="text-primary/80 font-serif italic text-sm space-y-6">
            <div class="flex items-start gap-3">
              <span class="text-accent text-lg leading-none">✦</span>
              <p>Ayodhya Dham,<br />Uttar Pradesh, India</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-accent text-lg leading-none">✦</span>
              <p>contact@valmiki-ramayana.com</p>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-8">The Adi Kavya</h4>
          <div class="relative p-6 rounded-2xl bg-primary/5 border border-accent/10 group overflow-hidden">
            <div class="absolute -top-3 -right-3 text-4xl opacity-10 text-accent group-hover:rotate-12 transition-transform duration-700">ॐ</div>
            <p class="text-primary/70 font-serif italic text-xs leading-loose relative z-10">
              Preserving the original verses of Rishi Valmiki, guiding every heart towards the path of Dharma and truth.
            </p>
          </div>
        </div>
      </div>

      <div class="pt-12 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-primary/30 text-[10px] uppercase tracking-[0.3em] font-medium">
          © 2026 The Valmiki Ramayana Project.
        </p>
        <div class="flex items-center gap-6">
          <span class="text-accent/50 text-sm italic font-serif tracking-widest">॥ Jai Sri Ram ॥</span>
        </div>
      </div>
    </div>
  </footer>
</template>

