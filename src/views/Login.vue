<template>
   <div class="login-container flex items-center justify-center min-h-screen bg-gray-200 pt-1">
    <div class="w-full max-w-md p-8  space-y-10 bg-slate-200 rounded shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </div>
        <p class="text-center text-gray-600">
          Don't have an account?
          <router-link to="/SignUp" class="text-blue-500 hover:underline">Sign up here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // Adjust the path according to your project structure

const email = ref('');
const password = ref('');
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const login = async () => {
  try {
    await authStore.login({ 
        email: email.value, 
        password: password.value
     });

    if (authStore.isAuthenticated) {
      const redirectTo = route.query.redirect || '/';
      router.push(redirectTo);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<style>
   
</style>