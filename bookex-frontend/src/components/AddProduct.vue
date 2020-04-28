<template>
  <div>
    <md-dialog :md-active=true>
      <md-dialog-content class="md-scrollbar">
      <md-dialog-title>
        POST AN AD!
        <md-button class="md-icon-button" id="cancel-btn">
          <router-link to="/">
            <md-icon>cancel</md-icon>
          </router-link>
        </md-button>
      </md-dialog-title>
        <md-tabs md-dynamic-height>
          <md-tab md-label="BOOK">
            <div v-if="!submitted">

              <form>
                
                <md-field class="form-data">
                  <label for="title">TITLE</label>
                  <md-input name="title" id="title" v-model="product.title"></md-input>
                </md-field>

                <md-field class="form-data">
                  <label for="author">AUTHOR</label>
                  <md-input name="author" id="author" v-model="product.author"></md-input>
                </md-field>

                <md-field class="form-data">
                  <label for="publisher">PUBLISHER</label>
                  <md-input name="publisher" id="publisher" v-model="product.publisher"></md-input>
                </md-field>

                <md-field class="form-data">
                  <label for="sem">SEM</label>
                  <md-select v-model="product.sem" name="sem" id="sem">
                    <md-option value="1">1</md-option>
                    <md-option value="2">2</md-option>
                    <md-option value="3">3</md-option>
                    <md-option value="4">4</md-option>
                  </md-select>
                </md-field>
                
                <md-field class="form-data">
                  <label for="branch">BRANCH</label>
                  <md-select v-model="product.branch" name="branch" id="branch">
                    <md-option value="CSE">CSE</md-option>
                    <md-option value="ISE">ISE</md-option>
                    <md-option value="MECH">MECH</md-option>
                    <md-option value="EEE">EEE</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label for="donation">DONATE</label>
                  <md-select v-model="product.donation" name="donation" id="donation">
                    <md-option value="1">YES</md-option>
                    <md-option value="0">NO</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label>IMAGE</label>
                  <md-file v-model="product.image" name="image" id="image" accept="image/*" />
                </md-field>
                 
                <span>
                  <md-button v-show="product.title && product.author && product.publisher && product.sem && product.branch && product.donation && product.image" v-on:click="saveBook" class="md-dense md-raised md-primary">SUBMIT</md-button>
                  <md-button v-on:click="newProduct" class="md-dense md-raised md-primary">CLEAR</md-button>
                </span>

              </form>
            </div>
          </md-tab>

          <md-tab md-label="LINK">
            <div v-if="!submitted">
              <form class="md-layout">

                <md-field class="form-data">
                  <label for="title">TITLE</label>
                  <md-input name="title" id="title" v-model="product.title"></md-input>
                </md-field>

                <md-field class="form-data">
                  <label for="url">LINK</label>
                  <md-input name="url" id="url" v-model="product.url"></md-input>
                </md-field>

                <md-field class="form-data">
                  <label for="description">DESCRIPTION</label>
                  <md-input name="description" id="description" v-model="product.description"></md-input>
                </md-field>

                <md-field class="form-data">
                  <label for="sem">SEM</label>
                  <md-select v-model="product.sem" name="sem" id="sem">
                    <md-option value="1">1</md-option>
                    <md-option value="2">2</md-option>
                    <md-option value="3">3</md-option>
                    <md-option value="4">4</md-option>
                  </md-select>
                </md-field>
                
                <md-field class="form-data">
                  <label for="branch">BRANCH</label>
                  <md-select v-model="product.branch" name="branch" id="branch">
                    <md-option value="CSE">CSE</md-option>
                    <md-option value="ISE">ISE</md-option>
                    <md-option value="MECH">MECH</md-option>
                    <md-option value="EEE">EEE</md-option>
                  </md-select>
                </md-field>
                
                <span>
                  <md-button v-show="product.title && product.url && product.description && product.sem && product.branch" v-on:click="saveDrive" class="md-dense md-raised md-primary">SUBMIT</md-button>
                  <md-button v-on:click="newProduct" class="md-dense md-raised md-primary">CLEAR</md-button>
                </span>

              </form>
            </div>
          </md-tab>

          <md-tab md-label="OTHERS">
            <div v-if="!submitted">
              <form class="md-layout">

                <md-field class="form-data">
                  <label for="title">TITLE</label>
                  <md-input name="title" id="title" v-model="product.title"></md-input>
                </md-field>

                <md-field class="form-data">
                  <label for="description">DESCRIPTION</label>
                  <md-input name="description" id="description" v-model="product.description"></md-input>
                </md-field>

                <md-field class="form-data">
                  <label for="sem">SEM</label>
                  <md-select v-model="product.sem" name="sem" id="sem">
                    <md-option value="1">1</md-option>
                    <md-option value="2">2</md-option>
                    <md-option value="3">3</md-option>
                    <md-option value="4">4</md-option>
                  </md-select>
                </md-field>
                
                <md-field class="form-data">
                  <label for="branch">BRANCH</label>
                  <md-select v-model="product.branch" name="branch" id="branch">
                    <md-option value="CSE">CSE</md-option>
                    <md-option value="ISE">ISE</md-option>
                    <md-option value="MECH">MECH</md-option>
                    <md-option value="EEE">EEE</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label for="donation">DONATE</label>
                  <md-select v-model="product.donation" name="donation" id="donation">
                    <md-option value="1">YES</md-option>
                    <md-option value="0">NO</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label>IMAGE</label>
                  <md-file v-model="product.image" name="image" id="image" accept="image/*" />
                </md-field>
                
                <span>
                  <md-button v-show="product.title && product.description && product.sem && product.branch && product.donation && product.image" v-on:click="saveOther" class="md-dense md-raised md-primary">SUBMIT</md-button>
                  <md-button v-on:click="newProduct" class="md-dense md-raised md-primary">CLEAR</md-button>
                </span>

              </form>
            </div>
          </md-tab>
        </md-tabs>

      </md-dialog-content>
    </md-dialog>
  </div>
