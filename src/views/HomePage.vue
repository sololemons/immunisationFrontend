<template>
    <div>
      <!-- Main Content -->
      <section class="bg-white dark:bg-gray-900 pt-10 pb-14" >
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              CHANJO HEALTH CARE
            </h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              WELCOME
              Start Your Immunisation Journey With Us For a Better Future for your Children.
              Confidentiality is our business.
            </p>
            <router-link to="/Dashboard" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Get Started
              <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </router-link>
          </div>
          <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img :src="heroImage" alt="mockup" />
          </div>                
        </div>
      </section>
    </div>
  </template>

  <script setup>
  import heroImage from '@/assets/hero.jpg'; // Adjust the path according to your project structure
  </script>
  

  