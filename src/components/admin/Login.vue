<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import axios from 'axios';
import constants from '../../constant/const'

axios.defaults.withCredentials = true;
const router = useRouter();
const toast = useToast();

const adminLoginRequest = {
    email: 'admin@admin.com',
    password: '123456'
}

onMounted(() => {
    axios.post(constants.ADMIN_LOGOUT).then(() => { }).catch((error) => { console.error(error) });
})

const adminLogin = () => {
    axios.post(constants.ADMIN_LOGIN, adminLoginRequest).then((response) => {
        console.log(adminLoginRequest.email);
        console.log(adminLoginRequest.password);
        if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Success Message', detail: 'Login Success.', group: 'br', life: 3000 });
            setTimeout(() => {
                router.push('/admin/home');
            }, 500);
        } else {
        }

    }).catch((error) => {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Bad Credentails.', group: 'br', life: 3000 });
        router.push('/admin');
        console.error(error);
    });
}

</script>

<template>
    <div class="admin-login-container">
        <Toast position="bottom-right" group="br" />
        <p class="login-text">Welcome Back!</p>
        <IconField iconPosition="left">
            <InputIcon class="pi pi-envelope"> </InputIcon>
            <InputText v-model="adminLoginRequest.email" placeholder="Email" type="email" />
        </IconField>
        <IconField iconPosition="left">
            <InputIcon class="pi pi-key"> </InputIcon>
            <InputText v-model="adminLoginRequest.password" placeholder="Password" type="password" />
        </IconField>
        <div class="card flex justify-content-center">
            <Button type="button" label="Continue" @click="adminLogin()" />
        </div>
        <Toast />
    </div>
</template>