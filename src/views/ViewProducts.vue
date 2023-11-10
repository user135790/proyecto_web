<script setup lang="ts">
    import Products from '@/components/show/Products.vue';
</script>

<template>
    <main class="container-lg">
        <h2>Gestion Productos</h2>
        <div>
            <button class="btn btn-primary"><RouterLink class="nav-link" to="/producto/registrar">Crear nuevo producto</RouterLink></button>
        </div>
        <Products></Products>
    </main>
    
</template>