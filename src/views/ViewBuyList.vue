<script setup lang="ts">
    import BuyList from '@/components/show/BuyList.vue';

    var data = {
        id_product: -1,
        id_list: -1,
    }
    
</script>

<template>
    <main class="container-lg">
        <h2 class="h2-lista-compras">Gestion lista de compras</h2>
        <div class="btn-crear-lista">
            <button class="btn btn-primary"><RouterLink class="btn btn-primary" to="/listaCompras/registrar"><i class="bi bi-plus-circle"></i> Nueva Lista de Compras</RouterLink></button>
        </div>
        <BuyList :data="data"></BuyList>
    </main>
    
</template>

<style scoped>

.h2-lista-compras{
    display: inline-block;
    width: 70%;
}

.btn-crear-lista{
    display: inline-block;
}
</style>