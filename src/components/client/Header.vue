<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import constants from '../../constant/const'
import { useToast } from "primevue/usetoast";

axios.defaults.withCredentials = true;
const toast = useToast();
const name = ref('')
const email = ref('')
const question = ref('')
const faq = ref(false);
const errorName = ref(false);
const errorEmail = ref(false);
const errorQuestion = ref(false);


const showFaq = () => {
    faq.value = true;
    name.value = ''
    email.value = ''
    question.value = ''
}

const closeFaq = () => {
    faq.value = false;
}

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const validateForm = () => {
    if (name.value === '' || name.value === null) {
        errorName.value = true;
        return true;
    } else errorName.value = false;

    if (email.value === '' || email.value === null || !validateEmail(email.value)) {
        errorEmail.value = true;
        return true;
    } else errorEmail.value = false;

    if (question.value === '' || question.value === null) {
        errorQuestion.value = true;
        return true;
    } else errorQuestion.value = false;
    return false;
}

const submitFaq = () => {
    if (validateForm()) return;
    axios.post(constants.CLIENT_POST_FAQ, {
        name: name.value,
        email: email.value,
        question: question.value
    }).then((response) => {
        if (response.status === 200) {
            faq.value = false;
            toast.add({ severity: 'success', summary: 'FAQ', detail: 'Submitted.', life: 3000 });
        }
    }).catch((error) => {
        console.error(error);
    });
}


const items = ref([
    {
        label: 'Dream Home',
        icon: 'pi pi-home'
    },
    {
        label: 'FAQ',
        icon: 'pi pi-inbox',
        command: () => {
            showFaq();
        }
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
        <Toast />
        <ConfirmDialog></ConfirmDialog>
    </div>

    <Dialog v-model:visible="faq" :style="{ width: '450px' }" header="FAQ" :modal="true" class="p-fluid">
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" :invalid="errorName" v-model.trim="name" required="true" autofocus />
        </div>
        <div class="field">
            <label for="name">Email</label>
            <InputText id="name" :invalid="errorEmail" v-model.trim="email" required="true" autofocus />
        </div>
        <div class="field">
            <label for="description">Type anything</label>
            <Textarea id="description" :invalid="errorQuestion" v-model.trim="question" required="true" rows="3" cols="20" />
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="closeFaq" />
            <Button label="Save" icon="pi pi-check" text @click="submitFaq" />
        </template>
    </Dialog>
</template>