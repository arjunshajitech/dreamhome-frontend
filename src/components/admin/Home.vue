<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const customers = ref();
const loading = ref(true);
const dataTable = ref('engineer')
const confirm = useConfirm();
const toast = useToast();
const visible = ref(false);
const selectedCity = ref();


const cities = ref([
    // { name: 'New York', code: 'NY' },
    // { name: 'Rome', code: 'RM' },
    // { name: 'London', code: 'LDN' },
    // { name: 'Istanbul', code: 'IST' },
    // { name: 'Paris', code: 'PRS' }
]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    yearofexpirence: { value: null, matchMode: FilterMatchMode.EQUALS },
    jobtitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});

const confirm1 = () => {
    confirm.require({
        message: 'Are you sure you want to accept?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Accept',
        accept: () => {
            toast.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have cancelled', life: 3000 });
        }
    });
};

const confirm2 = () => {
    confirm.require({
        message: 'Are you sure you want to reject?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Reject',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            toast.add({ severity: 'success', summary: 'Confirmed', detail: 'You have rejected', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have cancelled', life: 3000 });
        }
    });
};

const data = [
    {
        id: 1000,
        name: 'ammu',
        country: {
            name: 'Algeria',
            code: 'dz'
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        representative: {
            name: 'Ioni Bowcher',
            image: 'ionibowcher.png'
        },
        balance: 70663
    }
]

onMounted(() => {
    customers.value = data;
    loading.value = false;
});


const changeDataTable = (data) => {
    dataTable.value = data;
}

const items = ref([
    {
        label: 'Engineer',
        icon: 'pi pi-hammer',
        command: () => {
            changeDataTable('engineer');
        }
    },
    {
        label: 'Client',
        icon: 'pi pi-shop',
        command: () => {
            changeDataTable('client');
        }
    },
    {
        label: 'Assing Job',
        icon: 'pi pi-link',
        command: () => {
            changeDataTable('assign_job');
        }
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

</script>

<template>
    <div class="admin-tab-menu">
        <div class="card mt-5">
            <TabMenu :model="items" />
        </div>
    </div>

    <div v-if="dataTable === 'engineer'" class="engineer-data-table">
        <Toast />
        <ConfirmDialog></ConfirmDialog>
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

                <template #empty> No engineers found. </template>
                <template #loading> Loading customers data. Please wait. </template>

                <Column field="name" header="Name" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                </Column>
                <Column field="email" header="Email" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.country.name }}
                    </template>
                </Column>
                <Column field="phone" header="Phone" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                </Column>
                <Column field="yearofexpirience" header="Year of Experience" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.country.name }}
                    </template>
                </Column>
                <Column field="jobtitle" header="Job Title" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.country.name }}
                    </template>
                </Column>
                <Column field="accept" header="Accept" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Button @click="confirm1()" label="Accept" outlined></Button>
                    </template>
                </Column>
                <Column field="reject" header="Reject" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Button @click="confirm2()" label="Reject" severity="danger" outlined></Button>
                    </template>
                </Column>
                <Column header="Status">
                    <template #body="slotProps">
                        <Tag value="APPROVED" :severity="success" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <div v-else-if="dataTable === 'client'" class="client-data-table">
        <Toast />
        <ConfirmDialog></ConfirmDialog>
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

                <template #empty> No clients found. </template>
                <template #loading> Loading customers data. Please wait. </template>

                <Column field="name" header="Name" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                </Column>
                <Column field="email" header="Email" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.country.name }}
                    </template>
                </Column>
                <Column field="phone" header="Phone" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                </Column>
                <Column field="accept" header="Accept" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Button @click="confirm1()" label="Accept" outlined></Button>
                    </template>
                </Column>
                <Column field="reject" header="Reject" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Button @click="confirm2()" label="Reject" severity="danger" outlined></Button>
                    </template>
                </Column>
                <Column header="Status">
                    <template #body="slotProps">
                        <Tag value="APPROVED" :severity="success" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>


    <div class="project-data-table" v-else-if="dataTable === 'assign_job'">
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
                            <Dialog v-model:visible="visible" modal header="Assign Engineer" :style="{ width: '25rem' }">
                                <div class="flex gap-2">
                                    <div class="card">
                                        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-14rem" />
                                    </div>
                                    <Button type="button" label="Assign" @click="visible = false"></Button>
                                </div>
                            </Dialog>
                        </div>
                    </template>
                </Column>
                <Column header="Status">
                    <template #body="slotProps">
                        <Tag value="ASSIGNED" :severity="success" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>