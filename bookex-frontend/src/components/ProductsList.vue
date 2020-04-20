<template>

  <div>
    <div class="md-layout md-gutter" id="container">
      <div v-for="(product,index) in products" :key="index">
        <div v-if="product.book">-
          <div class="md-layout-item" id="cards">
            <a :href="'/product/' + product.id">
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
                </md-ripple>

              </md-card>
            </a>
          </div>
        </div>

        <div v-if="product.drive">
          <div class="md-layout-item" id="cards">
             <a :href="'/product/' + product.id">
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

                </md-ripple>
              </md-card>
             </a>
          </div>
        </div>

        <div v-if="product.other">
          <div class="md-layout-item" id="cards">
             <a :href="'/product/' + product.id">
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
                  
                </md-ripple>
              </md-card>
             </a>
          </div>
        </div>

      </div>
    </div>
    
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
    </div>
</template>
 
<script>
import http from "../http-common";
 
export default {
  name: "products-list",
  data() {
    return {
      currentProduct: null,
      currentIndex: -1,
      products: {}
    };
  },
  methods: {
    /* eslint-disable no-console */
    retrieveProducts() {
      http
        .get("/things")
        .then(response => {
          this.products = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveProducts();
    }
  },
  mounted() {
    this.retrieveProducts();
  }
};
</script>
 
<style>

#container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

#cards{
  margin:20px;
}

</style>