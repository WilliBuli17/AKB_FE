<template>
  <v-main>
    <v-card v-if="selection==0" class="mx-4 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">    
        <h1 class="text-h4 mb-1 font-weight-medium">Bahan</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Bahan Aktif', null)">Bahan Aktif</v-chip>
      
            <v-chip @click="read('Bahan Hapus', null)">Bahan Hapus</v-chip>
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
        <div  style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="subSelection"
            active-class="blue-grey darken-3 white--text"
            column mandatory>
            <v-chip @click="read('Bahan Aktif', 'Semua Bahan Aktif')">Semua Bahan Aktif</v-chip>
      
            <v-chip @click="read('Bahan Aktif', 'Bahan Tersedia')">Bahan Tersedia</v-chip>
      
            <v-chip @click="read('Bahan Aktif', 'Bahan Habis')">Bahan Habis</v-chip>
          </v-chip-group>
        </div>

        <div v-if="subSelection==0">
          <v-card-title>
            <v-toolbar-title>Semua Bahan Aktif</v-toolbar-title>
                
            <v-divider class="mx-4" inset vertical></v-divider>
                
            <v-spacer></v-spacer>

            <v-spacer v-if="!bahanAktif || !bahanAktif.length"></v-spacer>

            <v-text-field 
              v-else 
              v-model="searchBahanAktif"
              outlined
              clearable 
              hide-details 
              prepend-inner-icon="mdi-magnify" 
              label="Search">
            </v-text-field>

            <v-spacer></v-spacer>

            <v-btn color="primary" dark  @click="setAction(null,'Tambah', 'Bahan Aktif', 'Semua Bahan Aktif')">
                Tambah
            </v-btn>
          </v-card-title>
                  
          <v-data-table  :sort-by="['jenis_bahan', 'nama_bahan']" :sort-desc="[false, false]" :headers="headers" :items="bahanAktif" :search="searchBahanAktif" >
            <template v-slot:item.jenis_bahan="{ item }">
              <v-chip
                :color="getColor(item.jenis_bahan)"
                dark>
                {{ item.jenis_bahan }}
              </v-chip>
            </template>
            
            <template v-slot:item.jumlah_bahan="{ item }">
              <v-chip
                :color="getColorStock(Math.floor(item.jumlah_bahan/item.ukuran_porsi))"
                dark>
                {{ item.jumlah_bahan }}
              </v-chip>
            </template>
            
            <template v-slot:[`item.actions`]="{ item }">  
              <v-btn outlined elevation="2" small class="ma-2 green--text" @click="setAction(item,'Updated', 'Bahan Aktif', 'Semua Bahan Aktif')"> 
                <v-icon small class="mr-2">
                  mdi-pencil 
                </v-icon>
                Edit
              </v-btn>  

              <v-btn outlined elevation="2" small class="ma-2 red--text" @click="setAction(item,'Delete', 'Bahan Aktif', 'Semua Bahan Aktif')"> 
                <v-icon small class="mr-2">
                  mdi-delete 
                </v-icon>
                Delete
              </v-btn>
            </template>
          </v-data-table>
        </div>

        <div v-if="subSelection==1">
          <v-card-title>
            <v-toolbar-title>Bahan Tersedia</v-toolbar-title>
                  
            <v-divider class="mx-4" inset vertical></v-divider>
                  
            <v-spacer></v-spacer>

            <v-spacer v-if="!bahanTersedia || !bahanTersedia.length"></v-spacer>

            <v-text-field 
              v-else 
              v-model="searchBahanTersedia"
              outlined
              clearable 
              hide-details 
              prepend-inner-icon="mdi-magnify" 
              label="Search">
            </v-text-field>
          </v-card-title>
                  
          <v-data-table :sort-by="['jenis_bahan', 'nama_bahan']" :sort-desc="[false, false]" :headers="headers" :items="bahanTersedia" :search="searchBahanTersedia" >
            <template v-slot:item.jenis_bahan="{ item }">
              <v-chip
                :color="getColor(item.jenis_bahan)"
                dark>
                {{ item.jenis_bahan }}
              </v-chip>
            </template>
            
            <template v-slot:item.jumlah_bahan="{ item }">
              <v-chip
                :color="getColorStock(Math.floor(item.jumlah_bahan/item.ukuran_porsi))"
                dark>
                {{ item.jumlah_bahan }}
              </v-chip>
            </template>
            
            <template v-slot:[`item.actions`]="{ item }">  
              <v-btn outlined elevation="2" small class="ma-2 green--text" @click="setAction(item,'Updated', 'Bahan Aktif', 'Bahan Tersedia')"> 
                <v-icon small class="mr-2">
                  mdi-pencil 
                </v-icon>
                Edit
              </v-btn>  

              <v-btn outlined elevation="2" small class="ma-2 red--text" @click="setAction(item,'Delete', 'Bahan Aktif', 'Bahan Tersedia')"> 
                <v-icon small class="mr-2">
                  mdi-delete 
                </v-icon>
                Delete
              </v-btn>
            </template>
          </v-data-table>
        </div>

        <div v-if="subSelection==2">
          <v-card-title>
            <v-toolbar-title>Bahan Habis</v-toolbar-title>
                  
            <v-divider class="mx-4" inset vertical></v-divider>
                  
            <v-spacer></v-spacer>

            <v-spacer v-if="!bahanHabis || !bahanHabis.length"></v-spacer>

            <v-text-field 
              v-else 
              v-model="searchBahanHabis"
              outlined
              clearable 
              hide-details 
              prepend-inner-icon="mdi-magnify" 
              label="Search">
            </v-text-field>
          </v-card-title>
                  
          <v-data-table :sort-by="['jenis_bahan', 'nama_bahan']" :sort-desc="[false, false]" :headers="headers" :items="bahanHabis" :search="searchBahanHabis" >
            <template v-slot:item.jenis_bahan="{ item }">
              <v-chip
                :color="getColor(item.jenis_bahan)"
                dark>
                {{ item.jenis_bahan }}
              </v-chip>
            </template>
            
            <template v-slot:item.jumlah_bahan="{ item }">
              <v-chip
                :color="getColorStock(Math.floor(item.jumlah_bahan/item.ukuran_porsi))"
                dark>
                {{ item.jumlah_bahan }}
              </v-chip>
            </template>
            
            <template v-slot:[`item.actions`]="{ item }">  
              <v-btn outlined elevation="2" small class="ma-2 green--text" @click="setAction(item,'Updated', 'Bahan Aktif', 'Bahan Habis')"> 
                <v-icon small class="mr-2">
                  mdi-pencil 
                </v-icon>
                Edit
              </v-btn>  

              <v-btn outlined elevation="2" small class="ma-2 red--text" @click="setAction(item,'Delete', 'Bahan Aktif', 'Bahan Habis')"> 
                <v-icon small class="mr-2">
                  mdi-delete 
                </v-icon>
                Delete
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-card>

    <v-card v-if="selection==1" class="mx-4 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">    
        <h1 class="text-h4 mb-1 font-weight-medium">Bahan</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Bahan Aktif', null)">Bahan Aktif</v-chip>
      
            <v-chip @click="read('Bahan Hapus', null)">Bahan Hapus</v-chip>
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
          <v-toolbar-title>Bahan Hapus</v-toolbar-title>
              
          <v-divider class="mx-4" inset vertical></v-divider>
              
          <v-spacer></v-spacer>

          <v-spacer v-if="!bahanHapus|| !bahanHapus.length"></v-spacer>

          <v-text-field 
            v-else 
            v-model="searchBahanHapus"
            outlined
            clearable 
            hide-details 
            prepend-inner-icon="mdi-magnify" 
            label="Search"
          ></v-text-field>
        </v-card-title>
              
        <v-data-table :sort-by="['jenis_bahan', 'nama_bahan']" :sort-desc="[false, false]" :headers="headers" :items="bahanHapus" :search="searchBahanHapus" >
          <template v-slot:item.jenis_bahan="{ item }">
            <v-chip
              :color="getColor(item.jenis_bahan)"
              dark>
              {{ item.jenis_bahan }}
            </v-chip>
          </template>
            
          <template v-slot:item.jumlah_bahan="{ item }">
            <v-chip
              :color="getColorStock(Math.floor(item.jumlah_bahan/item.ukuran_porsi))"
              dark>
              {{ item.jumlah_bahan }}
            </v-chip>
          </template>
            
          <template v-slot:[`item.actions`]="{ item }">  
              <v-btn outlined elevation="2" small class="ma-2 orange--text" @click="setAction(item,'Restore', 'Bahan Hapus', null)"> 
                <v-icon small class="mr-2">
                  mdi-refresh 
                </v-icon>
                Restore
              </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card  class="pa-5">
        <v-card-title class="justify-center headerClass">
          {{status}} Bahan
        </v-card-title>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" class="px-8">
                <v-text-field
                  v-model="form.nama_bahan"
                  label="Nama Bahan"
                  :rules="namaBahanRules"
                  required
                  counter>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6" class="px-8">
                <v-autocomplete
                  v-model="form.jenis_bahan"
                  label="Jenis Bahan"
                  :items="jenisBahan"
                  :rules="jenisBahanRule"
                  placeholder="Select..."
                  required>
                </v-autocomplete>
              </v-col>
            </v-row>

            <v-row  class="mt-5">
              <v-col cols="12" md="4" class="px-8">
                <v-autocomplete
                  v-model="form.satuan_bahan"
                  label=" Satuan Bahan"
                  :items="satuanBahan"
                  :rules="satuanBahanRule"
                  placeholder="Select..."
                  required>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" md="4" class="px-8">
                <v-autocomplete
                  v-model="form.total_berat_bersih"
                  label="Presentase Berat Bersih"
                  :items="totalBeratBersih"
                  :rules="totalBeratBersihRule"
                  placeholder="Select..."
                  type="number"
                  suffix="%"
                  required>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" md="4" class="px-8">
                <v-text-field
                  v-model="form.ukuran_porsi"
                  label=" Ukuran Porsi"
                  :rules="ukuranPorsiRule"
                  type="number"
                  suffix="gram/ml/bottle"
                  required>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn :loading="loadingButton" color="red" text class="mx-2" @click="close" >
              Cancel
            </v-btn>
              
            <v-btn :loading="loadingButton" color="primary" text :disabled="valid == false" class="mx-2" @click="saveStoreUpdated(status)" >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
      
    <v-dialog v-model="dialogConfirmDelRes" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>

        <v-card-text>
          Anda yakin ingin {{status}} data Bahan ini?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" :loading="loadingButton" text  @click="dialogConfirmDelRes = false, loadingButton = false">
            Cancel
          </v-btn>

          <v-btn :loading="loadingButton" color="blue" text @click="delResConfirm(status)">
            {{status}}
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
    name: "Bahan",
    data(){
      return{
        loadingButton:false,
        loading: true,
        load: false,
        snackbar: false,
        error_message: '',  
        color: '',
        selection: 0,
        subSelection:0,
        bahanAktif:[],
        searchBahanAktif: '',
        bahanTersedia:[],
        searchBahanTersedia: '',
        bahanHabis:[],
        searchBahanHabis: '',
        bahanHapus:[],
        searchBahanHapus: '',
        dialog: false,
        headers: [
          { text: "Nama Bahan", 
            align: "center", 
            sortable: true, 
            value: "nama_bahan"
          },
          { text: "Jenis Bahan", value: "jenis_bahan" , align: "center"}, 
          { text: "Jumlah Bahan (Berat Bersih)", value: "jumlah_bahan" , align: "center"},
          { text: "Satuan Bahan", value: "satuan_bahan" }, 
          { text: "Presentase Berat Bersih (%)", value: "total_berat_bersih" , align: "center"},
          { text: "Ukuran Porsi", value: "ukuran_porsi" , align: "center"},
          { text: "Actions", value: "actions" , align: "center"}, 
        ],
        form: {
          nama_bahan: '',
          jenis_bahan: '',
          total_berat_bersih: '',
          ukuran_porsi: '',
          satuan_bahan: '',
        },
        namaBahanRules: [
          (v) => !!v || 'Nama Bahan tidak boleh kosong :(',
          (v) => (v && v.length <= 60) || 'Nama Bahan harus dibaawah 60 karakter',
        ],
        jenisBahan: ['Makanan Utama', 'Side Dish', 'Minuman'],
        jenisBahanRule: [
          (v) => !!v || 'Jenis Bahan tidak boleh kosong :(',
        ],
        totalBeratBersih: [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5],
        totalBeratBersihRule: [
          (v) => !!v || 'Presentase Berat Bersih tidak boleh kosong :(',
        ],
        satuanBahan: ['gram', 'ml', 'Bottle'],
        satuanBahanRule: [
          (v) => !!v || 'Satuan Bahan tidak boleh kosong :(',
        ],
        jumlahbahanRule: [
          (v) => !!v || 'Jumlah Bahan tidak valid :(',
          (v) =>  (v && /^[0-9]*$/.test(v)) || 'Jumlah Bahan minimal 0 dan bilangan real :(',
        ],
        ukuranPorsiRule: [
          (v) => !!v || 'Ukuran Porsi tidak valid :(',
          (v) =>  (v && /^[0-9]*$/.test(v)) || 'Ukuran Porsi  minimal 0 dan bilangan real :(',
        ],
        valid: false,
        status:'',
        deleteId: '',
        restoreId: '',
        editId: '',
        bahan: new FormData,
        dialogConfirmDelRes: false,
        readActOne: null,
        readActTwo: null,
      };
    },

    methods: {
      getColor (value) {
        if (value == "Makanan Utama") return 'red'
        else if (value == "Minuman") return 'green'
        else return 'blue'
      },
      getColorStock (value) {
        if (value > 5) return 'teal'
        if (value <= 5 && value > 0) return 'orange'
        else return 'red'
      },
      setAction(item, set, setOne, setTwo) {
        this.readActOne = setOne;
        this.readActTwo = setTwo;

        if(set == 'Tambah'){
          this.status = set;
          this.dialog = true;
        }
        else if(set == 'Updated'){ 
          this.form = {
            nama_bahan: item.nama_bahan,
            jenis_bahan: item.jenis_bahan,
            total_berat_bersih: item.total_berat_bersih,
            ukuran_porsi: item.ukuran_porsi,
            satuan_bahan: item.satuan_bahan,
          };
          this.editId = item.id;
          this.status = set;
          this.dialog = true;
        }
        else if(set == 'Delete'){
          this.status = set;
          this.deleteId = item.id;
          this.dialogConfirmDelRes = true
        }
        else if(set == 'Restore'){
          this.status = set;
          this.restoreId = item.id;
          this.dialogConfirmDelRes = true
        }
      },
      saveStoreUpdated(set){
        if(this.$refs.form.validate()){
          this.loadingButton= true;
          if(set == 'Tambah'){
            this.save();
          } 
          else if(set == 'Updated'){
            this.update();
          }
        }
      },
      read(setOne, setTwo){
        this.loading = true;
        if(setOne == 'Bahan Aktif'){
          if(setTwo == null || setTwo == 'Semua Bahan Aktif'){
            this.subSelection = 0;
            this.bahanAktif= [];
            this.readBahanByStatus(0);
          } else if(setTwo == 'Bahan Tersedia'){
            this.bahanTersedia= [];
            this.readBahanByJumlah(1);
          } else if(setTwo == 'Bahan Habis'){
            this.bahanHabis= [];
            this.readBahanByJumlah(0);
          }
        } else{
          this.bahanHapus= [];
          this.readBahanByStatus(1);
        }
      },
      readBahanByJumlah(check){
        var url = this.$api + '/getCustomByJumlah/bahan/0/' + check;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          if(check ==1){
            this.bahanTersedia = response.data.data
          }else{
            this.bahanHabis = response.data.data
          }
        }).finally(() => {
            this.loading = false
        })
      },
      readBahanByStatus(is_Deleted){
        var url = this.$api + '/getCustomStatus/bahan/' + is_Deleted;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          if(is_Deleted == 1){
            this.bahanHapus = response.data.data
          }else{
            this.bahanAktif = response.data.data
          }
        }).finally(() => {
            this.loading = false
        })
      },
      //simpan data bahan
      save(){
        this.bahan.append('nama_bahan', this.form.nama_bahan);
        this.bahan.append('jenis_bahan', this.form.jenis_bahan);
        this.bahan.append('total_berat_bersih', this.form.total_berat_bersih);
        this.bahan.append('ukuran_porsi', this.form.ukuran_porsi);
        this.bahan.append('satuan_bahan', this.form.satuan_bahan);

        var url = this.$api + '/store/bahan'
        this.load = true
        this.$http.post(url, this.bahan, {
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
          this.cancle();
        })
      },
      //simpan data bahan
      update(){
        let newData = {
          nama_bahan: this.form.nama_bahan,
          jenis_bahan: this.form.jenis_bahan,
          total_berat_bersih: this.form.total_berat_bersih,
          ukuran_porsi: this.form.ukuran_porsi,
          satuan_bahan: this.form.satuan_bahan,
        }
        var url = this.$api + '/update/bahan/' + this.editId;
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
        }).catch(error => {
          this.error_message=error.response.data.message;
          this.color="red"
          this.snackbar=true;
          this.load = false;
        }).finally(() => {
          this.cancle();
        })
      },
      delResConfirm(confirm){
        this.loadingButton= true;
        if(confirm == 'Delete'){
          this.deleteBahan();
        }
        else if (confirm == 'Restore'){
          this.restoreeBahan();
        }
      },
      //delete data bahan
      deleteBahan(){
        var url = this.$api + '/delete/bahan/' + this.deleteId;
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
        }).catch(error => {
          this.error_message=error.response.data.message;
          this.color="red"
          this.snackbar=true;
          this.load = false;
        }).finally(() => {
          this.dialogConfirmDelRes = false;
          this.cancle();
        })
      },
      //restore data bahan
      restoreeBahan(){
        var url = this.$api + '/restore/bahan/' + this.restoreId;
        //data direstore berdasarkan id
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
          this.dialogConfirmDelRes = false;
          this.cancle();
        })
      },
      close() {
        this.resetForm();
        this.status='';
        this.deleteId='';
        this.restoreId='';
        this.editId='';
        this.valid = false;
        this.dialog = false;
      },
      cancle() {
        this.loadingButton= false;
        this.loading = true;
        this.read(this.readActOne, this.readActTwo);
        this.resetForm();
        this.status='';
        this.deleteId='';
        this.restoreId='';
        this.editId='';
        this.valid = false;
        this.dialog = false;
      },
      resetForm() {
        this.bahan = new FormData,
        this.$refs.form.resetValidation();
        this.$refs.form.reset();
      },
    },

    computed: {
    },

    mounted() {
        this.read('Bahan Aktif', null);
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
    
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }

    .headerClass{ 
      font-family: 'Josefin Sans', sans-serif;
      font-size: 30px !important;
      justify-content: center;
      color: rgb(6, 21, 53);
    }
</style> 
