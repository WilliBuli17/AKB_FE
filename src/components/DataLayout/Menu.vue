<template>
  <v-main>
    <v-card v-if="selection==0" class="mx-4 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto  mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">
        <h1 class="text-h4 mb-1 font-weight-medium">Menu</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Menu Aktif', null)">Menu Aktif</v-chip>
      
            <v-chip @click="read('Menu Hapus', null)">Menu Hapus</v-chip>
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
            <v-chip @click="read('Menu Aktif', 'Semua Menu Aktif')">Semua Menu Aktif</v-chip>
        
            <v-chip @click="read('Menu Aktif', 'Menu Tersedia')">Menu Tersedia</v-chip>
        
            <v-chip @click="read('Menu Aktif', 'Menu Habis')">Menu Habis</v-chip>
          </v-chip-group>
        </div>
          
        <div v-if="subSelection==0">
          <v-container fluid>
            <v-data-iterator :items="menuAktif" :items-per-page.sync="itemsPerPage" :page.sync="page" :search="searchMenuAktif" hide-default-footer>
              <template v-slot:header>
                <v-card-title class="mb-5" >
                  <v-toolbar-title>Semua Menu Aktif</v-toolbar-title>
              
                  <v-divider class="mx-4" inset vertical></v-divider>
                
                  <v-spacer></v-spacer>

                  <v-spacer v-if="!menuAktif || !menuAktif.length"></v-spacer>

                  <v-text-field v-else v-model="searchMenuAktif" outlined clearable hide-details prepend-inner-icon="mdi-magnify" label="Search"></v-text-field>
                  
                  <v-spacer></v-spacer>

                  <v-btn color="primary" dark @click="detailItem(null,'Tambah', 'Menu Aktif', 'Semua Menu Aktif')">
                    Tambah
                  </v-btn>
                </v-card-title>
              </template>
          
              <template v-slot:default="props">
                <v-row>
                  <v-col v-for="item in props.items" :key="item.id" cols="12" sm="4" md="3">
                    <v-hover v-slot="{ hover }">
                      <v-card class="ma-2" outlined shaped elevation="3">
                        <v-img height="300" :src="images + 'data_menu/' + item.foto_menu" @click="detailItem(item,'Update', 'Menu Aktif', 'Semua Menu Aktif')">
                          <v-expand-transition>
                            <div v-if="hover"
                              class="d-flex transition-fast-in-fast-out cyan darken-3 v-card--reveal white--text"
                              style="height: 100%;">
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title class="textHover">
                                    <p>{{item.tipe_menu}}</p>
                                  </v-list-item-title>
                                  <v-list-item-title class="textHover">
                                    <p>Click Pic For Detail</p>
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </div>
                          </v-expand-transition>
                        </v-img>

                        <v-card-title class="justify-center subheading font-weight-bold headerClass" @click="detailItem(item,'Update', 'Menu Aktif', 'Semua Menu Aktif')">
                          {{item.nama_menu}}
                        </v-card-title>

                        <v-card-actions class="justify-center" style="margin-top:-15px;">
                          <v-btn small outlined class="rounded-pill red--text" width="100%" @click="detailItem(item, 'Delete', 'Menu Aktif', 'Semua Menu Aktif')">
                            <v-icon small class="mr-2">
                              mdi-delete
                            </v-icon>
                            Delete
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </template>
          
              <template v-slot:footer>
                <v-row class="mt-2" align="center" justify="center" >
                  <span class="grey--text text--darken-3">Items per page</span>

                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on" >
                        {{ itemsPerPage }}

                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index" @click="updateItemsPerPage(number)" >
                        <v-list-item-title>{{ number }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
        
                  <v-spacer></v-spacer>
        
                  <span class="mr-4 grey--text text--darken-3" >
                    Page {{ page }} of {{ numberOfPages }}
                  </span>

                  <v-icon  color="blue darken-3" class="mr-1" @click="formerPage">
                    mdi-chevron-left
                  </v-icon>

                  <v-icon color="blue darken-3" class="ml-1" @click="nextPage" >
                    mdi-chevron-right
                  </v-icon>
                </v-row>
              </template>
            </v-data-iterator>
          </v-container>
        </div>

        <div v-if="subSelection==1">
          <v-card-title>
            <v-toolbar-title>Menu Tersedia</v-toolbar-title>
                  
            <v-divider class="mx-4" inset vertical></v-divider>
                  
            <v-spacer></v-spacer>

            <v-spacer v-if="!menuTersedia || !menuTersedia.length"></v-spacer>

            <v-text-field 
              v-else 
              v-model="searchMenuTersedia"
              outlined
              clearable 
              hide-details 
              prepend-inner-icon="mdi-magnify" 
              label="Search">
            </v-text-field>
          </v-card-title>
                
          <v-data-table :sort-by="['tipe_menu', 'nama_menu']" :sort-desc="[false, false]" :headers="headers" :items="menuTersedia" :search="searchMenuTersedia" >
            <template v-slot:item.tipe_menu="{ item }">
              <v-chip
                :color="getColor(item.tipe_menu)"
                dark>
                {{ item.tipe_menu }}
              </v-chip>
            </template>
            
            <template v-slot:item.jumlah_menu_tersedia="{ item }">
              <v-chip
                :color="getColorStock(item.jumlah_menu_tersedia)"
                dark>
                {{ item.jumlah_menu_tersedia }}
              </v-chip>
            </template>
          
            <template
              v-for="header in headers.filter((header) => header.hasOwnProperty('formatter'))"
              v-slot:[`item.${header.value}`]="{ header, value }">
              Rp. {{ header.formatter(value) }}
            </template>

            <template v-slot:[`item.avatar`]="{ item }"> 
              <v-avatar size="45" color="white" dark>
                <v-img width="45" height="45" alt="user" :src="images + 'data_menu/' + item.foto_menu"></v-img>
              </v-avatar>
            </template>
              
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn outlined elevation="2" small class="ma-2 blue--text" @click="detailItem(item, 'Update', 'Menu Aktif', 'Menu Tersedia')"> 
                <v-icon small class="mr-2">
                  mdi-open-in-new 
                </v-icon>
                 Detail
              </v-btn>

              <v-btn outlined elevation="2" small class="ma-2 red--text" @click="detailItem(item, 'Delete', 'Menu Aktif', 'Menu Tersedia')"> 
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
            <v-toolbar-title>Menu Habis</v-toolbar-title>
                  
            <v-divider class="mx-4" inset vertical></v-divider>
                  
            <v-spacer></v-spacer>

            <v-spacer v-if="!menuHabis || !menuHabis.length"></v-spacer>

            <v-text-field 
              v-else 
              v-model="searchMenuHabis"
              outlined
              clearable 
              hide-details 
              prepend-inner-icon="mdi-magnify" 
              label="Search">
            </v-text-field>
          </v-card-title>
                
          <v-data-table :sort-by="['tipe_menu', 'nama_menu']" :sort-desc="[false, false]" :headers="headers" :items="menuHabis" :search="searchMenuHabis" >
            <template v-slot:item.tipe_menu="{ item }">
              <v-chip
                :color="getColor(item.tipe_menu)"
                dark>
                {{ item.tipe_menu }}
              </v-chip>
            </template>
            
            <template v-slot:item.jumlah_menu_tersedia="{ item }">
              <v-chip
                :color="getColorStock(item.jumlah_menu_tersedia)"
                dark>
                {{ item.jumlah_menu_tersedia }}
              </v-chip>
            </template>
          
            <template
              v-for="header in headers.filter((header) => header.hasOwnProperty('formatter'))"
              v-slot:[`item.${header.value}`]="{ header, value }">
              Rp. {{ header.formatter(value) }}
            </template>

            <template v-slot:[`item.avatar`]="{ item }"> 
              <v-avatar size="45" color="white" dark>
                <v-img width="45" height="45" alt="user" :src="images + 'data_menu/' + item.foto_menu"></v-img>
              </v-avatar>
            </template>
              
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn outlined elevation="2" small class="ma-2 blue--text" @click="detailItem(item, 'Update', 'Menu Aktif', 'Menu Habis')"> 
                <v-icon small class="mr-2">
                  mdi-open-in-new 
                </v-icon>
                 Detail
              </v-btn>

              <v-btn outlined elevation="2" small class="ma-2 red--text" @click="detailItem(item, 'Delete', 'Menu Aktif', 'Menu Habis')"> 
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
        <h1 class="text-h4 mb-1 font-weight-medium">Menu</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Menu Aktif', null)">Menu Aktif</v-chip>
      
            <v-chip @click="read('Menu Hapus', null)">Menu Hapus</v-chip>
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
          <v-toolbar-title>Menu Hapus</v-toolbar-title>
                
          <v-divider class="mx-4" inset vertical></v-divider>
                
          <v-spacer></v-spacer>

          <v-spacer v-if="!menuHapus|| !menuHapus.length"></v-spacer>

          <v-text-field 
            v-else 
            v-model="searchMenuHapus"
            outlined
            clearable 
            hide-details 
            prepend-inner-icon="mdi-magnify" 
            label="Search">
          </v-text-field>
        </v-card-title>
                
        <v-data-table :sort-by="['tipe_menu', 'nama_menu']" :sort-desc="[false, false]" :headers="headers" :items="menuHapus" :search="searchMenuHapus" >
          <template v-slot:item.tipe_menu="{ item }">
            <v-chip
              :color="getColor(item.tipe_menu)"
              dark>
              {{ item.tipe_menu }}
            </v-chip>
          </template>
            
          <template v-slot:item.jumlah_menu_tersedia="{ item }">
            <v-chip
              :color="getColorStock(item.jumlah_menu_tersedia)"
              dark>
              {{ item.jumlah_menu_tersedia }}
            </v-chip>
          </template>
          
          <template
            v-for="header in headers.filter((header) => header.hasOwnProperty('formatter'))"
            v-slot:[`item.${header.value}`]="{ header, value }">
            Rp. {{ header.formatter(value) }}
          </template>

          <template v-slot:[`item.avatar`]="{ item }"> 
            <v-avatar size="45" color="white" dark>
              <v-img width="45" height="45" alt="user" :src="images + 'data_menu/' + item.foto_menu"></v-img>
            </v-avatar>
          </template>
            
          <template v-slot:[`item.actions`]="{ item }"> 
            <v-btn outlined elevation="2" small class="mx-2 deep-orange--text" @click="detailItem(item,'Restore', 'Menu Hapus', null)">
              <v-icon small class="mr-2">
                mdi-refresh 
              </v-icon>
              Restore
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-dialog v-model="dialognote" persistent width="1200px">
      <v-card class="pa-5"> 
        <div v-if="loadingTambah == true" class="pa-5">
          <v-progress-circular
            :size="100"
            :width="5"
            color="#d35d6e"
            indeterminate>
          </v-progress-circular>
        </div>
        
        <div v-else>
          <v-card-title class="justify-center">
            <v-img v-if="selectedFile != null"  
              max-width="600" class="rounded-xl" 
              max-height="300" alt="user" 
              :src="fotoPreview">
            </v-img> 

            <v-img v-else-if="selectedFile == null && status == 'Update'"  
              max-width="600" class="rounded-xl" 
              max-height="300" alt="user" 
              :src="images + 'data_menu/' + detail.foto_menu">
            </v-img>
          </v-card-title>

          <div v-if="status == 'Update'">
            <toggle-button 
              @change="change(value)" 
              :value="value" 
              :color="{checked: '#85A8BA', unchecked: '#E8B499'}"
              :sync="true"
              :labels="{checked: 'Read', unchecked: 'Update'}"
              width="135"
              height="40"
              font-size="22"/>
          </div>

          <div v-else>
            <v-card-title class="justify-center">              
              <div class="headerClass">Tambah Menu</div>
            </v-card-title>
          </div>

          <v-form ref="form" class="mb-5" v-model="valid" lazy-validation>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6" class="px-8">
                  <v-text-field
                    v-model="form.nama_menu"
                    label="Nama Menu"
                    :rules="nameRules"
                    prepend-icon="mdi-rename-box"
                    required
                    counter
                    :readonly="value == true && status != 'Tambah'">
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="6" class="px-8">
                  <v-autocomplete
                    v-model="form.tipe_menu"
                    label="Tipe Menu"
                    :items="tipeMenu"
                    :rules="tipeMenuRule"
                    placeholder="Select..."
                    prepend-icon="mdi-food-fork-drink"
                    required
                    :readonly="value == true && status != 'Tambah'">
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" class="px-8">
                  <v-textarea
                    v-model="form.deskripsi_menu"
                    label="Deskripsi Menu"
                    prepend-icon="mdi-format-align-left"
                    :rules="deskripsiMenu"
                    rows="2"
                    row-height="4"
                    counter
                    required
                    :readonly="value == true && status != 'Tambah'">
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row  class="mt-5">
                <v-col cols="12" md="4" class="px-8">
                  <v-autocomplete
                    v-model="form.satuan_menu"
                    label=" Satuan Menu"
                    prepend-icon="mdi-food"
                    :rules="satuanMenuRule"
                    :items="satuanMenu"
                    placeholder="Select..."
                    required>
                  </v-autocomplete>
                </v-col>
                    
                <v-col cols="12" md="4" class="px-8">
                  <v-text-field
                    v-model="form.harga_menu"
                    label=" Harga Menu"
                    type="number"
                    prepend-icon="mdi-currency-usd"
                    :rules="hargaMenuRule"
                    prefix="Rp."
                    required
                    :readonly="value == true && status != 'Tambah'">
                  </v-text-field>
                </v-col>
            
                <v-col cols="12" md="4" class="px-8">
                  <v-autocomplete
                    v-model="form.id_bahan"
                    label="Data Bahan"
                    :items="bahanAktif"
                    :rules="idBahanRule"
                    item-text="nama_bahan"
                    item-value="id"
                    persistent-hint
                    :return-object="false"
                    single-line
                    prepend-icon="mdi-food-variant"
                    placeholder="Select..."
                    required
                    :readonly="value == true && status != 'Tambah'">
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions v-if="value==false || status == 'Tambah'" class="justify-center mb-5">
              <v-btn width="50%"  :color="cekColor" class="no-text-transform" round depressed :loading="isSelecting" @click="onButtonClick">
                <v-icon left>mdi-cloud</v-icon>
                {{ buttonText }}
              </v-btn>
              <input ref="uploader" class="d-none" type="file" accept="image/*" @change="onFileChanged">
            </v-card-actions>

            <v-card-actions class="justify-center">
              <v-btn :loading="loadingButton" color="red white--text" class="mx-2" @click="close" >
                Cancle
              </v-btn>

              <v-btn :loading="loadingButton" :disabled="valid == false" v-if="value==false || status == 'Tambah'" color="primary" class="mx-2" @click="setAction(status)" >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmDelRes" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>

        <v-card-text>
          Anda yakin ingin {{status}} data Menu ini?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" :loading="loadingButton" text @click="dialogConfirmDelRes = false, loadingButton = false">
            Cancel
          </v-btn>

          <v-btn :loading="loadingButton" color="blue darken-2" text  @click="delResConfirm(status)">
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
    name: "Menu",
    data(){
      return{
        loadingButton:false,
        loading: true,
        loadingTambah: true,
        load: false,
        snackbar: false,
        error_message: '',  
        color: '',
        selection: 0,
        subSelection:0,
        itemsPerPageArray: [8, 12, 16],
        page: 1,
        itemsPerPage: 8,
        menuAktif:[],
        searchMenuAktif: '',
        menuHapus:[],
        searchMenuHapus: '',
        menuTersedia:[],
        searchMenuTersedia: '',
        menuHabis:[],
        searchMenuHabis: '',
        images: this.$image,
        detail: '',
        dialognote: false,
        status:'',
        headers: [
          { text: "", value: "avatar" },
          { text: "Nama Menu", 
            align: "center", 
            sortable: true, 
            value: "nama_menu"
          },
          { text: "Tipe Menu", value: "tipe_menu", align: "center" }, 
          { text: "Harga Menu", value: "harga_menu", align: "center" , formatter: this.formatExample },
          { text: "Satuan Menu", value: "satuan_menu" , align: "center"}, 
          { text: "Stock Tersedia", value: "jumlah_menu_tersedia", align: "center" }, 
          { text: "Actions", value: "actions" , align: "center"}, 
        ],
        form: {
          nama_menu: '',
          tipe_menu: '',
          deskripsi_menu: '',
          satuan_menu: '',
          harga_menu: '',
          foto_menu: '',
          id_bahan: '',
          jumlah_menu_tersedia: '',
        },
        bahanAktif:[],
        nameRules: [
          (v) => !!v || 'Nama tidak boleh kosong :(',
          (v) => (v && v.length <= 60) || 'Name harus dibaawah 60 karakter',
        ],
        tipeMenu: ['Makanan Utama', 'Side Dish', 'Minuman'],
        tipeMenuRule: [
          (v) => !!v || 'Tipe Menu tidak boleh kosong :(',
        ],
        deskripsiMenu: [
          (v) => !!v || 'Deskripsi Menu tidak boleh kosong :(',
        ],
        satuanMenu: ['Plate', 'Bowl', 'Mini Bowl', 'Glass', 'Bottle'],
        satuanMenuRule: [
          (v) => !!v || 'Satuan Menu tidak boleh kosong :(',
        ],
        hargaMenuRule: [
          (v) => !!v || 'Harga Menu tidak valid :(',
          (v) =>  (v && /^[0-9]*$/.test(v)) || 'Harga Menu minimal 0 dan bilangan real :(',
        ],
        idBahanRule: [
          (v) => !!v || 'Data Bahan tidak boleh kosong :(',
        ],
        isSelecting: false,
        valid: false,
        selectedFile: null,
        defaultButtonText: 'Pilih Foto',
        value: true,
        crudMenu: new FormData,
        oneBahan: [],
        deleteId: '',
        restoreId: '',
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
      formatExample(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      onButtonClick() {
        this.isSelecting = true
          window.addEventListener('focus', () => {
            this.isSelecting = false
          }, { once: true })

        this.$refs.uploader.click()
      },
      onFileChanged(e) {
        this.selectedFile = e.target.files[0];
      },
      readBahan(){
        var url = this.$api + '/getCustomStatus/bahan/0';
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          this.bahanAktif = response.data.data
        }).finally(() => {
            this.loading = false
            this.loadingTambah = false
        })
      },
      readOneBahan(idSearch, sub){
        var url = this.$api + '/getOne/bahan/' + idSearch;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          this.oneBahan = response.data.data;
          this.form.jumlah_menu_tersedia = Math.floor(this.oneBahan.jumlah_bahan / this.oneBahan.ukuran_porsi);
          if(sub == 'Tambah'){
            this.store();
          }
          else if(sub == 'Update'){
            this.update();
          }
        })
      },
      readMenuByDeleted(is_deletded) {
        var url = this.$api + '/getCustomDelete/menu/' + is_deletded;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          if(is_deletded == 0){
            this.menuAktif = response.data.data
          } else{
            this.menuHapus = response.data.data
          }
        }).finally(() => {
            this.loading = false
        })
      },
      readMenuByStock(check) {
        var url = this.$api + '/getCustomStock/menu/0/' + check;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          if(check == 1){
            this.menuTersedia = response.data.data
          } else{
            this.menuHabis = response.data.data
          }
        }).finally(() => {
            this.loading = false
        })
      },
      read(setOne, setTwo){
        this.loading = true;
        if(setOne == 'Menu Aktif'){
          if(setTwo == null || setTwo == 'Semua Menu Aktif'){
            this.subSelection = 0;
            this.menuAktif = [];
            this.readMenuByDeleted(0);
          } else if(setTwo == 'Menu Tersedia'){
            this.menuTersedia = [];
            this.readMenuByStock(1);
          } else if(setTwo == 'Menu Habis'){
            this.menuHabis = [];
            this.readMenuByStock(0);
          }
        } else{
          this.menuHapus = [];
          this.readMenuByDeleted(1);
        }
      },
      detailItem(item, sub, setOne, setTwo) {
        this.readActOne = setOne;
        this.readActTwo = setTwo;
        
        this.loadingTambah = true;
        this.bahanAktif = [];
        this.readBahan();

        if(sub == 'Tambah'){
          this.dialognote = true;
          this.status=sub;
        }
        else if(sub == 'Update'){
          this.status=sub;
          this.detail = item;
          this.dialognote = true;
          this.form = {
            nama_menu: item.nama_menu,
            tipe_menu: item.tipe_menu,
            deskripsi_menu: item.deskripsi_menu,
            satuan_menu: item.satuan_menu,
            harga_menu: item.harga_menu,
            foto_menu: item.foto_menu,
            id_bahan: item.id_bahan,
          };
        }
        else if(sub == 'Delete'){
          this.status = sub;
          this.deleteId = item.id;
          this.dialogConfirmDelRes = true;
        }
        else if(sub == 'Restore'){
          this.status = sub;
          this.restoreId = item.id;
          this.dialogConfirmDelRes = true;
        }
      },
      setAction(sub){
        this.$refs.form.validate()
        if(this.$refs.form.validate()){
          this.loadingButton= true;
          this.oneBahan = [];
          this.readOneBahan(this.form.id_bahan, sub);
        }
      },
      store(){
        this.crudMenu.append('nama_menu', this.form.nama_menu);
        this.crudMenu.append('tipe_menu', this.form.tipe_menu);
        this.crudMenu.append('deskripsi_menu', this.form.deskripsi_menu);
        this.crudMenu.append('satuan_menu', this.form.satuan_menu);
        this.crudMenu.append('harga_menu', this.form.harga_menu);
        if(this.selectedFile != null){
          this.crudMenu.append('foto_menu', this.selectedFile);
        }
        this.crudMenu.append('id_bahan', this.form.id_bahan);
        this.crudMenu.append('jumlah_menu_tersedia', this.form.jumlah_menu_tersedia);

        var url = this.$api + '/store/menu';
        this.load = true
        this.$http.post(url, this.crudMenu, {
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
      //ubah data menu
      update() {
        this.crudMenu.append('nama_menu', this.form.nama_menu);
        this.crudMenu.append('tipe_menu', this.form.tipe_menu);
        this.crudMenu.append('deskripsi_menu', this.form.deskripsi_menu);
        this.crudMenu.append('satuan_menu', this.form.satuan_menu);
        this.crudMenu.append('harga_menu', this.form.harga_menu);
        if(this.selectedFile != null){
          this.crudMenu.append('foto_menu', this.selectedFile);
        }
        this.crudMenu.append('id_bahan', this.form.id_bahan);
        this.crudMenu.append('jumlah_menu_tersedia', this.form.jumlah_menu_tersedia);

        var url = this.$api + '/update/menu/' + this.detail.id;
        this.load = true
        this.$http.post(url, this.crudMenu, {
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
      //hapus data menu
      delete() {
        var url = this.$api + '/delete/menu/' + this.deleteId; //data dihapus berdasarkan id
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
      //restore data menu
      restore() {
        var url = this.$api + '/restore/menu/' + this.restoreId; //data dihapus berdasarkan id
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
      delResConfirm(confirm){
        this.loadingButton= true;
        if(confirm == 'Delete'){
          this.delete();
        }
        else if (confirm == 'Restore'){
          this.restore();
        }
      },
      change(valuex){
        if(valuex == true){
          this.value = false;
        }else{
          this.value = true;
        }
      },
      close() {
        this.resetForm();
        this.detail = '';
        this.status='';
        this.selectedFile = null;
        this.value = true;
        this.dialognote = false;
      },
      cancle() {
        this.loadingButton= false;
        this.loading =  true;
        this.read(this.readActOne, this.readActTwo);
        this.resetForm();
        this.detail = '';
        this.status='';
        this.selectedFile = null;
        this.value = true;
        this.dialognote = false;
      },
      resetForm() {
        this.crudMenu = new FormData;
        this.$refs.form.resetValidation();
        this.$refs.form.reset();
        this.oneBahan = []
      },
    },

    computed: {
      numberOfPages () {
        return Math.ceil(this.menuAktif.length / this.itemsPerPage)
      },
      buttonText() {
        return this.selectedFile ? 'Foto Terpilih' : this.defaultButtonText
      },
      cekColor() {
        return this.selectedFile ?  '#62ff8e' : '#FFE662'
      },
      fotoPreview() {
        return URL.createObjectURL(this.selectedFile);
      }
    },

    mounted() {
      this.read('Menu Aktif', null);
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

    .textHover{
        font-family: 'Poppins', sans-serif;
        font-size: 25px !important;
        color: rgb(255, 255, 255);
    }

    .v-card--reveal {
      align-items: center;
      bottom: 0;
      justify-content: center;
      opacity: 0.95;
      position: absolute;
      width: 100%;
    }

    .v-sheet--offset {
        top: -24px;
        position: relative;
    }

    .headerClass{ 
      font-family: 'Josefin Sans', sans-serif;
      font-size: 21px !important;
      white-space: nowrap !important;
      word-break: normal!important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }
</style> 