<template>
    <div>
        <md-dialog :md-active=true>
            <md-dialog-content class="md-scrollbar">
                <md-dialog-title>LOGIN
                    <md-button class="md-icon-button" id="cancel-btn">
                        <router-link to="/">
                            <md-icon>cancel</md-icon>
                        </router-link>
                    </md-button>
                </md-dialog-title>
                <form>
                    <div v-if="!submitted">

                        <md-field class="form-data">
                            <label for="email">EMAIL</label>
                            <md-input name="email" id="email" v-model="user.email" v-validate="'required|email|max:50'"></md-input>
                            <div v-if="submitted && errors.has('email')">{{errors.first('email')}}</div>
                        </md-field>

                        <md-field class="form-data">
                            <label for="password">PASSWORD</label>
                            <md-input name="password" id="password" v-model="user.password" v-validate="'required|min:8|max:20'"></md-input>
                            <div v-if="submitted && errors.has('password')">{{errors.first('password')}}</div>
                        </md-field>

                        <md-button v-on:click="login" class="md-dense md-raised md-primary">REGISTER</md-button>
                    </div>
                </form>
            </md-dialog-content>
        </md-dialog>
    </div>
</template>

<script>
//import http from "../http-common";

export default{
    name: "Login",
    data(){
        return{
            submitted: false,
            user: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login(){
            this.submitted = true;
            this.$validator.validate().then(isValid => {
                if (isValid) {
                    console.log("valid")
                }
            });
        }
    }
}
</script>
