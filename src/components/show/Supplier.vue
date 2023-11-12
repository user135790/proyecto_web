<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import FormSupplier from '../forms/FormSupplier.vue';
import axios from 'axios';
import router from '@/router';

    var seleccion = ref(-1);
    var controlEditar = ref(true)

    var provList = ref([{
        id: "",
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

    function OnClickEliminarProvedor(idProvedor:any){
        axios.delete('http://localhost:8000/provider/{id}?provider_id='+idProvedor,{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            } 
        })
        .then(response => {
            if(response.status = 200){
                alert("Provedor eliminado")
                router.push('/proveedor/')
            }
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
                        <button class="btn btn-danger btn-accion" @click="OnClickEliminarProvedor(proveedor.id)"><i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <FormSupplier v-if="!controlEditar.valueOf()" :data="dataProveedor"></FormSupplier>
</template>

<style scoped>
.btn-accion {
    margin: 0 10px;
    font-size: large;
}

</style>