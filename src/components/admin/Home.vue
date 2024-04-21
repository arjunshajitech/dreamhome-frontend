<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import axios from 'axios';
import constants from '../../constant/const'

axios.defaults.withCredentials = true;
const router = useRouter();
const clients = ref([]);
const engineers = ref([]);
const approvedEngineers = ref([]);
const jobs = ref([]);
const dataTable = ref('client')
const confirm = useConfirm();
const toast = useToast();
const visible = ref(false);
const assingSelectedEngineer = ref('')
const faq = ref([])
const feedback = ref([])

const getAllClients = () => {
    axios.get(constants.ADMIN_GET_ALL_CLIETNS).then((response) => {
        if (response.status === 200) {
            clients.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}
getAllClients();

const getAllEngineers = () => {
    axios.get(constants.ADMIN_GET_ALL_ENGINEERS).then((response) => {
        if (response.status === 200) {
            engineers.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

const getAllApprovedEngineers = () => {
    axios.get(constants.ADMIN_APPROVED_ENGINEERS).then((response) => {
        if (response.status === 200) {
            approvedEngineers.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

const getAllJobs = () => {
    axios.get(constants.ADMIN_GET_JOBS).then((response) => {
        if (response.status === 200) {
            jobs.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

const getAllFaq = () => {
    axios.get(constants.ADMIN_GET_FAQ).then((response) => {
        if (response.status === 200) {
            faq.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

const getAllFeedback = () => {
    axios.get(constants.ADMIN_GET_FEEDBACK).then((response) => {
        if (response.status === 200) {
            feedback.value = response.data;
        }
    }).catch((error) => {
        console.error(error);
    });
}

const approveEngineer = (id) => {
    confirm.require({
        message: 'Are you sure you want to accept?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Accept',
        accept: () => {
            axios.post(constants.ADMIN_APPROVE_ENGINEER, {
                id: id,
                approveOrReject: true
            }).then((response) => {
                if (response.status === 200) {
                    toast.add({ severity: 'success', summary: 'Apprve Engineer', detail: 'You have accepted', life: 3000 });
                    getAllEngineers();
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Approve Engineer', detail: 'You have cancelled', life: 3000 });
        }
    });
};

const rejectEngineer = (id) => {
    confirm.require({
        message: 'Are you sure you want to reject?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Reject',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            axios.post(constants.ADMIN_APPROVE_ENGINEER, {
                id: id,
                approveOrReject: false
            }).then((response) => {
                if (response.status === 200) {
                    toast.add({ severity: 'success', summary: 'Approve Engineer', detail: 'You have rejected', life: 3000 });
                    getAllEngineers();
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Approve Engineer', detail: 'You have cancelled', life: 3000 });
        }
    });
};


const confirm1 = (id) => {
    confirm.require({
        message: 'Are you sure you want to accept?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Accept',
        accept: () => {
            axios.post(constants.ADMIN_APPROVE_CLIENT, {
                id: id,
                approveOrReject: true
            }).then((response) => {
                if (response.status === 200) {
                    toast.add({ severity: 'success', summary: 'Approve Client', detail: 'You have accepted', life: 3000 });
                    getAllClients();
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Approve Client', detail: 'You have cancelled', life: 3000 });
        }
    });
};

const confirm2 = (id) => {
    confirm.require({
        message: 'Are you sure you want to reject?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Reject',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            axios.post(constants.ADMIN_APPROVE_CLIENT, {
                id: id,
                approveOrReject: false
            }).then((response) => {
                if (response.status === 200) {
                    toast.add({ severity: 'success', summary: 'Approve Client', detail: 'You have rejected', life: 3000 });
                    getAllClients();
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Approve Client', detail: 'You have cancelled', life: 3000 });
        }
    });
};

const assingEngineer = (id) => {

    axios.post(constants.ADMIN_ASSIGN_ENGINEER, {
        engineer: assingSelectedEngineer.value,
        projectId: id
    }).then((response) => {
        if (response.status === 200) {
            visible.value = false;
            assingSelectedEngineer.value = '';
            toast.add({ severity: 'success', summary: 'Assing Engineer', detail: 'Engineer assigned', life: 3000 });
            getAllJobs();
            getAllApprovedEngineers();
        }
    }).catch((error) => {
        console.error(error);
    });
}

const isButtonDisabled = (status) => {
    return status !== 'PENDING';
}

onMounted(() => {
    axios.get(constants.ADMIN_GET_PROFILE).then(() => { }).catch((error) => {
        router.push('/admin')
        console.error(error)
    });
    getAllClients();
});


const changeDataTable = (data) => {
    dataTable.value = data;
}

const items = ref([
    {
        label: 'Clients',
        icon: 'pi pi-shop',
        command: () => {
            getAllClients();
            changeDataTable('client');
        }
    },
    {
        label: 'Engineer',
        icon: 'pi pi-hammer',
        command: () => {
            getAllEngineers();
            changeDataTable('engineer');
        }
    },
    {
        label: 'Assing Job',
        icon: 'pi pi-link',
        command: () => {
            getAllJobs();
            getAllApprovedEngineers();
            changeDataTable('jobs');
        }
    },
    {
        label: 'Feedback',
        icon: 'pi pi-inbox',
        command: () => {
            getAllFeedback()
            changeDataTable('feedback');
        }
    },
    {
        label: 'FAQ',
        icon: 'pi pi-comments',
        command: () => {
            getAllFaq()
            changeDataTable('faq');
        }
    }
]);

const getSeverity = (status) => {
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
};

const getRaitingSev = (status) => {
    switch (status) {
        case 'GOOD':
            return 'success';

        case 'AVERAGE':
            return 'warning';

        case 'BAD':
            return 'danger';

        default:
            return null;
    }
};



</script>

<template>
    <div class="admin-tab-menu">
        <div class="card mt-5">
            <TabMenu :model="items" />
        </div>
    </div>

    <div class="client-details mt-5" v-if="dataTable === 'client'">
        <div class="card">
            <Toast />
            <ConfirmDialog></ConfirmDialog>
            <DataTable :value="clients" tableStyle="min-width: 50rem" scrollable scrollHeight="600px">
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="phone" header="Phone"></Column>
                <Column field="address" header="Address"></Column>
                <Column field="pincode" header="Pincode"></Column>
                <Column field="district" header="District"></Column>
                <Column field="state" header="State"></Column>
                <Column header="Accept">
                    <template #body="slotProps">
                        <Button label="Accept" outlined @click="confirm1(slotProps.data.id)"
                            :disabled="isButtonDisabled(slotProps.data.status)" />
                    </template>
                </Column>
                <Column header="Reject">
                    <template #body="slotProps">
                        <Button label="Reject" severity="danger" :disabled="isButtonDisabled(slotProps.data.status)"
                            @click="confirm2(slotProps.data.id)" outlined />
                    </template>
                </Column>
                <Column header="Status">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
                    </template>
                </Column>
                <template #footer> In total there are {{ clients ? clients.length : 0 }} clients. </template>
            </DataTable>
        </div>
    </div>

    <div class="client-details mt-5" v-else-if="dataTable === 'engineer'">
        <div class="card">
            <Toast />
            <ConfirmDialog></ConfirmDialog>
            <DataTable :value="engineers" tableStyle="min-width: 50rem" scrollable scrollHeight="600px">
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="phone" header="Phone"></Column>
                <Column field="jobTitle" header="Job Title"></Column>
                <Column field="yearOfExperience" header="Year of experience" style="min-width:12rem">
                    <template #body="slotProps">
                        <span>{{ slotProps.data.yearOfExperience }} years</span>
                    </template>
                </Column>
                <Column header="Accept">
                    <template #body="slotProps">
                        <Button label="Accept" outlined @click="approveEngineer(slotProps.data.id)"
                            :disabled="isButtonDisabled(slotProps.data.status)" />
                    </template>
                </Column>
                <Column header="Reject">
                    <template #body="slotProps">
                        <Button label="Reject" severity="danger" :disabled="isButtonDisabled(slotProps.data.status)"
                            @click="rejectEngineer(slotProps.data.id)" outlined />
                    </template>
                </Column>
                <Column header="Status">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
                    </template>
                </Column>
                <template #footer> In total there are {{ engineers ? engineers.length : 0 }} eningneers. </template>
            </DataTable>
        </div>
    </div>

    <div class="client-details mt-5" v-else-if="dataTable === 'jobs'">
        <div class="card">
            <Toast />
            <ConfirmDialog></ConfirmDialog>
            <DataTable :value="jobs" tableStyle="min-width: 50rem" scrollable scrollHeight="600px">
                <Column field="name" header="Project Name"></Column>
                <Column field="type" header="Type"></Column>
                <Column field="architectureStyle" header="Style"></Column>
                <Column field="timeline" header="Timeline" style="min-width:12rem">
                    <template #body="slotProps">
                        <span>{{ slotProps.data.timeline }} days</span>
                    </template>
                </Column>
                <Column field="phone" header="Assign Engineer" style="min-width: 12rem">
                    <template #body="slotProps">
                        <div class="card flex">
                            <Button @click="visible = true" label="Assign" outlined></Button>

                            <Dialog v-model:visible="visible" modal header="Assign Engineer"
                                :style="{ width: '25rem' }">
                                <div class="flex gap-2">
                                    <div class="card">
                                        <Dropdown v-model="assingSelectedEngineer" :options="approvedEngineers"
                                            optionLabel="name" optionValue="id" placeholder="Select an engineer"
                                            class="w-full md:w-14rem" />
                                    </div>
                                    <Button type="button" label="Assign"
                                        @click="assingEngineer(slotProps.data.id)"></Button>
                                </div>
                            </Dialog>
                        </div>
                    </template>
                </Column>
                <!-- <Column field="timeline" header="Upload Plan" style="min-width:12rem">
                    <template #body="slotProps">
                        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" />
                    </template>
                </Column>
                <Column field="timeline" header="Upload 3D Model" style="min-width:12rem">
                    <template #body="slotProps">
                        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" />
                    </template>
                </Column> -->
                <!-- <Column header="Accept">
                    <template #body="slotProps">
                        <Button label="Accept" outlined @click="approveEngineer(slotProps.data.id)"
                            :disabled="isButtonDisabled(slotProps.data.status)" />
                    </template>
                </Column>
                <Column header="Reject">
                    <template #body="slotProps">
                        <Button label="Reject" severity="danger" :disabled="isButtonDisabled(slotProps.data.status)"
                            @click="rejectEngineer(slotProps.data.id)" outlined />
                    </template>
                </Column> -->
                <Column header="Status">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
                    </template>
                </Column>
                <template #footer> In total there are {{ jobs ? jobs.length : 0 }} jobs. </template>
            </DataTable>
        </div>
    </div>

    <div class="client-details mt-5" v-else-if="dataTable === 'faq'">
        <div class="card">
            <Toast />
            <ConfirmDialog></ConfirmDialog>
            <DataTable :value="faq" tableStyle="min-width: 50rem" scrollable scrollHeight="600px">
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="question" header="Query"></Column>
                <template #footer> In total there are {{ faq ? faq.length : 0 }} faqs. </template>
            </DataTable>
        </div>
    </div>

    <div class="client-details mt-5" v-else-if="dataTable === 'feedback'">
        <div class="card">
            <Toast />
            <ConfirmDialog></ConfirmDialog>
            <DataTable :value="feedback" tableStyle="min-width: 50rem" scrollable scrollHeight="600px">
                <Column field="projectName" header="Project Name"></Column>
                <Column field="engineerName" header="Engineer Name"></Column>
                <Column header="Raiting Status">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.raiting" :severity="getRaitingSev(slotProps.data.raiting)" />
                    </template>
                </Column>
                <template #footer> In total there are {{ feedback ? feedback.length : 0 }} feedback. </template>
            </DataTable>
        </div>
    </div>

</template>