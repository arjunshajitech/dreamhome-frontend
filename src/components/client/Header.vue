<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import constants from '../../constant/const'

axios.defaults.withCredentials = true;


const items = ref([
    {
        label: 'Dream Home',
        icon: 'pi pi-home'
    }
]);

var currentUrl = window.location.href;
onMounted(() => {
    if (constants.FRONT_END_BASE_URL + "/" === currentUrl) {
        axios.get(constants.CLIENT_LOGOUT).then(() => { }).catch((error) => { console.error(error) });
    }
})

</script>

<template>
    <div class="client-header-container">
        <div class="card">
            <Menubar :model="items" />
        </div>
    </div>
</template>