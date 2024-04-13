<script setup>
import { ref, onMounted, computed, watch } from 'vue';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import axios from 'axios';
import constants from '../../constant/const'

axios.defaults.withCredentials = true;
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const dataTable = ref('jobs')
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const project = ref({});
const submitted = ref(false);
const loggedUserName = ref('')
const jobs = ref([]);

// create project
const projectDescription = ref('')
const type = ref('');
const projectName = ref('')
const projectTimeline = ref('1');
const style = ref('')
const errroProjectDescription = ref(false);
const errorProjectType = ref(false);
const errorProjectName = ref(false);
const errorProjectTimeline = ref(false);
const errorProjectStyle = ref(false);


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

const getAllJobs = () => {
    axios.get(constants.ENGINEER_JOBS).then((response) => {
        if (response.status === 200) {
            jobs.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}


onMounted(() => {
    axios.get(constants.ENGINEER_PROFILE).then((res) => {
        loggedUserName.value = res.data.name;
    }).catch((error) => {
        console.error(error)
        router.push('/engineer')
    });
    getAllJobs();
})


const clearCreateProject = () => {
    projectDescription.value = ''
    type.value = ''
    style.value = ''
    projectTimeline.value = '1'
    projectName.value = ''
    errroProjectDescription.value = false;
    errorProjectType.value = false;
    errorProjectName.value = false;
    errorProjectTimeline.value = false;
    errorProjectStyle.value = false;
}

const validateSaveProject = () => {
    if (projectName.value === null || projectName.value === '') {
        errorProjectName.value = true;
        return true;
    }
    else errorProjectName.value = false;
    if (projectDescription.value === null || projectDescription.value === '') {
        errroProjectDescription.value = true;
        return true;
    }
    else errroProjectDescription.value = false;
    if (type.value === null || type.value === '') {
        errorProjectType.value = true;
        return true;
    }
    else errorProjectType.value = false;
    if (style.value === null || style.value === '') {
        errorProjectStyle.value = true;
        return true;
    }
    else errorProjectStyle.value = false;
    if (projectTimeline.value === null || projectTimeline.value === '' || projectTimeline.value <= 0) {
        errorProjectTimeline.value = true;
        return true;
    }
    else errorProjectTimeline.value = false;

}


const saveProject = () => {

    // if (validateSaveProject()) return;

    // axios.post(constants.CLIENT_CREATE_PROJECT, {
    //     name: projectName.value,
    //     type: type.value.value,
    //     architectureStyle: style.value.value,
    //     timeline: projectTimeline.value,
    //     description: projectDescription.value
    // }).then((response) => {
    //     if (response.status === 200) {
    //         submitted.value = true;
    //         productDialog.value = false;
    //         getAllProjects();
    //         clearCreateProject();
    //         toast.add({ severity: 'success', summary: 'Create project', detail: 'New Project created.', life: 3000 });
    //     }
    // }).catch((error) => {
    //     if (error.response.status === 401)
    //         toast.add({ severity: 'error', summary: 'Create project', detail: 'Project already exists.', life: 3000 });
    //     else
    //         toast.add({ severity: 'warn', summary: 'Create project', detail: 'Something went wrong.', life: 3000 });
    //     console.error(error);
    // });
};




const openNew = () => {
    clearCreateProject();
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
const confirmDeleteProduct = (id) => {
    confirm.require({
        message: 'Are you sure you want to delete project?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            axios.delete(constants.CLIENT_DELETE_PROJECT + "/" + id).then((response) => {
                if (response.status === 200) {
                    getAllProjects();
                    toast.add({ severity: 'success', summary: 'Delete project', detail: 'Project deleted.', life: 3000 });
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Delete project', detail: 'You have cancelled', life: 3000 });
        }
    });
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

const checkIsEditDeleteButtonDisable = (status) => {
    switch (status) {
        case 'ASSIGNED':
            return true;

        case 'UNASSIGNED':
            return false;

        default:
            return false;
    }
}

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

const changeDataTable = (data) => {
    dataTable.value = data;
}

const logout = () => {
    axios.get(constants.ENGINEER_LOGOUT).then((response) => {
        if (response.status === 200)
            router.push('/engineer')
    }).catch((error) => { console.error(error) });
}


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

const items = ref([
    {
        separator: true
    },
    {
        label: 'Menu',
        items: [
            {
                label: 'Jobs',
                icon: 'pi pi-receipt',
                badge: 9,
                command: () => {
                    getAllJobs();
                    changeDataTable('jobs');
                }
            },
            {
                label: 'Plans status',
                icon: 'pi pi-eject',
                badge: 2,
                command: () => {
                    changeDataTable('plans');
                }
            },
            {
                label: '3D Models status',
                icon: 'pi pi-objects-column',
                badge: 1,
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
                label: computed(() => loggedUserName.value),
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


        <div class="plans" v-if="dataTable === 'jobs'">
            <div class="card">
                <!-- <Toolbar class="mb-4">
                        <template #start>
                            <Button label="Create" icon="pi pi-plus" severity="success" class="mr-2"
                                @click="openNew()" />
                        </template>

                        <template #end>
                                <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                            </template>
                    </Toolbar> -->
                <DataTable :value="jobs" scrollable scrollHeight="600px">
                    <Toast />
                    <ConfirmDialog></ConfirmDialog>
                    <Column field="name" header="Project Name" style="min-width:12rem">
                    </Column>
                    <Column field="type" header="Type" style="min-width:12rem"></Column>
                    <Column field="architectureStyle" header="Architecture Sytle" style="min-width:12rem"></Column>
                    <Column field="timeline" header="Timeline" style="min-width:12rem">
                        <template #body="slotProps">
                            <span>{{ slotProps.data.timeline }} days</span>
                        </template>
                    </Column>
                    <Column header="Plan payment" style="min-width:12rem">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.planAmountPaid === true">
                                <Tag value="PAYMENT SUCCESS" severity="success" />
                            </div>
                            <div v-else>
                                <Tag value="PAYMENT PENDING" severity="warning" />
                            </div>
                        </template>
                    </Column>
                    <Column header="3D model payment" style="min-width:12rem">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.threeDModelAmountPaid === true">
                                <Tag value="PAYMENT SUCCESS" severity="success" />
                            </div>
                            <div v-else>
                                <Tag value="PAYMENT PENDING" severity="warning" />
                            </div>
                        </template>
                    </Column>
                    <Column header="Status" style="min-width:12rem">
                        <template #body="slotProps">
                            <Button v-if="slotProps.data.planAmount === 0 && slotProps.data.threeDModelAmount === 0" label="Update details" icon="pi pi-plus" severity="success" class="mr-2"
                                @click="openNew()" />
                        </template>
                    </Column>
                    <template #footer> In total there are {{ jobs ? jobs.length : 0 }} jobs.
                    </template>
                </DataTable>
            </div>

            <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Update job details"
                    :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Plan amount</label>
                        <InputNumber id="name" v-model.trim="projectTimeline" required="true" autofocus
                            :invalid="errorProjectTimeline" />
                        <small class="p-error" v-if="errorProjectTimeline">Timeline must be greater than or equal to
                            1.</small>
                    </div>
                    <div class="field">
                        <label for="name">3D Model amount</label>
                        <InputNumber id="name" v-model.trim="projectTimeline" required="true" autofocus
                            :invalid="errorProjectTimeline" />
                        <small class="p-error" v-if="errorProjectTimeline">Timeline must be greater than or equal to
                            1.</small>
                    </div>
                    <div class="field">
                        <label for="name">Plan estimation</label>
                        <InputNumber id="name" v-model.trim="projectTimeline" required="true" autofocus
                            :invalid="errorProjectTimeline" />
                        <small class="p-error" v-if="errorProjectTimeline">Timeline must be greater than or equal to
                            1.</small>
                    </div>
                    <div class="field">
                        <label for="name">3D Model estimation</label>
                        <InputNumber id="name" v-model.trim="projectTimeline" required="true" autofocus
                            :invalid="errorProjectTimeline" />
                        <small class="p-error" v-if="errorProjectTimeline">Timeline must be greater than or equal to
                            1.</small>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" text @click="saveProject" />
                    </template>
                </Dialog>

        </div>
    </div>

</template>
