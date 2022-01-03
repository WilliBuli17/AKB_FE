<!-- @format --> 

<template>
  <v-main class="table">
    <v-card v-if="selection==0" class="mx-16 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">
        <h3 class="text-h4 mb-1 font-weight-medium">Meja</h3>
            
        <div  style="display: flex; justify-content: center;">
          <v-chip-group
            v-if="roleCheck == 'Operational Manager'"
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Meja Aktif')">Meja Aktif</v-chip>
        
            <v-chip @click="read('Meja Hapus')">Meja Hapus</v-chip>
        
            <v-chip>Meja Terisi</v-chip>
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
      
      <v-container v-else fluid>
        <v-data-iterator :items="filteredItemsAktif" :items-per-page.sync="AktifitemsPerPage" :page.sync="Aktifpage" :search="Aktifsearch" hide-default-footer>
          <template v-slot:header>
            <v-card-title class="mb-5" >
              <v-toolbar-title>Meja Aktif</v-toolbar-title>
              
              <v-divider class="mx-4" inset vertical></v-divider>
              
              <v-spacer></v-spacer>

              <v-spacer v-if="!mejaAktif || !mejaAktif.length"></v-spacer>

              <v-text-field v-else v-model="Aktifsearch" outlined clearable hide-details prepend-inner-icon="mdi-magnify" label="Nomer Meja"></v-text-field>
                
              <v-spacer></v-spacer>

              <v-btn color="primary" dark @click="setForm('Tambah')">
                Tambah
              </v-btn>
            </v-card-title>
          </template>
        
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="3" lg="3">
                <v-card class="ma-3" elevation="2">
                  <v-alert
                    :class="colorCard(item.status_table)"
                    border="left"
                    colored-border
                    :color="colorBorder(item.status_table)"
                    elevation="2">
                    <v-card-title class="subheading font-weight-bold justify-center">
                      Meja - {{ item.id }}

                      <v-divider vertical class="mx-3"></v-divider>

                      <div v-if="item.status_table == 0">Aktif</div>
                      <div v-if="item.status_table == 1">Non-Aktif</div>
                    </v-card-title>
                  </v-alert>
                      
                  <v-card-actions class="justify-center">
                    <v-btn width="45%" outlined elevation="2" small class="mx-2 green--text" @click="editHandler(item)"> 
                      <v-icon small class="mr-2">
                        mdi-pencil 
                      </v-icon>
                      Edit
                    </v-btn>

                    <v-btn width="45%" outlined elevation="2" small class="mx-2 red--text" @click="deleteHandler(item.id)"> 
                      <v-icon small class="mr-2">
                        mdi-delete
                      </v-icon>
                        Delete
                    </v-btn>
                  </v-card-actions>    
                </v-card>
              </v-col>
            </v-row>
          </template>
        
          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center" >
              <span class="grey--text text--darken-3">Items per page</span>

              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on" >
                    {{ AktifitemsPerPage }}

                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="(number, index) in AktifitemsPerPageArray" :key="index" @click="updateItemsPerPageAktif(number)" >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
        
              <v-spacer></v-spacer>
        
              <span class="mr-4 grey--text text--darken-3" >
                Page {{ Aktifpage }} of {{ numberOfPagesAktif }}
              </span>

              <v-icon  color="blue darken-3" class="mr-1" @click="formerPageAktif">
                mdi-chevron-left
              </v-icon>

              <v-icon color="blue darken-3" class="ml-1" @click="nextPageAktif" >
                mdi-chevron-right
              </v-icon>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>

    <v-card v-if="selection==1" class="mx-16 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">
        <h3 class="text-h4 mb-1 font-weight-medium">Meja</h3>
            
        <div  style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            v-if="roleCheck == 'Operational Manager'"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Meja Aktif')">Meja Aktif</v-chip>
        
            <v-chip @click="read('Meja Hapus')">Meja Hapus</v-chip>
        
            <v-chip>Meja Terisi</v-chip>
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

      <v-container v-else fluid>
        <v-data-iterator :items="filteredItemsNonaktif" :items-per-page.sync="NonaktifitemsPerPage" :page.sync="Nonaktifpage" :search="Nonaktifsearch" hide-default-footer>
          <template v-slot:header>
            <v-card-title class="mb-5" >
              <v-toolbar-title>Meja Hapus</v-toolbar-title>
              
              <v-divider class="mx-4" inset vertical></v-divider>
              
              <v-spacer></v-spacer>

              <v-spacer v-if="!mejaNonaktif || !mejaNonaktif.length"></v-spacer>

              <v-text-field v-else v-model="Nonaktifsearch" outlined clearable hide-details prepend-inner-icon="mdi-magnify" label="Nomer Meja"></v-text-field>
            </v-card-title>
          </template>
        
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="3" lg="3">
                <v-card class="ma-3" elevation="2">
                  <v-alert
                    class="brown darken-2"
                    border="left"
                    colored-border
                    color="brown darken-4"
                    elevation="2">
                    <v-card-title class="subheading font-weight-bold justify-center white--text">
                      Meja - {{ item.id }}

                      <v-divider vertical class="mx-3"></v-divider>

                      Dihapus
                    </v-card-title>
                  </v-alert>
                      
                  <v-card-actions class="justify-center">
                    <v-btn width="90%" outlined elevation="2" small class="mx-2 orange--text" @click="restoreHandler(item.id)"> 
                      <v-icon small class="mr-2">
                        mdi-refresh 
                      </v-icon>
                      Restore
                    </v-btn>
                  </v-card-actions>    
                </v-card>
              </v-col>
            </v-row>
          </template>
        
          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center" >
              <span class="grey--text text--darken-3">Items per page</span>

              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on" >
                    {{ NonaktifitemsPerPage }}
                        
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="(number, index) in NonaktifitemsPerPageArray" :key="index" @click="updateItemsPerPageNonaktif(number)" >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
        
              <v-spacer></v-spacer>
        
              <span class="mr-4 grey--text text--darken-3" >
                Page {{ Nonaktifpage }} of {{ numberOfPagesNonaktif }}
              </span>

              <v-icon color="blue darken-3" class="mr-1" @click="formerPageNonaktif" >
                mdi-chevron-left
              </v-icon>

              <v-icon color="blue darken-3" class="ml-1" @click="nextPageNonaktif" >
                mdi-chevron-right
              </v-icon>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>

    <v-card v-if="selection==2" class="mx-16 mt-10 px-4">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">
        <h3 class="text-h4 mb-1 font-weight-medium">Meja</h3>
            
        <div  style="display: flex; justify-content: center;">
          <v-chip-group
            v-if="roleCheck == 'Operational Manager'"
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Meja Aktif')">Meja Aktif</v-chip>
        
            <v-chip @click="read('Meja Hapus')">Meja Hapus</v-chip>
        
            <v-chip>Meja Terisi</v-chip>
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

      <v-container v-else fluid>
        <v-data-iterator :loading="SubLoading == true" loading-text="Loading... Please wait" :items="filteredItemsByReservasi" :items-per-page.sync="ByReservasiItemsPerPage" :page.sync="ByReservasipage" :search="ByReservasisearch" hide-default-footer>
          <template v-slot:header>
            <v-card-title >
              <v-toolbar-title >Meja Terisi</v-toolbar-title>
                
              <v-divider class="mx-4" inset vertical></v-divider>

              <v-spacer></v-spacer>
                
              <v-col cols="12" sm="4" md="4">
                <v-spacer v-if="!mejaByReservasi || !mejaByReservasi.length"></v-spacer>
              
                <v-text-field v-else
                  v-model="ByReservasisearch" 
                  outlined
                  clearable
                  hide-details prepend-inner-icon="mdi-magnify" 
                  label="No. Meja">
                </v-text-field>
              </v-col>

              <v-spacer></v-spacer>

              <v-form ref="form"  v-model="valid" lazy-validation>
                <v-row class="justify-end pt-7 mr-2">
                  <v-col cols="12" sm="5" md="5" class="mx-1">
                    <v-menu
                      v-model="dateInput"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.tanggalReservasi"
                          outlined
                          clearable
                          label="Tanggal Reservasi "
                          :rules="tanggalReservasiRule"
                          readonly
                          required
                          v-bind="attrs"
                          v-on="on">
                        </v-text-field>
                      </template>
                            
                      <v-date-picker
                        v-model="form.tanggalReservasi"
                        @input="dateInput = false">
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" sm="5" md="5" class="mx-2">
                    <v-autocomplete
                      v-model="form.sesiReservasi"
                      outlined
                      clearable 
                      label="Sesi Reservasi"
                      :items="sesiReservasiPicker"
                      :rules="sesiReservasiRule"
                      placeholder="Select..."
                      required>
                    </v-autocomplete>
                  </v-col>
                  
                  <v-col cols="12" sm="1" md="1" class="mt-4 mx-2">
                    <v-btn  :loading="loadingButton" :disabled="valid == false" class="success--text" color="#F5F5EC" @click="cariDataMeja">
                      <v-icon medium>
                        mdi-magnify 
                      </v-icon>
                      CARI
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-title>
          </template>
        
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.id" cols="12" sm="4" md="3" lg="3">
                <v-card class="ma-3" elevation="2">
                  <v-alert
                    :class="colorKetersediaan(item,'Card')"
                    border="left"
                    colored-border
                    :color="colorKetersediaan(item, 'Border')"
                    elevation="2">
                    <v-card-title class="subheading font-weight-bold justify-center">
                      Meja - {{ item.id }}

                      <v-divider vertical class="mx-3"></v-divider>

                      <div v-if="item.status_table == 1">Non-Aktif</div>
                      <div v-else-if="item.nama_customer == null">Kosong</div>
                      <div v-else>Terisi</div>
                    </v-card-title>
                  </v-alert>  
                </v-card>
              </v-col>
            </v-row>
          </template>
        
          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center" >
              <span class="grey--text text--darken-3">Items per page</span>

              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on" >
                    {{ ByReservasiItemsPerPage }}
                        
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="(number, index) in ByReservasiItemsPerPageArray" :key="index" @click="updateItemsPerPageByReservasi(number)" >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
        
              <v-spacer></v-spacer>
        
              <span class="mr-4 grey--text text--darken-3" >
                Page {{ ByReservasipage }} of {{ numberOfPagesByReservasi }}
              </span>

              <v-icon color="blue darken-3" class="mr-1" @click="formerPageByReservasi" >
                mdi-chevron-left
              </v-icon>

              <v-icon color="blue darken-3" class="ml-1" @click="nextPageByReservasi" >
                mdi-chevron-right
              </v-icon>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>

        <v-card-text class="black--text">
          Anda yakin ingin {{inputType}} data Meja?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" :loading="loadingButton" text @click="dialogConfirm = false, loadingButton = false">
            Cancel
          </v-btn>

          <v-btn  :loading="loadingButton" color="blue darken-2" text @click="actionConfirm(inputType)">
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
    name: "Table",
    data(){
      return{
        loadingButton:false,
        loading: true,
        SubLoading: false,
        selection: 0,
        AktifitemsPerPageArray: [12, 16, 20],
        Aktifsearch: '',
        Aktifpage: 1,
        AktifitemsPerPage: 12,
        NonaktifitemsPerPageArray: [12, 16, 20],
        Nonaktifsearch: '',
        Nonaktifpage: 1,
        NonaktifitemsPerPage: 12,
        ByReservasiItemsPerPageArray: [12, 16, 20],
        ByReservasisearch: '',
        ByReservasipage: 1,
        ByReservasiItemsPerPage: 12,
        load: false,      
        snackbar: false,
        error_message: '',  
        color: '',
        inputType: '',
        dialogConfirm: false,
        deleteId: '',
        restoreId: '',
        editId: '',
        mejaAktif: [],
        mejaNonaktif: [],
        mejaByReservasi: [],
        dateInput: false,
        valid:false,
        form: {
          tanggalReservasi: '',
          sesiReservasi: '',
        },
        sesiReservasiPicker: ['Lunch', 'Dinner'],
        sesiReservasiRule: [
          (v) => !!v || 'Sesi reservasi tidak boleh kosong :(',
        ],
        tanggalReservasiRule: [
          (v) => !!v || 'Tanggal reservasi tidak boleh kosong :(',
        ],
        roleCheck:''
      };
    },

    methods: {
      nextPageAktif () {
        if (this.Aktifpage + 1 <= this.numberOfPagesAktif) this.Aktifpage += 1
      },
      formerPageAktif () {
        if (this.Aktifpage - 1 >= 1) this.Aktifpage -= 1
      },
      updateItemsPerPageAktif (number) {
        this.AktifitemsPerPage = number
      },
      nextPageNonaktif () {
        if (this.Nonaktifpage + 1 <= this.numberOfPagesNonaktif) this.Nonaktifpage += 1
      },
      formerPageNonaktif () {
        if (this.Nonaktifpage - 1 >= 1) this.Nonaktifpage -= 1
      },
      updateItemsPerPageNonaktif (number) {
        this.NonaktifitemsPerPage = number
      },
      nextPageByReservasi () {
        if (this.ByReservasipage + 1 <= this.numberOfPagesByReservasi) this.ByReservasipage += 1
      },
      formerPageByReservasi () {
        if (this.ByReservasipage - 1 >= 1) this.ByReservasipage -= 1
      },
      updateItemsPerPageByReservasi (number) {
        this.ByReservasiItemsPerPage = number
      },
      setForm(val) {
        if (val == 'Tambah') {
          this.inputType = 'Menambah'
          this.dialogConfirm = true;
        } else {
           this.update()
        }
      },
      cariDataMeja(){
        if(this.$refs.form.validate()){
          this.loadingButton= true;
          this.mejaByReservasi = []
          this.SubLoading = true
          this.readDataReservasi(this.form.tanggalReservasi, this.form.sesiReservasi, 0);
        }
      },
      readDataReservasi(tanggal_reservasi,sesi_reservasi,is_Deleted) {
        var url = this.$api + '/getMejaByReservasi/table/' + tanggal_reservasi + 
                  '/' + sesi_reservasi + '/1/' + is_Deleted;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          this.mejaByReservasi = response.data.data
        }).finally(() => {
          this.SubLoading = false
          this.loadingButton= false;
          this.$refs.form.resetValidation();
        })
      },
      //read data table
      readData(is_deletded) {
        var url = this.$api + '/getCustomDelete/table/' + is_deletded;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          if(is_deletded == 0){
            this.mejaAktif = response.data.data
          }
          else{
            this.mejaNonaktif = response.data.data
          }
        }).finally(() => {
          this.loading = false;
        })
      },
      read(set){
        this.loading = true;
        
        if(set == 'Meja Aktif'){
          this.mejaAktif= [];
          this.readData(0); //mengambil data
        }
        else{
          this.mejaNonaktif= [];
          this.readData(1); //mengambil data
        }
      },
      //simpan data table
      save(set){
        var url = this.$api + '/store/table'
        this.load = true
        this.$http.post(url, null, {
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
          this.close();
          this.read(set); //mengambil data
        })
      },
      deleteHandler(id){
        this.deleteId = id;
        this.inputType = 'Menghapus'
        this.dialogConfirm = true;
      },
      editHandler(item){
        this.editId = item.id;
        this.inputType = 'Mengedit'
        this.dialogConfirm = true;
      },
      restoreHandler(id){
        this.restoreId = id;
        this.inputType= 'Merestore'
        this.dialogConfirm = true;
      },
      //ubah data table
      update(set) {
        var url = this.$api + '/update/table/' + this.editId;
        this.load = true
        this.$http.put(url, null, {
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
          this.close();
          this.read(set); //mengambil data
        })
      },
      actionConfirm(confirm){
        this.loadingButton= true;
        if(confirm == 'Menambah'){
          this.save('Meja Aktif');
        }
        else if(confirm == 'Menghapus'){
          this.deleteData('Meja Aktif');
        }
        else if(confirm == 'Mengedit'){
          this.update('Meja Aktif');
        }
        else if(confirm == 'Merestore'){
          this.restoreData('Meja Hapus');
        }
      },
      //hapus data table
      deleteData(set) {
        var url = this.$api + '/delete/table/' + this.deleteId; //data dihapus berdasarkan id
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
          this.close();
          this.read(set); //mengambil data
        })
      },
      //restore data table
      restoreData(set) {
        var url = this.$api + '/restore/table/' + this.restoreId; //data restore berdasarkan id
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
          this.close();
          this.read(set); //mengambil data
        })
      },
      colorBorder(valueCek){
        if(valueCek == 1 ){
          return 'black';
        }else{
          return 'green';
        }
      },
      colorCard(valueCek){
        if(valueCek == 1 ){
          return 'blue-grey darken-2 white--text';
        }else{
          return 'green lighten-5';
        }
      },
      colorKetersediaan(item, set){
        if(set == 'Card'){
          if(item.status_table == 1){
            return 'blue-grey darken-2 white--text';
          } else if(item.nama_customer == null){
            return 'green lighten-5';
          } else{
            return 'red lighten-4';
          }
        }else{
          if(item.status_table == 1){
            return 'black';
          } else if(item.nama_customer == null){
            return 'green';
          } else{
            return 'red';
          }
        }
      },
      close() {
        this.loadingButton= false;
        this.loading = true;
        this.dialogConfirm = false;
      },
    },

    computed: {
      filteredItemsAktif() {
        return this.mejaAktif.filter((i) => {
          return !this.Aktifsearch || (i.id == this.Aktifsearch);
        })
      },
      filteredItemsNonaktif() {
        return this.mejaNonaktif.filter((i) => {
          return !this.Nonaktifsearch || (i.id == this.Nonaktifsearch);
        })
      },
      filteredItemsByReservasi() {
        return this.mejaByReservasi.filter((i) => {
          return !this.ByReservasisearch || (i.id_table == this.ByReservasisearch);
        })
      },
      numberOfPagesAktif () {
        return Math.ceil(this.mejaAktif.length / this.AktifitemsPerPage)
      },
      numberOfPagesNonaktif () {
        return Math.ceil(this.mejaNonaktif.length / this.NonaktifitemsPerPage)
      },
      numberOfPagesByReservasi () {
        return Math.ceil(this.mejaByReservasi.length / this.ByReservasiItemsPerPage)
      },
    },

    mounted() {
        if(localStorage.getItem('role') == 'Operational Manager'){
          this.read('Meja Aktif'); 
          this.roleCheck = localStorage.getItem('role');
        }else{
            this.roleCheck = localStorage.getItem('role');
            this.selection = 2
            this.loading = false
        }
    },
};
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

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
      font-family: 'Josefin Sans', sans-serif;
      font-size: 30px !important;
      justify-content: center;
      color: rgb(10, 28, 66);
    }

    .v-sheet--offset {
        top: -24px;
        position: relative;
    }

    .subText{ 
      font-family: 'Josefin Sans', sans-serif;
      font-size: 20px !important;
      color: rgb(10, 28, 66);
    }
</style> 