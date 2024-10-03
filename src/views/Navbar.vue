<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 pb-6">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link to="/" class="flex items-center">
          <img :src="logoImage" alt="logo" class="h-20 mr-5" />
          <span class="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">Chanjo Health Care</span>
        </router-link>

        <div class="flex md:order-2 space-x-4">
          <!-- Show Log In and Sign Up buttons only if the user is not authenticated -->
          <template v-if="!isAuthenticated">
            <router-link
              to="/Login"
              class="text-gray-800 dark:text-white bg-blue-700 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium rounded-lg text-sm px-4 py-2 border border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800"
            >
              Log In
            </router-link>
            <router-link
              to="/Signup"
              class="text-white bg-blue-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-blue-800"
            >
              Sign Up
            </router-link>
          </template>

          <!-- Show Home link and Logout button only if the user is authenticated -->
          <template v-if="isAuthenticated">
            <router-link
              to="/"
              class="text-white bg-blue-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-blue-800"
            >
              Home
            </router-link>
            <button
              @click="logout"
              class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              Logout
            </button>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import logoImage from '@/assets/chanjohealth.png';
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter(); // Initialize router instance
const isAuthenticated = computed(() => authStore.isAuthenticated);

const logout = () => {
  authStore.logout();
  router.push('/'); // Redirect to homepage after logout
};
</script>

<style scoped>
.navbar {
  padding-bottom: 25px;
}
</style>
