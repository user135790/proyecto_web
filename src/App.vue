<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue'

var logged = localStorage.getItem('token')!= undefined;
var session = ref(logged)

</script>

<template>
    <nav class="navbar fixed-top bg-body-tertiary" v-if="session">
        <div class="container-fluid">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/producto" >Productos</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Listas de compras</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/proveedor">Proveedores</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/login">Cerrar Sesion</RouterLink>
            </li>
          </ul>
        </div>  
    </nav>
  <RouterView />
</template>

<style scoped>

ul {
  display: inline;
}

li {
  float: left;
  margin-right: 10px;
  padding: 0 4px;
}
</style>
