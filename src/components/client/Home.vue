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
const dataTable = ref('projects')
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

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    yearofexpirence: { value: null, matchMode: FilterMatchMode.EQUALS },
    jobtitle: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});

const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
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
                                <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                                    :alt="slotProps.data.image" class="border-round" style="width: 250px" />
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
                    </DataTable>
                </div>
            </div>

            <div v-else-if="dataTable === 'models'" class="models">
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
                        <Column header="3D Model Image">
                            <template #body="slotProps">
                                <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                                    :alt="slotProps.data.image" class="border-round" style="width: 250px" />
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
                            <Column field="code" header="Name" sortable style="min-width:12rem"></Column>
                            <Column field="name" header="Type" sortable style="min-width:16rem"></Column>
                            <Column field="price" header="Architecture Sytle" sortable style="min-width:8rem">
                                <template #body="slotProps">
                                    {{ formatCurrency(slotProps.data.price) }}
                                </template>
                            </Column>
                            <Column field="category" header="Timeline" sortable style="min-width:10rem"></Column>
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
