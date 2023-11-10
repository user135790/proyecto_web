<script setup lang="ts">
    import FormProductVue from '@/components/forms/FormProduct.vue';

    var dataProduct = {
            name: '',
            price: null,
            id_provider: [],
            date_creation: null
    }

</script>

<template>
    <main class="container-lg">
        <h2>Registrar Producto</h2>
        <FormProductVue :data="dataProduct"></FormProductVue>
    </main>
</template>