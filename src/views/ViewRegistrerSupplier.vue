<script setup lang="ts">
    import FormSupplier from '@/components/forms/FormSupplier.vue';

    const dataProveedor = {
        name: '',
        date_creation: ''
    }
</script>

<template>
    <main class="container-lg">
        <h2>Registrar Proveedor</h2>
        <FormSupplier :data="dataProveedor"></FormSupplier>
    </main>
</template>