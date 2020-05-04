<template>
  <div>
    <div class="search">
      <md-toolbar class="md-transparent" id="search-bar">
        <md-field>
          <label for="title">Search..</label>
          <md-input name="title" id="title" v-model="stitle"></md-input>
          <md-button v-on:click="retrieveProducts" class="md-icon-button" id="search-icon">
            <md-icon>search</md-icon>
          </md-button>
        </md-field>
      </md-toolbar>

      <md-button v-on:click="retrieveProducts" class="md-dense md-raised">FILTER</md-button>
      <md-button v-on:click="clearSearch" class="md-dense md-raised">CLEAR</md-button>

      <div id="filters">
        <md-field id="sem-filter">
          <label for="sem">SEM</label>
          <md-select v-model="ssem" name="sem" id="sem">
            <md-option value="1">1</md-option>
            <md-option value="2">2</md-option>
            <md-option value="3">3</md-option>
            <md-option value="4">4</md-option>
          </md-select>
        </md-field>

        <md-field id="branch-filter">
          <label for="branch">BRANCH</label>
          <md-select v-model="sbranch" name="branch" id="branch">
            <md-option value="CSE">CSE</md-option>
            <md-option value="ISE">ISE</md-option>
            <md-option value="MECH">MECH</md-option>
            <md-option value="EEE">EEE</md-option>
          </md-select>
        </md-field>

        <md-field id="donation-filter">
          <label for="donation">DONATE</label>
          <md-select v-model="sdonation" name="donation" id="donation">
            <md-option value="1">YES</md-option>
            <md-option value="0">NO</md-option>
          </md-select>
        </md-field>
      </div>
    </div>

    <div class="md-layout md-gutter" id="container">
      <div v-for="(product,index) in products" :key="index">
        <div v-if="product.book">
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
                  </md-card-header>

                  <md-card-expand>
                    <md-card-actions md-alignment="space-between">
                      <div>
                        <md-chip class="md-primary" md-clickable>{{product.sem}}</md-chip>
                        <md-chip class="md-primary" md-clickable>{{product.branch}}</md-chip>
                        <div v-if="product.donation">
                          <md-chip class="md-primary" id="donation" md-clickable>DONATION</md-chip>
                        </div>
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
-
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
                        <div v-if="product.donation">
                          <md-chip class="md-primary" id="donation" md-clickable>DONATION</md-chip>
                        </div>
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

    <!-- <div class="col-md-6">
      <router-view @refreshData="refreshList"></router-view>
    </div>-->
  </div>
</template>
 
<script>
import http from "../http-common";

export default {
  name: "products-list",
  data() {
    return {
      stitle: "",
      ssem: "",
      sbranch: "",
      sdonation: "",
      products: []
    };
  },
  methods: {
    /* eslint-disable no-console */
    retrieveProducts() {
      http
        .get(
          "/things?title=" +
            this.stitle +
            "&sem=" +
            this.ssem +
            "&branch=" +
            this.sbranch +
            "&donation=" +
            this.sdonation
        )
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
    },
    clearSearch() {
      (this.stitle = ""),
        (this.ssem = ""),
        (this.sbranch = ""),
        (this.sdonation = "");
      this.retrieveProducts();
    }
  },
  mounted() {
    this.retrieveProducts();
  }
};
</script>
 
<style>
#search-bar {
  margin: auto;
  width: 50%;
  padding: 10px;
}

#filters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

#container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

#cards {
  margin: 20px;
}

#donation {
  float: right;
}
</style>