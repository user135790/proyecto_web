<script setup lang="ts">

    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import FormBuyList from '../forms/FormBuyList.vue';
    import {Multiselect} from 'vue-multiselect'
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import * as yup from 'yup'
import router from '@/router';

    defineProps([
        "data"
    ])

    var controlEditar = ref(true)
    var recargarUnaVez = true;

    var listaComprasActual = ref(-1);

    var dataList = {
        name: ""
    }

    var productList = ref([{
        name: '',
        price: -1,
        product_list_id: -1,
        id: 1,
        date_creation: '',
        id_provider: -1
    }])

    var productBuyList = ref([{
        name: '',
        price: -1,
        product_list_id: -1,
        id: 1,
        date_creation: '',
        id_provider: -1
    }])

    var buyLists = ref([{
        id: -1,
        id_user: -1 || null,
        state: -1,
        name: ""
    }])

    var colapsado = ref(false)

    var schema = {
        id_product: yup.number(),
        id_list: yup.number()
    }

    var estilos = {
        '--bs-table-bg': '#fff',
        'cursor': 'pointer'
    }

    function OnSubmit(values:any){
        var lista ={
            id_product: values.id_product.id,
            id_list: listaComprasActual.value
        }
        axios.post('http://localhost:8000/producttolist',lista,{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            } 
        })
        .then(response => {
            if(response.status = 201){
                alert('Producto añadido a la lista de compras')
                ObtenerProductos();
            }
        })
        .catch(error => (
            console.log(error)
        ))
    }

    function ObtenerProductos(){
        axios.get('http://localhost:8000/products',{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            } 
        })
        .then( response => {
            productList.value = response.data; 
        })
        .catch(error => (
            console.log(error)
        ))
    }

    function ObtenerListaCompras(){
        axios.post("http://localhost:8000/user/yo/?token="+localStorage.getItem('token'))
        .then( response => {
            if( response.status == 200){
                axios.get('http://localhost:8000/list/user/'+response.data,{
                headers:{
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                } 
                })
                .then( response => {
                    buyLists.value = response.data;
                })
                .catch(error => (
                    console.log(error)
                ))
            } 
        })
        .catch(error => (
            console.log(error)
        ))
        
    }

    function OnClickEliminarLista(indice1:any, indice2:any){
        var listaAux = {
            id_product: indice2,
            id_list: indice1
        }
        axios.post('http://localhost:8000/producttolist/delet',listaAux,{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            } 
        }).then(response => {
            if(response.status = 201){
                alert('Lista de compras Eliminada')
                ObtenerProductos();
            }
        })
        .catch(error => (
            console.log(error)
        ))
    }

    function editInputHidden(indice:any){
        listaComprasActual.value = indice;
    }

    function OnClickItemLista(idProductoLista:any, idLista:any){
        let item = document.getElementById(idProductoLista+""+idLista);
        item?.style.setProperty("#"+idProductoLista+""+idLista+" --bs-table-bg", "green");
    }

    onMounted(() => {
        ObtenerListaCompras();
        ObtenerProductos();
        
    })

</script>

<template>
    <div v-if="controlEditar.valueOf()" class="accordion" id="buyLists">
        <div v-for="(list, indice1) in buyLists" class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button btn-group" :class="{collapsed: colapsado}" type="button" data-bs-toggle="collapse" :data-bs-target="'#Collapse'+indice1.toString()"
             aria-expanded="true" aria-controls="collapseOne">
                {{ list.name }} | Estado: {{ list.state ? "Activo": "inactivo" }}                    
            </button>
        </h2>
        <div :id="'Collapse'+indice1.toString()" class="accordion-collapse collapse" :class="{show: colapsado}" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <Form novalidate @submit="OnSubmit" >
                    <div class="input-group mb-3 text-center">
                        <span class="input-group-text label" id="basic-addon1">Agregar Producto</span>
                            
                        <Field  name="id_product"  v-slot="{ field }" :validation-schema="schema">
                            <Multiselect  v-bind="field" v-model="data.id_product" :options="productList" placeholder="Selecciona" label="name" track-by="name">
                                    
                            </Multiselect>
                        </Field>
                        <ErrorMessage class="text-center" name="id_product"></ErrorMessage>

                        <Field type="hidden" v-model="data.id_list" name="id_list"></Field>

                        <button @click="editInputHidden(list.id)" class="btn btn-primary boton-check" type="submit"><i class="bi bi-plus-circle"></i></button>
                    </div>
                </Form>
                <table class="table table-hover">
                    
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre Producto</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Proveedor</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :id=list.id.toString()+product.product_list_id.toString() :style="estilos" @click="OnClickItemLista(product.product_list_id, list.id)" v-for="(product,indice) in productList.filter((producto) => producto.product_list_id == list.id)">
                            <th scope="row">{{ indice }}</th>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.id_provider }}</td>
                            <td>
                                <button  @click="OnClickEliminarLista(list.id, product.id)" type="button" class="btn btn-danger btn-accion" style="max-width: 100px;">
                                    <i class="bi bi-trash3"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>  
                </table>
            </div>
        </div>
        </div>
    </div>
    <FormBuyList v-if="!controlEditar.valueOf()" :data="dataList"></FormBuyList>
    
</template>

<style scoped>
    .accordion-item{
        max-height: 20em;
        overflow: auto;
    }

    .multiselect{
        width: 50%;
    }

    .accordion{
        max-height: 35em;
        overflow: auto;
    }

    .boton-check{
        width: 70px;
    }

    form{
        width: 100%;
    }


</style>