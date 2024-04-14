<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import axios from 'axios';
import constants from '../../constant/const'

axios.defaults.withCredentials = true;
const router = useRouter();
const toast = useToast();
const invalidEmial = ref(false);
const invalidPassword = ref(false);

const adminLoginRequest = {
    email: '',
    password: ''
}

onMounted(() => {
    axios.get(constants.ADMIN_LOGOUT).then(() => { }).catch((error) => { console.error(error) });
})

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const adminLogin = () => {
    
    if (adminLoginRequest.email === null ||
        adminLoginRequest.email === '' ||
        !validateEmail(adminLoginRequest.email)) {
        invalidEmial.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid email or password', life: 3000 });
        return;
    } else invalidEmial.value = false;

    if (adminLoginRequest.password === null ||
        adminLoginRequest.password === '') {
        invalidPassword.value = true;
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid email or password', life: 3000 });
        return;
    } else invalidPassword.value = false;


    axios.post(constants.ADMIN_LOGIN, adminLoginRequest).then((response) => {
        if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Admin Login', detail: 'Login Success.', life: 3000 });
            setTimeout(() => {
                router.push('/admin/home');
            }, 500);
        }
    }).catch((error) => {
        toast.add({ severity: 'error', summary: 'Admin Login', detail: 'Bad Credentails.', life: 3000 });
        router.push('/admin');
        console.error(error);
    });
}

</script>

<template>
    <div class="admin-login-container">
        <Toast position="bottom-right" group="br" />
        <p class="login-text">Welcome Back Admin</p>
        <IconField iconPosition="left">
            <InputIcon class="pi pi-envelope"> </InputIcon>
            <InputText v-model="adminLoginRequest.email" placeholder="Email" type="email" :invalid="invalidEmial" />
        </IconField>
        <IconField iconPosition="left">
            <InputIcon class="pi pi-key"> </InputIcon>
            <InputText v-model="adminLoginRequest.password" placeholder="Password" type="password"
                :invalid="invalidPassword" />
        </IconField>
        <div class="card flex justify-content-center">
            <Button type="button" label="Let's go" @click="adminLogin()" class="md:w-19rem w-full" />
        </div>
        <Toast />
    </div>
</template>

<style scoped>
.loader {
    --size-loader: 50px;
    --size-orbe: 10px;
    width: var(--size-loader);
    height: var(--size-loader);
    position: relative;
    transform: rotate(45deg);
}

.orbe {
    position: absolute;
    width: 100%;
    height: 100%;
    --delay: calc(var(--index) * 0.1s);
    animation: orbit7456 ease-in-out 1.5s var(--delay) infinite;
    opacity: calc(1 - calc(0.2 * var(--index)));
}

.orbe::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: var(--size-orbe);
    height: var(--size-orbe);
    background-color: #3ae374;
    box-shadow: 0px 0px 20px 2px #3ae374;
    border-radius: 50%;
}

@keyframes orbit7456 {
    0% {}

    80% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>