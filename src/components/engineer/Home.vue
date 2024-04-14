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
const planImages = ref([]);
const modelImages = ref([]);
const uploadPlan = ref(false);
const uploadModel = ref(false)
const visible = ref(false);


const planAmount = ref('100')
const threeDModelAmount = ref('100')
const errorPlanAmount = ref(false)
const errorThreeDModel = ref(false)
const updateProjectId = ref('');

const planUploadProjectId = ref('');
const modelUploadProjectId = ref('');



const getAllJobs = () => {
    axios.get(constants.ENGINEER_JOBS).then((response) => {
        if (response.status === 200) {
            jobs.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

const getAllPlanImages = () => {
    axios.get(constants.ENGINEER_ALL_PLAN_IMAGES).then((response) => {
        if (response.status === 200) {
            planImages.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

const getAllModelImges = () => {
    axios.get(constants.ENGINEER_ALL_MODEL_IMAGES).then((response) => {
        if (response.status === 200) {
            modelImages.value = response.data;
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
    getAllModelImges();
    getAllPlanImages();
})


const clearUpdateProject = () => {
    planAmount.value = '100',
        threeDModelAmount.value = '100'
    errorPlanAmount.value = false,
        errorThreeDModel.value = false;
    updateProjectId.value = ''
}

const validateUpdateDetails = () => {
    if (planAmount.value === null || planAmount.value === '' || planAmount.value < 100) {
        errorPlanAmount.value = true;
        return true;
    }
    else errorPlanAmount.value = false;
    if (threeDModelAmount.value === null || threeDModelAmount.value === '' || threeDModelAmount.value < 100) {
        errorThreeDModel.value = true;
        return true;
    }
    else errorThreeDModel.value = false;
    return false;
}


const saveProject = () => {

    if (validateUpdateDetails()) return;

    axios.put(constants.ENGINEER_UPDATE_PROJECT, {
        id: updateProjectId.value,
        planEstimation: '0',
        threeDModelEstimation: '0',
        planAmount: planAmount.value,
        threeDModelAmount: threeDModelAmount.value
    }).then((response) => {
        if (response.status === 200) {
            productDialog.value = false;
            getAllJobs();
            clearUpdateProject();
            toast.add({ severity: 'success', summary: 'Update project', detail: 'Project udpated', life: 3000 });
        }
    }).catch((error) => {
        toast.add({ severity: 'warn', summary: 'Update project', detail: 'Something went wrong.', life: 3000 });
        console.error(error);
    });
};



const openNew = (id) => {
    clearUpdateProject();
    updateProjectId.value = id;
    project.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const uploadPlanOpen = (id) => {
    planUploadProjectId.value = id;
    uploadPlan.value = true;
}

const uploadModelOpen = (id) => {
    modelUploadProjectId.value = id;
    uploadModel.value = true;
}

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



const changeDataTable = (data) => {
    dataTable.value = data;
}

const logout = () => {
    axios.get(constants.ENGINEER_LOGOUT).then((response) => {
        if (response.status === 200)
            router.push('/engineer')
    }).catch((error) => { console.error(error) });
}


const checkUpdateButtonDisable = (slotProps) => {
    return slotProps.data.planAmount != 0 && slotProps.data.threeDModelAmount != 0
}

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
                badge: computed(() => jobs.value.length),
                command: () => {
                    getAllJobs();
                    changeDataTable('jobs');
                }
            },
            {
                label: 'Plans status',
                icon: 'pi pi-eject',
                badge: computed(() => planImages.value.length),
                command: () => {
                    getAllPlanImages();
                    changeDataTable('plans');
                }
            },
            {
                label: '3D Models status',
                icon: 'pi pi-objects-column',
                badge: computed(() => modelImages.value.length),
                command: () => {
                    getAllModelImges();
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

const uploadModelImage = async (event) => {
    let projectId = modelUploadProjectId.value;
    const file = event.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post(constants.ENGINEER_UPLOAD_MODEL + "/" + projectId, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        if (response.status === 200) {
            uploadModel.value = false;
            getAllJobs();
            getAllModelImges();
            toast.add({ severity: 'success', summary: 'Upload Model', detail: 'Upload success.', life: 3000 });
        }
    }).catch((error) => {
        console.error(error);
    });
};


const uploadPlanImage = async (event) => {
    let projectId = planUploadProjectId.value;
    const file = event.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post(constants.ENGINEER_UPLOAD_IMAGE + "/" + projectId, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        if (response.status === 200) {
            uploadPlan.value = false;
            getAllJobs();
            getAllPlanImages();
            toast.add({ severity: 'success', summary: 'Upload Plan', detail: 'Upload success.', life: 3000 });
        }
    }).catch((error) => {
        console.error(error);
    });
};

const deleteModelImage = (id) => {
    confirm.require({
        message: 'Are you sure you want to delete model?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            axios.delete(constants.ENGINEER_DELETE_MODEL_IMAGE + "/" + id).then((response) => {
                if (response.status === 200) {
                    getAllModelImges();
                    toast.add({ severity: 'success', summary: 'Delete Model Image', detail: 'Delete success.', life: 3000 });
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

const deletePlanImage = (id) => {
    confirm.require({
        message: 'Are you sure you want to delete plan?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            axios.delete(constants.ENGINEER_DELETE_PLAN_IMAGE + "/" + id).then((response) => {
                if (response.status === 200) {
                    getAllPlanImages();
                    toast.add({ severity: 'success', summary: 'Delete Plan Image', detail: 'Delete success.', life: 3000 });
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
                                <Button label="Upload plan" icon="pi pi-file" severity="success" class=""
                                    @click="uploadPlanOpen(slotProps.data.id)" />
                            </div>
                            <div v-else>
                                <Tag value="PAYMENT PENDING" severity="warning" />
                            </div>
                        </template>
                    </Column>
                    <Column header="3D model payment" style="min-width:12rem">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.threeDModelAmountPaid === true">
                                <Button label="Upload Model" icon="pi pi-file" severity="success" class=""
                                    @click="uploadModelOpen(slotProps.data.id)" />
                            </div>
                            <div v-else>
                                <Tag value="PAYMENT PENDING" severity="warning" />
                            </div>
                        </template>
                    </Column>
                    <Column header="Status" style="min-width:12rem">
                        <template #body="slotProps">
                            <Button :disabled="checkUpdateButtonDisable(slotProps)" label="Update details"
                                icon="pi pi-plus" severity="success" class="" @click="openNew(slotProps.data.id)" />
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
                    <InputNumber id="name" v-model.trim="planAmount" required="true" autofocus
                        :invalid="errorPlanAmount" />
                    <small class="p-error" v-if="errorPlanAmount">Plan amount must be greater than or equal to
                        100</small>
                </div>
                <div class="field">
                    <label for="name">3D Model amount</label>
                    <InputNumber id="name" v-model.trim="threeDModelAmount" required="true" autofocus
                        :invalid="errorThreeDModel" />
                    <small class="p-error" v-if="errorThreeDModel">3D Model amount must be greater than or equal to
                        100</small>
                </div>
                <!-- <div class="field">
                    <label for="name">Plan estimation (days)</label>
                    <InputNumber id="name" v-model.trim="planEstimation" required="true" autofocus
                        :invalid="errorPlanEstimation" />
                    <small class="p-error" v-if="errorPlanEstimation">Timeline must be greater than or equal to
                        1.</small>
                </div>
                <div class="field">
                    <label for="name">3D Model estimation</label>
                    <InputNumber id="name" v-model.trim="projectTimeline" required="true" autofocus
                        :invalid="errroThreeDMOdelEstimation" />
                    <small class="p-error" v-if="errorProjectTimeline">Timeline must be greater than or equal to
                        1.</small>
                </div> -->
                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                    <Button label="Save" icon="pi pi-check" text @click="saveProject" />
                </template>
            </Dialog>

            <Dialog v-model:visible="uploadPlan" :style="{ width: '450px' }" header="Upload plan" :modal="true"
                class="p-fluid">
                <div class="field card flex justify-content-center">
                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload
                        @uploader="uploadPlanImage" />
                </div>
            </Dialog>

            <Dialog v-model:visible="uploadModel" :style="{ width: '450px' }" header="Upload plan" :modal="true"
                class="p-fluid">
                <div class="field card flex justify-content-center">
                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload
                        @uploader="uploadModelImage" />
                </div>
            </Dialog>

        </div>


        <div class="plans" v-if="dataTable === 'plans'">
            <div class="card">
                <DataTable :value="planImages" scrollable scrollHeight="600px">
                    <Toast />
                    <ConfirmDialog></ConfirmDialog>
                    <Column field="name" header="Project Name" style="min-width:12rem"></Column>
                    <Column field="type" header="Type" style="min-width:12rem"></Column>
                    <Column header="Status" style="min-width:12rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.status" severity="warning" />
                        </template>
                    </Column>
                    <Column field="reason" header="Reason" style="min-width:12rem"></Column>
                    <Column :exportable="false" header="image" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button label="Show Image" @click="visible = true" />
                            <Dialog v-model:visible="visible" modal header="Image" :style="{ width: '50rem' }"
                                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                                <p class="mb-5">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </Dialog>
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                @click="deletePlanImage(slotProps.data.imageId)"
                                :disabled="slotProps.data.status == PENDING" />
                        </template>
                    </Column>
                    <template #footer> In total there are {{ planImages ? planImages.length : 0 }} jobs.
                    </template>
                </DataTable>
            </div>
        </div>

        <div class="plans" v-if="dataTable === 'models'">
            <div class="card">
                <DataTable :value="modelImages" scrollable scrollHeight="600px">
                    <Toast />
                    <ConfirmDialog></ConfirmDialog>
                    <Column field="name" header="Project Name" style="min-width:12rem"></Column>
                    <Column field="type" header="Type" style="min-width:12rem"></Column>
                    <Column header="Status" style="min-width:12rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.status" severity="warning" />
                        </template>
                    </Column>
                    <Column field="reason" header="Reason" style="min-width:12rem"></Column>
                    <Column :exportable="false" header="image" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button label="Show Image" @click="visible = true" />
                            <Dialog v-model:visible="visible" modal header="Image" :style="{ width: '50rem' }"
                                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                                <p class="mb-5">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </Dialog>
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                @click="deleteModelImage(slotProps.data.imageId)"
                                :disabled="slotProps.data.status == PENDING" />
                        </template>
                    </Column>
                    <template #footer> In total there are {{ modelImages ? modelImages.length : 0 }} jobs.
                    </template>
                </DataTable>
            </div>
        </div>

    </div>

</template>
