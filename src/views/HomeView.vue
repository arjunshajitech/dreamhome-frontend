<script setup>
import { ref } from "vue";


const name = ref();
const email = ref();
const accept = ref(false);

const items = ref([
  { label: 'Engineer', icon: 'pi pi-wrench' },
  { label: 'Client', icon: 'pi pi-users' },
  { label: 'Assign Job', icon: 'pi pi-hourglass' },
  { label: 'FAQ', icon: 'pi pi-address-book' },
  { label: 'Feedback', icon: 'pi pi-inbox' },
]);

const itemss = ref([
  {
    label: 'Admin Dashboard',
    icon: 'pi pi-home'
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out'
  }
]);
</script>

<template>
  <div class="card admin-menu-bar">
    <Menubar :model="itemss"/>
  </div>

  <div>
    <TabMenu :model="items" :class="$style.customTableMenu" />
  </div>

</template>

<style module>
.customTableMenu {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  column-gap: 30px;
}

.customMenuBar {
  display: flex;
  justify-content: center;
  align-items: center;
}

@layer reset {
  .p-menuitem-link {
    background-color: red;
  }
}

</style>
