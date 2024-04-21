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
const dataTable = ref('projects')
const productDialog = ref(false);
const deleteProductsDialog = ref(false);
const project = ref({});
const submitted = ref(false);
const allProjects = ref([]);
const loggedUserName = ref('')
const planImages = ref([]);
const modelImages = ref([]);
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
const rejectPlanPopup = ref(false);
const planReason = ref('')
const errorPlanReason = ref(false);
const rejectPlanId = ref('');
const rejectModelId = ref('')
const modelReason = ref('')
const errorModelReason = ref(false);
const rejectModelPopup = ref(false);

const feedbackContent = ref('')
const feedbackRaiting = ref('')
const errorRaiting = ref(false)
const errorContent = ref(false)
const feedbackEngineerId = ref('')
const feedbackClientId = ref('')
const feedback = ref(false);

const modelPaymentDilog = ref(false);
const planPaymentDilog = ref(false);
const modelPaymentMethod = ref('')
const planPaymentMethod = ref('')
const modelPaymentCardNumber = ref('')
const planPaymentCardNumber = ref('')
const errorModelPaymentMethod = ref(false);
const errorPlanPaymentMethod = ref(false);
const errorModelCardNumber = ref(false);
const errorPlanCardNumber = ref(false);
const modelPaymentProjectId = ref('')
const modelPaymentAmount = ref('')
const planPyamentProjectId = ref('')
const planPyamentAmount = ref('')


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
                badge: computed(() => allProjects.value.length),
                command: () => {
                    getAllProjects();
                    changeDataTable('projects');
                }
            },
            {
                label: 'Plans',
                icon: 'pi pi-eject',
                badge: computed(() => planImages.value.length),
                command: () => {
                    getAllPlanImages();
                    changeDataTable('plans');
                }
            },
            {
                label: '3D Models',
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

const paymentMethod = ref([
    {
        label: 'CREDIT CARD', value: 'CREDIT_CARD'
    },
    {
        label: 'DEBIT CARD', value: 'DEBIT_CARD'
    }
])

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


const raiting = ref([
    {
        label: 'GOOD', value: 'GOOD'
    },
    {
        label: 'BAD', value: 'BAD'
    },
    {
        label: 'AVERAGE', value: 'AVERAGE'
    }
])


const openFeedback = (id, engId) => {
    feedbackClientId.value = id;
    feedbackEngineerId.value = engId;
    feedback.value = true;
    feedbackContent.value = ''
    feedbackRaiting.value = ''
}

const closeFeedback = () => {
    feedbackClientId.value = '';
    feedbackEngineerId.value = '';
    feedback.value = false
}

const validateFeedback = () => {
    if (feedbackContent.value === '' || feedbackContent.value === null) {
        errorContent.value = true;
        return true;
    } else errorContent.value = false;
    if (feedbackRaiting.value === '' || feedbackRaiting.value === null) {
        errorRaiting.value = true;
        return true;
    } else errorRaiting.value = false;
    return false;
}

const submitFeedback = () => {
    if (validateFeedback()) return;

    axios.post(constants.CLIENT_POST_FEEDBACK, {
        content: feedbackContent.value,
        raiting: feedbackRaiting.value.value,
        engineerId: feedbackEngineerId.value,
        projectId: feedbackClientId.value
    }).then((response) => {
        if (response.status === 200) {
            feedback.value = false;
            toast.add({ severity: 'success', summary: 'Feedback', detail: 'Submitted.', life: 3000 });
        }
    }).catch((error) => {
        console.error(error);
    });
}

const getProfile = () => {
    axios.get(constants.CLIENT_PROFILE_URL).then((res) => {
        loggedUserName.value = res.data.name;
    }).catch((error) => {
        console.error(error)
        router.push('/')
    });
}

const getAllProjects = () => {
    axios.get(constants.CLIENT_GET_PROJECT).then((response) => {
        if (response.status === 200) {
            allProjects.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

const getAllPlanImages = () => {
    axios.get(constants.CLIENT_ALL_PLAN_IMAGES).then((response) => {
        if (response.status === 200) {
            planImages.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

const getAllModelImges = () => {
    axios.get(constants.CLIENT_ALL_MODEL_IMAGES).then((response) => {
        if (response.status === 200) {
            modelImages.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

getProfile();
getAllProjects();
getAllModelImges();
getAllPlanImages();


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

const changeDataTable = (data) => {
    dataTable.value = data;
}

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


const saveProject = () => {

    if (validateSaveProject()) return;

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
            clearCreateProject();
            toast.add({ severity: 'success', summary: 'Create project', detail: 'New Project created.', life: 3000 });
        }
    }).catch((error) => {
        if (error.response.status === 401)
            toast.add({ severity: 'error', summary: 'Create project', detail: 'Project already exists.', life: 3000 });
        else
            toast.add({ severity: 'warn', summary: 'Create project', detail: 'Something went wrong.', life: 3000 });
        console.error(error);
    });
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

const logout = () => {
    axios.get(constants.CLIENT_LOGOUT).then((response) => {
        if (response.status === 200)
            router.push('/')
    }).catch((error) => { console.error(error) });
}

const payPlan = (id, planAmount) => {
    planPaymentDilog.value = true;
    planPyamentAmount.value = planAmount;
    planPyamentProjectId.value = id;
    // confirm.require({
    //     message: 'Are you sure you want to pay?',
    //     header: 'Dummy Plan Payment',
    //     icon: 'pi pi-exclamation-triangle',
    //     rejectClass: 'p-button-secondary p-button-outlined',
    //     rejectLabel: 'Cancel',
    //     acceptLabel: 'Pay ₹' + planAmount,
    //     accept: () => {
    //         axios.post(constants.CLIENT_PAY_PLAN + "/" + id).then((response) => {
    //             if (response.status === 200) {
    //                 getAllProjects();
    //                 toast.add({ severity: 'success', summary: 'Dummy Payment', detail: 'Payment success.', life: 3000 });
    //             }
    //         }).catch((error) => {
    //             console.error(error);
    //         });
    //     },
    //     reject: () => {
    //         toast.add({ severity: 'info', summary: 'Dummy payment', detail: 'You have cancelled', life: 3000 });
    //     }
    // });
};

const modelPayment = (id, modelAmount) => {
    modelPaymentDilog.value = true;
    modelPaymentAmount.value = modelAmount;
    modelPaymentProjectId.value = id;
    // confirm.require({
    //     message: 'Are you sure you want to pay?',
    //     header: 'Dummy 3D Model Payment',
    //     icon: 'pi pi-exclamation-triangle',
    //     rejectClass: 'p-button-secondary p-button-outlined',
    //     rejectLabel: 'Cancel',
    //     acceptLabel: 'Pay ₹' + modelAmount,
    //     accept: () => {
    //         axios.post(constants.CLIENT_PAY_MODEL + "/" + id).then((response) => {
    //             if (response.status === 200) {
    //                 getAllProjects();
    //                 toast.add({ severity: 'success', summary: 'Dummy Payment', detail: 'Payment success.', life: 3000 });
    //             }
    //         }).catch((error) => {
    //             console.error(error);
    //         });
    //     },
    //     reject: () => {
    //         toast.add({ severity: 'info', summary: 'Dummy payment', detail: 'You have cancelled', life: 3000 });
    //     }
    // });
};

const downloadModelImage = (id) => {
    axios.get(constants.CLIENT_DOWNLOAD_MODEL + "/" + id).then((response) => {
        if (response.status === 200) {
            getAllModelImges();
            var imageUrl = constants.BASE_URL + "/client/download/model/" + id;
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
    axios.get(constants.CLIENT_DOWNLOAD_PLAN + "/" + id).then((response) => {
        if (response.status === 200) {
            getAllPlanImages();
            var imageUrl = constants.BASE_URL + "/client/download/plan/" + id;
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


const approvePlan = (id) => {
    confirm.require({
        message: 'Are you sure you want to approve?',
        header: 'Approve plan',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Approve',
        accept: () => {
            axios.post(constants.CLIENT_PLAN_APPROVE, {
                id: id,
                approve: true,
                reason: ''
            }).then((response) => {
                if (response.status === 200) {
                    getAllPlanImages();
                    toast.add({ severity: 'success', summary: 'Approve plan', detail: 'Approved Success.', life: 3000 });
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Approve plan', detail: 'You have cancelled', life: 3000 });
        }
    });
};

const approveModel = (id) => {
    confirm.require({
        message: 'Are you sure you want to approve?',
        header: 'Approve model',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Approve',
        accept: () => {
            axios.post(constants.CLIENT_MODEL_APPROVE, {
                id: id,
                approve: true,
                reason: ''
            }).then((response) => {
                if (response.status === 200) {
                    getAllModelImges();
                    toast.add({ severity: 'success', summary: 'Approve model', detail: 'Approved Success.', life: 3000 });
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Approve model', detail: 'You have cancelled', life: 3000 });
        }
    });
};

const closePlanPayment = () => {
    planPaymentDilog.value = false;
    planPyamentAmount.value = ''
    planPaymentCardNumber.value = ''
    planPyamentProjectId.value = ''
    planPaymentMethod.value = ''
    errorPlanCardNumber.value = false
    errorPlanPaymentMethod.value = false;
}

const closeModelPayment = () => {
    modelPaymentDilog.value = false;
    modelPaymentAmount.value = ''
    modelPaymentCardNumber.value = ''
    modelPaymentProjectId.value = ''
    modelPaymentMethod.value = ''
    errorModelCardNumber.value = false
    errorModelPaymentMethod.value = false;
}

const validateNumber = (value) => {
    return (!isNaN(value) && value >= 0)
}

const isValidCardNumber = (input) => {
    var regex = /^\d{12}$/;
    return regex.test(input);
}

const validateModelPayment = () => {
    if (modelPaymentMethod.value === null || modelPaymentMethod.value === '') {
        errorModelPaymentMethod.value = true;
        return true;
    } else errorModelPaymentMethod.value = false;

    if (modelPaymentCardNumber.value === null || modelPaymentCardNumber.value === '' ||
        !isValidCardNumber(modelPaymentCardNumber.value) ||
        !validateNumber(modelPaymentCardNumber.value)) {
        errorModelCardNumber.value = true;
        return true;
    } else errorModelCardNumber.value = false;

    return false;
}

const validatePlanPayment = () => {
    if (planPaymentMethod.value === null || planPaymentMethod.value === '') {
        errorPlanPaymentMethod.value = true;
        return true;
    } else errorModelPaymentMethod.value = false;

    if (planPaymentCardNumber.value === null || planPaymentCardNumber.value === '' ||
        !isValidCardNumber(planPaymentCardNumber.value) ||
        !validateNumber(planPaymentCardNumber.value)) {
        errorPlanCardNumber.value = true;
        return true;
    } else errorPlanCardNumber.value = false;

    return false;
}

const submitPlanPayment = () => {

    if (validatePlanPayment()) return;

    const url = constants.CLIENT_PAY_PLAN + "/" + planPyamentProjectId.value + `?method=${planPaymentMethod.value.value}&cardNumber=${planPaymentCardNumber.value}`
    axios.post(url).then((response) => {
        if (response.status === 200) {
            planPaymentDilog.value = false;
            planPyamentAmount.value = ''
            planPaymentCardNumber.value = ''
            planPyamentProjectId.value = ''
            planPaymentMethod.value = ''
            errorPlanCardNumber.value = false
            errorPlanPaymentMethod.value = false;
            getAllProjects();
            toast.add({ severity: 'success', summary: 'Plan Payment', detail: 'Payment success.', life: 3000 });
        }
    }).catch((error) => {
        console.error(error);
    });
}

const submitModelPayment = () => {


    if (validateModelPayment()) return;

    const url = constants.CLIENT_PAY_MODEL + "/" + modelPaymentProjectId.value + `?method=${modelPaymentMethod.value.value}&cardNumber=${modelPaymentCardNumber.value}`
    axios.post(url).then((response) => {
        if (response.status === 200) {
            modelPaymentDilog.value = false;
            modelPaymentAmount.value = ''
            modelPaymentCardNumber.value = ''
            modelPaymentProjectId.value = ''
            modelPaymentMethod.value = ''
            errorModelCardNumber.value = false
            errorModelPaymentMethod.value = false;
            getAllProjects();
            toast.add({ severity: 'success', summary: 'Model Payment', detail: 'Payment success.', life: 3000 });
        }
    }).catch((error) => {
        console.error(error);
    });
}

const rejectPlanPoupOpen = (id) => {
    rejectPlanPopup.value = true;
    rejectPlanId.value = id;
    planReason.value = ''
}

const rejectPlanPoupClose = () => {
    rejectPlanPopup.value = false;
    rejectPlanId.value = '';
}

const rejectModelPoupOpen = (id) => {
    rejectModelPopup.value = true;
    rejectModelId.value = id;
    modelReason.value = ''
}

const rejectModelPoupClose = () => {
    rejectModelPopup.value = false;
    rejectModelId.value = '';
}

const rejectModel = () => {
    axios.post(constants.CLIENT_MODEL_APPROVE, {
        id: rejectModelId.value,
        approve: false,
        reason: modelReason.value
    }).then((response) => {
        if (response.status === 200) {
            getAllModelImges();
            rejectModelPopup.value = false;
            rejectModelId.value = '';
            modelReason.value = '';
            toast.add({ severity: 'success', summary: 'Reject model', detail: 'Rejected Success.', life: 3000 });
        }
    }).catch((error) => {
        console.error(error);
    });
};

const rejectPlan = () => {
    axios.post(constants.CLIENT_PLAN_APPROVE, {
        id: rejectPlanId.value,
        approve: false,
        reason: planReason.value
    }).then((response) => {
        if (response.status === 200) {
            getAllPlanImages();
            rejectPlanPopup.value = false;
            rejectPlanId.value = '';
            planReason.value = '';
            toast.add({ severity: 'success', summary: 'Reject Plan', detail: 'Rejected Success.', life: 3000 });
        }
    }).catch((error) => {
        console.error(error);
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
    axios.get(constants.CLIENT_DOWNLOAD_RECIEPT + "/" + id + "/" + type).then((response) => {
        if (response.status === 200) {
            var pdfUrl = constants.BASE_URL + "/client/download/pdf/" + id + "/" + type;
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


        <div class="plans" v-if="dataTable === 'projects'">
            <div class="card">
                <Toolbar class="mb-4">
                    <template #start>
                        <Button label="Create" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew()" />
                    </template>

                    <!-- <template #end>
                                <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                            </template> -->
                </Toolbar>
                <DataTable :value="allProjects" scrollable scrollHeight="600px">
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
                            <div v-else-if="slotProps.data.planAmount != 0">
                                <Button label="Pay" severity="success" :disabled="false"
                                    @click="payPlan(slotProps.data.id, slotProps.data.planAmount)" outlined />
                            </div>
                            <div v-else>
                                <Tag value="PAYMENT PENDING" severity="warning" />
                            </div>
                        </template>
                    </Column>
                    <Column :exportable="false" style="">
                        <template #body="slotProps">
                            <Button v-if="slotProps.data.planAmountPaid === true"
                                @click="downloadReceipt(slotProps.data.id,'PLAN')" icon="pi pi-receipt"
                                outlined rounded severity="success" />
                        </template>
                    </Column>
                    <Column header="3D model payment" style="min-width:12rem">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.threeDModelAmountPaid === true">
                                <Tag value="PAYMENT SUCCESS" severity="success" />
                            </div>
                            <div v-else-if="slotProps.data.threeDModelAmount != 0">
                                <!-- <Button label="Pay" severity="success" :disabled="false"
                                    @click="modelPayment(slotProps.data.id, slotProps.data.threeDModelAmount)"
                                    outlined /> -->
                                <Button label="Pay" severity="success" :disabled="false"
                                    @click="modelPayment(slotProps.data.id, slotProps.data.threeDModelAmount)"
                                    outlined />
                            </div>
                            <div v-else>
                                <Tag value="PAYMENT PENDING" severity="warning" />
                            </div>
                        </template>
                    </Column>
                    <Column :exportable="false" style="">
                        <template #body="slotProps">
                            <Button v-if="slotProps.data.threeDModelAmountPaid === true"
                                @click="downloadReceipt(slotProps.data.id,'3D MODEL')" icon="pi pi-receipt"
                                outlined rounded severity="success" />
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
                            <Button icon="pi pi-comments" outlined rounded class="mr-2"
                                @click="openFeedback(slotProps.data.id, slotProps.data.engineerId)"
                                :disabled="slotProps.data.status != 'ASSIGNED'" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                @click="confirmDeleteProduct(slotProps.data.id)"
                                :disabled="checkIsEditDeleteButtonDisable(slotProps.data.status)" />
                        </template>
                    </Column>

                </DataTable>
            </div>

            <Dialog v-model:visible="feedback" :style="{ width: '450px' }" header="Feedback" :modal="true"
                class="p-fluid">
                <div class="field">
                    <label for="description">Feedback</label>
                    <Textarea id="description" :invalid="errorContent" v-model.trim="feedbackContent" required="true"
                        rows="3" cols="20" />
                </div>
                <div class="field">
                    <label for="inventoryStatus" class="mb-3">Raiting Status</label>
                    <Dropdown :invalid="errorRaiting" id="inventoryStatus" v-model="feedbackRaiting" :options="raiting"
                        optionLabel="label" placeholder="Select a raiting status">
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
                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text @click="closeFeedback" />
                    <Button label="Save" icon="pi pi-check" text @click="submitFeedback" />
                </template>
            </Dialog>

            <Dialog v-model:visible="modelPaymentDilog" :style="{ width: '450px' }" header="3D Mode Payment"
                :modal="true" class="p-fluid">
                <div class="field">
                    <label for="name">Amount</label>
                    <InputNumber id="name" v-model.trim="modelPaymentAmount" disabled="true" />
                </div>
                <div class="field">
                    <label for="inventoryStatus" class="mb-3">Payment Method</label>
                    <Dropdown :invalid="errorModelPaymentMethod" id="inventoryStatus" v-model="modelPaymentMethod"
                        :options="paymentMethod" optionLabel="label" placeholder="Select Payment Method">
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
                    <label for="name">Card Number</label>
                    <InputText id="name" :invalid="errorModelCardNumber" v-model.trim="modelPaymentCardNumber" />
                </div>
                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text @click="closeModelPayment" />
                    <Button label="Pay" icon="pi pi-check" text @click="submitModelPayment" />
                </template>
            </Dialog>

            <Dialog v-model:visible="planPaymentDilog" :style="{ width: '450px' }" header="Plan Payment"
                :modal="true" class="p-fluid">
                <div class="field">
                    <label for="name">Amount</label>
                    <InputNumber id="name" v-model.trim="planPyamentAmount" disabled="true" />
                </div>
                <div class="field">
                    <label for="inventoryStatus" class="mb-3">Payment Method</label>
                    <Dropdown :invalid="errorPlanPaymentMethod" id="inventoryStatus" v-model="planPaymentMethod"
                        :options="paymentMethod" optionLabel="label" placeholder="Select Payment Method">
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
                    <label for="name">Card Number</label>
                    <InputText id="name" :invalid="errorPlanCardNumber" v-model.trim="planPaymentCardNumber" />
                </div>
                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text @click="closePlanPayment" />
                    <Button label="Pay" icon="pi pi-check" text @click="submitPlanPayment" />
                </template>
            </Dialog>

            <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Create Project" :modal="true"
                class="p-fluid">
                <div class="field">
                    <label for="name">Project Name</label>
                    <InputText id="name" v-model.trim="projectName" required="true" autofocus
                        :invalid="errorProjectName" />
                    <small class="p-error" v-if="errorProjectName">Project name is required.</small>
                </div>
                <div class="field">
                    <label for="description">Description</label>
                    <Textarea :invalid="errroProjectDescription" id="description" v-model.trim="projectDescription"
                        required="true" rows="3" cols="20" />
                    <small class="p-error" v-if="errroProjectDescription">Description is required.</small>
                </div>

                <div class="field">
                    <label for="inventoryStatus" class="mb-3">Type</label>
                    <Dropdown :invalid="errorProjectType" id="inventoryStatus" v-model="type" :options="projectType"
                        optionLabel="label" placeholder="Select a type">
                        <template #value="slotProps">
                            <div v-if="slotProps.value && slotProps.value.value">
                                <Tag :value="slotProps.value.value" />
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                    </Dropdown>
                    <small class="p-error" v-if="errorProjectType">Type is required.</small>
                </div>

                <div class="field">
                    <label for="inventoryStatus" class="mb-3">Architecture Style</label>
                    <Dropdown :invalid="errorProjectStyle" id="inventoryStatus" v-model="style" :options="projectStyle"
                        optionLabel="label" placeholder="Select a style">
                        <template #value="slotProps">
                            <div v-if="slotProps.value && slotProps.value.value">
                                <Tag :value="slotProps.value.value" />
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                    </Dropdown>
                    <small class="p-error" v-if="errorProjectStyle">Architecture style is required.</small>
                </div>

                <div class="field">
                    <label for="name">Timeline ( Days )</label>
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

            <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="allProjects">Are you sure you want to delete the selected products?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                    <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                </template>
            </Dialog>
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
                    <Column header="Approve">
                        <template #body="slotProps">
                            <Button label="Approve" outlined :disabled="slotProps.data.status != 'PENDING'"
                                @click="approvePlan(slotProps.data.id)" />
                        </template>
                    </Column>
                    <Column header="Reject">
                        <template #body="slotProps">
                            <Button label="Reject" severity="danger" :disabled="slotProps.data.status != 'PENDING'"
                                outlined @click="rejectPlanPoupOpen(slotProps.data.id)" />

                            <Dialog v-model:visible="rejectPlanPopup" :style="{ width: '450px' }"
                                header="Create Project" :modal="true" class="p-fluid">
                                <div class="field">
                                    <label for="description">Reason</label>
                                    <Textarea :invalid="errorPlanReason" id="description" v-model.trim="planReason"
                                        required="true" rows="3" cols="20" />
                                    <small class="p-error" v-if="errorPlanReason">Reason is required.</small>
                                </div>
                                <template #footer>
                                    <Button label="Cancel" icon="pi pi-times" text @click="rejectPlanPoupClose" />
                                    <Button label="Save" icon="pi pi-check" text @click="rejectPlan" />
                                </template>
                            </Dialog>
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-download" outlined rounded severity="success"
                                @click="downloadPlanImage(slotProps.data.imageId)"
                                :disabled="slotProps.data.status == PENDING" />
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
                    <Column header="Approve">
                        <template #body="slotProps">
                            <Button label="Approve" outlined :disabled="slotProps.data.status != 'PENDING'"
                                @click="approveModel(slotProps.data.id)" />
                        </template>
                    </Column>
                    <Column header="Reject">
                        <template #body="slotProps">
                            <Button label="Reject" severity="danger" :disabled="slotProps.data.status != 'PENDING'"
                                outlined @click="rejectModelPoupOpen(slotProps.data.id)" />

                            <Dialog v-model:visible="rejectModelPopup" :style="{ width: '450px' }" header="Reason"
                                :modal="true" class="p-fluid">
                                <div class="field">
                                    <label for="description">Reason</label>
                                    <Textarea :invalid="errorModelReason" id="description" v-model.trim="modelReason"
                                        required="true" rows="3" cols="20" />
                                    <small class="p-error" v-if="errorModelReason">Reason is required.</small>
                                </div>
                                <template #footer>
                                    <Button label="Cancel" icon="pi pi-times" text @click="rejectModelPoupClose" />
                                    <Button label="Save" icon="pi pi-check" text @click="rejectModel" />
                                </template>
                            </Dialog>
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-download" outlined rounded severity="success"
                                @click="downloadModelImage(slotProps.data.imageId)"
                                :disabled="slotProps.data.status == PENDING" />
                        </template>
                    </Column>
                    <template #footer> In total there are {{ modelImages ? modelImages.length : 0 }} model images.
                    </template>
                </DataTable>
            </div>
        </div>

    </div>

</template>
