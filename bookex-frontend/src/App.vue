<template>
    <div id="app" class="container-fluid">
      <h3>Hey {{this.$store.state.username}}!!</h3>
      <div class="search">
        <md-button class="md-dense md-raised">
          <router-link to="/login">LOGIN</router-link>
        </md-button>
        <md-button class="md-dense md-raised">
          <router-link to="/register">REGISTER</router-link>
        </md-button>

        <div id="logo-bg">
          <h3 id="logo">BOOKEX</h3>
        </div>

        <md-button class="md-fab md-fab-bottom-right md-primary md-fixed">
          <router-link to="/add">
            <md-icon>add</md-icon>
          </router-link>
        </md-button>

        <div class="user-books">
          <div class="card-expansion">
            <md-card>
              <md-card-expand>
                <md-card-actions md-alignment="space-between">
                  USER PRODUCTS

                  <md-card-expand-trigger>
                    <md-button class="md-icon-button">
                      <md-icon>keyboard_arrow_down</md-icon>
                    </md-button>
                  </md-card-expand-trigger>
                </md-card-actions>

                <md-card-expand-content>
                  <md-card-content>
                    <div class="md-layout md-gutter" id="container">
                      <div v-for="(product,index) in products" :key="index">

                        <div v-if="product.book">
                          <div class="md-layout-item" id="cards">
                            <md-card md-with-hover>
                              <md-ripple>
                                <md-card-media>
                                  <!-- <img src= alt="People"> -->
                                </md-card-media>
                                <md-card-header>
                                  <div class="md-title">{{product.title}}</div>
                                  <div class="md-subhead">by {{product.book.author}}</div>
                                  <div class="md-subhead">{{product.book.publisher}}</div>
                                </md-card-header>

                                <md-card-expand>
                                  <md-card-actions md-alignment="space-between">
                                    <div>
                                      <md-chip class="md-primary" md-clickable>{{product.sem}}</md-chip>
                                      <md-chip class="md-primary" md-clickable>{{product.branch}}</md-chip>
                                    </div>
                                  </md-card-actions>
                                </md-card-expand>
                                <span>
                                  <md-button v-on:click="deleteProduct(product.id)" class="md-dense md-accent">
                                    <router-link to="/">DELETE</router-link>
                                  </md-button>
                                  <md-button class="md-dense md-accent">
                                    <a :href="'/update/' + product.id">EDIT</a>
                                  </md-button>
                                </span>
                              </md-ripple>
                            </md-card>
                          </div>
                        </div>

                        <div v-if="product.drive">
                          <div class="md-layout-item" id="cards">
                            <md-card md-with-hover>
                              <md-ripple>
                                <md-card-header>
                                  <div class="md-title">{{product.title}}</div>
                                  <div class="md-subhead">{{product.drive.description}}</div>
                                  <div class="link">
                                    <a v-bind:href="product.drive.url">{{product.drive.url}}</a>
                                  </div>
                                </md-card-header>

                                <md-card-expand>
                                  <md-card-actions md-alignment="space-between">
                                    <div>
                                      <md-chip class="md-primary" md-clickable>{{product.sem}}</md-chip>
                                      <md-chip class="md-primary" md-clickable>{{product.branch}}</md-chip>
                                    </div>
                                  </md-card-actions>
                                </md-card-expand>
                                <span>
                                  <md-button v-on:click="deleteProduct(product.id)" class="md-dense md-accent">
                                    <router-link to="/">DELETE</router-link>
                                  </md-button>
                                  <md-button class="md-dense md-accent">
                                    <a :href="'/update/' + product.id">EDIT</a>
                                  </md-button>
                                </span>
                              </md-ripple>
                            </md-card>
                          </div>
                        </div>

                        <div v-if="product.other">
                          <div class="md-layout-item" id="cards">
                            <md-card md-with-hover>
                              <md-ripple>
                                <md-card-media>
                                  <!-- <img src= alt="People"> -->
                                </md-card-media>
                                <md-card-header>
                                  <div class="md-title">{{product.title}}</div>
                                  <div class="md-subhead">{{product.other.description}}</div>
                                </md-card-header>

                                <md-card-expand>
                                  <md-card-actions md-alignment="space-between">
                                    <div>
                                      <md-chip class="md-primary" md-clickable>{{product.sem}}</md-chip>
                                      <md-chip class="md-primary" md-clickable>{{product.branch}}</md-chip>
                                    </div>
                                  </md-card-actions>
                                </md-card-expand>
                                <span>
                                  <md-button v-on:click="deleteProduct(product.id)" class="md-dense md-accent">
                                    <router-link to="/">DELETE</router-link>
                                  </md-button>
                                  <md-button class="md-dense md-accent">
                                    <a :href="'/update/' + product.id">EDIT</a>
                                  </md-button>
                                </span>
                              </md-ripple>
                            </md-card>
                          </div>
                        </div>
                      </div>
                    </div>

                  </md-card-content>
                </md-card-expand-content>
              </md-card-expand>
            </md-card>
          </div>
        </div>
          

        <div class="card-expansion">
          <router-link class="btn btn-primary" to="/"></router-link>
          <router-view/>
        </div>

      </div>
    </div>
</template>

<script>

import http from "./http-common";

export default {
  name: "products-list",
  data() {
    return {
      products: {},
      title: ""
    };
  },
  methods: {
    /* eslint-disable no-console */
    async retrieveProducts() {
      var data = {
        title: this.title
      };

      try{
        await http
        .get("/things",data)
        .then(response => {
          this.products = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => { 
          console.log(e);
        });
      }
      catch(err){
        console.log(err);
      }
    },
    deleteProduct(id) {
      http
        .delete("/things/"+id)
        .then(response => {
          this.retrieveProducts();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        })
    }
  },
  mounted() {
    this.retrieveProducts();
  }
};

</script> 

<style>

.user-books{
  margin: 25px;
}

</style>