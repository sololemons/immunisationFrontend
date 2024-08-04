<template>
  <div class="flex">
    <!-- Sidebar -->
    <nav class="w-64 bg-gray-800 text-white h-screen p-4">
      <h4 class="text-center text-xl mb-4">Dashboard</h4>
      <ul class="space-y-2">
        <li>
          <router-link to="/" class="block py-2 px-3 rounded hover:bg-gray-700">Home</router-link>
        </li>
        <li>
          <router-link to="/profile" class="block py-2 px-3 rounded hover:bg-gray-700">Profile</router-link>
        </li>
        <li>
          <router-link to="/settings" class="block py-2 px-3 rounded hover:bg-gray-700">Settings</router-link>
        </li>
        <li>
          <router-link to="/logout" class="block py-2 px-3 rounded hover:bg-gray-700">Logout</router-link>
        </li>
      </ul>
    </nav>

    <!-- Page Content -->
    <div class="flex-1 p-4">
      <div class="flex justify-between mb-4">
        <h2 class="text-2xl font-semibold">Siblings</h2>
        <button @click="openModal" class="bg-blue-500 text-white py-2 px-4 rounded">Add Sibling</button>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="sibling in siblings" :key="sibling.id" class="bg-white shadow rounded p-4">
          <h3 class="text-lg font-semibold">{{ sibling.firstName }} {{ sibling.lastName }}</h3>
          <p>Place of Birth: {{ sibling.placeOfBirth }}</p>
          <p>Date of Birth: {{ sibling.dateOfBirth }}</p>
          <div class="mt-2 flex space-x-2">
            <button class="bg-green-500 text-white py-1 px-2 rounded">Update</button>
            <button @click="deleteSibling(sibling.id)" class="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg">
        <h3 class="text-xl mb-4">Add Sibling</h3>
        <form @submit.prevent="addSibling">
          <div class="mb-4">
            <label class="block mb-1">Guardian ID</label>
            <input v-model="newSibling.guardianId" type="text" class="w-full border px-2 py-1 rounded" readonly>
          </div>
          <div class="mb-4">
            <label class="block mb-1">First Name</label>
            <input v-model="newSibling.firstName" type="text" class="w-full border px-2 py-1 rounded" required>
          </div>
          <div class="mb-4">
            <label class="block mb-1">Last Name</label>
            <input v-model="newSibling.lastName" type="text" class="w-full border px-2 py-1 rounded" required>
          </div>
          <div class="mb-4">
            <label class="block mb-1">Place of Birth</label>
            <input v-model="newSibling.placeOfBirth" type="text" class="w-full border px-2 py-1 rounded" required>
          </div>
          <div class="mb-4">
            <label class="block mb-1">Date of Birth</label>
            <input v-model="newSibling.dateOfBirth" type="date" class="w-full border px-2 py-1 rounded" required>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="bg-gray-500 text-white py-2 px-4 rounded mr-2">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth'; // Adjust path as needed

const authStore = useAuthStore();

const siblings = ref([]);
const isModalOpen = ref(false);
const newSibling = ref({
  guardianId: authStore.user.id || '', // Initialize with the logged-in user's ID
  firstName: '',
  lastName: '',
  placeOfBirth: '',
  dateOfBirth: ''
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  newSibling.value = {
    guardianId: authStore.user.id || '',
    firstName: '',
    lastName: '',
    placeOfBirth: '',
    dateOfBirth: ''
  };
};

// Function to set authorization header
const setAuthHeader = () => {
  const token = authStore.token;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Fetch siblings with authorization header
const fetchSiblings = async () => {
  setAuthHeader(); // Ensure the authorization header is set
  try {
    const response = await axios.get('/siblings/get');
    siblings.value = response.data;
  } catch (error) {
    console.error('Error fetching siblings:', error);
  }
};

// Add sibling with authorization header
const addSibling = async () => {
  setAuthHeader(); // Ensure the authorization header is set
  try {
    // Send a POST request to your backend API
    const response = await axios.post('/siblings/add', newSibling.value);
    
    // Add sibling to the list
    siblings.value.push(response.data);
    
    closeModal();
  } catch (error) {
    console.error('Error adding sibling:', error);
  }
};

// Delete sibling with authorization header
const deleteSibling = async (id) => {
  setAuthHeader(); // Ensure the authorization header is set
  try {
    // Send a DELETE request to your backend API
    await axios.delete(`/siblings/delete/${id}`);
    
    // Remove sibling from the list
    siblings.value = siblings.value.filter(sibling => sibling.id !== id);
  } catch (error) {
    console.error('Error deleting sibling:', error);
  }
};

// Fetch siblings when component is mounted
onMounted(fetchSiblings);
</script>
