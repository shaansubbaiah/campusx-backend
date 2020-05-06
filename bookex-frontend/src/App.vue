<template>
    <div id="app" class="container-fluid">
      <h3>Hey {{this.$store.state.username}}!!</h3>
      <div class="search">
        <md-button v-show="!this.$store.state.userId" class="md-dense md-raised">
          <router-link to="/login">LOGIN</router-link>
        </md-button>
        <md-button v-show="!this.$store.state.userId" class="md-dense md-raised">
          <router-link to="/register">REGISTER</router-link>
        </md-button>
        <md-button v-show="this.$store.state.userId" class="md-dense md-raised" v-on:click="Logout">LOGOUT</md-button>

        <div id="logo-bg">
          <h3 id="logo">BOOKEX</h3>
        </div>

        <md-button v-show="this.$store.state.userId" class="md-fab md-fab-bottom-right md-primary md-fixed">
          <router-link to="/add">
            <md-icon>add</md-icon>
          </router-link>
        </md-button>

        <md-tabs v-show="this.$store.state.userId" md-sync-route>
          <md-tab id="tab-products" md-label="PRODUCTS" to="/" exact></md-tab>
          <md-tab id="tab-user" md-label="USER" to="/userproducts"></md-tab>
          <md-tab id="tab-about" md-label="ABOUT" to="/about"></md-tab>
        </md-tabs>

        <div class="card-expansion">
          <router-link class="btn btn-primary" to="/"></router-link>
          <router-view/>
        </div>

      </div>
    </div>
</template>

<script>



export default {
  name: "products-list",
  data() {
    return {
      products: {}
    };
  },
  methods: {
    Logout(){
      this.$store.commit('Logout')
    }
  }
};

</script> 