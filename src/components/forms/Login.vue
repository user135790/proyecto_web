<script setup lang="ts">
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import 'bootstrap-icons/font/bootstrap-icons.css'
    import axios from 'axios'
    import { createApp } from 'vue'
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import * as yup from 'yup'
    import ProductsVue from '../show/Products.vue'
    import Supplier from '../show/Supplier.vue'
    import router from '@/router'

    const dataLogin = {
        email: null,
        password: null
    }

    const schema ={
        email: yup.string()
            .min(10,"El nombre de usuario debe ser minimo de 10 caracteres")
            .max(50, "El nombre de usuario no puede sobrepasar los 50 caracteres")
            .required("El nombre de usuario es un campo obligatorio"),
        
        password: yup.string()
            .min(7, "La contraseña debe tener al menos 7 caracteres")
            //.matches(new RegExp("/(?=.*\d)"), "La contraseña debe tener un numero")
            .required("La contraseña es un campo obligatorio")
    }
                
    function OnSubmit(values:any){
        axios.post('http://localhost:8000/user/login',values)
        .then(response => {
            if(response.status = 200){
                console.log(response)
                localStorage.setItem('token', response.data['acces token'])
                router.push('/')
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
            <i class="bi bi-people" style="font-size: 10rem; color: cornflowerblue;"></i>
        </div>
        <Form novalidate @submit="OnSubmit" :validation-schema="schema">   
            <div class="input-group mb-3 text-center">
                <span class="input-group-text label" id="basic-addon1">Usuario</span>
                <Field type="email" name="email" v-model="dataLogin.email"/> 
                <ErrorMessage class="text-center" name="email"></ErrorMessage>   
            </div>
            
            <div class="input-group mb-3 text-center">
                <span class="input-group-text label" id="basic-addon1">Contraseña</span>
                <Field type="password" name="password" v-model="dataLogin.password"/>
                <ErrorMessage name="password"></ErrorMessage>
            </div>
            
            <div class="text-center">
                <button class="btn btn-success justify-content-center" type="submit">Iniciar Sesion</button>
                <br>
                
            </div>

            <div class="text-center">
                <h4>¿Aún no tienes cuenta? <RouterLink class="nav-link" style="color: grey;" to="/usuario/registrar">Registrarte</RouterLink></h4>
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