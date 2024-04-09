<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const customers = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const representatives = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const loading = ref(true);

const data = [
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
    // CustomerService.getCustomersMedium().then((data) => {
    //         customers.value = getCustomers(data);
    //         loading.value = false;
    //     });
    customers.value = data;
    loading.value = false;
});

const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
        d.date = new Date(d.date);

        return d;
    });
};
const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;
    }
}

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
                :globalFilterFields="['name', 'country.name', 'representative.name', 'status']">
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
                <Column header="Email" filterField="country.name" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                :class="`flag flag-${data.country.code}`" style="width: 24px" />
                            <span>{{ data.country.name }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Phone" filterField="representative" :showFilterMenu="false"
                    :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <img :alt="data.representative.name"
                                :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                                style="width: 32px" />
                            <span>{{ data.representative.name }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Year of Expirence" filterField="representative" :showFilterMenu="false"
                    :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <img :alt="data.representative.name"
                                :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                                style="width: 32px" />
                            <span>{{ data.representative.name }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Job Title" filterField="representative" :showFilterMenu="false"
                    :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <img :alt="data.representative.name"
                                :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                                style="width: 32px" />
                            <span>{{ data.representative.name }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="Year of Expirence" header="Status" :showFilterMenu="false"
                    :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Tag :value="data.status" :severity="getSeverity(data.status)" />
                    </template>
                </Column>
                <Column field="verified" header="Verified" dataType="boolean" style="min-width: 6rem">
                    <template #body="{ data }">
                        <i class="pi"
                            :class="{ 'pi-check-circle text-green-500': data.verified, 'pi-times-circle text-red-400': !data.verified }"></i>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>