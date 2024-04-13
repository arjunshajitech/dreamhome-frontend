<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import axios from 'axios';
import constants from '../../constant/const'

axios.defaults.withCredentials = true;
const router = useRouter();
const clients = ref([]);
const dataTable = ref('client')
const confirm = useConfirm();
const toast = useToast();


const getAllClients = () => {
    axios.get(constants.ADMIN_GET_ALL_CLIETNS).then((response) => {
        if (response.status === 200) {
            clients.value = response.data;
        }
    }).catch((error) => {
        router.push('/admin')
        console.error(error);
    });
}
getAllClients();


const confirm1 = (id) => {
    confirm.require({
        message: 'Are you sure you want to accept?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Accept',
        accept: () => {
            axios.post(constants.ADMIN_APPROVE_CLIENT, {
                id: id,
                approveOrReject: true
            }).then((response) => {
                if (response.status === 200) {
                    toast.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                    getAllClients();
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have cancelled', life: 3000 });
        }
    });
};

const confirm2 = (id) => {
    confirm.require({
        message: 'Are you sure you want to reject?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Reject',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            axios.post(constants.ADMIN_APPROVE_CLIENT, {
                id: id,
                approveOrReject: false
            }).then((response) => {
                if (response.status === 200) {
                    toast.add({ severity: 'success', summary: 'Confirmed', detail: 'You have rejected', life: 3000 });
                    getAllClients();
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have cancelled', life: 3000 });
        }
    });
};

const isButtonDisabled = (status) => {
    return status !== 'PENDING';
}

onMounted(() => {
    getAllClients();
});


const changeDataTable = (data) => {
    dataTable.value = data;
}

const items = ref([
    {
        label: 'Clients',
        icon: 'pi pi-shop',
        command: () => {
            getAllClients();
            changeDataTable('client');
        }
    },
    {
        label: 'Engineer',
        icon: 'pi pi-hammer',
        // command: () => {
        //     changeDataTable('engineer');
        // }
    },
    {
        label: 'Assing Job',
        icon: 'pi pi-link',
        // command: () => {
        //     changeDataTable('assign_job');
        // }
    },
    {
        label: 'Feedback',
        icon: 'pi pi-inbox'
    },
    {
        label: 'FAQ',
        icon: 'pi pi-comments'
    }
]);

const getSeverity = (status) => {
    switch (status) {
        case 'APPROVED':
            return 'success';

        case 'PENDING':
            return 'warning';

        case 'REJECTED':
            return 'danger';

        default:
            return null;
    }
};



</script>

<template>
    <div class="admin-tab-menu">
        <div class="card mt-5">
            <TabMenu :model="items" />
        </div>
    </div>

    <div class="client-details mt-5">
        <div class="card">
            <Toast />
            <ConfirmDialog></ConfirmDialog>
            <DataTable :value="clients" tableStyle="min-width: 50rem" scrollable scrollHeight="600px">
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="phone" header="Phone"></Column>
                <Column header="Password">
                    <template #body="slotProps">
                        <p>*************</p>
                    </template>
                </Column>
                <Column header="Accept">
                    <template #body="slotProps">
                        <Button label="Accept" outlined @click="confirm1(slotProps.data.id)"
                            :disabled="isButtonDisabled(slotProps.data.status)" />
                    </template>
                </Column>
                <Column header="Reject">
                    <template #body="slotProps">
                        <Button label="Reject" severity="danger" :disabled="isButtonDisabled(slotProps.data.status)"
                            @click="confirm2(slotProps.data.id)" outlined />
                    </template>
                </Column>
                <Column header="Status">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
                    </template>
                </Column>
                <template #footer> In total there are {{ clients ? clients.length : 0 }} clients. </template>
            </DataTable>
        </div>
    </div>

    <!-- <div class="client-data-table">
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="card mt-5">
            <table>
                
            </table>
        </div>
    </div> -->


    <!-- <div class="project-data-table" v-else-if="dataTable === 'assign_job'">
        <div class="card">
            <DataTable v-model:filters="filters" :value="customers" paginator :rows="10" dataKey="id"
                filterDisplay="row" :loading="loading"
                :globalFilterFields="['name', 'email', 'phone', 'yearofexperience', 'jobtitle']">

                <template #header>
                    <div class="flex justify-content-end">
                        <IconField iconPosition="left">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        </IconField>
                    </div>
                </template>

<template #empty> No jobs found. </template>
<template #loading> Loading customers data. Please wait. </template>

<Column field="name" header="Name" style="min-width: 12rem">
    <template #body="{ data }">
                        {{ data.name }}
                    </template>
</Column>
<Column field="email" header="Type" style="min-width: 12rem">
    <template #body="{ data }">
                        {{ data.country.name }}
                    </template>
</Column>
<Column field="phone" header="Architecture" style="min-width: 12rem">
    <template #body="{ data }">
                        {{ data.name }}
                    </template>
</Column>
<Column field="phone" header="Timeline" style="min-width: 12rem">
    <template #body="{ data }">
                        {{ data.name }}
                    </template>
</Column>
<Column field="phone" header="Assign Engineer" style="min-width: 12rem">
    <template #body="{ data }">
                        <div class="card flex">
                            <Button @click="visible = true" label="Assign" outlined></Button>
                            <Dialog v-model:visible="visible" modal header="Assign Engineer"
                                :style="{ width: '25rem' }">
                                <div class="flex gap-2">
                                    <div class="card">
                                        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name"
                                            placeholder="Select a City" class="w-full md:w-14rem" />
                                    </div>
                                    <Button type="button" label="Assign" @click="visible = false"></Button>
                                </div>
                            </Dialog>
                        </div>
                    </template>
</Column>
<Column header="Status">
    <template #body="slotProps">
                        <Tag value="ASSIGNED" severity="success" />
                    </template>
</Column>
</DataTable>
</div>
</div> -->
</template>