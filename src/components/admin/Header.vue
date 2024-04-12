<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import axios from 'axios';
import constants from '../../constant/const'

axios.defaults.withCredentials = true;
const router = useRouter();
const toast = useToast();
const showLogout = ref(false);

var currentUrl = window.location.href;
onMounted(() => {
    if (constants.FRONT_END_BASE_URL + "/admin/home" === currentUrl) {
        axios.get(constants.ADMIN_GET_PROFILE).then(() => {
            showLogout.value = true;
        }).catch((error) => { console.error(error) });
    }
})


const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Logout Success.', group: 'br', life: 3000 });
};

const adminLogout = () => {
    showSuccess();
    router.push('/admin')
}

const items = ref([
    {
        label: 'Dream Home',
        icon: 'pi pi-home',
    },
    {
        label: 'Admin Dashboard',
        icon: 'pi pi-user'
    },
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
            adminLogout();
        },
        visible : showLogout

    }
]);

</script>

<template>
    <div class="admin-header-container">
        <div class="card">
            <Toast position="bottom-right" group="br" />
            <Menubar :model="items" />
            <Toast />
        </div>
    </div>
</template>