<template>
  <v-main>
    <v-card v-if="selection==0" class="mx-4 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">
        <h1 class="text-h4 mb-1 font-weight-medium">Reservasi</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Reservasi Non-Aktif')">Reservasi Non-Aktif</v-chip>

            <v-chip @click="read('Reservasi Aktif')">Reservasi Aktif</v-chip>

            <v-chip @click="read('Reservasi Selesai')">Reservasi Selesai</v-chip>

            <v-chip @click="read('Reservasi Hapus')">Reservasi Hapus</v-chip>
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
          <v-toolbar-title>Reservasi Non-Aktif</v-toolbar-title>
                
          <v-divider class="mx-4" inset vertical></v-divider>
              
          <v-spacer></v-spacer>

          <v-spacer v-if="!reservasiNonAktif || !reservasiNonAktif.length"></v-spacer>

          <v-text-field 
            v-else 
            v-model="searchReservasiNonAktif"
            outlined
            clearable 
            hide-details 
            prepend-inner-icon="mdi-magnify" 
            label="Search">
          </v-text-field>

          <v-spacer></v-spacer>

          <v-btn color="primary" dark @click="addHandler('Reservasi Non-Aktif')">
              Tambah
          </v-btn>      
        </v-card-title>
                
        <v-data-table :sort-by="['tanggal_reservasi', 'sesi_reservasi']" :sort-desc="[false, true]" :headers="headers" :items="reservasiNonAktif" :search="searchReservasiNonAktif" >
          <template v-slot:item.sesi_reservasi="{ item }">
            <v-chip
              :color="getColor(item.sesi_reservasi)"
              dark>
              <v-icon left>
                {{ getIcon(item.sesi_reservasi) }}
              </v-icon>
              {{ item.sesi_reservasi }}
            </v-chip>
          </template>

          <template v-slot:[`item.actions`]="{ item }">  
            <v-btn outlined elevation="2" small class="ma-2 blue--text" @click="qrCodeHandler(item, 'Reservasi Non-Aktif')"> 
              <v-icon small class="mr-2">
                mdi-qrcode 
              </v-icon>
              QR
            </v-btn>  

            <v-btn outlined elevation="2" small class="ma-2 green--text" @click="editHandler(item, 'Reservasi Non-Aktif')"> 
              <v-icon small class="mr-2">
                mdi-pencil 
              </v-icon>
              Edit
            </v-btn>  

            <v-btn outlined elevation="2" small class="ma-2 red--text" @click="deleteHandler(item.id, 'Reservasi Non-Aktif')"> 
              <v-icon small class="mr-2">
                mdi-delete 
              </v-icon>
              Delete
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
        <h1 class="text-h4 mb-1 font-weight-medium">Reservasi</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Reservasi Non-Aktif')">Reservasi Non-Aktif</v-chip>

            <v-chip @click="read('Reservasi Aktif')">Reservasi Aktif</v-chip>

            <v-chip @click="read('Reservasi Selesai')">Reservasi Selesai</v-chip>

            <v-chip @click="read('Reservasi Hapus')">Reservasi Hapus</v-chip>
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
          <v-toolbar-title>Reservasi Aktif</v-toolbar-title>
                
          <v-divider class="mx-4" inset vertical></v-divider>
              
          <v-spacer></v-spacer>

          <v-spacer v-if="!reservasiAktif || !reservasiAktif.length"></v-spacer>

          <v-text-field 
            v-else 
            v-model="searchReservasiAktif"
            outlined
            clearable 
            hide-details 
            prepend-inner-icon="mdi-magnify" 
            label="Search">
          </v-text-field>

          <v-spacer></v-spacer>    
        </v-card-title>
                
        <v-data-table :sort-by="['tanggal_reservasi', 'sesi_reservasi']" :sort-desc="[false, true]" :headers="headers" :items="reservasiAktif" :search="searchReservasiAktif" >
          <template v-slot:item.sesi_reservasi="{ item }">
            <v-chip
              :color="getColor(item.sesi_reservasi)"
              dark>
              <v-icon left>
                {{ getIcon(item.sesi_reservasi) }}
              </v-icon>
              {{ item.sesi_reservasi }}
            </v-chip>
          </template>
          
          <template v-slot:[`item.actions`]="{ item }">  
            <v-btn outlined elevation="2" small class="ma-2 blue--text" @click="qrCodeHandler(item, 'Reservasi Aktif')"> 
              <v-icon small class="mr-2">
                mdi-qrcode 
              </v-icon>
              QR
            </v-btn>   

            <!-- <v-btn outlined elevation="2" small class="ma-2 orange--text" @click="statusEditHandler(item.id, 'Reservasi Aktif')"> 
              <v-icon small class="mr-2">
                mdi-undo 
              </v-icon>
              Non-Aktifkan
            </v-btn> -->
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
        <h1 class="text-h4 mb-1 font-weight-medium">Reservasi</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Reservasi Non-Aktif')">Reservasi Non-Aktif</v-chip>

            <v-chip @click="read('Reservasi Aktif')">Reservasi Aktif</v-chip>

            <v-chip @click="read('Reservasi Selesai')">Reservasi Selesai</v-chip>

            <v-chip @click="read('Reservasi Hapus')">Reservasi Hapus</v-chip>
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
          <v-toolbar-title>Reservasi Selesai</v-toolbar-title>
                
          <v-divider class="mx-4" inset vertical></v-divider>
                
          <v-spacer></v-spacer>

          <v-spacer v-if="!reservasiSelesai || !reservasiSelesai.length"></v-spacer>

          <v-text-field 
            v-else 
            v-model="searchReservasiSelesai"
            outlined
            clearable 
            hide-details 
            prepend-inner-icon="mdi-magnify" 
            label="Search">
          </v-text-field>        
        </v-card-title>
                
        <v-data-table :sort-by="['tanggal_reservasi', 'sesi_reservasi']" :sort-desc="[false, true]" :headers="headersSelesai" :items="reservasiSelesai" :search="searchReservasiSelesai" >
          <template v-slot:item.sesi_reservasi="{ item }">
            <v-chip
              :color="getColor(item.sesi_reservasi)"
              dark>
              <v-icon left>
                {{ getIcon(item.sesi_reservasi) }}
              </v-icon>
              {{ item.sesi_reservasi }}
            </v-chip>
          </template>
          </v-data-table>
      </div>
    </v-card>

    <v-card v-if="selection==3" class="mx-4 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">
        <h1 class="text-h4 mb-1 font-weight-medium">Reservasi</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Reservasi Non-Aktif')">Reservasi Non-Aktif</v-chip>

            <v-chip @click="read('Reservasi Aktif')">Reservasi Aktif</v-chip>

            <v-chip @click="read('Reservasi Selesai')">Reservasi Selesai</v-chip>

            <v-chip @click="read('Reservasi Hapus')">Reservasi Hapus</v-chip>
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
          <v-toolbar-title>Reservasi Hapus</v-toolbar-title>
                
          <v-divider class="mx-4" inset vertical></v-divider>
              
          <v-spacer></v-spacer>

          <v-spacer v-if="!reservasiHapus|| !reservasiHapus.length"></v-spacer>

          <v-text-field 
            v-else 
            v-model="searchReservasiHapus"
            outlined
            clearable 
            hide-details 
            prepend-inner-icon="mdi-magnify" 
            label="Search" >
          </v-text-field>        
        </v-card-title>
                
        <v-data-table :sort-by="['tanggal_reservasi', 'sesi_reservasi']" :sort-desc="[false, true]" :headers="headers" :items="reservasiHapus" :search="searchReservasiHapus" >
          <template v-slot:item.sesi_reservasi="{ item }">
            <v-chip
              :color="getColor(item.sesi_reservasi)"
              dark>
              <v-icon left>
                {{ getIcon(item.sesi_reservasi) }}
              </v-icon>
              {{ item.sesi_reservasi }}
            </v-chip>
          </template>
          
          <template v-slot:[`item.actions`]="{ item }">  
            <v-btn outlined elevation="2" small class="ma-2 deep-orange--text"  @click="restoreHandler(item, 'Reservasi Hapus')"> 
              <v-icon small class="mr-2">
                mdi-refresh 
              </v-icon>
              Restore
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="1000px">
      <v-stepper v-model="stepperCounter" vertical >
        <div>
          <v-stepper-step :complete="stepperCounter > 1" step="1" >
            Input Identitas, Sesi, dan Tangggal
          </v-stepper-step>

          <v-stepper-content step="1" >
            <div v-if="subLoading == true" class="pa-5">
              <v-progress-circular
                :size="100"
                :width="5"
                color="#d35d6e"
                indeterminate>
              </v-progress-circular>
            </div>

            <v-form v-else ref="form" class="mb-5" v-model="valid" lazy-validation>
              <v-card-text>
                <v-row v-if="is_updated == false">
                  <v-col cols="12" md="7" class="px-8">
                    <v-autocomplete
                      v-model="form.idCustomer"
                      label="Data Customer"
                      :items="customersAktif"
                      :rules="idCustomerRule"
                      item-text="nama_customer"
                      item-value="id"
                      persistent-hint
                      :return-object="false"
                      single-line
                      prepend-icon="mdi-account-multiple"
                      placeholder="Select..."
                      required>
                    </v-autocomplete>
                  </v-col>

                  <v-col v-if="is_updated == false" cols="12" md="5" class="px-8">    
                    <v-btn  :loading="loadingButton" color="primary" dark @click="dialogCustomer = true">
                      + Tambah Data Customer
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row v-else>
                  <v-col cols="12" md="12" class="px-8">
                    <v-autocomplete
                      v-model="form.idCustomer"
                      label="Data Customer"
                      :items="customersAktif"
                      :rules="idCustomerRule"
                      item-text="nama_customer"
                      item-value="id"
                      persistent-hint
                      :return-object="false"
                      single-line
                      prepend-icon="mdi-account-multiple"
                      placeholder="Select..."
                      required
                      readonly>
                    </v-autocomplete>
                  </v-col>
                </v-row>

                <v-row  class="mt-5">
                  <v-col cols="12" md="6" class="px-8">
                    <v-autocomplete
                      v-model="form.sesiReservasi"
                      label="Sesi Reservasi"
                      :items="sesiReservasiPicker"
                      :rules="sesiReservasiRule"
                      prepend-icon="mdi-clock"
                      placeholder="Select..."
                      required>
                    </v-autocomplete>
                  </v-col>
              
                  <v-col cols="12" md="6" class="px-8">
                    <v-menu
                      v-model="dateInput"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.tanggalReservasi"
                          label="Tanggal Reservasi "
                          :rules="tanggalReservasiRule"
                          prepend-icon="mdi-calendar"
                          readonly
                          required
                          v-bind="attrs"
                          v-on="on">
                        </v-text-field>
                      </template>
                      
                      <v-date-picker
                        v-model="form.tanggalReservasi"
                        @input="dateInput = false"
                        :min="new Date().toISOString().substr(0, 10)">
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn :loading="loadingButton" color="success" :disabled="valid == false" @click="stepperCounter = returnstepperCounter(stepperCounter, null);" >
                  Continue
                </v-btn>
                
                <v-btn :loading="loadingButton" text @click="cancel">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-stepper-content>
        </div>
      
        <div>
          <v-stepper-step :complete="stepperCounter > 2" step="2" >
            Pilih Meja
          </v-stepper-step>
          <v-stepper-content step="2">
            <div v-if="subLoading == true" class="pa-5">
              <v-progress-circular
                :size="100"
                :width="5"
                color="#d35d6e"
                indeterminate>
              </v-progress-circular>
            </div>

            <div v-else>
              <v-row dense class="mb-7">
                <v-col cols="12" sm="4" md="4" v-for="(item, i) in reservasiByTanggalDanSesi" :key="i">
                  <v-alert 
                  :class="colorCard(item, 'Card')"
                  border="left"
                  colored-border
                  :color="colorCard(item, 'Border')"
                  elevation="2"
                  class="ma-2" @click="stepperCounter = returnstepperCounter(stepperCounter,item);">
                    <v-card-title class="subheading  justify-center font-weight-bold">
                      Meja - {{ item.id }}

                      <v-divider vertical class="mx-3"></v-divider>

                      <div v-if="item.status_table == 1">Non-Aktif</div>
                      <div v-else-if="item.nama_customer == null">Kosong</div>
                      <div v-else>Terisi</div>
                    </v-card-title>
                  </v-alert>
                </v-col>
              </v-row>

              <v-btn  :loading="loadingButton" color="warning" @click="stepperCounter = beforeAction(stepperCounter)" class="mx-2">
                Before
              </v-btn>
                
              <v-btn :loading="loadingButton" text @click="cancel" class="mx-2">
                Cancel
              </v-btn>
            </div>
          </v-stepper-content>
        </div>

        <div>
          <v-stepper-step :complete="stepperCounter > 3" step="3" >
            Konfirmasi
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="8" class="px-8">
                  <v-autocomplete
                    v-model="form.idCustomer"
                    label="Data Customer"
                    :items="customersAktif"
                    :rules="idCustomerRule"
                    item-text="nama_customer"
                    item-value="id"
                    persistent-hint
                    :return-object="false"
                    single-line
                    prepend-icon="mdi-account-multiple"
                    placeholder="Select..."
                    required
                    readonly>
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" md="4" class="px-8">
                  <v-text-field
                    v-model="form.idMeja"
                    label="Nomer Meja"
                    prepend-icon="mdi-rename-box"
                    required
                    counter
                    readonly>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row  class="mt-5">
                <v-col cols="12" md="6" class="px-8">
                  <v-autocomplete
                    v-model="form.sesiReservasi"
                    label="Sesi Reservasi"
                    :items="sesiReservasiPicker"
                    :rules="sesiReservasiRule"
                    prepend-icon="mdi-clock"
                    placeholder="Select..."
                    required
                    readonly>
                  </v-autocomplete>
                </v-col>
              
                <v-col cols="12" md="6" class="px-8">
                  <v-text-field
                    v-model="form.tanggalReservasi"
                    label="Tanggal Reservasi "
                    :rules="tanggalReservasiRule"
                    prepend-icon="mdi-calendar"
                    readonly
                    required>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>              
              
            <v-btn  :loading="loadingButton" color="primary" @click="actionHendler" class="mx-2">
              Save
            </v-btn>

            <v-btn  :loading="loadingButton" color="warning" @click="stepperCounter = beforeAction(stepperCounter)" class="mx-2">
              Before
            </v-btn>

            <v-btn text :loading="loadingButton" @click="cancel" class="mx-2">
              Cancel
            </v-btn>
          </v-stepper-content>
        </div>
      </v-stepper>
    </v-dialog>

    <v-dialog v-model="dialogCustomer" persistent max-width="600px">
      <v-card  >
        <v-form v-model="validCustomer" ref="formCustomer">
          <v-card-title>
            <span class="headline">Tambah Customer</span>    
          </v-card-title>

          <v-card-text class="px-10">
            <v-container>
              <v-text-field
                v-model="formCustomer.nama_customer"
                label="Nama Customer"
                :rules="nameRules"
                clearable
                required
                counter>
              </v-text-field>

              <v-text-field
                v-model="formCustomer.email_customer"
                label="Email Customer"
                :rules="emailRules"
                clearable
                required>
              </v-text-field>

              <v-text-field
                v-model="formCustomer.telepon_customer"
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

            <v-btn color="red darken-1" :loading="loadingButton" text @click="cancleCustomer">
              Cancel
            </v-btn>

            <v-btn  :loading="loadingButton" color="blue darken-2" text @click="saveCusromer" :disabled="!validCustomer">
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
          Anda yakin ingin {{responDelRes}} data Reservasi ini?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :loading="loadingButton" color="red darken-1" text @click="dialogConfirmDelRes = false, loadingButton = false">
            Cancel
          </v-btn>

          <v-btn  :loading="loadingButton" color="blue darken-2" text @click="delResConfirm(responDelRes)">
            {{responDelRes}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogQR" persistent width="600px" >
      <v-card height="750px" class="pt-5">
        <v-card-title class="headerClass"> 
          QR Code Customer
        </v-card-title>

        <v-divider></v-divider>

        <v-card-title>
          <span class="subTextOne">
            <p style="margin-bottom: -5px;">{{detail.nama_customer}}</p> 
            <p>Meja {{detail.id_table}}</p>
          </span> 
          <v-spacer></v-spacer>
          <span  class="subTextTwo">
            <p style="margin-bottom: -5px;">{{detail.tanggal_reservasi}}</p>
            <p>{{detail.sesi_reservasi}}</p>
          </span>
        </v-card-title>

        <v-divider style="margin-bottom: -5px;"></v-divider>

        <v-card-title class="justify-center">
          <div ref="contentQR">
            <v-card height="530" width="450" justify="center" align="center" elevation="10">
              <img height="180" src="@/assets/akb_icon_dark.png" style="margin-bottom: 5px;"/>
          
              <qr-code
                :text="messageQR"
                :size="200"
                error-level="H"  
                style="margin-bottom: 15px;">
              </qr-code>
                
              <span class="subText">
                <p style="margin-bottom: -5px;">Printed {{dateTimeNow()}}</p>
                <p style="margin-bottom: -9px;">Printed by {{user.nama_pegawai}}</p>
                <p>-----------------------------------------------------</p>
                <p style="margin-top: -27px; margin-bottom: -15px;">Selamat Menikmati</p>
                <p>-----------------------------------------------------</p>
              </span>
            </v-card>
          </div>
        </v-card-title>

        <v-card-actions class="justify-center">
          <!--<v-btn v-if="selection==0" color="blue darken-1"  :loading="loadingButton"  class="mx-2 white--text" @click="downloadit()" >
            Cetak QR
          </v-btn> -->
          
           <v-btn color="blue darken-1"  :loading="loadingButton"  class="mx-2 white--text" @click="downloadit()" >
            Cetak QR
          </v-btn> 

          <v-btn color="red lighten-1" :loading="loadingButton" class="mx-2 white--text" @click="dialogQR = false, loadingButton = false" >
            Cancel
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
//import { jsPDF } from "jspdf";
//import { html2canvas } from "html2canvas";
import html2pdf from 'html2pdf.js'
export default {
    name: "Reservasi",
    data(){
      return{
        idForMeja:0,
        loadingButton:false,
        loading: true,
        subLoading: true,
        load: false,
        snackbar: false,
        error_message: '',  
        color: '',
        selection: 0,
        reservasiNonAktif:[],
        searchReservasiNonAktif: '',
        reservasiAktif:[],
        searchReservasiAktif: '',
        reservasiSelesai:[],
        searchReservasiSelesai: '',
        reservasiHapus:[],
        searchReservasiHapus: '',
        dialog: false,
        stepperCounter: 1,
        valid: false,
        dateInput: false,
        form: {
          idCustomer: '',
          tanggalReservasi: '',
          sesiReservasi: '',
          idMeja: '',
        },
        idCustomerRule: [
          (v) => !!v || 'Data customer tidak boleh kosong :(',
        ],
        sesiReservasiPicker: ['Lunch', 'Dinner'],
        sesiReservasiRule: [
          (v) => !!v || 'Sesi reservasi tidak boleh kosong :(',
        ],
        tanggalReservasiRule: [
          (v) => !!v || 'Tanggal reservasi tidak boleh kosong :(',
        ],
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        },
        customer: new FormData,
        customersAktif: [],
        dialogCustomer: false,
        validCustomer: false,
        formCustomer: {
          nama_customer: '',
          email_customer: '',
          telepon_customer: '',
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
        mejaAktif: [],
        reservasiByTanggalDanSesi: [],
        reservasi: new FormData,
        headers: [
          { text: "Nama Customer", 
            align: "center", 
            sortable: true, 
            value: "nama_customer"
          },
          { text: "Tanggal Kunjungan", value: "tanggal_reservasi" , align: "center"}, 
          { text: "Sesi Kunjungan", value: "sesi_reservasi" , align: "center"},
          { text: "Nomer Meja", value: "id_table" , align: "center"}, 
          { text: "Actions By", value: "nama_pegawai" , align: "center"},
          { text: "Actions", value: "actions", align: "center" }, 
        ],
        headersSelesai: [
          { text: "Nama Customer", 
            align: "center", 
            sortable: true, 
            value: "nama_customer"
          },
          { text: "Tanggal Kunjungan", value: "tanggal_reservasi" , align: "center"}, 
          { text: "Sesi Kunjungan", value: "sesi_reservasi", align: "center" },
          { text: "Nomer Meja", value: "id_table" , align: "center"}, 
          { text: "Actions By", value: "nama_pegawai" , align: "center"},
        ],
        deleteId: '',
        restoreId: '',
        editId: '',
        aktifNonaktifId: '',
        detail:'',
        is_updated: false,
        dialogConfirmDelRes: false,
        dialogQR: false,
        responDelRes: '',
        messageQR: '',
        user:[],
        readAction: null,
      };
    },

    methods: {
      getColor (value) {
        if (value == "Lunch") return 'orange'
        else return 'deep-purple'
      },
      getIcon (value) {
        if (value == "Lunch") return 'mdi-weather-sunny'
        else return 'mdi-weather-night'
      },
      downloadit(){
				html2pdf(this.$refs.contentQR, {
					margin: 0,
					filename: this.detail.id_table +' - ' + this.detail.nama_customer + ' - ' + 'QR.pdf',
					image: { type: 'jpeg', quality: 1.00 },
					html2canvas: { dpi: 192, letterRendering: true },
					jsPDF: { orientation: 'p', unit: 'mm', format: [350, 400]}
				})
        this.dialogQR = false;
        
        if(this.selection == 1){
          this.read('Reservasi Aktif');
        }else{
          this.read('Reservasi Non-Aktif');
        }

        //const printDoc = new jsPDF('p', 'pt', 'a4')
        //console.log('printDoc', printDoc)
        //printDoc.text("Hello world!", 10, 10);
        //printDoc.save("sample.pdf");

        /*const doc = new jsPDF('p', 'pt', 'a5');
        doc.html(document.getElementById('contentQR'),{
          callback: function(doc){
            doc.save('a4.pdf');
          }
        })*/

        /*const doc = new jsPDF();
        var canvasElement = document.createElement('canvas');
        html2canvas(this.$refs.contentQR, { canvas: canvasElement }).then(function (canvas) {
          const img = canvas.toDataURL("image/jpeg", 0.8);
          doc.addImage(img,'JPEG',20,20);
          doc.save("sample.pdf");
        });*/
      },
      returnstepperCounter(stepperCounterCek, item){
        this.load = true

        if(this.$refs.form.validate()){
          var mydate = new Date(this.form.tanggalReservasi);
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0');
          var yyyy = today.getFullYear();

          if(this.form.sesiReservasi == 'Lunch' && this.form.tanggalReservasi == (yyyy + '-' + mm + '-' + dd) && today.getHours() > 16){
            this.error_message='Tanggal dan Sesi Melewati Waktu Pemesanan';
            this.color="red"
            this.form.sesiReservasi=null;
            this.form.tanggalReservasi=null;
            this.snackbar=true;
            this.load = false;
            return this.stepperCounter;
          } 
          else if(this.form.sesiReservasi == 'Dinner' && this.form.tanggalReservasi == (yyyy + '-' + mm + '-' + dd) && today.getHours() > 21){
            this.error_message='Tanggal dan Sesi Melewati Waktu Pemesanan';
            this.color="red"
            this.form.sesiReservasi=null;
            this.form.tanggalReservasi=null;
            this.snackbar=true;
            this.load = false;
            return this.stepperCounter;
          } 
          else if((mydate.getDate() + ((mydate.getMonth() + 1)*31)  + (mydate.getFullYear()*365)) < (today.getDate() + ((today.getMonth() + 1)*31) + (today.getFullYear()*365))){
            this.error_message='Tanggal dan Sesi Melewati Waktu Pemesanan';
            this.color="red"
            this.form.sesiReservasi=null;
            this.form.tanggalReservasi=null;
            this.snackbar=true;
            this.load = false;
            return this.stepperCounter;
          }
          else if(stepperCounterCek == 1){
            this.loadingButton= true;
            //this.readDataMeja(); //mengambil data
            this.subLoading = true;
            this.reservasiByTanggalDanSesi= [];
            this.readDataReservasiByTanggalDanSesi(this.form.tanggalReservasi, this.form.sesiReservasi, 0);
            this.stepperCounter+=1;
            return this.stepperCounter;
          } 
          else if(stepperCounterCek == 2 && item != null){
            if(item.status_table == 1){
              this.error_message='Meja Non-Aktif';
              this.color="red"
              this.snackbar=true;
              this.load = false;
            }
            else if(item.nama_customer != null){
              this.error_message='Meja Sudah Diisi';
              this.color="red"
              this.snackbar=true;
              this.load = false;
            } 
            else{
              this.form.idMeja = item.id;
              this.stepperCounter+=1;
            }
            return this.stepperCounter;
          }
        }
      },
      beforeAction(stepperCounterCek){
        if(stepperCounterCek == 3){
          this.loadingButton= true;
          //this.readDataMeja(); //mengambil data
          this.subLoading = true;
          this.reservasiByTanggalDanSesi= [];
          this.readDataReservasiByTanggalDanSesi(this.form.tanggalReservasi, this.form.sesiReservasi, 0);
          this.stepperCounter--;
          return this.stepperCounter;
        }else{
          this.loadingButton= true;
          this.readDataCustomer(); //mengambil data
          this.stepperCounter--;
          return this.stepperCounter;
        }
      },
      readDataCustomer() {
        this.subLoading = true
        var url = this.$api + '/getCustom/customer/0';
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
            this.customersAktif = [];
            this.customersAktif = response.data.data
        }).finally(() => {
          this.loadingButton= false;
          this.subLoading = false;
        })
      },
      // readDataMeja() {
      //   var url = this.$api + '/getCustomDelete/table/0';
      //   this.$http.get(url, {
      //     headers: {
      //       'Authorization': 'Bearer ' + localStorage.getItem('token')
      //     } 
      //   }).then(response => {
      //     this.mejaAktif = [];
      //     this.mejaAktif = response.data.data
      //   })
      // },
      readDataReservasiByTanggalDanSesi(tanggal_reservasi,sesi_reservasi,is_Deleted) {
        var url = this.$api + '/getCustomByTanggalDanSesi/reservasi/' + this.idForMeja + '/' +  tanggal_reservasi + 
                  '/' + sesi_reservasi + '/' + is_Deleted;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          this.reservasiByTanggalDanSesi = response.data.data
        }).finally(() => {
          this.subLoading = false;
          this.loadingButton = false;
        })
      },
      readDataReservasiByStatus(status_res, is_deletded) {
        var url = this.$api + '/getCustomStatus/reservasi/' + status_res + '/' + is_deletded;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          if(status_res == 0){
            this.reservasiNonAktif = response.data.data
          }
          else if(status_res == 1){
            this.reservasiAktif = response.data.data
          }
          else{
            this.reservasiSelesai = response.data.data
          }
        }).finally(() => {
          this.loading = false;
        })
      },
      readDataReservasiByDeleted(is_deletded) {
        var url = this.$api + '/getCustomDelete/reservasi/' + is_deletded;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          this.reservasiHapus = response.data.data
        }).finally(() => {
          this.loading = false;
        })
      },
      read(setAction){
        this.loading = true;
        if(setAction == 'Reservasi Non-Aktif'){
          this.reservasiNonAktif = [];
          this.readDataReservasiByStatus(0,0); //mengambil data
        } else if(setAction == 'Reservasi Aktif'){
          this.reservasiAktif = [];
          this.readDataReservasiByStatus(1,0); //mengambil data
        }else if(setAction == 'Reservasi Selesai'){
          this.reservasiSelesai = [];
          this.readDataReservasiByStatus(2,0); //mengambil data
        }else{
          this.reservasiHapus = [];
          this.readDataReservasiByDeleted(1); //mengambil data
        }
      },
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
      actionHendler(){
        this.loadingButton= true;
        if(this.is_updated == true && this.readAction != 'Reservasi Hapus'){
          this.updateResesrvasi();
        } 
        else if(this.is_updated == true && this.readAction == 'Reservasi Hapus'){
          this.restoreeResesrvasi();
        }
        else{
          this.saveReservasi();
        }
      },
      //simpan data reservasi
      saveReservasi(){
        this.reservasi.append('tanggal_reservasi', this.form.tanggalReservasi);
        this.reservasi.append('sesi_reservasi', this.form.sesiReservasi);
        this.reservasi.append('id_customer', this.form.idCustomer);
        this.reservasi.append('id_table', this.form.idMeja);
        this.reservasi.append('id_pegawai', localStorage.getItem('id'));

        var url = this.$api + '/store/reservasi'
        this.load = true
        this.$http.post(url, this.reservasi, {
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
        }) 
      },
      //simpan data customer
      saveCusromer(){
          this.loadingButton= true;

          this.customer.append('nama_customer', this.formCustomer.nama_customer);
          if(this.formCustomer.email_customer != null){
              this.customer.append('email_customer', this.formCustomer.email_customer);
          }
          if(this.formCustomer.telepon_customer != null){
              this.customer.append('telepon_customer', this.formCustomer.telepon_customer);
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
          this.cancleCustomer();
        }) 
      },
      updateResesrvasi(){
        let newData = {
          tanggal_reservasi: this.form.tanggalReservasi,
          sesi_reservasi: this.form.sesiReservasi,
          id_customer: this.form.idCustomer,
          id_table: this.form.idMeja,
          id_pegawai: localStorage.getItem('id'),
        }
        var url = this.$api + '/update/reservasi/' + this.editId;
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
          this.cancel();
        }) 
      },
      delResConfirm(confirm){
        this.loadingButton= true;
        if(confirm == 'Delete'){
          this.deleteResesrvasi();
        }
        /*else if (confirm == 'Restore'){
          this.restoreeResesrvasi();
        }*/
        /*else if (confirm == 'Edit Status'){
          this.UpdateStatusResesrvasi(0);
        }*/
      },
      //hapus data reservasi
      deleteResesrvasi() {
        var url = this.$api + '/delete/reservasi/' + this.deleteId; //data dihapus berdasarkan id
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
          this.dialogConfirmDelRes = false;
          this.read(this.readAction);
          this.loadingButton= false;
        }) 
      },
      //restore data reservasi
      restoreeResesrvasi() { 
        let newData = {
          tanggal_reservasi: this.form.tanggalReservasi,
          sesi_reservasi: this.form.sesiReservasi,
          id_customer: this.form.idCustomer,
          id_table: this.form.idMeja,
          id_pegawai: localStorage.getItem('id'),
        }
        var url = this.$api + '/restore/reservasi/' + this.restoreId; //data restore berdasarkan id
        this.$http.put(url, newData,{
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
          /*this.loading = true;
          this.dialogConfirmDelRes = false;
          this.read(this.readAction);
          this.loadingButton= false;*/
        }) 
      },
      //update status data reservasi
      /*UpdateStatusResesrvasi(status) {
        this.loadingButton= true;
         
        var url = this.$api + '/updateStatus/reservasi/' + this.aktifNonaktifId + '/' + status; //data dihapus berdasarkan id
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
          this.dialogQR = false;
          this.dialogConfirmDelRes = false;
          this.read(this.readAction);
          this.loadingButton= false;
        }) 
      },*/
      colorCard(item, status){
        /*for(var i=0; i < this.reservasiByTanggalDanSesi.length; i++){
          for(var j=0; j < this.mejaAktif.length; j++){
            if(this.reservasiByTanggalDanSesi[i].id_table == this.mejaAktif[j].id && 
              this.reservasiByTanggalDanSesi[i].id != this.editId)
            {
              this.mejaAktif[j].status_table = 1;
            }
          }
        }*/

        if(status == 'Card'){
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
        
        /*if(item.status_table == 1 ){
          if(status == 'Card'){
            return 'red lighten-4';
          }else{
            return 'red'
          }
        }else {if(status == 'Card'){
            return 'green lighten-4';
          }else{
            return 'green'
          }
        }*/
      },
      addHandler(setRead){
        this.readAction = setRead;
        this.readDataCustomer();
        this.is_updated = false;
        this.dialog = true;
        this.idForMeja = 0;
      },
      editHandler(item, setRead){
        this.idForMeja = item.id;
        this.readAction = setRead;
        this.readDataCustomer();
        this.editId = item.id;
        this.form = {
          idCustomer: item.id_customer,
          tanggalReservasi: item.tanggal_reservasi,
          sesiReservasi: item.sesi_reservasi,
        };
        this.is_updated = true;
        this.dialog = true;
      },
      deleteHandler(id, setRead){
        this.readAction = setRead;
        this.deleteId = id;
        this.dialogConfirmDelRes = true;
        this.responDelRes= 'Delete'
      },
      restoreHandler(item, setRead){        
        this.readAction = setRead;
        this.readDataCustomer();
        this.restoreId = item.id;
        this.form = {
          idCustomer: item.id_customer,
          tanggalReservasi: item.tanggal_reservasi,
          sesiReservasi: item.sesi_reservasi,
        };
        this.is_updated = true;
        this.dialog = true;

        /*this.readAction = setRead;
        this.restoreId = id;
        this.dialogConfirmDelRes = true;
        this.responDelRes= 'Restore'*/
      },
      /*statusEditHandler(id, setRead){
        this.readAction = setRead;
        this.aktifNonaktifId = id;
        this.dialogConfirmDelRes = true;
        this.responDelRes= 'Edit Status'
      },*/
      qrCodeHandler(item,setRead){
        this.readAction = setRead;
        this.detail = item;
        //this.messageQR = item.id.toString();
        this.aktifNonaktifId = item.id;
        this.dialogQR = true;
        
        /*const date = new Date()
        this.todayDate = date.getFullYear()+'-'+((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1)+'-'+(date.getDate() > 9 ? '' : '0') + date.getDate()
        date.getFullYear() + ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1) + (date.getDate() > 9 ? '' : '0') + date.getDate();*/
        var obj = {
          id: item.id,
          nama:item.nama_customer,
          meja: item.id_table,
          sesi:item.sesi_reservasi,
          booking:item.tanggal_reservasi,
          cetak:this.dateTimeNow(),
        }
        //this.messageQR = JSON.parse(JSON.stringify(item.id+';'+item.nama_customer+';'+item.id_table+';'+item.tanggal_reservasi+';'+this.todayDate))
        this.messageQR = JSON.stringify(obj)
      },
      cancel() {
        this.idForMeja = 0;
        this.loadingButton= false;
        this.loading = true;
        this.resetForm();
        this.read(this.readAction);
        this.reservasiByTanggalDanSesi= [];
        this.$refs.form.resetValidation();
        this.valid = false
        this.dialog = false;
        this.editId = '';
        this.is_updated = false;
        this.stepperCounter = 1;
      },
      cancleCustomer() {
        this.loadingButton= false;
        this.resetFormCustomer();
        this.readDataCustomer(); //mengambil data
        this.validCustomer = false
        this.dialogCustomer = false;
      },
      resetForm() {
        this.$refs.form.reset();
        this.reservasi= new FormData;
      },
      resetFormCustomer() {
        this.$refs.formCustomer.reset();
        this.$refs.formCustomer.resetValidation();
        this.customer= new FormData;
      },      
      dateTimeNow(){
        /*const current = new Date();
        const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
        const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        const dateTime = date +' '+ time;*/
        var myDate = new Date();

        let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];


        let date = myDate.getDate();
        let month = monthsList[myDate.getMonth()];
        let year = myDate.getFullYear();
        let day = daysList[myDate.getDay()];

        let today = `${date} ${month} ${year}, ${day}`;

        let amOrPm;
        let twelveHours = function (){
            if(myDate.getHours() > 12)
            {
                amOrPm = 'PM';
                let twentyFourHourTime = myDate.getHours();
                let conversion = twentyFourHourTime - 12;
                return `${conversion}`

            }else {
                amOrPm = 'AM';
                return `${myDate.getHours()}`}
        };
        let hours = twelveHours();
        let minutes = myDate.getMinutes();
        let seconds = myDate.getSeconds();

        let currentTime = `${hours}:${minutes}:${seconds} ${amOrPm}`;

        let dateTime = today + ' - ' + currentTime;

        return dateTime;
      }
    },

    computed: {
    },

    mounted() {
      this.read('Reservasi Non-Aktif'); 
      this.readUser();
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
