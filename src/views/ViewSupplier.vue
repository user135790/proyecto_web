<script setup lang="ts">
    import Supplier from '@/components/show/Supplier.vue';
</script>

<template>
    <main class="container-lg">
        <h2 class="h2-provedor">Gestion Provedores</h2>
        <button class="btn btn-primary btn-crear-provedor"><RouterLink class="btn btn-primary" to='/proveedor/registrar'>
            <i class="bi bi-plus-circle"></i> Nuevo Proveedor
        </RouterLink></button>
        <Supplier></Supplier>
    </main>
    
</template>

<style scoped>
.h2-provedor{
    display: inline-block;
    width: 70%;
}

.btn-crear-provedor{
    display: inline-block;
}

</style>