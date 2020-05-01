import Vue from "vue";
import Router from "vue-router";

import ProductsList from "./components/ProductsList.vue";
import AddProduct from "./components/AddProduct.vue";
import Product from "./components/Product.vue";
import UpdateThing from "./components/UpdateThing.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

Vue.use(Router);
 
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "products",
      alias: "/products",
      component: ProductsList
    },
    {
      path: "/add",
      name: "add",
      component: AddProduct
    },
    {
      path: "/product/:id",
      name: "product",  
      component: Product
    },
    {
      path: "/update/:id",
      name: "update",  
      component: UpdateThing
    },
    {
      path: "/login",
      name: "login",  
      component: Login
    },
    {
      path: "/register",
      name: "register",  
      component: Register
    }
  ]
});
