<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Logout Success.', group: 'br', life: 3000 });
};

const adminLogout = () => {
    showSuccess();
}

const items = ref([
    {
        label: 'Admin Dashboard',
        icon: 'pi pi-home'
    },
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
            showSuccess();
        }

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