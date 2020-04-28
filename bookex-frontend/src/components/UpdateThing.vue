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
                    <form novalidate class="md-layout">
                
                        <md-field class="form-data">
                        <label for="title">TITLE</label>
                        <md-input name="title" id="title" v-model="product.title"></md-input>
                        </md-field>

                        <md-field class="form-data">
                        <label for="author">AUTHOR</label>
                        <md-input name="author" id="author" v-model="product.book.author"></md-input>
                        </md-field>

                        <md-field class="form-data">
                        <label for="publisher">PUBLISHER</label>
                        <md-input name="publisher" id="publisher" v-model="product.book.publisher"></md-input>
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
                        <label>IMAGE</label>
                        <md-file v-model="product.book.image" name="image" id="image" accept="image/*" />
                        </md-field>
                        
                        <md-button v-on:click="updateBook(product.id)" class="md-dense md-raised md-primary">UPDATE</md-button>

                    </form>
                </div>

                <div v-if="product.drive">
                    <form novalidate class="md-layout">

                        <md-field class="form-data">
                        <label for="title">TITLE</label>
                        <md-input name="title" id="title" v-model="product.title"></md-input>
                        </md-field>

                        <md-field class="form-data">
                        <label for="url">LINK</label>
                        <md-input name="url" id="url" v-model="product.drive.url"></md-input>
                        </md-field>

                        <md-field class="form-data">
                        <label for="description">DESCRIPTION</label>
                        <md-input name="description" id="description" v-model="product.drive.description"></md-input>
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
                        
                        <md-button v-on:click="updateDrive(product.id)" class="md-dense md-raised md-primary">UPDATE</md-button>

                    </form>
                </div>
                
                <div v-if="product.other">
                    <form novalidate class="md-layout">

                        <md-field class="form-data">
                        <label for="title">TITLE</label>
                        <md-input name="title" id="title" v-model="product.title"></md-input>
                        </md-field>

                        <md-field class="form-data">
                        <label for="description">DESCRIPTION</label>
                        <md-input name="description" id="description" v-model="product.other.description"></md-input>
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
                            <label>IMAGE</label>
                            <md-file v-model="product.other.image" name="image" id="image" accept="image/*" />
                        </md-field>
                        
                        <md-button v-on:click="updateOther(product.id)" class="md-dense md-raised md-primary">UPDATE</md-button>

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
                    this.product = response.data; // JSON are parsed automatically.
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
        async updateBook(id){
            var data = {
                title: this.product.title,
                author: this.product.book.author,
                sem: this.product.sem,
                branch: this.product.branch,
                publisher: this.product.book.publisher,
                image: this.product.book.image,
                type: 'book'
            }
            try{
                await http
                .put("/things/"+id,data)
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
            this.$router.push('/');
        },
        async updateDrive(id){
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
                .put("/things/"+id,data)
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
            this.$router.push('/');
        },
        async updateOther(id){
            var data = {
                title: this.product.title,
                sem: this.product.sem,
                branch: this.product.branch,
                description: this.product.other.description,
                image: this.product.other.image,
                type: 'other'
            }
            try{
                await http
                .put("/things/"+id,data)
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
            this.$router.push('/');
        }

  },
  mounted() {
    this.retrieveProduct();
  }
};
</script>

<style>


</style>