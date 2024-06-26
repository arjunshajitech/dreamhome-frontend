<script setup>
import { ref, onMounted, computed, watch } from 'vue';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import axios from 'axios';
import constants from '../../constant/const'
import EngineerRegister from '@/views/engineer/EngineerRegister.vue';

axios.defaults.withCredentials = true;
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const dataTable = ref('jobs')
const productDialog = ref(false);
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
const viewModelImage = ref(false);
const viewPlanImage = ref(false);
const engineerActive = ref('');
const siteImages = ref([])



const getAllJobs = () => {
    axios.get(constants.ENGINEER_JOBS).then((response) => {
        if (response.status === 200) {
            jobs.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

const getAllSiteImages = () => {
    axios.get("http://localhost:3000/api/v1/engineer/site/image/all").then((response) => {
        if (response.status === 200) {
            siteImages.value = response.data;
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

const getProfile = () => {
    axios.get(constants.ENGINEER_PROFILE).then((res) => {
        loggedUserName.value = res.data.name;
        if (res.data.active) engineerActive.value = 'ACTIVE'
        else engineerActive.value = 'NOT ACTIVE'
    }).catch((error) => {
        console.error(error)
        router.push('/engineer')
    });
}

getProfile();
getAllJobs();
getAllModelImges();
getAllPlanImages();
getAllSiteImages();


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

const activeEngineer = () => {
    if (engineerActive.value === 'ACTIVE') {
        axios.post(constants.ENGINEER_ACTIVE + "/" + false).then((response) => {
            if (response.status === 200) {
                getProfile();
                toast.add({ severity: 'success', summary: 'Status', detail: 'Not active updated.', life: 3000 });
            }
        }).catch((error) => {
            console.error(error);
        });
    } else {
        axios.post(constants.ENGINEER_ACTIVE + "/" + true).then((response) => {
            if (response.status === 200) {
                getProfile();
                toast.add({ severity: 'success', summary: 'Status', detail: 'Active updated.', life: 3000 });
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

const items = ref([
    {
        separator: true
    },
    {
        label: 'Menu',
        items: [
            {
                label: 'Assigned Jobs',
                icon: 'pi pi-receipt',
                badge: computed(() => jobs.value.length),
                command: () => {
                    getAllJobs();
                    changeDataTable('jobs');
                }
            },
            {
                label: 'Plan images',
                icon: 'pi pi-eject',
                badge: computed(() => planImages.value.length),
                command: () => {
                    getAllPlanImages();
                    changeDataTable('plans');
                }
            },
            {
                label: '3D Model images',
                icon: 'pi pi-objects-column',
                badge: computed(() => modelImages.value.length),
                command: () => {
                    getAllModelImges();
                    changeDataTable('models');
                }
            },
            {
                label: 'Site Images',
                icon: 'pi pi-objects-column',
                badge: computed(() => siteImages.value.length),
                command: () => {
                    getAllSiteImages();
                    changeDataTable('site');
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
            {
                label: computed(() => engineerActive.value),
                icon: 'pi pi-thumbtack',
                command: () => {
                    activeEngineer();
                }
            },
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

const planGetSeverity = (status) => {
    console.log(status);
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
}

const modelGetSeverity = (status) => {
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
}

const downloadReceipt = (id, type) => {
    axios.get(constants.ENGINEER_DOWNLOAD_RECIEPT + "/" + id + "/" + type).then((response) => {
        if (response.status === 200) {
            var pdfUrl = constants.BASE_URL + "/engineer/download/pdf/" + id + "/" + type;
            var link = document.createElement('a');
            link.href = pdfUrl;
            link.download = "payment_reciept.pdf"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }).catch((error) => {
        console.error(error);
    });
}

const viewImage = () => {
    viewPlanImage.value = true
}

const downloadModelImage = (id) => {
    axios.get(constants.ENGINEER_DOWNLOAD_MODEL + "/" + id).then((response) => {
        if (response.status === 200) {
            getAllModelImges();
            var imageUrl = constants.BASE_URL + "/engineer/download/model/" + id;
            console.log(imageUrl);
            var link = document.createElement('a');
            link.href = imageUrl;
            link.download = "model.jpg"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }).catch((error) => {
        console.error(error);
    });
};

const downloadPlanImage = (id) => {
    axios.get(constants.ENGINEER_DOWNLOAD_PLAN + "/" + id).then((response) => {
        if (response.status === 200) {
            getAllPlanImages();
            var imageUrl = constants.BASE_URL + "/engineer/download/plan/" + id;
            console.log(imageUrl);
            var link = document.createElement('a');
            link.href = imageUrl;
            link.download = "plan.jpg"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }).catch((error) => {
        console.error(error);
    });
};

const siteProgress = ref(false);
const siteText = ref('')
const errorSiteText = ref(false);
const siteId = ref('')

const openSiteProgress = (id) => {
    siteProgress.value = true;
    siteId.value = id;
}

const validateSite = () => {
    if (siteText.value === null || siteText.value === '') {
        errorSiteText.value = true;
        return true;
    } else errorSiteText.value = false;
    return false;
}

const uploadSiteImage = async (event) => {

    if (validateSite()) return;

    let projectId = siteId.value;
    const file = event.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post("http://localhost:3000/api/v1/engineer/site/" + projectId + "/" + siteText.value, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        if (response.status === 200) {
            errorSiteText.value = false;
            siteText.value = '';
            siteProgress.value = false;
            getAllSiteImages();
            toast.add({ severity: 'success', summary: 'Site Image', detail: 'Upload success.', life: 3000 });
        }
    }).catch((error) => {
        console.error(error);
    });
};

const closeSiteProgress = () => {
    errorSiteText.value = false;
    siteText.value = '';
    siteProgress.value = false;
}

const timeLine = ref(false)
const timeLineType = ref('')
const timeLineDays = ref('1')
const errorTimeLineType = ref(false)
const errorTimeLineDays = ref(false);
const tProjectId = ref('')
const openTimeLine = (id) => {
    timeLine.value = true;
    tProjectId.value = id;
}
const closeTimeLine = () => {
    tProjectId.value = ''
    timeLineDays.value = '1'
    timeLineType.value = ''
    errorTimeLineDays.value = false;
    errorTimeLineType.value = false;
    timeLine.value = false;
}

const validTimeLine = () => {
    if (timeLineType.value === null || timeLineType.value === '') {
        errorTimeLineType.value = true;
        return true;
    } else errorTimeLineType.value = false;

    if (timeLineDays.value === null || timeLineDays.value === '' || parseInt(timeLineDays.value) <= 0) {
        errorTimeLineDays.value = true;
        return true;
    } else errorTimeLineDays.value = false;
    return false;
}

const saveTimeLine = () => {
    if (validTimeLine()) return;
    const data = {
        projectId: tProjectId.value,
        type: timeLineType.value,
        days: timeLineDays.value
    }
    console.log(data);
    axios.post("http://localhost:3000/api/v1/client/timeline", data).then((response) => {
        if (response.status === 200) {
            // Reset form values or perform other actions
            tProjectId.value = '';
            timeLineDays.value = '1';
            timeLineType.value = '';
            errorTimeLineDays.value = false;
            errorTimeLineType.value = false;
            timeLine.value = false;

            // Show success message
            toast.add({ severity: 'success', summary: 'Timeline', detail: 'Timeline updated.', life: 3000 });
        }
    })
        .catch((error) => {
            console.error(error);
        });
}

const deleteSiteImages = (id) => {
    confirm.require({
        message: 'Are you sure you want to delete site?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            axios.delete("http://localhost:3000/api/v1/engineer/site/" + id).then((response) => {
                if (response.status === 200) {
                    getAllSiteImages();
                    toast.add({ severity: 'success', summary: 'Delete Site Image', detail: 'Delete success.', life: 3000 });
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have cancelled', life: 3000 });
        }
    });
}

const downloadSiteImage = (id) => {
    axios.get("http://localhost:3000/api/v1/engineer/download/site/" + id).then((response) => {
        if (response.status === 200) {
            getAllSiteImages();
            var imageUrl = constants.BASE_URL + "/engineer/download/site/" + id;
            var link = document.createElement('a');
            link.href = imageUrl;
            link.download = "model.jpg"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }).catch((error) => {
        console.error(error);
    });
}

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
                    <!-- <Column field="timeline" header="Timeline" style="min-width:12rem">
                        <template #body="slotProps">
                            <span>{{ slotProps.data.timeline }} days</span>
                        </template>
                    </Column> -->
                    <Column header="Plan payment" style="min-width:12rem">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.planAmountPaid === true">
                                <Button label="Plan" icon="pi pi-file" severity="success" class=""
                                    @click="uploadPlanOpen(slotProps.data.id)" />
                                <Button class="ml-3" v-if="slotProps.data.planAmountPaid === true"
                                    @click="downloadReceipt(slotProps.data.id, 'PLAN')" icon="pi pi-receipt" outlined
                                    rounded severity="success" />
                            </div>
                            <div v-else>
                                <Tag value="PAYMENT PENDING" severity="warning" />
                            </div>
                        </template>
                    </Column>
                    <!-- <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button v-if="slotProps.data.planAmountPaid === true"
                                @click="downloadReceipt(slotProps.data.id, 'PLAN')" icon="pi pi-receipt" outlined
                                rounded severity="success" />
                        </template>
                    </Column> -->
                    <Column header="3D model payment" style="min-width:12rem">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.threeDModelAmountPaid === true">
                                <Button label="Model" icon="pi pi-file" severity="success" class=""
                                    @click="uploadModelOpen(slotProps.data.id)" />

                                <Button class="ml-3" v-if="slotProps.data.threeDModelAmountPaid === true"
                                    @click="downloadReceipt(slotProps.data.id, '3D MODEL')" icon="pi pi-receipt"
                                    outlined rounded severity="success" />
                            </div>
                            <div v-else>
                                <Tag value="PAYMENT PENDING" severity="warning" />
                            </div>
                        </template>
                    </Column>
                    <!-- <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button v-if="slotProps.data.threeDModelAmountPaid === true"
                                @click="downloadReceipt(slotProps.data.id, '3D MODEL')" icon="pi pi-receipt" outlined
                                rounded severity="success" />
                        </template>
                    </Column> -->
                    <Column header="Update Amount" style="min-width:12rem">
                        <template #body="slotProps">
                            <Button :disabled="checkUpdateButtonDisable(slotProps)" label="Amount" icon="pi pi-plus"
                                severity="success" class="" @click="openNew(slotProps.data.id)" />
                        </template>
                    </Column>
                    <Column header="Timeline update" style="min-width:12rem">
                        <template #body="slotProps">
                            <Button :disabled="!slotProps.data.planAmountPaid && !slotProps.data.threeDModelAmountPaid"
                                label="Timeline" icon="pi pi-plus" severity="success" class=""
                                @click="openTimeLine(slotProps.data.id)" />
                        </template>
                    </Column>
                    <Column header="Site Progress" style="min-width:12rem">
                        <template #body="slotProps">
                            <Button :disabled="!slotProps.data.planAmountPaid && !slotProps.data.threeDModelAmountPaid"
                                label="Progress" icon="pi pi-plus" severity="success" class=""
                                @click="openSiteProgress(slotProps.data.id)" />
                        </template>
                    </Column>
                    <!-- <Column header="Update Site details" style="min-width:12rem">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.planAmountPaid === true">
                                <Button label="Site Status" icon="pi pi-file" severity="success" class=""
                                    @click="uploadPlanOpen(slotProps.data.id)" />
                            </div>
                        </template>
                    </Column> -->
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

        <div class="plans" v-if="dataTable === 'site'">
            <div class="card">
                <DataTable :value="siteImages" scrollable scrollHeight="600px">
                    <Toast />
                    <ConfirmDialog></ConfirmDialog>
                    <Column field="projectId" header="Project Id" style="min-width:12rem"></Column>
                    <Column field="projectName" header="Project Name" style="min-width:12rem"></Column>
                    <Column field="text" header="Message" style="min-width:12rem"></Column>
                    <!-- <Column header="Status" style="min-width:12rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.status" :severity="planGetSeverity(slotProps.data.status)" />
                        </template>
                    </Column>
                    <Column field="reason" header="Reason" style="min-width:12rem"></Column> -->
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-download" outlined rounded severity="success"
                                @click="downloadSiteImage(slotProps.data.imageId)" />
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                @click="deleteSiteImages(slotProps.data.imageId)" />
                        </template>
                    </Column>
                    <template #footer> In total there are {{ siteImages ? siteImages.length : 0 }} site images.
                    </template>
                </DataTable>
            </div>
        </div>


        <div class="plans" v-if="dataTable === 'plans'">
            <div class="card">
                <DataTable :value="planImages" scrollable scrollHeight="600px">
                    <Toast />
                    <ConfirmDialog></ConfirmDialog>
                    <Column field="projectName" header="Project Name" style="min-width:12rem"></Column>
                    <Column field="type" header="Type" style="min-width:12rem"></Column>
                    <Column header="Status" style="min-width:12rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.status" :severity="planGetSeverity(slotProps.data.status)" />
                        </template>
                    </Column>
                    <Column field="reason" header="Reason" style="min-width:12rem"></Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-download" outlined rounded severity="success"
                                @click="downloadPlanImage(slotProps.data.imageId)" />
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                @click="deletePlanImage(slotProps.data.imageId)"
                                :disabled="slotProps.data.status === 'APPROVED'" />
                        </template>
                    </Column>
                    <template #footer> In total there are {{ planImages ? planImages.length : 0 }} plan images.
                    </template>
                </DataTable>
            </div>
        </div>

        <div class="plans" v-if="dataTable === 'models'">
            <div class="card">
                <DataTable :value="modelImages" scrollable scrollHeight="600px">
                    <Toast />
                    <ConfirmDialog></ConfirmDialog>
                    <Column field="projectName" header="Project Name" style="min-width:12rem"></Column>
                    <Column field="type" header="Type" style="min-width:12rem"></Column>
                    <Column header="Status" style="min-width:12rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.status" :severity="modelGetSeverity(slotProps.data.status)" />
                        </template>
                    </Column>
                    <Column field="reason" header="Reason" style="min-width:12rem"></Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-download" outlined rounded severity="success"
                                @click="downloadModelImage(slotProps.data.imageId)"
                                :disabled="slotProps.data.status == PENDING" />
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                @click="deleteModelImage(slotProps.data.imageId)"
                                :disabled="slotProps.data.status === 'APPROVED'" />
                        </template>
                    </Column>
                    <template #footer> In total there are {{ modelImages ? modelImages.length : 0 }} model images.
                    </template>
                </DataTable>
            </div>
        </div>


        <Dialog v-model:visible="timeLine" :style="{ width: '450px' }" header="Update Timeline" :modal="true"
            class="p-fluid">
            <div class="field">
                <label for="name">Timeline Type</label>
                <InputText id="name" v-model.trim="timeLineType" required="true" autofocus :invalid="errorTimeLineType"
                    placeholder="flooring, painting etc.." />
                <small class="p-error" v-if="errorTimeLineType">Invalid Timeline Type</small>
            </div>
            <div class="field">
                <label for="name">Days</label>
                <InputNumber id="name" v-model.trim="timeLineDays" required="true" autofocus
                    :invalid="errorTimeLineDays" />
                <small class="p-error" v-if="errorTimeLineDays">Days must be greater than or equal to
                    1</small>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="closeTimeLine" />
                <Button label="Save" icon="pi pi-check" text @click="saveTimeLine" />
            </template>
        </Dialog>

        <Dialog v-model:visible="siteProgress" :style="{ width: '450px' }" header="Update Timeline" :modal="true"
            class="p-fluid">
            <div class="field">
                <label for="name">Site Progress Heading</label>
                <InputText id="name" v-model.trim="siteText" required="true" autofocus :invalid="errorSiteText"
                    placeholder="flooring completed etc..." />
                <small class="p-error" v-if="errorSiteText">Invalid Site Progress Heading</small>
            </div>
            <div class="field card flex justify-content-center">
                <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload
                    @uploader="uploadSiteImage" />
            </div>
            <!-- <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="closeTimeLine" />
                <Button label="Save" icon="pi pi-check" text @click="saveTimeLine" />
            </template> -->
        </Dialog>

    </div>

</template>
