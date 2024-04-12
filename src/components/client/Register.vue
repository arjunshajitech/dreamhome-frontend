<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import constants from '../../constant/const'
import axios from 'axios';

const router = useRouter();
const login = ref(true);
const toast = useToast();

const registerRequest = {
    name: '',
    email: '',
    password: '',
    phone: ''
}

const loginRequest = {
    email: '',
    password: ''
}

const clearLoginForm = () => {
    loginRequest.email = '',
        loginRequest.password = ''
}

const clearRegisterForm = () => {
    registerRequest.name = '',
        registerRequest.email = '',
        registerRequest.password = '',
        registerRequest.phone = ''
}


const switchForm = (val) => {
    console.log(val);
    if (val === 'login') {
        login.value = true;
        clearLoginForm();
    } else {
        login.value = false;
        clearRegisterForm();
    }
}


const clientRegister = () => {
    axios.post(constants.CLIENT_REGISTER, registerRequest).then((response) => {
        if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Success Message', detail: 'Register Success.', group: 'br', life: 3000 });
            setTimeout(() => {
                login.value = true;
            }, 500);
            clearRegisterForm();
        }
    }).catch((error) => {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Email or Phone already exists.', group: 'br', life: 3000 });
        console.error(error);
    });
}

const clientLogin = () => {
    axios.post(constants.CLIENT_LOGIN, loginRequest).then((response) => {
        if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Success Message', detail: 'Login Success.', group: 'br', life: 3000 });
            setTimeout(() => {
                router.push('/home');
            }, 500);
        }
    }).catch((error) => {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Bad Credentails.', group: 'br', life: 3000 });
        console.error(error);
    });
}

onMounted(() => {
    axios.post(constants.CLIENT_LOGOUT).then(() => { }).catch((error) => { console.error(error) });
})

</script>

<template>
    <div class="client-login-container">

        <div class="login" v-if="login">
            <Toast position="bottom-right" group="br" />
            <p class="login-text">Get started with our app</p>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-envelope"> </InputIcon>
                <InputText v-model="loginRequest.email" placeholder="Email" type="email" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-key"> </InputIcon>
                <InputText v-model="loginRequest.password" placeholder="Password" type="password"/>
            </IconField>
            <div class="card flex justify-content-center">
                <Button type="button" label="Let's go" @click="clientLogin()" class="md:w-19rem w-full"/>
            </div>
            <p class="create-account" @click="switchForm('signup')">Create an account ?</p>
            <Toast />
        </div>


        <div class="signup" v-else>
            <Toast position="bottom-right" group="br" />
            <p class="login-text">Just create an account.</p>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-address-book"> </InputIcon>
                <InputText v-model="registerRequest.name" placeholder="Name" type="text" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-envelope"> </InputIcon>
                <InputText v-model="registerRequest.email" placeholder="Email" type="text" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-key"> </InputIcon>
                <InputText v-model="registerRequest.password" placeholder="Password" type="password" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-phone"> </InputIcon>
                <InputText v-model="registerRequest.phone" placeholder="Phone" type="text" />
            </IconField>
            <div class="card flex justify-content-center">
                <Button type="button" label="Register" @click="clientRegister()" class="md:w-19rem w-full"/>
            </div>
            <p class="create-account" @click="switchForm('login')">Already have an account ?</p>
            <Toast />
        </div>
    </div>
</template>