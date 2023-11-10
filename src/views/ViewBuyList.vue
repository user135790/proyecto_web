<script setup lang="ts">
    import BuyList from '@/components/show/BuyList.vue';

    var data ={
        id_product: -1,
        id_list: -1,
    }
</script>

<template>
    <main class="container-lg">
        <h2>Gestion lista de compras</h2>
        <div>
            <button class="btn btn-primary"><RouterLink class="nav-link" to="/listaCompras/registrar">Crear nueva lista de compras</RouterLink></button>
        </div>
        <BuyList :data="data"></BuyList>
    </main>
    
</template>