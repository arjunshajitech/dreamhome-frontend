<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import constants from '../../constant/const'
import axios from 'axios';

const router = useRouter();
const login = ref(true);
const toast = useToast();
const sticky = ref(false);
const invalidEmial = ref(false);
const invalidPassword = ref(false);

const invalidRegisterName = ref(false);
const invalidRegisterEmail = ref(false);
const invalidRegisterPhone = ref(false);
const invalidRegisterPassword = ref(false);
const invalidRegisterJobTitle = ref(false);
const invalidRegisterYearOfExpirence = ref(false);

const registerRequest = {
    name: '',
    email: '',
    password: '',
    phone: '',
    jobTitle: '',
    yearOfExperience: ''
}

const loginRequest = {
    email: 'e@gmail.com',
    password: '111'
}

const clearLoginForm = () => {
    loginRequest.email = '',
        loginRequest.password = ''
}

const clearRegisterForm = () => {
    registerRequest.name = '',
        registerRequest.email = '',
        registerRequest.password = '',
        registerRequest.phone = '',
        registerRequest.jobTitle = '',
        registerRequest.yearOfExperience = ''
}


const switchForm = (val) => {
    if (val === 'login') {
        login.value = true;
        clearLoginForm();
    } else {
        login.value = false;
        clearRegisterForm();
    }
}

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const isValidPhoneNumber = (input) => {
    var regex = /^\d{10}$/;
    return regex.test(input);
}

const validateNumber = (value) => {
    return (!isNaN(value) && value >= 0)
}

const validateClientLoginRequest = () => {
    if (loginRequest.email === null ||
        loginRequest.email === '' ||
        !validateEmail(loginRequest.email)) {
        invalidEmial.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid email or password', life: 3000 });
        return true;
    } else invalidEmial.value = false

    if (loginRequest.password === null ||
        loginRequest.password === '') {
        invalidPassword.value = true;
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid email or password', life: 3000 });
        return true;
    } else invalidPassword.value = false;
    return false;
}

const validateClientRegisterRequest = () => {
    if (registerRequest.name === null ||
        registerRequest.name === '') {
        invalidRegisterName.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid name', life: 3000 });
        return true;
    } else invalidRegisterName.value = false;

    if (registerRequest.email === null ||
        registerRequest.email === '' ||
        !validateEmail(registerRequest.email)) {
        invalidRegisterEmail.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid email', life: 3000 });
        return true;
    } else invalidRegisterEmail.value = false;

    if (registerRequest.password === null ||
        registerRequest.password === '') {
        invalidRegisterPassword.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid password', life: 3000 });
        return true;
    } else invalidRegisterPassword.value = false;

    if (registerRequest.phone === null ||
        registerRequest.phone === '' || !isValidPhoneNumber(registerRequest.phone)) {
        invalidRegisterPhone.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid phone', life: 3000 });
        return true;
    } else invalidRegisterPhone.value = false;

    if (registerRequest.jobTitle === null ||
        registerRequest.jobTitle === '') {
        invalidRegisterJobTitle.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid job title', life: 3000 });
        return true;
    } else invalidRegisterJobTitle.value = false;

    if (registerRequest.yearOfExperience === null ||
        registerRequest.yearOfExperience === '' || !validateNumber(registerRequest.yearOfExperience)) {
        invalidRegisterYearOfExpirence.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid year of experience', life: 3000 });
        return true;
    } else invalidRegisterYearOfExpirence.value = false;
    return false;
}

const clientRegister = () => {

    if (validateClientRegisterRequest()) return;

    axios.post(constants.ENGINEER_SIGNUP, registerRequest).then((response) => {
        if (response.status === 200) {
            login.value = true;
            clearRegisterForm();
            sticky.value = true;
        }
    }).catch((error) => {
        if (error.response.status === 400)
            toast.add({ severity: 'error', summary: 'Engineer Register', detail: 'Engineer already exists.', life: 3000 });
        else
            toast.add({ severity: 'warn', summary: 'Engineer Register', detail: 'Something went wrong.', life: 3000 });
        console.error(error);
    });
}

const clientLogin = () => {

    if (validateClientLoginRequest()) return;

    axios.post(constants.ENGINEER_LOGIN, loginRequest).then((response) => {
        if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Success Message', detail: 'Login Success.', life: 3000 });
            setTimeout(() => {
                router.push('/engineer/home');
            }, 500);
        }
    }).catch((error) => {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Bad Credentails.', life: 3000 });
        console.error(error);
    });
}

onMounted(() => {
    axios.get(constants.ENGINEER_LOGOUT).then(() => { }).catch((error) => { console.error(error) });
})

</script>

<template>
    <div class="client-login-container">

        <div class="card" v-if="sticky">
            <Message severity="success" :sticky="false" :life="5000">
                You are successfully registerd. Kindly Please wait for admin approval.
            </Message>
        </div>

        <div class="login" v-if="login">
            <Toast position="bottom-right" group="br" />
            <p class="login-text">Get started with our app</p>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-envelope"> </InputIcon>
                <InputText v-model="loginRequest.email" placeholder="Email" type="email" :invalid="invalidEmial" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-key"> </InputIcon>
                <InputText v-model="loginRequest.password" placeholder="Password" type="password"
                    :invalid="invalidPassword" />
            </IconField>
            <div class="card flex justify-content-center">
                <Button type="button" label="Let's go" @click="clientLogin()" class="md:w-19rem w-full" />
            </div>
            <p class="create-account" @click="switchForm('signup')">Create an account ?</p>
            <Toast />
        </div>


        <div class="signup" v-else>
            <Toast position="bottom-right" group="br" />
            <p class="login-text">Just create an account.</p>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-address-book"> </InputIcon>
                <InputText v-model="registerRequest.name" placeholder="Name" type="text"
                    :invalid="invalidRegisterName" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-envelope"> </InputIcon>
                <InputText v-model="registerRequest.email" placeholder="Email" type="text"
                    :invalid="invalidRegisterEmail" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-key"> </InputIcon>
                <InputText v-model="registerRequest.password" placeholder="Password" type="password"
                    :invalid="invalidRegisterPassword" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-phone"> </InputIcon>
                <InputText v-model="registerRequest.phone" placeholder="Phone" type="text"
                    :invalid="invalidRegisterPhone" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-receipt"> </InputIcon>
                <InputText v-model="registerRequest.jobTitle" placeholder="Job Title" type="text"
                    :invalid="invalidRegisterJobTitle" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-wrench"> </InputIcon>
                <InputText v-model="registerRequest.yearOfExperience" placeholder="Year of experience" type="text"
                    :invalid="invalidRegisterYearOfExpirence" />
            </IconField>
            <div class="card flex justify-content-center">
                <Button type="button" label="Register" @click="clientRegister()" class="md:w-19rem w-full" />
            </div>
            <p class="create-account" @click="switchForm('login')">Already have an account ?</p>
            <Toast />
        </div>
    </div>
</template>