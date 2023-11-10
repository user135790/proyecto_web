import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '../views/ViewLogin.vue'
import NotFound from '@/views/NotFound.vue'
import ViewProductsVue from '@/views/ViewProducts.vue'
import ViewBuyListVue from '@/views/ViewBuyList.vue'
import ViewSupplierVue from '@/views/ViewSupplier.vue'
import ViewRegisterBuyListVue from '@/views/ViewRegisterBuyList.vue'
import ViewRegisterUserVue from '@/views/ViewRegisterUser.vue'
import ViewRegistrerSupplierVue from '@/views/ViewRegistrerSupplier.vue'
import ViewRegistrerProductVue from '@/views/ViewRegisterProducts.vue'
import VueJwtDecode from 'vue-jwt-decode';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginVue
    },{
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFound 
    },{
      path: '/producto',
      name: 'producto',
      component: ViewProductsVue,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }
    },{
      path: '/',
      name: 'listaCompras',
      component: ViewBuyListVue,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }
    },{
      path: '/proveedor',
      name: 'Proveedor',
      component: ViewSupplierVue,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }
    },{
      path: '/listaCompras/registrar',
      name: 'RegistrarListaCompras',
      component: ViewRegisterBuyListVue,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }
    },{
      path: '/producto/registrar',
      name: 'RegistrarProducto',
      component: ViewRegistrerProductVue,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }
    },{
      path: '/proveedor/registrar',
      name: 'RegistrarProvedor',
      component: ViewRegistrerSupplierVue,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }
    },{
      path: '/usuario/registrar',
      name: 'RegistrarUsuario',
      component: ViewRegisterUserVue
    },{
      path: '/salir',
      name: 'salir',
      component: LoginVue,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }
    }
  ]
})
router.beforeEach((to, from, next) => {


  if (to.meta.requiresAuth) {
    var current_user;
    let token = localStorage.getItem('token');
    try{
        let decoded = VueJwtDecode.decode(token)
        current_user = decoded;
        console.log(Date.now()/1000 + " "+current_user.empiry)
    }
    catch(err){
        console.log('token is null: ',err);
    }
    
    
    if (current_user.empiry > Date.now()/1000) {
      next();
    } else {
      localStorage.setItem('token', '');
      next('/login');
    }
  } else {
    next();
  }
});
export default router
