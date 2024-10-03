<template>
    <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-semibold mb-6">Profile</h2>
      <div v-if="guardian">
        <div class="mb-4">
          <label class="font-bold">First Name:</label>
          <p>{{ guardian.firstName }}</p>
        </div>
        <div class="mb-4">
          <label class="font-bold">Last Name:</label>
          <p>{{ guardian.lastName }}</p>
        </div>
        <div class="mb-4">
          <label class="font-bold">Email Address:</label>
          <p>{{ guardian.email }}</p>
        </div>
      </div>
      <div v-else>
        <p>Loading profile...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth'; // Use the correct path for your auth store
  
  const guardian = ref(null);
  const authStore = useAuthStore();
  
  // Fetch guardian's profile information
  const fetchGuardianProfile = async () => {
    try {
      const response = await axios.get(`/api/guardian/${authStore.getGuardianId}`);
      guardian.value = response.data;
    } catch (error) {
      console.error('Error fetching guardian profile:', error);
    }
  };
  
  // Fetch the guardian details when component is mounted
  onMounted(fetchGuardianProfile);
  </script>
  
  <style scoped>
  /* Add any specific styles for the profile page */
  </style>
  