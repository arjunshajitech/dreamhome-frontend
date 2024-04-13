<script setup>
import { ref, onMounted } from 'vue';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import axios from 'axios';
import constants from '../../constant/const'

axios.defaults.withCredentials = true;
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
const project = ref({});
const selectedProducts = ref();
const submitted = ref(false);
const allProjects = ref([]);

// create project
const projectDescription = ref('')
const type = ref('');
const projectName = ref('')
const projectTimeline = ref('');
const style = ref('')


const projectStyle = ref([
    {
        label: 'MODERN', value: 'MODERN'
    },
    {
        label: 'TRADITIONAL', value: 'TRADITIONAL'
    }
])

const projectType = ref([
    {
        label: 'RESIDENTIAL', value: 'RESIDENTIAL'
    },
    {
        label: 'COMMERCIAL', value: 'COMMERCIAL'
    },
    {
        label: 'RENOVATION', value: 'RENOVATION'
    }
])


const details = [

]

const getAllProjects = () => {
    axios.get(constants.CLIENT_GET_PROJECT).then((response) => {
        if (response.status === 200) {
            allProjects.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}
getAllProjects();

const saveProject = () => {
    axios.post(constants.CLIENT_CREATE_PROJECT, {
        name: projectName.value,
        type: type.value.value,
        architectureStyle: style.value.value,
        timeline: projectTimeline.value,
        description: projectDescription.value
    }).then((response) => {
        if (response.status === 200) {
            submitted.value = true;
            productDialog.value = false;
            getAllProjects();
            toast.add({ severity: 'success', summary: 'Confirmed', detail: 'New Project created.', life: 3000 });
        }
    }).catch((error) => {
        console.error(error);
    });
};




const openNew = () => {
    project.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};


const editProduct = (prod) => {
    product.value = { ...prod };
    productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};


const getSeverity = (status) => {
    switch (status) {
        case 'ASSIGNED':
            return 'success';

        case 'UNASSIGNED':
            return 'warning';

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
    axios.post(constants.CLIENT_LOGOUT).then((response) => {
        if (response.status === 200)
            router.push('/')
    }).catch((error) => { console.error(error) });
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


        <div class="plans">
            <div>
                <div class="card">
                    <Toolbar class="mb-4">
                        <template #start>
                            <Button label="Create" icon="pi pi-plus" severity="success" class="mr-2"
                                @click="openNew()" />
                        </template>

                        <!-- <template #end>
                                <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                            </template> -->
                    </Toolbar>
                    <DataTable :value="allProjects">
                        <Column field="name" header="Project Name" style="min-width:12rem"></Column>
                        <Column field="type" header="Type" style="min-width:12rem"></Column>
                        <Column field="architectureStyle" header="Architecture Sytle" style="min-width:12rem"></Column>
                        <Column field="timeline" header="Timeline" style="min-width:12rem"></Column>
                        <Column header="Plan payment" style="min-width:12rem">
                            <template #body="slotProps">
                                <div v-if="slotProps.data.planAmount != 0">
                                    <Button label="Pay" severity="success" :disabled="false"
                                        @click="confirm2(slotProps.data.id)" outlined />
                                </div>
                                <div v-else>
                                    <Tag value="PENDING" severity="warning" />
                                </div>
                            </template>
                        </Column>
                        <Column header="3D model payment" style="min-width:12rem">
                            <template #body="slotProps">
                                <div v-if="slotProps.data.threeDModelAmount != 0">
                                    <Button label="Pay" severity="success" :disabled="false"
                                        @click="confirm2(slotProps.data.id)" outlined />
                                </div>
                                <div v-else>
                                    <Tag value="PENDING" severity="warning" />
                                </div>
                            </template>
                        </Column>
                        <Column header="Status" style="min-width:12rem">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
                            </template>
                        </Column>
                        <template #footer> In total there are {{ allProjects ? allProjects.length : 0 }} projects.
                        </template>
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

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Create Project"
                    :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Project Name</label>
                        <InputText id="name" v-model.trim="projectName" required="true" autofocus />
                        <!-- <small class="p-error" v-if="submitted && !project.name">Name is required.</small> -->
                    </div>
                    <div class="field">
                        <label for="description">Description</label>
                        <Textarea :invalid="submitted" id="description" v-model.trim="projectDescription"
                            required="true" rows="3" cols="20" />
                        <!-- <small class="p-error" v-if="submitted && !project.description">Name is required.</small> -->
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Type</label>
                        <Dropdown id="inventoryStatus" v-model="type" :options="projectType" optionLabel="label"
                            placeholder="Select a type">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <Tag :value="slotProps.value.value" />
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Architecture Style</label>
                        <Dropdown id="inventoryStatus" v-model="style" :options="projectStyle" optionLabel="label"
                            placeholder="Select a style">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <Tag :value="slotProps.value.value" />
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>

                    <div class="field">
                        <label for="name">Timeline ( Days )</label>
                        <InputNumber id="name" v-model.trim="projectTimeline" required="true" autofocus
                            :invalid="submitted && !product.name" />
                        <!-- <small class="p-error" v-if="submitted && !project.name">Name is required.</small> -->
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" text @click="saveProject" />
                    </template>
                </Dialog>

                <!-- <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm"
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
                </Dialog> -->
            </div>
        </div>


        <!-- <div class="list-projects">
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
            </div> -->

        <!-- <div v-else-if="dataTable === 'models'" class="models">
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
            </div> -->
    </div>

</template>
