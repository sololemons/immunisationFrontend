
<template>
    <div class="Navbar">
<Navbar/>
</div>

<div>
    <router-view></router-view>
</div>

</template>

<script setup>

  import Navbar from '@/views/Navbar.vue';


</script>

<style scoped>
.Navbar{}
</style>
