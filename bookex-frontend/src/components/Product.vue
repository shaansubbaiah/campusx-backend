<template>
    <div>
        <md-dialog :md-active=true>
            <md-dialog-content class="md-scrollbar">
              
              <md-dialog-title>
                <md-button class="md-icon-button" id="cancel-btn">
                  <router-link to="/">
                    <md-icon>cancel</md-icon>
                  </router-link>
                </md-button>
              </md-dialog-title>

              <div v-if="product.book">
                <div class="card">
                  <div class="image">
                  </div>
                  <div class="info">
                    {{product.title}}<br>
                    {{product.book.author}}<br>
                    {{product.book.publisher}}<br>
                    {{product.sem}}<br>
                    {{product.branch}}<br>
                    POSTED AT: {{product.createdAt}}<br>
                  </div>
                </div>
              </div>

              <div v-if="product.drive">
                <div class="info">
                  {{product.title}}<br>
                  {{product.drive.description}}<br>
                  <a v-bind:href="product.drive.url">{{product.drive.url}}</a><br>
                  {{product.sem}}<br>
                  {{product.branch}}<br>
                  POSTED AT: {{product.createdAt}}<br>
                </div>
              </div>

              <div v-if="product.other">
                <div class="card">
                  <div class="image">
                  </div>
                  <div class="info">
                    {{product.title}}<br>
                    {{product.other.description}}<br>
                    {{product.sem}}<br>
                    {{product.branch}}<br>
                    POSTED AT: {{product.createdAt}}<br>
                  </div>
                </div>
              </div>
            </md-dialog-content>
        </md-dialog>
    </div>
</template>

<script>
import http from "../http-common";

export default {
    name: "product",
  data() {
    return {
      product: {
        id: 0,
        title: "",
        author: "",
        sem: null,
        branch: "",
        publisher: "",
        image: "",
        description: "",
        link: ""
      },
    };
  },
  methods: {
      retrieveProduct() {
          let pid = this.$route.params.id;
      http
        .get("/things/"+pid)
        .then(response => {
          this.product = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveProduct();
  }
};
</script>

<style>

  #cancel-btn{
    float: right;
  }

  .card{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

</style>