<template>
   <div class="flex items-center justify-center min-h-screen bg-gray-200 pt-4 ">
    <div class="w-full max-w-md p-8 space-y-8 bg-slate-250 rounded shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Register</h2>
      <form @submit.prevent="register" class="space-y-6">
        <div>
          <input
            type="text"
            v-model="firstName"
            placeholder="First Name"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <input
            type="text"
            v-model="lastName"
            placeholder="Last Name"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
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
            Register
          </button>
        </div>
        <h2 class="text-center text-gray-600">
          Already have an account? 
          <a href="#" @click.prevent="goToLogin" class="text-blue-500 hover:underline">Log In</a>
        </h2>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const register = async () => {
  try {
    await authStore.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    });
    if (authStore.isAuthenticated) {
      router.push('/Login');
    }
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

const goToLogin = () => {
  router.push('/Login');
};
</script>

