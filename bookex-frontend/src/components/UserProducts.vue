<template>
    <div class="card-expansion">
        <md-card>
            <div class="md-layout md-gutter" id="container">
                <div v-for="(product,index) in products" :key="index">

                <div v-if="product.book">
                    <div class="md-layout-item" id="cards">
                    <md-card md-with-hover>
                        <md-ripple>
                        <md-card-media>
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
                            <router-link to="/userproducts">DELETE</router-link>
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
                            <router-link to="/userproducts">DELETE</router-link>
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
                            <router-link to="/userproducts">DELETE</router-link>
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
        </md-card>
    </div>
</template>

<script>

import axios from "axios";

export default {
  name: "user-products",
  data() {
    return {
      products: {}
    };
  },
  methods: {
    async userProducts() {
      try{
        await axios
            .get("http://localhost:8080/api/users/"+this.$store.state.userId+"/things") 
        .then(response => {
          this.products = response.data;
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
    async deleteProduct(id) {
      await axios
            .delete("http://localhost:8080/api/things/"+id, { headers: { Authorization: 'Bearer ' + this.$store.state.token } } )
        .then(response => {
          this.userProducts();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        })
    }
  },
  mounted() { 
    this.userProducts();
  }
};

</script> 