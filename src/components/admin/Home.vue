<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const customers = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    yearofexpirence: { value: null, matchMode: FilterMatchMode.EQUALS },
    jobtitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});

const loading = ref(true);

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
    },
    {
        id: 1000,
        name: 'James Butt',
        country: {
            name: 'Algeria',
            code: 'dz'
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: false,
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

const items = ref([
    { label: 'Engineer', icon: 'pi pi-hammer' },
    { label: 'Client', icon: 'pi pi-shop' },
    { label: 'Assing Job', icon: 'pi pi-link' },
    { label: 'Feedback', icon: 'pi pi-inbox' },
    { label: 'FAQ', icon: 'pi pi-comments' }
]);

</script>

<template>
    <div class="admin-tab-menu">
        <div class="card mt-5">
            <TabMenu :model="items" />
        </div>
    </div>

    <div class="engineer-data-table">
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

                <template #empty> No customers found. </template>
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
                        <Button label="Approve" />
                    </template>
                </Column>
                <Column field="reject" header="Reject" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Button label="Reject" severity="danger" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>