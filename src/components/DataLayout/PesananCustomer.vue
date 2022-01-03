<template>
  <v-main>
    <v-card v-if="selection==0" class="mx-4 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">
        <h1 class="text-h4 mb-1 font-weight-medium">Pesanan Customer</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Sedang Dimasak')">Sedang Dimasak</v-chip>

            <v-chip @click="read('Siap Disajikan')">Siap Disajikan</v-chip>

            <v-chip @click="read('Sudah Disajikan')">Sudah Disajikan</v-chip>
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
          <v-toolbar-title>Sedang Dimasak</v-toolbar-title>
                
          <v-divider class="mx-4" inset vertical></v-divider> 
        </v-card-title>
                        
        <v-data-table :headers="headers" :items="sedangDimasak" >
            <template v-slot:header.nama_menu="{ header }">
                {{ header.text }}
                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon small :color="nama_menu ? 'primary' : ''">
                                mdi-filter
                            </v-icon>
                        </v-btn>
                    </template>

                    <div style="background-color: white; width: 280px">
                        <v-text-field
                            v-model="nama_menu"
                            class="pa-4"
                            type="text"
                            label="Masukkan Nama Menu" >
                        </v-text-field>
                            
                        <v-btn
                            @click="nama_menu = ''"
                            small
                            text
                            color="primary"
                            class="ml-2 mb-2" >
                            Clean
                        </v-btn>
                    </div>
                </v-menu>
            </template>

            <template v-slot:header.id_table="{ header }">
                {{ header.text }}
                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon small :color="id_table ? 'primary' : ''">
                                mdi-filter
                            </v-icon>
                        </v-btn>
                    </template>

                    <div style="background-color: white; width: 280px">
                        <v-text-field
                            v-model="id_table"
                            type="number"
                            class="pa-4"
                            label="Masukkan Nomer Meja" >
                        </v-text-field>
                            
                        <v-btn
                            @click="id_table = ''"
                            small
                            text
                            color="primary"
                            class="ml-2 mb-2" >
                            Clean
                        </v-btn>
                    </div>
                </v-menu>
            </template>

            <template v-slot:[`item.avatar`]="{ item }"> 
              <v-avatar size="45" color="white" dark>
                <v-img width="45" height="45" alt="user" :src="images + 'data_menu/' + item.foto_menu"></v-img>
              </v-avatar>
            </template>

            <template v-slot:[`item.id_table`]="{ item }"> 
                Meja - {{item.id_table}}
            </template>

            <template v-slot:[`item.jumlah_item_order`]="{ item }"> 
                {{item.jumlah_item_order}} - Porsi
            </template>
              
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn outlined elevation="2" small class="ma-2 green--text text--darken-1" @click="editHandler(item,'Sedang Dimasak')"> 
                <v-icon small class="mr-2">
                  mdi-update 
                </v-icon>
                 Update Status
              </v-btn>
            </template>
        </v-data-table>
      </div>
    </v-card>

    <v-card v-if="selection==1" class="mx-4 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">
        <h1 class="text-h4 mb-1 font-weight-medium">Pesanan Customer</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Sedang Dimasak')">Sedang Dimasak</v-chip>

            <v-chip @click="read('Siap Disajikan')">Siap Disajikan</v-chip>

            <v-chip @click="read('Sudah Disajikan')">Sudah Disajikan</v-chip>
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
          <v-toolbar-title>Siap Disajikan</v-toolbar-title>
                
          <v-divider class="mx-4" inset vertical></v-divider>  
        </v-card-title>
                        
        <v-data-table :headers="headers" :items="siapDisajikan" >
            <template v-slot:header.nama_menu="{ header }">
                {{ header.text }}
                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon small :color="nama_menu ? 'primary' : ''">
                                mdi-filter
                            </v-icon>
                        </v-btn>
                    </template>

                    <div style="background-color: white; width: 280px">
                        <v-text-field
                            v-model="nama_menu"
                            class="pa-4"
                            type="text"
                            label="Masukkan Nama Menu" >
                        </v-text-field>
                            
                        <v-btn
                            @click="nama_menu = ''"
                            small
                            text
                            color="primary"
                            class="ml-2 mb-2" >
                            Clean
                        </v-btn>
                    </div>
                </v-menu>
            </template>

            <template v-slot:header.id_table="{ header }">
                {{ header.text }}
                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon small :color="id_table ? 'primary' : ''">
                                mdi-filter
                            </v-icon>
                        </v-btn>
                    </template>

                    <div style="background-color: white; width: 280px">
                        <v-text-field
                            v-model="id_table"
                            type="number"
                            class="pa-4"
                            label="Masukkan Nomer Meja" >
                        </v-text-field>
                            
                        <v-btn
                            @click="id_table = ''"
                            small
                            text
                            color="primary"
                            class="ml-2 mb-2" >
                            Clean
                        </v-btn>
                    </div>
                </v-menu>
            </template>

            <template v-slot:[`item.avatar`]="{ item }"> 
              <v-avatar size="45" color="white" dark>
                <v-img width="45" height="45" alt="user" :src="images + 'data_menu/' + item.foto_menu"></v-img>
              </v-avatar>
            </template>

            <template v-slot:[`item.id_table`]="{ item }"> 
                Meja - {{item.id_table}}
            </template>

            <template v-slot:[`item.jumlah_item_order`]="{ item }"> 
                {{item.jumlah_item_order}} - Porsi
            </template>
              
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn outlined elevation="2" small class="ma-2 green--text text--darken-1" @click="editHandler(item,'Siap Disajikan')"> 
                <v-icon small class="mr-2">
                  mdi-update 
                </v-icon>
                 Update Status
              </v-btn>
            </template>
        </v-data-table>
      </div>
    </v-card>

    <v-card v-if="selection==2" class="mx-4 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">
        <h1 class="text-h4 mb-1 font-weight-medium">Pesanan Customer</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Sedang Dimasak')">Sedang Dimasak</v-chip>

            <v-chip @click="read('Siap Disajikan')">Siap Disajikan</v-chip>

            <v-chip @click="read('Sudah Disajikan')">Sudah Disajikan</v-chip>
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
          <v-toolbar-title>Sudah Disajikan</v-toolbar-title>
                
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-card-title>
                        
        <v-data-table :headers="headers" :items="sudahDisajikan" >
            <template v-slot:header.nama_menu="{ header }">
                {{ header.text }}
                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon small :color="nama_menu ? 'primary' : ''">
                                mdi-filter
                            </v-icon>
                        </v-btn>
                    </template>

                    <div style="background-color: white; width: 280px">
                        <v-text-field
                            v-model="nama_menu"
                            class="pa-4"
                            type="text"
                            label="Masukkan Nama Menu" >
                        </v-text-field>
                            
                        <v-btn
                            @click="nama_menu = ''"
                            small
                            text
                            color="primary"
                            class="ml-2 mb-2" >
                            Clean
                        </v-btn>
                    </div>
                </v-menu>
            </template>

            <template v-slot:header.id_table="{ header }">
                {{ header.text }}
                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon small :color="id_table ? 'primary' : ''">
                                mdi-filter
                            </v-icon>
                        </v-btn>
                    </template>

                    <div style="background-color: white; width: 280px">
                        <v-text-field
                            v-model="id_table"
                            type="number"
                            class="pa-4"
                            label="Masukkan Nomer Meja" >
                        </v-text-field>
                            
                        <v-btn
                            @click="id_table = ''"
                            small
                            text
                            color="primary"
                            class="ml-2 mb-2" >
                            Clean
                        </v-btn>
                    </div>
                </v-menu>
            </template>
            
            <template v-slot:[`item.avatar`]="{ item }"> 
              <v-avatar size="45" color="white" dark>
                <v-img width="45" height="45" alt="user" :src="images + 'data_menu/' + item.foto_menu"></v-img>
              </v-avatar>
            </template>

            <template v-slot:[`item.id_table`]="{ item }"> 
                Meja - {{item.id_table}}
            </template>

            <template v-slot:[`item.jumlah_item_order`]="{ item }"> 
                {{item.jumlah_item_order}} - Porsi
            </template>
              
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn outlined elevation="2" small class="ma-2 green--text text--darken-1" @click="editHandler(item,'Sudah Disajikan')"> 
                <v-icon small class="mr-2">
                  mdi-update 
                </v-icon>
                 Update Status
              </v-btn>
            </template>
        </v-data-table>
      </div>
    </v-card>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>

        <v-card-text class="black--text">
          Anda yakin ingin {{inputType}} ini?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" :loading="loadingButton" text @click="dialogConfirm = false, loadingButton = false">
            Cancel
          </v-btn>

          <v-btn  :loading="loadingButton" color="blue darken-2" text @click="updateStatus(setStatus)">
            Ya
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
    name: "PesananCustomer",
    data(){
      return{
        loadingButton:false,
        loading: true,
        load: false,
        snackbar: false,
        error_message: '',  
        color: '',
        selection: 0,
        sedangDimasak:[],
        siapDisajikan:[],
        sudahDisajikan:[],
        nama_menu: '',
        id_table: '',
        images: this.$image,   
        editId:'',
        inputType:'',
        readAction:'',
        setStatus:'',
        dialogConfirm: false,
      };
    },

    methods: {
      readDataPesananByStatus(statusPesanan) {
        var url = this.$api + '/getOrderFixForEmployee/detailOrder/' + statusPesanan;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          if(statusPesanan == 1){
            this.sedangDimasak = response.data.data
          }
          else if(statusPesanan == 2){
            this.siapDisajikan = response.data.data
          }
          else{
            this.sudahDisajikan = response.data.data
          }
        }).finally(() => {
          this.loading = false;
        })
      },
      read(setAction){
        this.loading = true;
        if(setAction == 'Sedang Dimasak'){
          this.sedangDimasak = [];
          this.readDataPesananByStatus(1); //mengambil data
        } else if(setAction == 'Siap Disajikan'){
          this.siapDisajikan = [];
          this.readDataPesananByStatus(2); //mengambil data
        }else if(setAction == 'Sudah Disajikan'){
          this.sudahDisajikan = [];
          this.readDataPesananByStatus(3); //mengambil data
        }
      },
      updateStatus(status) {
        this.loadingButton= true;
         
        var url = this.$api + '/updateStatus/detailOrder/' + this.editId + '/' + status; //data dihapus berdasarkan id
        this.$http.put(url, null,{
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
          this.loading = true;
          this.dialogConfirm = false;
          this.read(this.readAction);
          this.loadingButton= false;
        }) 
      },
      editHandler(item, set){
        this.editId = item.id;
        this.readAction = set;
        this.inputType = 'Mengedit Status Menu Pesanan ' + item.nama_menu + ', Meja ' + item.id_table;
        this.dialogConfirm = true;

        if(set == 'Sedang Dimasak'){
            this.setStatus = 2;
        } else if(set == 'Siap Disajikan'){
            this.setStatus = 3;
        }else if(set == 'Sudah Disajikan'){
            this.setStatus = 1;
        }
      },
    },

    computed: {
        headers(){
            return [
                { text: "", value: "avatar", align: "center" },
                { text: "Nama Menu", 
                    align: "center", 
                    sortable: true, 
                    value: "nama_menu",
                    filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'nama_menu' ].toLowerCase() ) }
                },
                { text: "No. Meja",
                    value: "id_table", 
                    align: "center" ,
                    filter: value => {
                        if (!this.id_table) return true;
                        return value == parseInt(this.id_table);
                    }
                }, 
                { text: "Jumlah Pesanan", value: "jumlah_item_order", align: "center" }, 
                { text: "Actions", value: "actions" , align: "center"}, 
            ]
        } 
    },

    mounted() {
      this.read('Sedang Dimasak'); 
    },
};
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
    
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

    .headerClass{ 
      margin-top: -20px;
      margin-bottom: -20px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 25px !important;
      justify-content: center;
      color: rgb(10, 28, 66);
    }

    .v-sheet--offset {
        top: -24px;
        position: relative;
    }

    .subText{
      font-family: 'Josefin Sans', sans-serif;
      font-size: 18px !important;
      color: rgb(10, 28, 66);
    }

    .subTextOne{ 
      text-align:left;
      margin-top: -30px;
      margin-bottom: -35px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 18px !important;
      color: rgb(10, 28, 66);
    }
    
    .subTextTwo{ 
      text-align:right;
      margin-top: -30px;
      margin-bottom: -35px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 18px !important;
      color: rgb(10, 28, 66);
    }
</style> 
