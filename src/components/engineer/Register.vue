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
const invalidRegisterDistrict = ref(false);
const invalidRegisterAddress = ref(false);
const invalidRegisterPincode = ref(false);
const invalidRegisterState = ref(false);

const state = ref([
    {
        label: 'KERALA', value: 'KERALA'
    }
])

const district = ref([
    { label: 'ALAPPUZHA', value: 'ALAPPUZHA' },
    { label: 'KOLLAM', value: 'KOLLAM' },
    { label: 'KOTTAYAM', value: 'KOTTAYAM' },
    { label: 'IDUKKI', value: 'IDUKKI' },
    { label: 'ERNAKULAM', value: 'ERNAKULAM' },
    { label: 'THRISSUR', value: 'THRISSUR' },
    { label: 'PALAKKAD', value: 'PALAKKAD' },
    { label: 'MALAPPURAM', value: 'MALAPPURAM' },
    { label: 'KOZHIKODE', value: 'KOZHIKODE' },
    { label: 'WAYANAD', value: 'WAYANAD' },
    { label: 'KANNUR', value: 'KANNUR' },
    { label: 'KASARAGOD', value: 'KASARAGOD' }
]);

const registerRequest = ref({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    pincode: '',
    state: '',
    district: '',
    jobTitle: '',
    yearOfExperience: ''
})

const loginRequest = {
    email: '',
    password: ''
}

const clearLoginForm = () => {
    loginRequest.email = '',
        loginRequest.password = ''
}

