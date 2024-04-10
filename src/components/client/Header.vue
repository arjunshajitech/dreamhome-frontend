<script setup>
import { ref } from "vue";  


const items = ref([
    {
        label: 'Dream Home',
        icon: 'pi pi-home'
    }
]);

</script>

<template>
    <div class="admin-header-container">
        <div class="card">
            <Menubar :model="items" />
        </div>
    </div>
</template>