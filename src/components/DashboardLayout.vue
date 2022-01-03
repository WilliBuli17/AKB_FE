<!-- @format -->

<template>
    <div class="dashboard">
        <v-navigation-drawer v-model="drawer" height="100%" width="300" enable-resize-watcher permanent app dark class=" lighten-3">
            <div class="bg"></div>
            <v-list-item class="mt-5 mb-5">
              <v-list-item-content>
                <v-list-item-title class="title">      
                    <v-avatar size="120" >
                        <v-img width="120" height="120" alt="user" :src="images + 'data_pegawai/' + user.foto_pegawai"></v-img>
                    </v-avatar>
                </v-list-item-title>

                <v-list-item-title class="title">
                  {{ user.nama_pegawai }}
                </v-list-item-title>
                
                <v-list-item-subtitle>{{ user.jabatan_pegawai }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list shaped >
                <v-list-item 
                    v-for="item in items" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-content class="text-menu ">
                        <p>{{ item.title }}</p>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app fixed height="100px" color="white" elevate-on-scroll>
            <!-- <v-app-bar-nav-icon large @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
            
            <VSpacer />
            <v-toolbar-title>
                <h2 class="text"> 
                    <img height="100" src="../assets/logo.png">
                    Atma Korean BBQ
                </h2>
            </v-toolbar-title>
            <VSpacer />
            
            <v-toolbar-items>
                <v-btn  :loading="loadingButton" @click="Logout" text router>
                    L<v-icon class="red--text" small>mdi-power</v-icon>g<v-icon  class="blue--text" small>mdi-power</v-icon>ut
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <div class=" px-8 py-3">
            <router-view></router-view>
        </div>

        <v-container>
            <v-footer padless>
                <v-card flat class="text-start footer">
                    <v-card-text class="grey-text text--darken-4 font-weight-bold">
                        {{ new Date().getFullYear() }} —
                        <strong>@P3L_AKB</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
        </v-container>

        <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>
            {{error_message}} 
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: "Profil",
        data() {
            return {
                loadingButton:false,
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                drawer: false,
                images: this.$image,
                user: [],
                items: [],
                itemsAdmin: [
                    { title: "Pegawai", to: "/karyawan" },
                ],
                itemsOwner: [
                    { title: "Profil", to: "/profil" },
                    { title: "Pegawai", to: "/karyawan" },
                    { title: "Laporan", to: "/laporan" },
                ],
                itemsManager: [
                    { title: "Profil", to: "/profil" },
                    { title: "Pegawai", to: "/karyawan" },
                    { title: "Customer", to: "/customer" },
                    { title: "Meja", to: "/meja" },
                    { title: "Reservasi", to: "/reservasi" },
                    { title: "Pesanan Customer", to: "/pesananCustomer" },
                    { title: "Pembayaran", to: "/pembayaran" },
                    { title: "Menu", to: "/menu" },
                    { title: "Bahan", to: "/bahan" },
                    { title: "Stock", to: "/stock" },
                    { title: "Laporan", to: "/laporan" },
                ],
                itemsCashier: [
                    { title: "Profil", to: "/profil" },
                    { title: "Customer", to: "/customer" },
                    { title: "Meja", to: "/meja" },
                    { title: "Reservasi", to: "/reservasi" },
                    { title: "Pembayaran", to: "/pembayaran" },
                ],
                itemsWaiter: [
                    { title: "Profil", to: "/profil" },
                    { title: "Customer", to: "/customer" },
                    { title: "Meja", to: "/meja" },
                    { title: "Reservasi", to: "/reservasi" },
                    { title: "Pesanan Customer", to: "/pesananCustomer" },
                ],
                itemsChef: [
                    { title: "Profil", to: "/profil" },
                    { title: "Pesanan Customer", to: "/pesananCustomer" },
                    { title: "Bahan", to: "/bahan" },
                    { title: "Stock", to: "/stock" },
                ],
            };
        },

        methods: {
            readUser() {
                var url = this.$api + '/userAktif/' + localStorage.getItem('id');
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    } 
                }).then(response => {
                    this.user = response.data.data;
                })
            },
            Logout(){
                this.loadingButton= true;
                // localStorage.removeItem('token');
                // localStorage.removeItem('id');
                // localStorage.removeItem('role');

                this.$http.post(this.$api + '/logout', null,  {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    localStorage.removeItem('role');
                    this.loadingButton= false;
                    this.error_message=response.data.message; 
                    this.color="green"
                    this.snackbar=true;
                    this.load = false;
                    this.onLoad();
                    this.$router.push({
                        name: 'Login'
                    })
                }).catch(error => {
                    this.loadingButton= false;
                    this.error_message=error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load = false
                })
            },
            onLoad(){
                if (!localStorage.getItem('token')) {
                    this.$router.push({
                        name: 'Login'
                    })
                }else{
                    this.readUser();
                    if(localStorage.getItem('role') == 'admin'){
                        this.items = this.itemsAdmin;
                    }
                    else if(localStorage.getItem('role') == 'Owner'){
                        this.items = this.itemsOwner;
                    }
                    else if(localStorage.getItem('role') == 'Operational Manager'){
                        this.items = this.itemsManager;
                    }
                    else if(localStorage.getItem('role') == 'Cashier'){
                        this.items = this.itemsCashier;
                    }
                    else if(localStorage.getItem('role') == 'Waiter'){
                        this.items = this.itemsWaiter;
                    }
                    else if(localStorage.getItem('role') == 'Chef'){
                        this.items = this.itemsChef;
                    } 
                }               
            }
        },
        
        mounted() {
            this.onLoad(); 
        },
    };
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  
    .router {
        text-decoration: none; 
    }

    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        height: 30px;
        width: 100%;
        background-color: rgb(17, 28, 43); 
    }

    .text{
        padding-left: 40px;
        font-family: 'Montserrat', sans-serif;
        color: rgb(43, 72, 126);
    }

    .text-menu{
        font-family: 'Poppins', sans-serif;
        font-size: 17px !important;
        color: rgb(255, 255, 255);
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
        filter: brightness(10%);
    }
</style> 