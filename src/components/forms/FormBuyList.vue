<script setup lang="ts">
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import axios from 'axios'
    import { createApp, onMounted, ref } from 'vue'
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import * as yup from 'yup'
import router from '@/router'


    defineProps([
        "data"
    ])

    var dataList = {
        nombre_lista: '',
        fecha_lista: '',
        idusuario: 0,
        idproducto: []
    }

    var usuarioActual = -1;

    function ObtenerUsuario(){
        axios.post("http://localhost:8000/user/yo/?token="+localStorage.getItem('token'))
        .then( response => {
            console.log(response.data);
            usuarioActual = response.data;
        })
        .catch(error => (
            console.log(error)
        ))
    }

    var isOpen = false;

    var values:any = [];

    var productList = [{
            nombre_producto: 'Mantequilla',
            precio: 15463,
            idproveedor: 1,
            fecha_creacion: '2016/02/02'
    },{
            nombre_producto: 'Cacao',
            precio: 15463,
            idproveedor: 1,
            fecha_creacion: '2016/02/02'
    },{
            nombre_producto: 'Fresas',
            precio: 15463,
            idproveedor: 1,
            fecha_creacion: '2016/02/02'
    },{
            nombre_producto: 'Chocolate',
            precio: 15463,
            idproveedor: 1,
            fecha_creacion: '2016/02/02'
    }]

    const schema ={
        name: yup.string()
            .min(10,"El nombre de proveedor debe ser minimo de 5 caracteres")
            .required("El nombre de usuario es un campo obligatorio"),
        
        //fecha_lista: yup.date().required("La fecha de creacion es un campo obligatorio"),

        id_user: yup.number()
        //idproducto: yup.number().required()
    }

    function OnSubmit(values:any){
        
        values['id_user'] = usuarioActual;
        axios.post('http://localhost:8000/list/',values)
        .then(response => {
            if(response.status = 201){
                alert('Lista de compras Creada')
                router.push('/')
            }
        })
        .catch(error => (
            console.log(error)
        ))
    }

    onMounted(() => {
        ObtenerUsuario();
    })

    

</script>

<template>
    <div class="registro-lista">
        <div class="m-0 row justify-content-center">
            <Form novalidate @submit="OnSubmit" :validation-schema="schema">
                <div class="input-group mb-3 text-center">
                    <span class="input-group-text label" id="basic-addon1">Nombre lista compras</span>
                    <Field type="text" placeholder="Nombre de lista de compras" name="name" v-model="data.nombre_lista"/>
                    <ErrorMessage class="text-center" name="name"></ErrorMessage>
                </div>
                <div class="input-group mb-3 text-center">
                    <span class="input-group-text label" id="basic-addon1">Fecha</span>
                    <Field type="date" placeholder="Fecha de la lista" name="fecha_lista" v-model="data.fecha_lista"/>
                    <ErrorMessage class="text-center" name="fecha_lista"></ErrorMessage>
                </div>

                <Field type="hidden" name="id_user"/>

                <div class="text-center">
                    <button class="btn btn-success" type="submit">Registrar</button>
                </div> 
            </Form>
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>

    .btn-success{
        --bs-btn-bg: cornflowerblue;
        --bs-btn-hover-bg: rgb(118, 156, 226);
        color: black;
    }


    form{
        width: 70%;
    }

    input, .multiselect{
        display: block;
        width: 60%;
    }

    .label{
        width: 40%;
    }


</style>