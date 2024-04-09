<script setup>
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { useRouter } from 'vue-router';

const router = useRouter();

const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Login Success.', group: 'br', life: 3000 });
};

const showInfo = () => {
    toast.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', life: 3000 });
};

const showWarn = () => {
    toast.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', life: 3000 });
};

const showError = () => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
};

const showSecondary = () => {
    toast.add({ severity: 'secondary', summary: 'Secondary Message', detail: 'Message Content', life: 3000 });
};

const showContrast = () => {
    toast.add({ severity: 'contrast', summary: 'Contrast Message', detail: 'Message Content', life: 3000 });
};


const adminLogin = () => {
    router.push('/admin/home');
};

</script>

<template>
    <div class="admin-login-container">
        <Toast position="bottom-right" group="br" />
        <p class="login-text">Welcome Back!</p>
        <IconField iconPosition="left">
            <InputIcon class="pi pi-envelope"> </InputIcon>
            <InputText v-model="value1" placeholder="Email" type="email" />
        </IconField>
        <IconField iconPosition="left">
            <InputIcon class="pi pi-key"> </InputIcon>
            <InputText v-model="value1" placeholder="Password" type="password" />
        </IconField>
        <!-- <a href="" class="create-account">Create an account ?</a> -->
        <div class="card flex justify-content-center">
            <Button type="button" label="Continue"  @click="adminLogin()" />
        </div>
        <Toast />
    </div>
</template>