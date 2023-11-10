<script setup lang="ts">
    import Supplier from '@/components/show/Supplier.vue';
</script>

<template>
    <main class="container-lg">
        <h2>Gestion Provedores</h2>
        <button class="btn btn-primary"><RouterLink class="btn btn-primary" to='/proveedor/registrar'>
            Registrar Proveedor
        </RouterLink></button>
        <Supplier></Supplier>
    </main>
    
</template>