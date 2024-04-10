<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';

const router = useRouter();

const customers = ref();
const loading = ref(true);
const confirm = useConfirm();
const toast = useToast();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    yearofexpirence: { value: null, matchMode: FilterMatchMode.EQUALS },
    jobtitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const dataTable = ref('projects')
const expandedRowGroups = ref();
const onRowGroupExpand = (event) => {
    toast.add({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data, life: 3000 });
};
const onRowGroupCollapse = (event) => {
    toast.add({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data, life: 3000 });
};
const calculateCustomerTotal = (name) => {
    let total = 0;

    if (customers.value) {
        for (let customer of customers.value) {
            if (customer.representative.name === name) {
                total++;
            }
        }
    }

    return total;
};
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filterss = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

const details = [
    {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
    }
]



const formatCurrency = (value) => {
    if (value)
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
};
const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const saveProduct = () => {
    submitted.value = true;

    if (product?.value.name?.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
    }
};
const editProduct = (prod) => {
    product.value = { ...prod };
    productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    products.value = products.value.filter(val => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
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
    products.value = details;
});


const changeDataTable = (data) => {
    dataTable.value = data;
}

const logout = () => {
    router.push('/')
}

const items = ref([
    {
        separator: true
    },
    {
        label: 'Menu',
        items: [
            {
                label: 'Projects',
                icon: 'pi pi-receipt',
                badge: 1,
                command: () => {
                    changeDataTable('projects');
                }
            },
            {
                label: 'Plans',
                icon: 'pi pi-eject',
                badge: 2,
                command: () => {
                    changeDataTable('plans');
                }
            },
            {
                label: '3D Models',
                icon: 'pi pi-objects-column',
                badge: 4,
                command: () => {
                    changeDataTable('models');
                }
            }
        ]
    },
    {
        label: 'Profile',
        items: [
            {
                label: 'Arjun Shaji',
                icon: 'pi pi-user'
            },
            // {
            //     label: 'Messages',
            //     icon: 'pi pi-inbox',
            //     badge: 2
            // },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                    logout();
                }
            }
        ]
    },
    {
        separator: true
    }
]);

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


</script>


