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
            <router-link to="/Login" class="text-gray-800 dark:text-white bg-blue-700 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium rounded-lg text-sm px-4 py-2 border border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800">
              Log In
            </router-link>
            <router-link to="/Signup" class="text-white bg-blue-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-blue-800">
              Sign Up
            </router-link>
            <router-link to="/" class="text-white bg-blue-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-blue-800">
              Home
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  import logoImage from '@/assets/chanjohealth.png';
  </script>
  
  <style scoped>
  .navbar {
    padding-bottom: 25px;
  }
  </style>
  