</template>
 
<script>
import http from "../http-common";
 
export default {
  name: "add-product",
  data() {
    return {
      image: "",
      product: {
        id: 0,
        title: "",
        author: "",
        sem: null,
        branch: "",
        publisher: "",
        image: "",
        description: "",
        link: "",
        donation: null
      },
      submitted: false
    };
  },
  methods: {
    async saveBook() {
      var data = {
        title: this.product.title,
        author: this.product.author,
        sem: this.product.sem,
        branch: this.product.branch,
        publisher: this.product.publisher,
        image: this.product.image,
        donation: this.product.donation
      };
      try{
        await http
        .post("/things/upload-book", data)
        .then(response => {
          this.book.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }
      catch(err){
        console.log(err);
      }
 
      this.submitted = true;
      this.$router.push('/');
    },

    async saveDrive(){
      var data = {
        title: this.product.title,
        sem: this.product.sem,
        branch: this.product.branch,
        url: this.product.url,
        description: this.product.description
      };
      
      try{
        await http
        .post("/things/upload-drive", data)
        .then(response => {
          this.drive.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }
      catch(err){
        console.log(err);
      }
 
      this.submitted = true;
      this.$router.push('/');
    },

    async saveOther(){
      var data = {
        title: this.product.title,
        sem: this.product.sem,
        branch: this.product.branch,
        image: this.product.image,
        description: this.product.description,
        donation: this.product.donation
      };
      
      try{
        await http
        .post("/things/upload-other", data)
        .then(response => {
          this.drive.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }
      catch(err){
        console.log(err);
      }
 
      this.submitted = true;
      this.$router.push('/');
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    }
  }
};
</script>
 
<style>

#cancel-btn{
  float: right;
}

</style>