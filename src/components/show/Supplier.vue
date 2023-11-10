<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import FormSupplier from '../forms/FormSupplier.vue';
import axios from 'axios';

    var seleccion = ref(-1);
    var controlEditar = ref(true)

    var provList = ref([{
        name: "",
        date_creation: ""
    }])

    var dataProveedor:any = {
        nombre_proveedor: '',
        fecha_creacion: ''
    }

    function OnClickProveedor(indice:number){
        seleccion.value = indice;
        controlEditar.value = false;
        dataProveedor = {
            name: provList.value[indice].name,
            date_creation: provList.value[indice].date_creation
        }
    }

    function ObtenerListaProductos(){
        axios.get('http://localhost:8000/provider',{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            } 
        })
        .then( response => {
            provList.value = response.data; 
        })
        .catch(error => (
            console.log(error)
        ))
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
                    <th scope="col">Nombre Proveedor</th>
                    <th scope="col">Fecha de Creacion</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(proveedor,indice) in provList">
                    <th scope="row">{{ indice }}</th>
                    <td>{{proveedor.name}}</td>
                    <td>{{proveedor.date_creation}}</td>
                    <td>
                        <button @click="OnClickProveedor(indice)">Editar</button>
                        <button>Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <FormSupplier v-if="!controlEditar.valueOf()" :data="dataProveedor"></FormSupplier>
</template>