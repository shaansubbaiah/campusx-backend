<template>
    <div>
        <md-dialog :md-active=true>
            <md-dialog-content class="md-scrollbar">

                <md-dialog-title>
                    <md-button class="md-icon-button" id="cancel-btn">
                    <router-link to="/userproducts">
                        <md-icon>cancel</md-icon>
                    </router-link>
                    </md-button>
                </md-dialog-title>

                <div v-if="product.book">
                  <form @submit.prevent="updateBook('book',product.id)" data-vv-scope="book">

                    <md-field class="form-data">
                      <label for="title">TITLE</label>
                      <md-input
                        name="title"
                        id="title"
                        v-model="product.title"
                        v-validate="{required:true}"
                      ></md-input>
                      <div v-if="errors.has('book.title')">{{errors.first('book.title')}}</div>
                    </md-field>

                    <md-field class="form-data">
                      <label for="author">AUTHOR</label>
                      <md-input
                        name="author"
                        id="author"
                        v-model="product.book.author"
                        v-validate="{required:true, regex: /[A-Za-z]+/}"
                      ></md-input>
                      <div v-if="errors.has('book.author')">{{errors.first('book.author')}}</div>
                    </md-field>

                    <md-field class="form-data">
                      <label for="publisher">PUBLISHER</label>
                      <md-input
                        name="publisher"
                        id="publisher"
                        v-model="product.book.publisher"
                        v-validate="{required:true}"
                      ></md-input>
                      <div v-if="errors.has('book.publisher')">{{errors.first('book.publisher')}}</div>
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
                      <label for="phone">CONTACT</label>
                      <md-input
                        name="phone"
                        id="phone"
                        v-model="product.book.phone"
                        v-validate="{required:true, regex: /^(\+91( )?)?[0-9]{10}$/}"
                      ></md-input>
                      <div v-if="errors.has('book.phone')">{{errors.first('book.phone')}}</div>
                    </md-field>

                    <span>
                      <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                    </span>

                  </form>
                </div>

                <div v-if="product.drive">
                  <form @submit.prevent="updateDrive('drive',product.id)" data-vv-scope="drive">

                    <md-field class="form-data">
                      <label for="title">TITLE</label>
                      <md-input
                        name="title"
                        id="title"
                        v-model="product.title"
                        v-validate="{required:true}"
                      ></md-input>
                      <div v-if="errors.has('drive.title')">{{errors.first('drive.title')}}</div>
                    </md-field>

                    <md-field class="form-data">
                      <label for="url">LINK</label>
                      <md-input
                        name="url"
                        id="url"
                        v-model="product.drive.url"
                        v-validate="{required:true,url: {require_protocol: true }}"
                      ></md-input>
                      <div v-if="errors.has('drive.url')">{{errors.first('drive.url')}}</div>
                    </md-field>

                    <md-field class="form-data">
                      <label for="description">DESCRIPTION</label>
                      <md-input
                        name="description"
                        id="description"
                        v-model="product.drive.description"
                        v-validate="{required:true}"
                      ></md-input>
                      <div v-if="errors.has('drive.description')">{{errors.first('drive.description')}}</div>
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
                      <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                    </span>

                  </form>
                </div>

                <div v-if="product.other">
                  
                  <form @submit.prevent="updateOther('other',product.id)" data-vv-scope="other">

                    <md-field class="form-data">
                      <label for="title">TITLE</label>
                      <md-input
                        name="title"
                        id="title"
                        v-model="product.title"
                        v-validate="{required:true}"
                      ></md-input>
                      <div v-if="errors.has('other.title')">{{errors.first('other.title')}}</div>
                    </md-field>

                    <md-field class="form-data">
                      <label for="description">DESCRIPTION</label>
                      <md-input
                        name="description"
                        id="description"
                        v-model="product.other.description"
                        v-validate="{required:true}"
                      ></md-input>
                      <div v-if="errors.has('other.description')">{{errors.first('other.description')}}</div>
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
                      <label for="phone">CONTACT</label>
                      <md-input
                        name="phone"
                        id="phone"
                        v-model="product.other.phone"
                        v-validate="{required:true, regex: /^(\+91( )?)?[0-9]{10}$/}"
                      ></md-input>
                      <div v-if="errors.has('other.phone')">{{errors.first('other.phone')}}</div>
                    </md-field>

                    <span>
                      <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                    </span>

                  </form>
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
            product: {}
        };
  },
  methods: {
    async retrieveProduct() {
        let pid = this.$route.params.id;
        try{
            await http
            .get("/things/"+pid)
            .then(response => {
                this.product = response.data; 
            })
            .catch(e => {
                console.log(e);
            });
        }
        catch(err){
            console.log(err);
        }
    },
    async updateBook(scope,id){
      this.$validator.validateAll(scope).then(async isValid => {
        if (isValid) {
          var data = {
              title: this.product.title,
              author: this.product.book.author,
              sem: this.product.sem,
              branch: this.product.branch,
              publisher: this.product.book.publisher,
              donation: this.product.donation,
              type: 'book'
          }
          try{
              await http
              .put("/things/"+id,data,{ headers: { Authorization: 'Bearer ' + this.$store.state.token } })
              .then(response => {
                  console.log(response.data);
              })
              .catch(e => {
                  console.log(e);
              })
          }
          catch(err){
              console.log(err);
          }
          this.$router.push('/userproducts');
          location.reload();
        }
      });
    },
    async updateDrive(scope,id){
      this.$validator.validateAll(scope).then(async isValid => {
        if (isValid) {
          var data = {
              title: this.product.title,
              url: this.product.drive.url,
              sem: this.product.sem,
              branch: this.product.branch,
              description: this.product.drive.description,
              type: 'drive'
          }
          try{
              await http
              .put("/things/"+id,data,{ headers: { Authorization: 'Bearer ' + this.$store.state.token } })
              .then(response => {
                  this.retrieveProduct();
                  console.log(response.data);
              })
              .catch(e => {
                  console.log(e);
              })
          }
          catch(err){
              console.log(err);
          }
          this.$router.push('/userproducts');
          location.reload();
        }
      });
    },
    async updateOther(scope,id){
      this.$validator.validateAll(scope).then(async isValid => {
        if (isValid) {
          var data = {
              title: this.product.title,
              sem: this.product.sem,
              branch: this.product.branch,
              description: this.product.other.description,
              donation: this.product.donation,
              type: 'other'
          }
          try{
              await http
              .put("/things/"+id,data,{ headers: { Authorization: 'Bearer ' + this.$store.state.token } })
              .then(response => {
                  this.retrieveProduct();
                  console.log(response.data);
              })
              .catch(e => {
                  console.log(e);
              })
          }
          catch(err){
              console.log(err);
          }
          this.$router.push('/userproducts');
          location.reload();
        }
      });
    }

  },
  mounted() {
    this.retrieveProduct();
  }
};
</script>