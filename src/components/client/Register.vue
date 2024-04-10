<script setup>
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { useRouter } from 'vue-router';

const router = useRouter();
const login = ref(true);


const clientLogin = () => {
    router.push('/home');
};

</script>

<template>
    <div class="client-login-container">

        <div class="login" v-if="login">
            <Toast position="bottom-right" group="br" />
            <p class="login-text">Welcome Back !</p>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-envelope"> </InputIcon>
                <InputText v-model="value1" placeholder="Email" type="email" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-key"> </InputIcon>
                <InputText v-model="value1" placeholder="Password" type="password" />
            </IconField>
            <p class="create-account" @click="login = false">Create an account ?</p>
            <div class="card flex justify-content-center">
                <Button type="button" label="Continue" @click="clientLogin()" />
            </div>
            <Toast />
        </div>


        <div class="signup" v-else>
            <Toast position="bottom-right" group="br" />
            <p class="login-text">Get Started. Sign Up Here !</p>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-address-book"> </InputIcon>
                <InputText v-model="value1" placeholder="Name" type="text" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-envelope"> </InputIcon>
                <InputText v-model="value1" placeholder="Email" type="text" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-key"> </InputIcon>
                <InputText v-model="value1" placeholder="Password" type="password" />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon class="pi pi-phone"> </InputIcon>
                <InputText v-model="value1" placeholder="Phone" type="text" />
            </IconField>
            <p class="create-account" @click="login = true">Already have an account ?</p>
            <div class="card flex justify-content-center">
                <Button type="button" label="Continue" @click="clientRegister()" />
            </div>
            <Toast />
        </div>
    </div>
</template>