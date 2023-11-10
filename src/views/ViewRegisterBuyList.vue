<script setup lang="ts">
    import FormBuyList from '@/components/forms/FormBuyList.vue';

    var dataList = {
        nombre_lista: '',
        fecha_lista: '',
        idusuario: -1,
        idproducto: null
    }
</script>


<template>
    <main class="container-lg">
        <h2>Registrar lista de compras</h2>
        <FormBuyList :data="dataList"></FormBuyList>
    </main>
    
</template>