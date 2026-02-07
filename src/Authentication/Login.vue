<script setup>
import { useRouter } from 'vue-router';
import { useAuthProvider } from './AuthProvider';
import axiosSecure from '@/hooks/axiosSecure';

const { user, loginWithGoogle, loading } = useAuthProvider();
const router = useRouter();

const handleLogin = async () => {
  try {
    const result = await loginWithGoogle();

    const userData = {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
      role: 'user',
      lastLogin: new Date(),
    };

    const checkUser = await axiosSecure.get(`/users/${result.user.email}`);

    if (!checkUser.data) {
      await axiosSecure.post('/users', userData);
    } else {
      await axiosSecure.put('/users', userData);
    }

    router.push('/shlokas');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 md:p-10 overflow-hidden"
  >
    <div
      class="max-w-6xl w-full grid md:grid-cols-2 bg-white/80 backdrop-blur-md rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-primary/10 overflow-hidden"
    >
      <div
        class="p-10 md:p-20 flex flex-col justify-center order-2 md:order-1 bg-[#fdf2da] border-[#eda917] border"
      >
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-0.5 bg-primary"></div>
            <span
              class="text-[10px] font-logo tracking-[0.4em] text-primary uppercase font-bold"
              >The Eternal Journey</span
            >
          </div>
          <h1
            class="text-5xl font-logo font-black text-secondary italic uppercase tracking-tighter leading-none"
          >
            User Login
          </h1>
        </header>

        <div v-if="!user" class="space-y-8">
          <div class="space-y-3">
            <p class="text-secondary font-serif text-xl italic leading-snug">
              "Dharmo Rakshati Rakshitah"
            </p>
            <p class="text-xs text-secondary/50 font-serif">
              Guidance for every soul, wisdom in every verse.
            </p>
          </div>

          <button
            @click="handleLogin"
            :disabled="loading"
            class="w-full group relative py-5 rounded-2xl bg-primary text-secondary font-logo font-black uppercase tracking-[0.2em] text-[11px] overflow-hidden transition-all duration-300 shadow-2xl shadow-primary/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
          >
            <div
              class="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            ></div>
            <i
              class="fa-brands fa-google text-lg relative z-10 group-hover:text-white transition-colors duration-300"
            ></i>
            <span
              v-if="!loading"
              class="relative z-10 uppercase group-hover:text-white transition-colors duration-300"
              >Continue with Google</span
            >
            <span
              v-else
              class="relative z-10 animate-pulse uppercase group-hover:text-white transition-colors duration-300"
              >Authenticating...</span
            >
          </button>
        </div>

        <div v-else class="text-center space-y-6">
          <div
            class="p-8 rounded-4xl bg-[#f9e6c1] border border-primary/20 shadow-inner"
          >
            <p class="text-secondary font-serif italic text-lg">
              Welcome, {{ user.displayName }}
            </p>
          </div>
          <router-link
            to="/ramayana"
            class="block w-full bg-secondary text-primary py-5 rounded-2xl font-logo font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-[1.02] transition-transform"
          >
            Go to Sacred Library
          </router-link>
        </div>
      </div>

      <div
        class="bg-secondary relative flex items-center justify-center p-12 order-1 md:order-2 overflow-hidden"
      >
        <div
          class="absolute w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px] -top-20 -right-20 animate-pulse"
        ></div>

        <div class="relative z-10 w-full max-w-sm flex flex-col items-center">
          <div
            class="absolute -top-8 -right-9 w-16 h-16 bg-primary/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 shadow-xl animate-bounce z-50"
          >
            <span class="text-primary text-2xl font-logo italic">ॐ</span>
          </div>

          <div
            class="relative z-10 p-2 border-2 border-primary/30 rounded-[3rem] bg-white/5 backdrop-blur-sm shadow-2xl"
          >
            <img
              src="/favicon.svg"
              alt="Lord Rama"
              class="w-full h-auto object-contain p-4 drop-shadow-[0_0_30px_rgba(254,170,4,0.3)]"
            />
          </div>

          <div class="mt-8 text-center space-y-2 relative z-10">
            <h3
              class="font-logo text-primary text-2xl font-black italic uppercase tracking-widest"
            >
              Lord Rama
            </h3>
            <p
              class="text-white/40 text-[9px] tracking-[0.4em] uppercase font-logo italic"
            >
              The Embodiment of Dharma
            </p>
          </div>
        </div>

        <div
          class="absolute top-10 right-10 opacity-5 select-none pointer-events-none"
        >
          <span class="text-primary text-9xl font-logo">ॐ</span>
        </div>
      </div>
    </div>
  </div>
</template>
