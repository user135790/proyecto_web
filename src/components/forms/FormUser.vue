<script setup lang="ts">
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import 'bootstrap-icons/font/bootstrap-icons.css'
    import axios from 'axios'
    import { createApp } from 'vue'
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import * as yup from 'yup'
import router from '@/router'

    const dataLogin = {
        fullname: '',
        email: '',
        password: ''
    }

    const schema ={
        fullname: yup.string()
            .min(3,"El nombre debe ser minimo de 3 caracteres")
            .max(50, "El nombre no puede sobrepasar los 50 caracteres")
            .required("El nombre es un campo obligatorio"),
        email: yup.string()
            .email("El campo debe ser un email")
            .max(50, "El email no puede sobrepasar los 50 caracteres")
            .required("El email es un campo obligatorio"),
        
        password: yup.string()
            .min(7, "La contraseña debe tener al menos 7 caracteres")
            .required("La contraseña es un campo obligatorio")
    }
                
    function OnSubmit(values:any){
        dataLogin.fullname = ''
        dataLogin.email = ''
        dataLogin.password = ''
        axios.post('http://localhost:8000/user/signup',values)
        .then(response => {
            if(response.status = 201){
                alert('Usuario Creado')
                router.push('/login')
            }
        })
        .catch(error => (
            console.log(error)
        ))
    }
</script>

<template>
    
    <div class="m-0 row justify-content-center">
        <div class="icon">
            <i class="bi bi-person-add" style="font-size: 10rem; color: cornflowerblue;"></i>
        </div>
        <Form novalidate @submit="OnSubmit" :validation-schema="schema">   
            <div class="input-group mb-3 text-center">
                <span class="input-group-text label" id="basic-addon1">Nombre</span>
                <Field type="text" name="fullname" v-model="dataLogin.fullname"/> 
                <ErrorMessage class="text-center" name="fullname"></ErrorMessage>   
            </div>

            <div class="input-group mb-3 text-center">
                <span class="input-group-text label" id="basic-addon1">Usuario</span>
                <Field type="email" name="email" v-model="dataLogin.email"/> 
                <ErrorMessage class="text-center" name="email"></ErrorMessage>   
            </div>
            
            <div class="input-group mb-3 text-center">
                <span class="input-group-text label" id="basic-addon1">Contraseña</span>
                <Field type="password" name="password" v-model="dataLogin.password"/>
                <ErrorMessage class="text-center" name="password"></ErrorMessage>
            </div>
            
            <div class="text-center">
                <button class="btn btn-success justify-content-center" type="submit">Registrar</button>
                <br>  
            </div> 
        </Form>
    </div>   
</template>

<style scoped>

.icon{
    display: flex;
    width: 100%;
    font-size: 15em;
    justify-content: center;
    margin: 5px 5px;
}

.icon i{
    display: flex;
}

.btn-success{
    --bs-btn-bg: cornflowerblue;
    --bs-btn-hover-bg: rgb(118, 156, 226);
    color: black;
}


form{
    width: 50%;
}

input{
    display: block;
    width: 70%;
}

.label{
    width: 30%;
}

</style>