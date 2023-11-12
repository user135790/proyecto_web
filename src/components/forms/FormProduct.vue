<script setup lang="ts">
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import axios from 'axios'
    import { createApp, onMounted, ref } from 'vue'
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import * as yup from 'yup'
import { optionalCallExpression } from '@babel/types'
import router from '@/router'

    defineProps([
        "data"
    ])


    

    var controlFormProvider = ref(false)

    var dataProduct = {
            name: '',
            price: null,
            id_provider: [],
            date_creation: null
    }

    var listProveedor = [{
        id: -1,
        name: '',
        date_creation: ''
    }]


    const schema ={
        name: yup.string()
            .min(10,"El nombre de proveedor debe ser minimo de 5 caracteres")
            .required("El nombre de usuario es un campo obligatorio"),
        
        //date_creation: yup.date().required("La fecha de creacion es un campo obligatorio"),

        price: yup.number().positive().required("El precio es un campo obligatorio"),

        //id_provider: yup.number().positive().required()
    }

    function ObtenerProveedores(){
        axios.get('http://localhost:8000/provider',{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            } 
        })
        .then( response => {
            
            listProveedor = response.data
            console.log(listProveedor)
            controlFormProvider.value = !controlFormProvider.value;
        })
        .catch(error => (
            console.log(error)
        ))
    }

    function OnclickProveedor(){
        
    }

    onMounted(() => {
        ObtenerProveedores();
    })

    function OnSubmit(values:any){
        console.log(values.id_product)
        if(values.id_product != null){
            axios.put('http://localhost:8000/products/'+values.id_product,values,{
                headers:{
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            })
            .then(response => {
            if(response.status = 200){
                alert('Producto Actualizado')
                router.push('/producto')
            }
            })
            .catch(error => (
                console.log(error)
            ))
        }else{
            axios.post('http://localhost:8000/products',values,{
                headers:{
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            })
            .then(response => {
            if(response.status = 201){
                alert('Producto Creado')
                router.push('/producto')
            }
            })
            .catch(error => (
                console.log(error)
            ))
        }
        
    }
</script>

<template>
    <div class="registro-producto">
        <div class="m-0 row justify-content-center">
            <Form novalidate @submit="OnSubmit" :validation-schema="schema">
                <div class="input-group mb-3 text-center">
                    <span class="input-group-text label" id="basic-addon1">Nombre</span>
                    <Field type="text" placeholder="Nombre de producto" name="name" v-model="data.name"/>
                    <ErrorMessage class="text-center" name="name"></ErrorMessage>
                </div>
                
                <div class="input-group mb-3 text-center">
                    <span class="input-group-text label" id="basic-addon1">Precio</span>
                    <Field type="number" placeholder="Precio del producto" name="price" v-model="data.price"/>
                    <ErrorMessage class="text-center" name="price"></ErrorMessage>
                </div>
                
                <div v-if="data.id == null" class="input-group mb-3 text-center">
                    <span class="input-group-text label" id="basic-addon1">Proveedor</span>
                    <Field v-slot="{ value }" as="select" id="option" @click="OnclickProveedor()" placeholder="Seleccione el proveedor" name="id_provider" v-model="data.id_provider">
                        <option v-bind:id=indice.toString v-for="(proveedor, indice) in listProveedor" :key="proveedor.name" :value="proveedor.id">
                            {{proveedor.name}}
                        </option>
                    </Field>
                    <ErrorMessage class="text-center" name="idproveedor"></ErrorMessage>
                </div>

                <div v-if="data.id == null" class="input-group mb-3 text-center">
                    <span class="input-group-text label" id="basic-addon1">Fecha creacion</span>
                    <Field type="date" placeholder="Indique la fecha de creacion" name="date_creation" v-model="data.fecha_creacion"/>
                    <ErrorMessage class="text-center" name="fecha_creacion"></ErrorMessage>
                </div>

                <Field type="hidden" name="id_product" v-model="data.id"/>
                
                <div class="text-center">
                    <button class="btn btn-success" type="submit">Actualizar</button>
                </div>
             
            </Form>
        </div>
    </div>
</template>

<style scoped>
.btn-success{
    --bs-btn-bg: cornflowerblue;
    --bs-btn-hover-bg: rgb(118, 156, 226);
    color: black;
}


form{
    width: 70%;
}

input, select{
    display: block;
    width: 60%;
}

.label{
    width: 40%;
}

</style>