const clearRegisterForm = () => {
    sticky.value = false;
    registerRequest.value.name = '',
        registerRequest.value.email = '',
        registerRequest.value.password = '',
        registerRequest.value.phone = ''
    registerRequest.value.state = ''
    registerRequest.value.yearOfExperience = ''
    registerRequest.value.jobTitle = ''
    registerRequest.value.district = ''
    registerRequest.value.address = ''
    registerRequest.value.pincode = ''
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

const validateNumber = (value) => {
    return (!isNaN(value) && value >= 0)
}


const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const isValidPhoneNumber = (input) => {
    var regex = /^[789]\d{9}$/;
    return regex.test(input);
}

const isValidPincode = (input) => {
    var regex = /^\d{6}$/;
    return regex.test(input);
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
    if (registerRequest.value.name === null ||
        registerRequest.value.name === '') {
        invalidRegisterName.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid name', life: 3000 });
        return true;
    } else invalidRegisterName.value = false;

    if (registerRequest.value.email === null ||
        registerRequest.value.email === '' ||
        !validateEmail(registerRequest.value.email)) {
        invalidRegisterEmail.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid email', life: 3000 });
        return true;
    } else invalidRegisterEmail.value = false;

    if (registerRequest.value.password === null ||
        registerRequest.value.password === '') {
        invalidRegisterPassword.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid password', life: 3000 });
        return true;
    } else invalidRegisterPassword.value = false;

    if (registerRequest.value.phone === null ||
        registerRequest.value.phone === '' || !isValidPhoneNumber(registerRequest.value.phone)) {
        invalidRegisterPhone.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid phone', life: 3000 });
        return true;
    } else invalidRegisterPhone.value = false;

    if (registerRequest.value.jobTitle === null ||
        registerRequest.value.jobTitle === '') {
        invalidRegisterJobTitle.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid job title', life: 3000 });
        return true;
    } else invalidRegisterJobTitle.value = false;

    if (registerRequest.value.yearOfExperience === null ||
        registerRequest.value.yearOfExperience === '' || !validateNumber(registerRequest.value.yearOfExperience)) {
        invalidRegisterYearOfExpirence.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid year of experience', life: 3000 });
        return true;
    } else invalidRegisterYearOfExpirence.value = false;

    if (registerRequest.value.address === null ||
        registerRequest.value.address === '') {
        invalidRegisterAddress.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid address', life: 3000 });
        return true;
    } else invalidRegisterAddress.value = false;

    if (registerRequest.value.state === null ||
        registerRequest.value.state === '') {
        invalidRegisterState.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid state', life: 3000 });
        return true;
    } else invalidRegisterState.value = false;

    if (registerRequest.value.district === null ||
        registerRequest.value.district === '') {
        invalidRegisterDistrict.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid district', life: 3000 });
        return true;
    } else invalidRegisterDistrict.value = false;

    if (registerRequest.value.pincode === null ||
        registerRequest.value.pincode === '' || !isValidPincode(registerRequest.value.pincode)) {
        invalidRegisterPincode.value = true
        toast.add({ severity: 'warn', summary: 'Warning Message', detail: 'Inavlid pincode', life: 3000 });
        return true;
    } else invalidRegisterPincode.value = false;

    return false;
}

const clientRegister = () => {

    if (validateClientRegisterRequest()) return;
    registerRequest.value.district = registerRequest.value.district.value
    registerRequest.value.state = registerRequest.value.state.value
    axios.post(constants.ENGINEER_SIGNUP, registerRequest.value).then((response) => {
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

        <!-- <div class="card" v-if="sticky">
            <Message severity="success" :sticky="false" :life="5000">
                You are successfully registerd. Kindly Please wait for admin approval.
            </Message>
        </div> -->

        <div class="banner-register">
            <div class="banner">

            </div>
            <div class="register">
                <div class="stick">
                    <div class="card" v-if="sticky">
                        <Message severity="success" :sticky="false" :life="5000">
                            You are successfully registerd. Kindly Please wait for admin approval.
                        </Message>
                    </div>
                </div>
                <div class="login" v-if="login">
                    <Toast position="bottom-right" group="br" />
                    <p class="login-text">Get started with our app</p>
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-envelope"> </InputIcon>
                        <InputText v-model="loginRequest.email" placeholder="Email" type="email"
                            :invalid="invalidEmial" />
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

                    <div class="input-seperate">
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
                    </div>

                    <div class="input-seperate">
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
                    </div>

                    <div class="input-seperate">
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-receipt"> </InputIcon>
                            <InputText v-model="registerRequest.jobTitle" placeholder="Job Title" type="text"
                                :invalid="invalidRegisterJobTitle" />
                        </IconField>
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-wrench"> </InputIcon>
                            <InputText v-model="registerRequest.yearOfExperience" placeholder="Year of experience"
                                type="text" :invalid="invalidRegisterYearOfExpirence" />
                        </IconField>
                    </div>

                    <IconField iconPosition="right">
                        <Textarea id="description" :invalid="invalidRegisterAddress" v-model="registerRequest.address"
                            required="true" rows="3" cols="53" placeholder="Address" />
                        <InputIcon class="pi pi-book"> </InputIcon>
                    </IconField>

                    <div class="input-seperate">
                        <IconField iconPosition="right">
                            <Dropdown id="inventoryStatus" :options="state" optionLabel="label"
                                placeholder="Select State" class="md:w-19rem w-full" v-model="registerRequest.state"
                                :invalid="invalidRegisterState">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value && slotProps.value.value">
                                        <Tag :value="slotProps.value.value" />
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                            </Dropdown>
                        </IconField>

                        <IconField iconPosition="right">
                            <Dropdown id="inventoryStatus" :options="district" optionLabel="label"
                                placeholder="Select District" class="md:w-19rem w-full"
                                v-model="registerRequest.district" :invalid="invalidRegisterDistrict">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value && slotProps.value.value">
                                        <Tag :value="slotProps.value.value" />
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                            </Dropdown>
                        </IconField>
                    </div>

                    <IconField iconPosition="right">
                        <InputIcon class="pi pi-map-marker"> </InputIcon>
                        <InputText v-model="registerRequest.pincode" placeholder="Pincode" type="text"
                            :invalid="invalidRegisterPincode" />
                    </IconField>

                    <div class="card flex justify-content-center">
                        <Button type="button" label="Register" @click="clientRegister()" class="md:w-19rem w-full" />
                    </div>
                    <p class="create-account" @click="switchForm('login')">Already have an account ?</p>
                    <Toast />
                </div>
            </div>
        </div>
    </div>
</template>