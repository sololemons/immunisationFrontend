<template>
    <div class="p-4 bg-white shadow-md rounded-lg mb-4">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-xl font-semibold">{{ sibling.name }}</h3>
          <p class="text-gray-600">Age: {{ sibling.age }}</p>
        </div>
        <div class="flex space-x-2">
          <button @click="updateSibling" class="bg-yellow-500 text-white px-3 py-1 rounded-md">Update</button>
          <button @click="deleteSibling" class="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    sibling: {
      type: Object,
      required: true,
    },
  });
  
  const updateSibling = () => {
    // Implement update logic here
  };
  
  const deleteSibling = () => {
    // Implement delete logic here
  };
  </script>
  