<template>
    <div class="client-home">

        <div class="card flex">
            <Menu :model="items" class="w-full md:w-15rem">
                <template #start>
                    <span class="inline-flex align-items-center gap-1 px-2 py-2">
                        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="h-2rem">
                            <path
                                d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                                fill="var(--primary-color)" />
                            <path
                                d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                                fill="var(--text-color)" />
                        </svg>
                        <span class="font-medium text-xl font-semibold">DREAM<span class="text-primary">
                                HOME</span></span>
                    </span>
                </template>
                <template #submenuheader="{ item }">
                    <span class="text-primary font-bold pt-5">{{ item.label }}</span>
                </template>
                <template #item="{ item, props }">
                    <a v-ripple class="flex align-items-center " v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                        <span v-if="item.shortcut"
                            class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{
                item.shortcut }}</span>
                    </a>
                </template>
            </Menu>
        </div>

        <div class="list-projects">

            <div v-if="dataTable === 'plans'" class="engineer-data-table">

                <div class="card">
                    <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
                        :paginator="true" :rows="10" :filters="filterss"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} plans">
                        <template #header>
                            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                <h4 class="m-0">Manage Plans</h4>
                                <IconField iconPosition="left">
                                    <InputIcon>
                                        <i class="pi pi-search" />
                                    </InputIcon>
                                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                                </IconField>
                            </div>
                        </template>
                        <Column field="code" header="Project Name" sortable style="min-width:12rem"></Column>
                        <Column field="name" header="Plan Price" sortable style="min-width:16rem"></Column>
                        <Column header="Plan Image">
                                <template #body="slotProps">
                                    <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="border-round" style="width: 250px" />
                                </template>
                            </Column>
                        <!-- <Column field="inventoryStatus" header="Plan Payment" sortable style="min-width:12rem">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.inventoryStatus"
                                    :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                            </template>
                        </Column> -->
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
                    </DataTable>
                </div>
            </div>

            <div v-else-if="dataTable === 'models' " class="models">
                <div class="card">
                    <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
                        :paginator="true" :rows="10" :filters="filterss"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} 3D models">
                        <template #header>
                            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                <h4 class="m-0">Manage 3D Models</h4>
                                <IconField iconPosition="left">
                                    <InputIcon>
                                        <i class="pi pi-search" />
                                    </InputIcon>
                                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                                </IconField>
                            </div>
                        </template>
                        <Column field="code" header="Project Name" sortable style="min-width:12rem"></Column>
                        <Column field="name" header="Plan Price" sortable style="min-width:16rem"></Column>
                        <Column header="Plan Image">
                                <template #body="slotProps">
                                    <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="border-round" style="width: 250px" />
                                </template>
                            </Column>
                        <!-- <Column field="inventoryStatus" header="Plan Payment" sortable style="min-width:12rem">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.inventoryStatus"
                                    :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                            </template>
                        </Column> -->
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
                    </DataTable>
                </div>
            </div>

            <div v-else-if="dataTable === 'projects'" class="plans">
                <div>
                    <div class="card">
                        <Toolbar class="mb-4">
                            <template #start>
                                <Button label="Create" icon="pi pi-plus" severity="success" class="mr-2"
                                    @click="openNew" />
                            </template>

                            <template #end>
                                <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                            </template>
                        </Toolbar>

                        <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
                            :paginator="true" :rows="10" :filters="filterss"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            :rowsPerPageOptions="[5, 10, 25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects">
                            <template #header>
                                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                    <h4 class="m-0">Manage Projects</h4>
                                    <IconField iconPosition="left">
                                        <InputIcon>
                                            <i class="pi pi-search" />
                                        </InputIcon>
                                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                                    </IconField>
                                </div>
                            </template>

                            <!-- <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column> -->
                            <Column field="code" header="Name" sortable style="min-width:12rem"></Column>
                            <Column field="name" header="Type" sortable style="min-width:16rem"></Column>
                            <!-- <Column header="Image">
                                <template #body="slotProps">
                                    <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="border-round" style="width: 64px" />
                                </template>
                            </Column> -->
                            <Column field="price" header="Architecture Sytle" sortable style="min-width:8rem">
                                <template #body="slotProps">
                                    {{ formatCurrency(slotProps.data.price) }}
                                </template>
                            </Column>
                            <Column field="category" header="Timeline" sortable style="min-width:10rem"></Column>
                            <!-- <Column field="rating" header="Reviews" sortable style="min-width:12rem">
                                <template #body="slotProps">
                                    <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                                </template>
                            </Column> -->
                            <Column field="inventoryStatus" header="Plan Payment" sortable style="min-width:12rem">
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.inventoryStatus"
                                        :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                                </template>
                            </Column>
                            <Column field="inventoryStatus" header="3d Model Payment" sortable style="min-width:12rem">
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.inventoryStatus"
                                        :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                                </template>
                            </Column>
                            <Column :exportable="false" style="min-width:8rem">
                                <template #body="slotProps">
                                    <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                                        @click="editProduct(slotProps.data)" />
                                    <Button icon="pi pi-trash" outlined rounded severity="danger"
                                        @click="confirmDeleteProduct(slotProps.data)" />
                                </template>
                            </Column>
                        </DataTable>
                    </div>

                    <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Project Details"
                        :modal="true" class="p-fluid">
                        <img v-if="product.image"
                            :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
                            :alt="product.image" class="block m-auto pb-3" />
                        <div class="field">
                            <label for="name">Project Name</label>
                            <InputText id="name" v-model.trim="product.name" required="true" autofocus
                                :invalid="submitted && !product.name" />
                            <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
                        </div>
                        <div class="field">
                            <label for="description">Description</label>
                            <Textarea id="description" v-model="product.description" required="true" rows="3"
                                cols="20" />
                        </div>

                        <div class="field">
                            <label for="inventoryStatus" class="mb-3">Type</label>
                            <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses"
                                optionLabel="label" placeholder="Select a Status">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value && slotProps.value.value">
                                        <Tag :value="slotProps.value.value"
                                            :severity="getStatusLabel(slotProps.value.label)" />
                                    </div>
                                    <div v-else-if="slotProps.value && !slotProps.value.value">
                                        <Tag :value="slotProps.value" :severity="getStatusLabel(slotProps.value)" />
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                            </Dropdown>
                        </div>

                        <div class="field">
                            <label for="inventoryStatus" class="mb-3">Architecture Style</label>
                            <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses"
                                optionLabel="label" placeholder="Select a Status">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value && slotProps.value.value">
                                        <Tag :value="slotProps.value.value"
                                            :severity="getStatusLabel(slotProps.value.label)" />
                                    </div>
                                    <div v-else-if="slotProps.value && !slotProps.value.value">
                                        <Tag :value="slotProps.value" :severity="getStatusLabel(slotProps.value)" />
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                            </Dropdown>
                        </div>

                        <div class="field">
                            <label for="name">Timeline ( Days )</label>
                            <InputNumber id="name" v-model.trim="product.name" required="true" autofocus
                                :invalid="submitted && !product.name" />
                            <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
                        </div>

                        <!-- <div class="field">
                            <label class="mb-3">Category</label>
                            <div class="formgrid grid">
                                <div class="field-radiobutton col-6">
                                    <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                                    <label for="category1">Accessories</label>
                                </div>
                                <div class="field-radiobutton col-6">
                                    <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                                    <label for="category2">Clothing</label>
                                </div>
                                <div class="field-radiobutton col-6">
                                    <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                                    <label for="category3">Electronics</label>
                                </div>
                                <div class="field-radiobutton col-6">
                                    <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                                    <label for="category4">Fitness</label>
                                </div>
                            </div>
                        </div> -->

                        <!-- <div class="formgrid grid">
                            <div class="field col">
                                <label for="price">Price</label>
                                <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div class="field col">
                                <label for="quantity">Quantity</label>
                                <InputNumber id="quantity" v-model="product.quantity" integeronly />
                            </div>
                        </div> -->
                        <template #footer>
                            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                            <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
                        </template>
                    </Dialog>

                    <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm"
                        :modal="true">
                        <div class="confirmation-content">
                            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                            <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                            <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
                        </template>
                    </Dialog>

                    <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm"
                        :modal="true">
                        <div class="confirmation-content">
                            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                            <span v-if="product">Are you sure you want to delete the selected products?</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                            <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                        </template>
                    </Dialog>
                </div>
            </div>

        </div>
    </div>
</template>
