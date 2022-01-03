<!-- @format --> 
<template>
    <div class="Login">
        <div class="bg"></div>

        <v-container fluid fill-height class="posisinya px-16">
            <v-layout flex justify-center align-center>
                <v-row no-gutters>
                    <v-col cols="12" sm="5">
                        <h2> 
                            <img height="200" src="../assets/logo.png">
                        </h2>
                        <div class="content mt-n10">
                            <div class="textbox">
                                <h2>Welcome To<br><span>Atma Korean BBQ</span></h2>
                            </div>
                        </div>
                    </v-col>
                    
                    <v-col cols="12" sm="7">
                        <v-card class="px-16">
                            <v-card-text>
                                <div>
                                    <div class="text-center">
                                        <h3 class="grey-text mb-7 font-weight-bold">
                                            <strong>LOG</strong> 
                                            <a class="red-text font-weight-bold"><strong>IN</strong></a>
                                        </h3>
                                    </div>

                                    <v-form v-model="valid" ref="form">
                                        <v-text-field 
                                            class="mx-16" 
                                            label="Email" 
                                            v-model="email" 
                                            :rules="emailRules" 
                                            filled
                                            required
                                            rounded>
                                        </v-text-field>

                                        <v-text-field 
                                            class="mx-16" 
                                            label="Password" 
                                            v-model="password"
                                            min="6" 
                                            :rules="passwordRules" 
                                            counter 
                                            filled
                                            required
                                            rounded
                                            @click:append="show = !show"
                                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show ? 'text' : 'password'">
                                        </v-text-field>

                                        <v-layout class="my-7" justify-center>
                                            <v-btn :loading="loadingButton" class="mx-2" @click="submit" :class="{ 'red darken-1 white--text' : valid, disabled: !valid }">
                                                Login
                                            </v-btn>
                                            
                                            <v-btn  @click="clear" class="mx-2 grey darken-3 white--text">
                                                Clear
                                            </v-btn>
                                        </v-layout>
                                    </v-form>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>
                    {{error_message}} 
                </v-snackbar>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loadingButton:false,
                show: false,
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                password: '',
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong :(',
                ],
                email: '',
                emailRules: [
                    (v) => !!v || 'E-mail tidak boleh kosong :(',
                    (v) => /.+@.+\..+/.test(v) || 'E-mail tidak valid :(',
                ],
            }; 
        },
        
        methods: {
            submit() {
                this.loadingButton= true;
                /*localStorage.removeItem('token');
                localStorage.removeItem('id');
                localStorage.removeItem('role');*/
                if (this.$refs.form.validate()) { //cek apakah data yang akan dikirim sudah valid
                    this.load = true
                    this.$http.post(this.$api + '/login', {
                        email: this.email,
                        password: this.password
                    }).then(response => {
                        localStorage.setItem('id', response.data.user.id); //menyimpan id user yang sedang login
                        localStorage.setItem('role', response.data.user.jabatan_pegawai);
                        localStorage.setItem('token', response.data.access_token);
                        //menyimpan auth token
                        this.loadingButton= false;
                        this.error_message=response.data.message; 
                        this.color="green"
                        this.snackbar=true;
                        this.load = false;
                        this.clear();
                        this.$router.push({
                            name: 'DashboardLayout'
                        });
                    }).catch(error => {
                        this.error_message=error.response.data.message;
                        this.color="red"
                        this.loadingButton= false;
                        this.snackbar=true;
                        localStorage.removeItem('token')
                        this.load = false
                    })
                }
            },
            clear() {
                this.$refs.form.reset() //Clear form login
            }
        }, 
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,200;1,300;1,400&display=swap');

    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    .posisinya{
        align-content: center;
        position: fixed;
        top: 20px;
        left: 0px;
        right: 0px;
    }

    .content{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
        margin-bottom: 100px;
    }

    .content .textbox{
        position: relative;
        max-width: 700px;
    }

    .content .textbox h2{
        color:rgb(255, 255, 255);
        font-size: 4em;
        line-height: 1.4em;
        font-weight: 500;
        text-shadow: 6px 6px #000000;
    }

    .content .textbox h2 span{
        color: #ff6666;
        font-size: 1.2em;
        font-weight: 900;
    }
    
    .bg {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: url('../assets/bg.jpg') no-repeat center center;
        background-size: cover;
        background-color: rgb(0, 0, 0);
        transform: scale(1);
        filter: brightness(50%) blur(2px);
    }
</style>