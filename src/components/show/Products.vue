<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import FormProductVue from '../forms/FormProduct.vue';
    import type { Integer } from 'type-fest';
    import axios from 'axios';
    import * as yup from 'yup';
    import { objectTypeInternalSlot } from '@babel/types';

    var seleccion = ref(-1);
    var controlEditar = ref(true)

    var data = {
        name: '',
        price: 0,
        idproveedor: '',
        date_creation: ''
    }

    const schema ={
        idproducto: yup.number().required()
    }

    var prodList = ref([{
        id: -1,
        name: "",
        price: -1,
        id_provider: "",
        date_creation: "",
        product_list_id: -1
    }])

    function ObtenerListaProductos(){
        axios.get('http://localhost:8000/products',{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            } 
        })
        .then( response => {
            prodList.value = response.data; 
        })
        .catch(error => (
            console.log(error)
        ))
    }

    function OnClickEditarProducto(indice:number){
        data = {
            id: prodList.value[indice].id,
            name: prodList.value[indice].name,
            price: prodList.value[indice].price,
        }
        seleccion.value = indice
        controlEditar.value = false
    }

    onMounted(()=>{
        ObtenerListaProductos();
    })
</script>

<template>
    <div>
        <table v-if="controlEditar.valueOf()" class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Proveedor</th>
                    <th scope="col">Fecha Creacion</th>
                    <th scope="col">Acciones</th>   
                </tr>
            </thead>
                <tbody>
                    <tr v-for="(producto,index) in prodList">
                        <th scope="row">{{index + 1}}</th>
                        <td>{{producto.name}}</td>
                        <td>${{producto.price}}</td>
                        <td>{{producto.id_provider}}</td>
                        <td>{{producto.date_creation}}</td>
                        <td>
                            <button @click="OnClickEditarProducto(index)">Editar</button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
            </tbody>
        </table>
        <FormProductVue v-if="!controlEditar.valueOf()" :data="prodList[seleccion]" ></FormProductVue>
    </div>
</template>