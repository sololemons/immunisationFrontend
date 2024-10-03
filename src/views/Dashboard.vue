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
      </ul>
    </nav>

    <!-- Page Content -->
    <div class="flex-1 p-4">
      <div class="flex justify-between mb-4">
        <h2 class="text-2xl font-semibold">Siblings</h2>
        <button @click="openModal" class="bg-blue-500 text-white py-2 px-4 rounded">Add Sibling</button>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div v-if="siblings.length === 0" class="bg-white shadow rounded p-4">
          <p>No siblings found.</p>
        </div>
        <div v-for="sibling in siblings" :key="sibling.siblingId" class="bg-white shadow rounded p-4">
          <h3 class="text-lg font-semibold">{{ sibling.firstName }} {{ sibling.lastName }}</h3>
          <p>Place of Birth: {{ sibling.placeOfBirth }}</p>
          <p>Date of Birth: {{ sibling.dateOfBirth }}</p>
          <div class="mt-2 flex space-x-2">
            <button @click="openUpdateModal(sibling)" class="bg-green-500 text-white py-1 px-2 rounded">Update</button>
            <button @click="deleteSibling(sibling.siblingId)" class="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
            <button @click="viewSchedule(sibling.siblingId)" class="bg-green-200 text-white py-1 px-2 rounded">View Schedule</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule Section -->
    <div v-if="selectedSiblingSchedule.length > 0" class="mt-6 bg-white shadow rounded p-4">
      <h3 class="text-lg font-semibold mb-4">Immunization Schedule</h3>
      <table class="w-full text-left">
        <thead>
          <tr>
            <th class="px-4 py-2">Immunization Date</th>
            <th class="px-4 py-2">Vaccine</th>
            <th class="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(schedule, index) in selectedSiblingSchedule" :key="index">
            <td class="border px-4 py-2">{{ schedule.immunizationDate }}</td>
            <td class="border px-4 py-2">{{ schedule.vaccineName }}</td>
            <td class="border px-4 py-2">{{ schedule.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
   <!-- Update Sibling Modal -->
   <div v-if="isUpdateModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg">
      <h3 class="text-xl mb-4">Update Sibling</h3>
      <form @submit.prevent="updateSibling">
        <div class="mb-4">
          <label class="block mb-1">Guardian ID</label>
          <input v-model="updatedSibling.guardianId" type="text" class="w-full border px-2 py-1 rounded" readonly>
        </div>
        <div class="mb-4">
          <label class="block mb-1">First Name</label>
          <input v-model="updatedSibling.firstName" type="text" class="w-full border px-2 py-1 rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-1">Last Name</label>
          <input v-model="updatedSibling.lastName" type="text" class="w-full border px-2 py-1 rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-1">Place of Birth</label>
          <input v-model="updatedSibling.placeOfBirth" type="text" class="w-full border px-2 py-1 rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-1">Date of Birth</label>
          <input v-model="updatedSibling.dateOfBirth" type="date" class="w-full border px-2 py-1 rounded">
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeUpdateModal" class="bg-gray-500 text-white py-2 px-4 rounded mr-2">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
        </div>
      </form>
    </div>
  </div>


    <!--  Add Modal -->
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
            <input v-model="newSibling.firstName" type="text" class="w-full border px-2 py-1 rounded">
          </div>
          <div class="mb-4">
            <label class="block mb-1">Last Name</label>
            <input v-model="newSibling.lastName" type="text" class="w-full border px-2 py-1 rounded">
          </div>
          <div class="mb-4">
            <label class="block mb-1">Place of Birth</label>
            <input v-model="newSibling.placeOfBirth" type="text" class="w-full border px-2 py-1 rounded">
          </div>
          <div class="mb-4">
            <label class="block mb-1">Date of Birth</label>
            <input v-model="newSibling.dateOfBirth" type="date" class="w-full border px-2 py-1 rounded">
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
const selectedSiblingSchedule = ref([]);
const isUpdateModalOpen = ref(false);
const isModalOpen = ref(false);
const newSibling = ref({
  guardianId: authStore.getGuardianId || '', // Initialize with correct value
  firstName: '',
  lastName: '',
  placeOfBirth: '',
  dateOfBirth: ''
});

const openModal = () => {
  newSibling.value.guardianId = authStore.getGuardianId; // Ensure guardianId is set when modal opens
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  newSibling.value = {
    guardianId: authStore.getGuardianId || '', // Reset with correct guardianId
    firstName: '',
    lastName: '',
    placeOfBirth: '',
    dateOfBirth: ''
  };
};

const setAuthHeader = () => {
  const token = authStore.token;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const fetchSiblings = async () => {
  setAuthHeader();
  if (!authStore.getGuardianId) {
    console.error('Guardian ID is not available');
    return;
  }
  try {
    const response = await axios.get(`siblings/get/guardian/${authStore.getGuardianId}`);
    siblings.value = response.data;
  } catch (error) {
    console.error('Error fetching siblings:', error);
  }
};

const addSibling = async () => {
  setAuthHeader();
  try {
    const response = await axios.post('/siblings/add', newSibling.value);
    console.log('New sibling added:', response.data); // Check the new sibling data
    siblings.value.push(response.data); // Add the new sibling to the list
    closeModal();
  } catch (error) {
    console.error('Error adding sibling:', error);
  }
};

const deleteSibling = async (siblingId) => {
  setAuthHeader();
  try {
    await axios.delete(`/siblings/delete/${siblingId}`);
    siblings.value = siblings.value.filter(sibling => sibling.siblingId !== siblingId); // Correct variable usage
  } catch (error) {
    console.error('Error deleting sibling:', error);
  }
};
const viewSchedule = async (siblingId) => {
  setAuthHeader(); // Ensure the authorization header is set
  
  if (!siblingId) {
    console.error('Sibling ID is undefined or null');
    return; // Exit if siblingId is not valid
  }

  try {
    const response = await axios.get(`/api/schedule/${siblingId}`); // Ensure correct URL format
    selectedSiblingSchedule.value = response.data; // Assign fetched schedule to the reactive variable
  } catch (error) {
    console.error('Error fetching immunization schedule:', error);
    selectedSiblingSchedule.value = []; // Reset the schedule if there's an error
  }
};

// Fetch siblings when component is mounted
onMounted(fetchSiblings);


const updatedSibling = ref({
  siblingId: '', // Track sibling to be updated
  guardianId: authStore.getGuardianId || '',
  firstName: '',
  lastName: '',
  placeOfBirth: '',
  dateOfBirth: ''
});

// Open Update Modal
const openUpdateModal = (sibling) => {
  updatedSibling.value = { 
    ...sibling,
    guardianId: authStore.getGuardianId // Set the guardianId explicitly
  }; 
  isUpdateModalOpen.value = true;
};

// Close Update Modal
const closeUpdateModal = () => {
  isUpdateModalOpen.value = false;
  updatedSibling.value = {
    siblingId: '',
    guardianId: authStore.getGuardianId || '',
    firstName: '',
    lastName: '',
    placeOfBirth: '',
    dateOfBirth: ''
  };
};

// Update Sibling Logic
const updateSibling = async () => {
  try {
    const response = await axios.put(`/siblings/update/${updatedSibling.value.siblingId}`, updatedSibling.value);
    const index = siblings.value.findIndex(sibling => sibling.siblingId === updatedSibling.value.siblingId);
    if (index !== -1) {
      siblings.value[index] = response.data; // Update sibling details in the list
    }
    closeUpdateModal();
  } catch (error) {
    console.error('Error updating sibling:', error);
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
