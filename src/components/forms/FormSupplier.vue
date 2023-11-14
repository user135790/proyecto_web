<script setup lang="ts">
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import axios from 'axios'
    import { createApp } from 'vue'
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import * as yup from 'yup'
import router from '@/router'

    defineProps([
        "data"
    ])

    const dataProveedor = {
        name: null,
        date_creation: null
    }

    const schema ={
        name: yup.string()
            .min(3,"El nombre debe ser minimo de 3 caracteres")
            .required("El nombre de usuario es un campo obligatorio"),
        
        date_creation: yup.date()
            .required("La fecha de creacion es un campo obligatorio")
    }

    function OnSubmit(values:any){
        axios.post('http://localhost:8000/provider',values,{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }   
        })
        .then(response => {
            if(response.status = 201){
                alert('Proveedor Creado')
                router.push('/proveedor')
            }
        })
        .catch(error => (
            console.log(error)
        ))
    }


</script>

<template>
    <div class="registro-provedor">
        <div class="m-0 row justify-content-center">
            <Form novalidate @submit="OnSubmit" :validation-schema="schema">
                <div class="input-group mb-3 text-center">
                    <span class="input-group-text label" id="basic-addon1">Nombre proveedor</span>
                    <Field type="text" placeholder="Nombre de proveedor" name="name" v-model="data.name"/>
                    <ErrorMessage class="text-center" name="name"></ErrorMessage>
                </div>
                
                <div class="input-group mb-3 text-center">
                    <span class="input-group-text label" id="basic-addon1">fecha_creacion</span>
                    <Field type="date" placeholder="Fecha de creacion" name="date_creation" v-model="data.date_creation"/>
                    <ErrorMessage class="text-center" name="date_creation"></ErrorMessage>
                </div>

                <div class="text-center">
                    <button class="btn btn-success justify-content-center" type="submit">Registrar</button>
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

input{
    display: block;
    width: 60%;
}

.label{
    width: 40%;
}

</style>