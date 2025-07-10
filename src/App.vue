<script setup lang="ts">
import { setupDarkTheme } from "@devkitvue/base-components";
import Toast from "primevue/toast";
import DynamicDialog from "primevue/dynamicdialog";
import { RouterView } from "vue-router";

setupDarkTheme();
</script>

<template>
  <DynamicDialog />
  <Toast />
  <div class="layout-wrapper">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component" />
          <template #fallback>
            <AdminLoading />
          </template>
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>
