<!-- @format --> 

<template>
    <v-main class="customer">
        <v-card v-if="selection == 0" class="mx-16 mt-10 px-5">
            <v-sheet
                class="v-sheet--offset mx-auto"
                color="#B2D0DA"
                elevation="8"
                max-width="calc(100% - 32px)">
                <h3 class="text-h4 font-weight-medium mb-1">Customers</h3>
                    
                <div style="display: flex; justify-content: center;">
                    <v-chip-group
                        v-model="selection"
                        active-class="red lighten-1 white--text"
                        column mandatory>
                    <v-chip @click="read('Customers Aktif')">Customers Aktif</v-chip>
                
                    <v-chip @click="read('Customers Hapus')">Customers Hapus</v-chip>
                </v-chip-group>
                </div>
            </v-sheet>

            <div v-if="loading == true" class="pa-5">
                <v-progress-circular
                    :size="100"
                    :width="5"
                    color="#d35d6e"
                    indeterminate>
                </v-progress-circular>
            </div>

            <div  v-else >
                <v-card-title>
                    <v-toolbar-title>Costumer Aktif</v-toolbar-title>
                    
                    <v-divider class="mx-4" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>

                    <v-spacer v-if="!customersAktif || !customersAktif.length"></v-spacer>

                    <v-text-field 
                        v-else 
                        v-model="searchAktif"
                        outlined
                        clearable 
                        hide-details 
                        prepend-inner-icon="mdi-magnify" 
                        label="Search">
                    </v-text-field>

                    <v-spacer></v-spacer>

                    <v-btn color="primary" dark @click="dialog = true">
                        Tambah
                    </v-btn>
                </v-card-title>
                
                <v-data-table sort-by="nama_customer" :headers="headers" :items="customersAktif" :search="searchAktif" >
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn outlined elevation="2" small class="ma-2 green--text" @click="editHandler(item)"> 
                            <v-icon small class="mr-2">
                                mdi-pencil 
                            </v-icon>
                            Edit
                        </v-btn>

                        <v-btn outlined elevation="2" small class="ma-2 red--text" @click="deleteHandler(item.id)"> 
                            <v-icon small class="mr-2">
                                mdi-delete 
                            </v-icon>
                            Delete
                        </v-btn>
                    </template>
                </v-data-table>
            </div>
        </v-card>

        <v-card v-if="selection==1" class="mx-16 mt-10 px-5">
            <v-sheet
                class="v-sheet--offset mx-auto"
                color="#B2D0DA"
                elevation="8"
                max-width="calc(100% - 32px)">
                <h3 class="text-h4 font-weight-medium mb-1">Customers</h3>
                    
                <div style="display: flex; justify-content: center;">
                    <v-chip-group
                        v-model="selection"
                        active-class="red lighten-1 white--text"
                        column mandatory>
                    <v-chip @click="read('Customers Aktif')">Customers Aktif</v-chip>
                
                    <v-chip @click="read('Customers Hapus')">Customers Hapus</v-chip>
                </v-chip-group>
                </div>
            </v-sheet>

            <div v-if="loading == true" class="pa-5">
                <v-progress-circular
                    :size="100"
                    :width="5"
                    color="#d35d6e"
                    indeterminate>
                </v-progress-circular>
            </div>

            <div v-else>
                <v-card-title>
                    <v-toolbar-title>Costumer Hapus</v-toolbar-title>
                    
                    <v-divider class="mx-4" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>

                    <v-spacer v-if="!customersNonaktif || !customersNonaktif.length"></v-spacer>

                    <v-text-field 
                        v-else 
                        v-model="searchNonaktif"
                        outlined
                        clearable 
                        hide-details 
                        prepend-inner-icon="mdi-magnify" 
                        label="Search">
                    </v-text-field>
                </v-card-title>

                <v-data-table sort-by="nama_customer" :headers="headers" :items="customersNonaktif" :search="searchNonaktif">
                    <template v-slot:[`item.actions`]="{ item }"> 
                        <v-btn outlined elevation="2" small class="mx-2 deep-orange--text" @click="restoreHandler(item.id)"> 
                            <v-icon small class="mr-2">
                                mdi-refresh 
                            </v-icon>
                            Restore
                        </v-btn>
                    </template>
                </v-data-table>
            </div>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card  >
                <v-form v-model="valid" ref="form">
                    <v-card-title>
                        <span class="headline">{{ formTitle }}  Customer</span>    
                    </v-card-title>

                    <v-card-text class="px-10">
                        <v-container>
                            <v-text-field
                                v-model="form.nama_customer"
                                label="Nama Customer"
                                :rules="nameRules"
                                clearable
                                required
                                counter>
                            </v-text-field>

                            <v-text-field
                                v-model="form.email_customer"
                                label="Email Customer"
                                :rules="emailRules"
                                clearable
                                required>
                            </v-text-field>

                            <v-text-field
                                v-model="form.telepon_customer"
                                label="Telepon Customer"
                                :rules="teleponRules"
                                clearable
                                required
                                counter>
                            </v-text-field>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn :loading="loadingButton" color="red" text @click="close">
                            Cancel
                        </v-btn>

                        <v-btn :loading="loadingButton" color="blue darken-2" text @click="setForm('Customers Aktif')" :disabled="!valid">
                            Save
                        </v-btn>
                    </v-card-actions>    
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>

                <v-card-text class="black--text">
                    Anda yakin ingin {{responDelRes}} data Customer ini?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="red" :loading="loadingButton" text @click="dialogConfirm = false, loadingButton = false">
                        Cancel
                    </v-btn>

                    <v-btn :loading="loadingButton" color="blue darken-2" text @click="delResConfirm(responDelRes)">
                        {{responDelRes}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>
            {{ error_message }}
        </v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "Customer",
    data(){
        return{
            loadingButton:false,    
            loading: true,
            valid: false,
            selection: 0,
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',  
            color: '', 
            searchAktif: null,
            searchNonaktif: null,
            dialog: false,
            responDelRes:'',
            dialogConfirm: false,
            headers: [
                {   text: "Nama Customer", 
                    align: "center", 
                    sortable: true, 
                    value: "nama_customer"
                },
                { text: "Email Customer", value: "email_customer" , align: "center"}, 
                { text: "Telepon Customer", value: "telepon_customer", align: "center" },
                { text: "Actions", value: "actions" , align: "center"}, 
            ],
            customer: new FormData,
            customersAktif: [],
            customersNonaktif: [],
            form: {
                nama_customer: null,
                email_customer: null,
                telepon_customer: null,
            },
            nameRules: [
                (v) => !!v || 'Nama tidak boleh kosong :(',
                (v) => (v && v.length <= 60) || 'Name harus dibaawah 60 karakter',
            ],
            emailRules: [
                (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail tidak valid :(',
            ],
            teleponRules: [
                (v) => !v || /^(0)8[0-9]{8,11}$/.test(v) || 'Nomer Telepon tidak valid :(',
            ],
            deleteId: '',
            restoreId: '',
            editId: '' 
        };
    },
    
    methods: {
        setForm(set) {
            this.loadingButton= true;
            if (this.inputType === 'Tambah') {
                this.save(set)
            } else {
                this.update(set)
            }
        },
        //read data customer
        readData(is_deletded) {
            var url = this.$api + '/getCustom/customer/' + is_deletded;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                if(is_deletded == 0){
                    this.customersAktif = response.data.data
                }
                else{
                    this.customersNonaktif = response.data.data
                }
            }).finally(() => {
                this.loading = false;
            })
        },
        read(set){
            this.loading = true;
            if(set == 'Customers Aktif'){
                this.customersAktif= [];
                this.readData(0); //mengambil data
            }
            else{
                this.customersNonaktif= [];
                this.readData(1); //mengambil data
            }
        },
        //simpan data customer
        save(set){
            this.customer.append('nama_customer', this.form.nama_customer);
            if(this.form.email_customer != null){
                this.customer.append('email_customer', this.form.email_customer);
            }
            if(this.form.telepon_customer != null){
                this.customer.append('telepon_customer', this.form.telepon_customer);
            }

            var url = this.$api + '/store/customer'
            this.load = true
            this.$http.post(url, this.customer, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }).finally(() => {
                this.cancel();
                this.read(set);
                this.formReset();
            })
        },
        //ubah data customer
        update(set) {
            let newData = {
                nama_customer: this.form.nama_customer,
                email_customer: this.form.email_customer,
                telepon_customer: this.form.telepon_customer,
            }
            var url = this.$api + '/update/customer/' + this.editId;
            this.load = true
            this.$http.put(url, newData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }).finally(() => {
                this.cancel();
                this.read(set);
                this.formReset();
            })
        },
        delResConfirm(confirm){
          this.loadingButton= true;
          if(confirm == 'Delete'){
            this.deleteData('Customers Aktif');
          }
          else{
            this.restoreData('Customers Hapus');
          }
        },
        //hapus data customer
        deleteData(set) {
            //mengahapus data
            var url = this.$api + '/delete/customer/' + this.deleteId;
            //data dihapus berdasarkan id
            this.$http.put(url, null,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }).finally(() => {
                this.cancel();
                this.read(set);
                this.formReset();
            })
        },
        //hapus data customer
        restoreData(set) {
            //mengahapus data
            var url = this.$api + '/restore/customer/' + this.restoreId;
            //data dihapus berdasarkan id
            this.$http.put(url, null,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }).finally(() => {
                this.cancel();
                this.read(set);
                this.formReset();
            })
        },
        editHandler(item){
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form.nama_customer = item.nama_customer;
            this.form.email_customer = item.email_customer;
            this.form.telepon_customer = item.telepon_customer;
            this.dialog = true;
        },
        deleteHandler(id){
            this.deleteId = id;
            this.dialogConfirm = true;
            this.responDelRes= 'Delete'
        },
        restoreHandler(id){
            this.restoreId = id;
            this.dialogConfirm = true;
            this.responDelRes= 'Restore'
        },
        close() {
            this.valid = false
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
            this.formReset()
        },
        cancel() {
            this.loadingButton= false;
            this.loading = true;
            this.valid = false
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        formReset(){
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
            this.customer = new FormData;
        }
    },
    computed: {
        formTitle(){
            return this.inputType
        },
    },
    mounted() {
        this.read('Customers Aktif'); 
    },
};
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }

    .text{
        padding-left: 40px;
        font-family: 'Montserrat', sans-serif;
        color: rgb(43, 72, 126);
    }

    .text-menu{
        font-family: 'Poppins', sans-serif;
        font-size: 25px !important;
        color: rgb(59, 59, 59);
    }
</style> 