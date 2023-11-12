<script setup lang="ts">
    import Products from '@/components/show/Products.vue';
</script>

<template>
    <main class="container-lg">
        <h2 class="h2-productos">Gestion Productos</h2>
        <div class="btn-crear">
            <button class="btn btn-primary"><RouterLink class="btn btn-primary" to="/producto/registrar"><i class="bi bi-plus-circle"></i> Nuevo Producto</RouterLink></button>
        </div>
        <Products></Products>
    </main>
    
</template>

<style scoped>
.h2-productos{
    display: inline-block;
    width: 70%;
}

.btn-crear{
    display: inline-block;
}

</style>