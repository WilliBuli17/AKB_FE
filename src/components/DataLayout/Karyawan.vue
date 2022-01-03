<template>
  <div>
    <v-main>
      <v-card v-if="selection==0" class="cardStyle mx-10 mt-10 px-5">
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="#B2D0DA"
          elevation="8"
          max-width="calc(100% - 32px)">  
          <p class="text-h4 font-weight-medium mb-1">Pegawai</p>
            
          <div style="display: flex; justify-content: center;">
            <v-chip-group
              v-model="selection"
              active-class="red lighten-1 white--text"
              column mandatory>
              <v-chip @click="read('Gird', null)">Gird</v-chip>
        
              <v-chip @click="read('Table', null)">Table</v-chip>
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
          <v-data-iterator :sort-by="sortBy.toLowerCase()" :sort-desc="true" :items="karyawanAll" :items-per-page.sync="itemsPerPage" :page.sync="page" :search="search" hide-default-footer>
            <template v-slot:header>
              <v-card-title class="mb-5" >
                <v-toolbar-title>Data Pegawai</v-toolbar-title>
              
                <v-divider class="mx-4" inset vertical></v-divider>
              
                <v-spacer></v-spacer>

                <v-spacer v-if="!karyawanAll || !karyawanAll.length"></v-spacer>

                <v-text-field v-else v-model="search"
                  outlined 
                  clearable  
                  hide-details 
                  prepend-inner-icon="mdi-magnify" 
                  label="Search">
                </v-text-field>
                
                <v-spacer></v-spacer>

                <v-btn color="primary" dark @click="detailItem(null,'Tambah', 'Gird', null)">
                  Tambah
                </v-btn>
              </v-card-title>
            </template>
        
            <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.id" cols="12" sm="4" md="3">
                  <v-hover v-slot="{ hover }">
                    <v-card class="ma-3" :color="colorCard(item.status_pegawai)" width="300px" outlined shaped elevation="3" @click="detailItem(item, 'Update', 'Gird', null)">
                      <v-img v-if="item.status_pegawai==0"
                        style="filter: sepia(0.3) contrast(1.1) brightness(1.1) grayscale(1)"
                        height="250" alt="user" 
                        :src="images + 'data_pegawai/' + item.foto_pegawai">
                        <v-expand-transition>
                          <div v-if="hover"
                            class="d-flex transition-fast-in-fast-out cyan darken-3 v-card--reveal white--text"
                            style="height: 100%;">
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title class="textHover">
                                  {{item.jabatan_pegawai}}
                                </v-list-item-title>
                                <v-list-item-title class="textHover">
                                  <p>Pegawai Non-Aktif</p>
                                </v-list-item-title>
                                <v-list-item-title class="textHover">
                                  <p>Click Pic For Detail</p>
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </div>
                        </v-expand-transition>
                      </v-img>

                      <v-img v-else
                        height="250" alt="user" 
                        :src="images + 'data_pegawai/' + item.foto_pegawai">
                        <v-expand-transition>
                          <div v-if="hover"
                            class="d-flex transition-fast-in-fast-out cyan darken-3 v-card--reveal white--text"
                            style="height: 100%;">
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title class="textHover">
                                  {{item.jabatan_pegawai}}
                                </v-list-item-title>
                                <v-list-item-title class="textHover">
                                  <p>Pegawai Aktif</p>
                                </v-list-item-title>
                                <v-list-item-title class="textHover">
                                  <p>Click Pic For Detail</p>
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </div>
                        </v-expand-transition>
                      </v-img>

                      <v-card-title class="subheading font-weight-bold headerClass" @click="detailItem(item, 'Update', 'Gird', null)">
                        {{item.nama_pegawai}}
                      </v-card-title>
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
      </v-card>

      <v-card v-if="selection==1" class="mx-10 mt-10 px-5">
        <v-sheet
          class="v-sheet--offset mx-auto mb-n3"
          color="#B2D0DA"
          elevation="8"
          max-width="calc(100% - 32px)">  
          <p class="text-h4 font-weight-medium mb-1">Pegawai</p>
            
          <div style="display: flex; justify-content: center;">
            <v-chip-group
              v-model="selection"
              active-class="red lighten-1 white--text"
              column mandatory>
              <v-chip @click="read('Gird', null)">Gird</v-chip>
        
              <v-chip @click="read('Table', null)">Table</v-chip>
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
          <div style="display: flex; justify-content: center;">
            <v-chip-group
              v-model="subSelection"
              active-class="blue-grey darken-3 white--text"
              column mandatory>
              <v-chip @click="read('Table', 'Pegawai Aktif')">Pegawai Aktif</v-chip>
        
              <v-chip @click="read('Table', 'Pegawai Non-Aktif')">Pegawai Non-Aktif</v-chip>
            </v-chip-group>
          </div>

          <div v-if="subSelection==0">
            <v-card-title>
              <v-toolbar-title>Pegawai Aktif</v-toolbar-title>
                
              <v-divider class="mx-4" inset vertical></v-divider>
                
              <v-spacer></v-spacer>

              <v-spacer v-if="!karyawanAktif || !karyawanAktif.length"></v-spacer>

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

              <v-btn color="primary" dark @click="detailItem(null,'Tambah', 'Table', 'Pegawai Aktif')">
                Tambah
              </v-btn>
            </v-card-title>

            <v-data-table sort-by="nama_pegawai" :headers="headers" :items="karyawanAktif" :search="searchAktif">
              <template v-slot:item.jabatan_pegawai="{ item }">
                <v-chip
                  :color="getColor(item.jabatan_pegawai)"
                  dark>
                  {{ item.jabatan_pegawai }}
                </v-chip>
              </template>
              
              <template v-slot:item.gender_pegawai="{ item }">
                <v-chip
                  :color="getColor(item.gender_pegawai)"
                  dark>
                  {{ item.gender_pegawai }}
                </v-chip>
              </template>

              <template v-slot:[`item.avatar`]="{ item }"> 
                <v-avatar size="45" color="white" dark>
                  <v-img width="45" height="45" alt="user" :src="images + 'data_pegawai/' + item.foto_pegawai"></v-img>
                </v-avatar>
              </template>
                  
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn outlined elevation="2" small class="blue--text" @click="detailItem(item, 'Update', 'Table', 'Pegawai Aktif')"> 
                  <v-icon small class="mr-2">
                    mdi-open-in-new 
                  </v-icon>
                   Detail
                </v-btn>
              </template>
            </v-data-table>
          </div>

          <div v-if="subSelection==1">
            <v-card-title>
              <v-toolbar-title>Pegawai Non-Aktif</v-toolbar-title>
                
              <v-divider class="mx-4" inset vertical></v-divider>
                
              <v-spacer></v-spacer>

              <v-spacer v-if="!karyawanNonaktif || !karyawanNonaktif.length"></v-spacer>

              <v-text-field 
                v-else 
                v-model="searchNonaktif"
                outlined
                clearable 
                hide-details 
                prepend-inner-icon="mdi-magnify" 
                label="Search">
              </v-text-field>

              <v-spacer></v-spacer>

              <v-btn color="primary" dark @click="detailItem(null,'Tambah', 'Table', 'Pegawai Non-Aktif')">
                Tambah
              </v-btn>
            </v-card-title>

            <v-data-table sort-by="nama_pegawai" :headers="headers" :items="karyawanNonaktif" :search="searchNonaktif">
              <template v-slot:item.jabatan_pegawai="{ item }">
                <v-chip
                  :color="getColor(item.jabatan_pegawai)"
                  dark>
                  {{ item.jabatan_pegawai }}
                </v-chip>
              </template>
              
              <template v-slot:item.gender_pegawai="{ item }">
                <v-chip
                  :color="getColor(item.gender_pegawai)"
                  dark>
                  {{ item.gender_pegawai }}
                </v-chip>
              </template>
              
              <template v-slot:[`item.avatar`]="{ item }"> 
                <v-avatar size="45" color="white" dark>
                  <v-img width="45" height="45" alt="user" :src="images + 'data_pegawai/' + item.foto_pegawai"></v-img>
                </v-avatar>
              </template>
                  
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn outlined elevation="2" small class="blue--text" @click="detailItem(item, 'Update', 'Table', 'Pegawai Non-Aktif')"> 
                  <v-icon small class="mr-2">
                    mdi-open-in-new 
                  </v-icon>
                   Detail
                </v-btn>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-card>

      <v-dialog v-model="dialognote" persistent width="1200px">
        <v-card class="pa-5">
          <v-card-title class="justify-center">
            <v-avatar v-if="selectedFile != null" size="300" color="white" dark>
              <v-img width="300" height="300" alt="user" :src="fotoPreview"></v-img>
            </v-avatar>

            <v-avatar v-else-if="selectedFile == null && status == 'Update'" size="300" color="white" dark>
              <v-img width="300" height="300" alt="user" :src="images + 'data_pegawai/' + detail.foto_pegawai"></v-img>
            </v-avatar>
          </v-card-title>

          <div v-if="status == 'Update'">
            <div v-if="detail.status_pegawai == 1" class="headerClass my-4">Pegawai Aktif</div>
            <div v-if="detail.status_pegawai == 0" class="headerClass my-4">Pegawai Non-Aktif</div>
              
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
              <div class="headerClass my-4">Tambah Pegawai</div>
            </v-card-title>
          </div>

          <v-form ref="form" class="mb-5" v-model="valid" lazy-validation>
            <v-card-text>
              <v-row v-if="value==false || status == 'Tambah'">
                <v-col cols="12" md="7" class="px-8">
                  <v-text-field
                    v-model="form.name"
                    label="Nama Pegawai"
                    :rules="nameRules"
                    prepend-icon="mdi-rename-box"
                    required
                    counter>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="5" class="px-8">
                  <v-card-actions class="justify-center">
                    <v-btn :color="cekColor" class="no-text-transform" block round depressed :loading="isSelecting" @click="onButtonClick">
                      <v-icon left>mdi-cloud</v-icon>
                      {{ buttonText }}
                    </v-btn>
                    <input ref="uploader" class="d-none" type="file" accept="image/*" @change="onFileChanged">
                  </v-card-actions>
                </v-col>
              </v-row>

              <v-row v-else>
                <v-col cols="12" md="12" class="px-8">
                  <v-text-field
                    v-model="form.name"
                    label="Nama Pegawai"
                    :rules="nameRules"
                    prepend-icon="mdi-rename-box"
                    required
                    counter
                    readonly>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row class="mt-5">
                <v-col cols="12" md="6" class="px-8">
                  <v-text-field
                    v-model="form.email"
                    label="E-mail Pegawai"
                    :rules="emailRules"
                    prepend-icon="mdi-email"
                    required
                    :readonly="value == true && status == 'Update'">
                  </v-text-field>
                </v-col>
                  
                <v-col cols="12" md="6" class="px-8">
                  <v-text-field
                    v-model="form.telepon"
                    label="Telepon Pegawai"
                    :rules="teleponRules"
                    prepend-icon="mdi-phone"
                    required
                    counter
                    :readonly="value == true && status == 'Update'">
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row  class="mt-5">
                <v-col cols="12"  md="4" class="px-8">
                  <v-autocomplete
                    v-model="form.jabatan"
                    label="Jabatan Pegawai"
                    :items="jabatanPegawai"
                    :rules="jabatanPegawaiRule"
                    prepend-icon="mdi-account-multiple"
                    placeholder="Select..."
                    required
                    :readonly="value == true && status == 'Update'">
                  </v-autocomplete>
                </v-col>
                
                <v-col cols="12" md="4" class="px-8">
                  <v-autocomplete
                    v-model="form.gender"
                    label="Gender Pegawai"
                    :items="jenisKelamin"
                    :rules="jenisKelaminRule"
                    prepend-icon="mdi-gender-male-female"
                    placeholder="Select..."
                    required
                    :readonly="value == true && status == 'Update'">
                  </v-autocomplete>
                </v-col>
            
                <v-col cols="12" md="4" class="px-8">
                  <v-menu
                    v-model="dateInput"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    :disabled="value == true && status == 'Update'">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.tanggal_bergabung"
                        label="Tanggal Bergabung Pegawai"
                        :rules="tanggalBergabungRule"
                        prepend-icon="mdi-calendar"
                        readonly
                        required
                        v-bind="attrs"
                        v-on="on">
                      </v-text-field>
                    </template>
                    
                    <v-date-picker
                      v-model="form.tanggal_bergabung"
                      @input="dateInput = false"
                      :max="new Date().toISOString().substr(0, 10)">
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn :loading="loadingButton" color="red white--text" class="mx-2" @click="close" >
                Cancle
              </v-btn>

              <v-btn v-if="value==false" :loading="loadingButton" color="warning" class="mx-2" @click="upResHendler('Reset Password')" >
                Reset Password
              </v-btn>
                
              <v-btn v-if="value==false"  :loading="loadingButton" color="success" class="mx-2" @click="upResHendler('Update Status')" >
                Update Status
              </v-btn>

              <v-btn :disabled="valid == false" v-if="value==false || status == 'Tambah'"  :loading="loadingButton" color="primary" class="mx-2" @click="setAction(status)" >
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
            Anda yakin ingin {{responupResHendler}} data Pegawai ini?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red" :loading="loadingButton" text @click="dialogConfirm = false, loadingButton = false">
              Cancel
            </v-btn>

            <v-btn :loading="loadingButton" color="blue darken-2" text @click="delResConfirm(responupResHendler)">
              {{responupResHendler}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>
        {{ error_message }}
      </v-snackbar>
    </v-main>
  </div>
</template>

<script>
export default {
    name: "Karyawan",
    data(){
      return{
        loading:true,
        loadingButton:false,
        sortBy: 'status_pegawai',
        load: false,
        snackbar: false,
        error_message: '',
        color: '',
        selection: 0,
        subSelection: 0,
        itemsPerPageArray: [8, 12, 16],
        search: '',
        page: 1,
        itemsPerPage: 8,
        karyawanAll:[],
        images: this.$image,
        detail: '',
        dialognote: false,
        nameRules: [
          (v) => !!v || 'Nama tidak boleh kosong :(',
          (v) => (v && v.length <= 60) || 'Name harus dibaawah 60 karakter',
        ],
        emailRules: [
          (v) => !!v || 'Email tidak boleh kosong :(',
          (v) =>  (v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) || 'E-mail tidak valid :(',
        ],
        teleponRules: [
          (v) => !!v || 'Telepon tidak boleh kosong :(',
          (v) =>  (v && /^(0)8[0-9]{8,11}$/.test(v)) || 'Nomer Telepon tidak valid :(',
        ],
        jenisKelamin: ['Laki-Laki', 'Perempuan'],
        jenisKelaminRule: [
            (v) => !!v || 'Gender tidak boleh kosong :(',
        ],
        jabatanPegawai: ['Owner', 'Operational Manager', 
                        'Cashier', 'Waiter', 
                        'Chef'],
        jabatanPegawaiRule: [
            (v) => !!v || 'Jabatan tidak boleh kosong :(',
        ],
        tanggalBergabungRule: [
            (v) => !!v || 'Tanggal bergabung tidak boleh kosong :(',
        ],
        form: {
          name: '',
          email: '',
          telepon: '',
          jabatan: '',
          gender: '',
          tanggal_bergabung: '',
          password: '123456',
        },
        crudUser: new FormData,
        dateInput: false,
        defaultButtonText: 'Pilih Foto',
        selectedFile: null,
        isSelecting: false,
        value: true,
        valid: false,
        status:'',
        searchAktif:'', 
        searchNonaktif:'', 
        karyawanAktif:[],
        karyawanNonaktif:[],
        headers: [
          { text: "", value: "avatar" },
          { text: "Nama", 
            align: "center", 
            sortable: true, 
            value: "nama_pegawai"
          },
          { text: "E-mail", value: "email", align: "center"}, 
          { text: "Jabatan", value: "jabatan_pegawai" , align: "center"},
          { text: "Gender", value: "gender_pegawai", align: "center" }, 
          { text: "Tanggal Bergabung", value: "tanggal_bergabung_pegawai", align: "center" }, 
          { text: "Actions", value: "actions" , align: "center"}, 
        ],
        dialogConfirm: false,
        responupResHendler: '',
        readActOne: null,
        readActTwo: null,

      };
    },

    methods: {
      getColor (value) {
        if (value == "Owner") return 'red'
        else if (value == "Operational Manager") return 'deep-orange'
        else if (value == "Cashier") return 'orange'
        else if (value == "Waiter") return 'green'
        else if (value == "Laki-Laki") return 'blue lighten-1'
        else if (value == "Perempuan") return 'pink lighten-1'
        else return 'teal'
      },
      colorCard(status){
        if(status == 1 ){
          return 'green lighten-5';
        } else {
          return 'red lighten-4';
        }
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
      //read data karyawan
      readDataAll() {
        var url = this.$api + '/getAll/pegawai';
          this.$http.get(url, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            } 
          }).then(response => {
            this.karyawanAll = response.data.data
          }).finally(() => {
            this.loading = false;
        })
      },
      //read data karyawan
      readDataStatus(status_pegawai) {
        var url = this.$api + '/getCustom/pegawai/' + status_pegawai;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
            if(status_pegawai == 0){
              this.karyawanNonaktif = response.data.data
            }
            else{
              this.karyawanAktif = response.data.data
            }
        }).finally(() => {
            this.loading = false;
        })
      },
      read(setOne, setTwo){
        this.loading = true;

        if(setOne == 'Gird'){
          this.karyawanAll =[], 
          this.readDataAll(); //mengambil data
        } else if(setOne == 'Table'){
          if(setTwo == 'Pegawai Aktif' || setTwo == null){     
            this.subSelection = 0,       
            this.karyawanAktif = [],
            this.readDataStatus(1);
          } else if(setOne == 'Table' && setTwo == 'Pegawai Non-Aktif'){
            this.karyawanNonaktif = [],
            this.readDataStatus(0);
          }
        }
      },
      setAction(sub){
        this.$refs.form.validate()
        if(sub == 'Tambah' && this.$refs.form.validate()){
          this.loadingButton= true;
          this.store();
        }
        else if(sub == 'Update' && this.$refs.form.validate()){
          this.loadingButton= true;
          this.update();
        }
      },
      store(){
        this.crudUser.append('nama_pegawai', this.form.name);
        this.crudUser.append('gender_pegawai', this.form.gender);
        this.crudUser.append('telepon_pegawai', this.form.telepon);
        this.crudUser.append('jabatan_pegawai', this.form.jabatan);
        this.crudUser.append('tanggal_bergabung_pegawai', this.form.tanggal_bergabung);
        if(this.selectedFile != null){
          this.crudUser.append('foto_pegawai', this.selectedFile);
        }
        this.crudUser.append('email', this.form.email);
        this.crudUser.append('password', this.form.password);

        var url = this.$api + '/store/pegawai';
        this.load = true
        this.$http.post(url, this.crudUser, {
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
          this.read(this.readActOne, this.readActTwo);
        })
      },
      //ubah data 
      update() {
        this.crudUser.append('nama_pegawai', this.form.name);
        this.crudUser.append('gender_pegawai', this.form.gender);
        this.crudUser.append('telepon_pegawai', this.form.telepon);
        this.crudUser.append('jabatan_pegawai', this.form.jabatan);
        this.crudUser.append('tanggal_bergabung_pegawai', this.form.tanggal_bergabung);
        if(this.selectedFile != null){
          this.crudUser.append('foto_pegawai', this.selectedFile);
        }
        this.crudUser.append('email', this.form.email);

        var url = this.$api + '/update/pegawai/' + this.detail.id;
        this.load = true
        this.$http.post(url, this.crudUser, {
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
          this.read(this.readActOne, this.readActTwo);
        })
      },
      upResHendler(set){
        this.dialogConfirm = true;
        this.responupResHendler= set;
      },
      delResConfirm(confirm){
        if(confirm == 'Reset Password'){
          this.resetPasword();
        }
        else{
          this.updateStatus();
        }
      },
      //updateStatus data table
      updateStatus(){
        this.loadingButton= true;

        var url = this.$api + '/updateStatus/pegawai/' + this.detail.id;
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
          this.cancle();
          this.read(this.readActOne, this.readActTwo);
        })
      },
      resetPasword(){
        this.loadingButton= true;

        let newData = {
          password: '123456',
        }
        var url = this.$api + '/updateAccount/pegawai/' + this.detail.id;
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
          this.read(this.readActOne, this.readActTwo);
        })
      },
      detailItem(item, sub, setOne, setTwo) {
        this.readActOne = setOne;
        this.readActTwo = setTwo;

        if(sub == 'Tambah'){
          this.dialognote = true;
          this.status='Tambah';
        }
        else{
          this.status='Update';
          this.detail = item;
          this.dialognote = true;
          this.form = {
            name: item.nama_pegawai,
            email: item.email,
            telepon: item.telepon_pegawai,
            jabatan: item.jabatan_pegawai,
            gender: item.gender_pegawai,
            tanggal_bergabung: item.tanggal_bergabung_pegawai,
          };
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
        this.loading = true;
        this.resetForm();
        this.detail = '';
        this.status='';
        this.value = true;
        this.selectedFile = null;
        this.dialognote = false;
        this.dialogConfirm = false;
      },
      resetForm() {
        this.$refs.form.resetValidation();
        this.$refs.form.reset();
        this.form.password =  '123456';
        this.crudUser = new FormData;
      },
    },

    computed: {
      numberOfPages () {
        return Math.ceil(this.karyawanAll.length / this.itemsPerPage)
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
        this.read('Gird', null); 
    },
};
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
    
    .cardStyle{
      background-color: rgba(255, 255, 255, 1)
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
      justify-content: center;
      font-size: 25px !important;
      white-space: nowrap !important;
      word-break: normal!important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }
</style> 