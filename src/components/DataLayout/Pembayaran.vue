<template>
  <v-main>
    <v-card v-if="selection==0" class="mx-4 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto mb-n3"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">
        <h1 class="text-h4 mb-1 font-weight-medium">Pembayaran</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Belum Bayar')">Belum Bayar</v-chip>

            <v-chip @click="read('Sudah Bayar')">Sudah Bayar</v-chip>
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
          <v-toolbar-title>Belum Bayar</v-toolbar-title>
                
          <v-divider class="mx-4" inset vertical></v-divider> 
        </v-card-title>

        <v-data-table :headers="headers" :items="belumBayar" :sort-by="['status_order', 'nama_customer']" :sort-desc="[true, false]">
            <template v-slot:header.nama_customer="{ header }">
                {{ header.text }}
                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon small :color="nama_customer ? 'primary' : ''">
                                mdi-filter
                            </v-icon>
                        </v-btn>
                    </template>

                    <div style="background-color: white; width: 280px">
                        <v-text-field
                            v-model="nama_customer"
                            class="pa-4"
                            type="text"
                            label="Masukkan Nama Menu" >
                        </v-text-field>
                            
                        <v-btn
                            @click="nama_customer = ''"
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

            <template v-slot:[`item.id_table`]="{ item }"> 
                Meja - {{item.id_table}}
            </template>
            
            <template
              v-for="header in headers.filter((header) => header.hasOwnProperty('formatter'))"
              v-slot:[`item.${header.value}`]="{ header, value }">
              Rp. {{ header.formatter(value) }}
            </template>

            <template v-slot:[`item.status_order`]="{ item }"> 
                <v-chip
                    :color="getColor(item.status_order)"
                    dark>
                    <span v-if="item.status_order == 0"> Belum Mengakhiri Sesi Pesanan </span>
                    <span v-if="item.status_order == 1"> Sudah Mengakhiri Sesi Pesanan </span>
                    <span v-if="item.status_order == 2"> Sudah Melakukan Pembayaran </span>
              </v-chip>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn v-if="item.status_order == 1" outlined elevation="2" small class="ma-2 green--text text--darken-3" @click="bayarHendler(item,'Belum Bayar')"> 
                <v-icon small class="mr-2">
                  mdi-currency-usd-circle-outline
                </v-icon>
                 Bayar
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
        <h1 class="text-h4 mb-1 font-weight-medium">Pembayaran</h1>
            
        <div style="display: flex; justify-content: center;">
          <v-chip-group
            v-model="selection"
            active-class="red lighten-1 white--text"
            column mandatory>
            <v-chip @click="read('Belum Bayar')">Belum Bayar</v-chip>

            <v-chip @click="read('Sudah Bayar')">Sudah Bayar</v-chip>
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
          <v-toolbar-title>Sudah Bayar</v-toolbar-title>
                
          <v-divider class="mx-4" inset vertical></v-divider>  
        </v-card-title>

        <v-data-table :headers="headers" :items="sudahBayar" :sort-by="['status_order', 'nama_customer']" :sort-desc="[true, false]">
            <template v-slot:header.nama_customer="{ header }">
                {{ header.text }}
                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon small :color="nama_customer ? 'primary' : ''">
                                mdi-filter
                            </v-icon>
                        </v-btn>
                    </template>

                    <div style="background-color: white; width: 280px">
                        <v-text-field
                            v-model="nama_customer"
                            class="pa-4"
                            type="text"
                            label="Masukkan Nama Menu" >
                        </v-text-field>
                            
                        <v-btn
                            @click="nama_customer = ''"
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
            
            <template v-slot:[`item.id_table`]="{ item }"> 
                Meja - {{item.id_table}}
            </template>
            
            <template
              v-for="header in headers.filter((header) => header.hasOwnProperty('formatter'))"
              v-slot:[`item.${header.value}`]="{ header, value }">
              Rp. {{ header.formatter(value) }}
            </template>

            <template v-slot:[`item.status_order`]="{ item }"> 
                <v-chip
                    :color="getColor(item.status_order)"
                    dark>
                    <span v-if="item.status_order == 0"> Belum Mengakhiri Sesi Pesanan </span>
                    <span v-if="item.status_order == 1"> Sudah Mengakhiri Sesi Pesanan </span>
                    <span v-if="item.status_order == 2"> Sudah Melakukan Pembayaran </span>
              </v-chip>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn outlined elevation="2" small class="ma-2 blue--text" @click="detailHandler(item,'Siap Disajikan')"> 
                <v-icon small class="mr-2">
                  mdi-open-in-new 
                </v-icon>
                 Detail
              </v-btn>
            </template>
        </v-data-table>
      </div>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="1200px">
      <v-stepper v-model="stepperCounter" vertical >
        <div>        
          <v-stepper-step :complete="stepperCounter > 1" step="1" >
            Data Order
          </v-stepper-step>
      
          <v-stepper-content step="1">
            <v-card height="400px" >
              <v-row no-gutters>
                <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                  <v-card v-if="n==1" class="pa-2" outlined tile height="100%">
                    <v-card-title class="headerClass"> 
                      Data Reservasi
                    </v-card-title>
  
                    <v-divider class="mt-1 mb-5 black"></v-divider>

                    <v-card-title>
                      <span class="subTextOne">
                        <p>Customer</p>
                        <p>Meja</p>
                        <p>Tanggal</p>
                      </span>               
                      <v-spacer></v-spacer>       
                      <span class="subTextTwo">
                        <p>{{customer}}</p>
                        <p>Meja - {{meja}}</p>
                        <p>{{tanggal}}</p>
                      </span>
                    </v-card-title>
                  </v-card>

                  <v-card v-else class="pa-2" outlined tile >
                    <v-card-title class="headerClass"> 
                      Total Bayar
                    </v-card-title>
                    <v-divider class="mt-1 mb-5 black"></v-divider>
                    <v-card-title>
                      <span class="subTextOne">
                        <p>Subtotal</p>
                        <p>Service 5%</p>
                        <p>Tax 10 %</p>
                        <v-divider></v-divider>
                        <p  style="font-weight: bold;">Grand Total</p>
                      </span>               
                      <v-spacer></v-spacer>       
                      <span class="subTextTwo">
                        <p>Rp. {{formatExample(form.subtotal_harga)}}</p>
                        <p>Rp. {{formatExample(form.biaya_service)}}</p>
                        <p>Rp. {{formatExample(form.biaya_pajak)}}</p>
                        <v-divider></v-divider>
                        <p style="font-weight: bold;">Rp. {{formatExample(form.total_harga)}}</p>
                      </span>
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>

              <v-form ref="form" class="mb-5" v-model="valid" lazy-validation>
                <v-card-title class="justify-center">
                  <v-row  class="justify-center">
                    <v-col cols="12" md="8" class="px-16">
                      <v-autocomplete
                        v-model="form.tipe_pembayaran"
                        label="Jenis Pembayaran"
                        :items="jenisPembayaran"
                        :rules="jenisPembayaranRule"
                        persistent-hint
                        single-line
                        prepend-icon="mdi-currency-usd-circle-outline"
                        placeholder="Select..."
                        required>
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-card-actions class="justify-center">
                  <v-btn :loading="loadingButton" color="primary" :disabled="valid == false" @click="stepperCounter = returnstepperCounter(stepperCounter);" >
                    Continue
                  </v-btn>
                  <v-btn text :loading="loadingButton" @click="cancel">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-stepper-content>
        </div>

        <div>
          <v-stepper-step :complete="stepperCounter > 2" step="2" >
            Pembayarab Jenis Kartu
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
              <v-card height="350px" >
                <v-form ref="formIdKartu" class="mb-5" v-model="validIdKartu" lazy-validation>
                  <v-card-text> 
                    <v-btn  :loading="loadingButton" color="primary" dark @click="dlKartu">
                      + Tambah Data Kartu
                    </v-btn>

                  <v-autocomplete v-if="form.tipe_pembayaran == 'Credit'"
                      v-model="formIdKartu.id_kartu"
                      label="Nama Pemilik Kartu"
                      :items="kartuAktif"
                      :rules="idKartuRule"
                      item-text="nama_pemilik_kartu"
                      item-value="id"
                      persistent-hint
                      :return-object="false"
                      single-line
                      prepend-icon="mdi-credit-card"
                      placeholder="Select..."
                      required>
                    </v-autocomplete> 

                    <v-autocomplete
                      v-model="formIdKartu.id_kartu"
                      label="Nomor Kartu"
                      :items="kartuAktif"
                      :rules="idKartuRule"
                      item-text="nomer_kartu"
                      item-value="id"
                      type="number"
                      persistent-hint
                      :return-object="false"
                      single-line
                      prepend-icon="mdi-credit-card"
                      placeholder="Select..."
                      required>
                    </v-autocomplete>

                    <v-text-field
                      v-model="formIdKartu.kode_verivikasi_edc"
                      label="Kode Verivikasi EDC"
                      :rules="kodeVerivikasiEDCRule"
                      clearable
                      prepend-icon="mdi-numeric"
                      required
                      counter>
                    </v-text-field>
                  </v-card-text>

                  <v-card-actions class="justify-center">
                    <v-btn :loading="loadingButton" color="primary"  :disabled="validIdKartu == false" @click="stepperCounter = returnstepperCounter(stepperCounter);" >
                      Continue
                    </v-btn>
                    <v-btn :loading="loadingButton"  color="warning"  @click="stepperCounter = beforestepcounter(stepperCounter);">
                      Before
                    </v-btn>
                    <v-btn text :loading="loadingButton" @click="cancel">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </div>
          </v-stepper-content>
        </div>

        <div>
          <v-stepper-step :complete="stepperCounter > 3"  step="3" >
            Pembayaran Cash
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card height="300px" >
              <v-form ref="formUang" class="mb-5" v-model="validUang" lazy-validation>
                <v-card-title class="justify-center">
                  <span class="subTextOneNoMargin">
                    <p>Total Bayar</p>
                    <p class="mt-9">Jumlah Uang</p>
                    <p class="mt-9">Kembalian</p>
                  </span>               
                  <v-spacer></v-spacer>       
                  <span class="subTextTwoNoMargin">
                    <p>Rp. {{formatExample(form.total_harga)}}</p>
                    <v-text-field
                      v-model="formUang.jumlah_uang"
                      label="Jumlah Uang" 
                      type="number"
                      prepend-icon="mdi-currency-usd-circle-outline"
                      prefix="Rp."
                      :rules="[rules.kosong(formUang.jumlah_uang), rules.minus(formUang.jumlah_uang), rules.min(form.total_harga,formUang.jumlah_uang)]"
                      required>
                    </v-text-field>
                    <p v-if="(formUang.jumlah_uang - form.total_harga) <= 0 || validUang == false">Rp. 0,00</p>
                    <p v-else-if="validUang == true" >Rp. {{formatExample(formUang.jumlah_uang - form.total_harga)}}</p>
                  </span>
                </v-card-title>

                <v-card-actions class="justify-center">
                  <v-btn :loading="loadingButton" color="primary" :disabled="validUang == false" @click="stepperCounter = returnstepperCounter(stepperCounter);" >
                    Continue
                  </v-btn>
                  <v-btn :loading="loadingButton"  color="warning"  @click="stepperCounter = beforestepcounter(stepperCounter);">
                    Before
                  </v-btn>
                  <v-btn text :loading="loadingButton"  @click="cancel">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-stepper-content>
        </div>

        <!-- <div>
          <v-stepper-step step="4">
            Struk Pembayaran
          </v-stepper-step>
          
          <v-stepper-content step="4" align="center" justify="center">
            <div v-if="subLoading == true" class="pa-5">
              <v-progress-circular
                :size="100"
                :width="5"
                color="#d35d6e"
                indeterminate>
              </v-progress-circular>
            </div>
            
            <div id="section-to-print" v-else>
              <v-card outline tile class="mb-12" width="80%">
                <v-row class="px-5">
                    <v-col cols="4" class="d-flex child-flex">
                        <v-card tile flat height="200px">
                          <img height="100%" src="@/assets/akb_icon_dark.png" style="margin-bottom: 5px;"/>
                        </v-card>
                    </v-col>
                  
                    <v-row class="flex-column">
                        <v-col class="d-flex child-flex">
                            <v-card tile flat>
                                <h2 class="text"> 
                                    Atma Korean BBQ
                                </h2>
                                <p class="red--text">FUN PLACE TO GRILL!</p>
                            </v-card>
                        </v-col>
                        <v-col class="d-flex child-flex mt-n10" >
                            <v-card tile flat height="110px">
                              <span>
                                <p  class="mt-5">Jl. Babarsari No. 43 Yogyakarta 552181 </p>
                                <p class="mt-n4">Telp. (0274) 487711 </p>
                                <p  class="mt-n4">http://www.atmakoreanbbq.com</p>
                              </span>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-row>
                
                <v-row class="mt-n6 px-10">
                  <v-divider class="black"></v-divider>
                </v-row>

                <v-row no-gutters >
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2 px-8" height="55%" tile flat>
                      <v-card-title>
                        <span class="subTextOne">
                          <p style="font-weight: bold;">Recipt #</p>
                          <p class="mt-n4" style="font-weight: bold;" >Waiter</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwo">
                          <p>{{ recipt }}</p>
                          <p class="mt-n4" >{{ waiter }}</p>
                        </span>
                      </v-card-title>
                    </v-card>

                    <v-card v-else class="py-2 px-8"  height="55%" tile flat  >
                      <v-card-title>
                        <span class="subTextOne" >
                          <p style="font-weight: bold;">Date  #</p>
                          <p class="mt-n4" style="font-weight: bold;" >Time </p>
                          <p class="mt-n4 white--text" style="font-weight: bold;" >Customer </p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwo">
                          <p>{{ formatDateTimeSpli(time, 'Date') }}</p>
                          <p class="mt-n4" >{{ formatDateTimeSpli(time, 'Time') }}</p>
                          <p class="mt-n4 white--text" >{{ customerResi }}</p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
                
                <v-row class="mt-n14 px-10">
                  <v-divider class="black"></v-divider>
                </v-row>
                
                <v-row no-gutters class="mt-n3">
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2 px-8" tile flat>
                      <v-card-title>
                        <span class="subTextOne">
                          <p style="font-weight: bold;">Table #</p>
                          <p class="mt-n4 white--text" style="font-weight: bold;" hidden >Recipt</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwo">
                          <p class="pr-16 mr-10">{{ table}}</p>
                          <p class="mt-n4 white--text" hidden>{{ recipt }}</p>
                        </span>
                      </v-card-title>
                    </v-card>

                    <v-card v-else class="py-2 px-8" tile flat >
                      <v-card-title>
                        <span class="subTextOne" >
                          <p style="font-weight: bold;">Customer</p>
                          <p class="mt-n4 white--text" style="font-weight: bold;" hidden>Date  #</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwo">
                          <p>{{ customerResi }}</p>
                          <p class="mt-n4  white--text" hidden>{{ formatDateTimeSpli(time, 'Date') }}</p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n5 black"></v-divider>
                    <v-divider class="mt-n5 black"></v-divider>
                  </v-col>
                </v-row>

                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n10 black"></v-divider>
                    <v-divider class="mt-n10 black"></v-divider>
                  </v-col>
                </v-row>
                
                <v-row no-gutters class="mt-n12">
                  <v-col cols="12" class="d-flex child-flex px-5">
                    <v-data-table 
                      :headers="headersStruk" 
                      :items="dataDetailOrder" 
                      :items-per-page="-1" 
                      :hide-default-footer="true">
                      <template
                        v-for="header in headersStruk.filter((header) => header.hasOwnProperty('formatter'))"
                        v-slot:[`item.${header.value}`]="{ header, value }">
                        Rp. {{ header.formatter(value) }}
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>

                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n4 black"></v-divider>
                    <v-divider class="mt-n4 black"></v-divider>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-n3">
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2 pl-16" tile flat>
                    </v-card>

                    <v-card v-else class="py-2 pr-4 pl-16" tile flat>
                      <v-card-title class="justify=end">
                        <span class="subTextOneSubTable">
                          <p>Subtotal</p>
                          <p class="mt-n5">Service 5%</p>
                          <p class="mt-n5">Tax 10 %</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwoSubTable">
                          <p>Rp. {{formatExample(form.subtotal_harga)}}</p>
                          <p class="mt-n5">Rp. {{formatExample(form.biaya_service)}}</p>
                          <p class="mt-n5">Rp. {{formatExample(form.biaya_pajak)}}</p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n7 black"></v-divider>
                    <v-divider class="mt-n7 black"></v-divider>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-n9">
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2 px-8" tile flat>
                    </v-card>

                    <v-card v-else class="py-2 pr-4 pl-16" tile flat>
                      <v-card-title>
                        <span class="subTextOneSubTable">
                          <p  style="font-weight: bold;">Total</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwoSubTable">
                          <p style="font-weight: bold;">Rp. {{formatExample(form.total_harga)}}</p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row> 
                
                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n10 black"></v-divider>
                    <v-divider class="mt-n10 black"></v-divider>
                  </v-col>
                </v-row>

                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n15 black"></v-divider>
                    <v-divider class="mt-n15 black"></v-divider>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-n16">
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2 px-8" tile flat>
                    </v-card>

                    <v-card v-else class="py-2 pr-4 pl-16" tile flat>
                      <v-card-title class="justify=end">
                        <span class="subTextOneSubTable">
                          <p>Total QTY : </p>
                          <p class="mt-n5">Total Item :</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwoSubTable">
                          <p>{{ totalPorsiMenu }}</p>
                          <p class="mt-n5">{{ totalItemMenu }}</p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-5">
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2" tile flat>
                    </v-card>

                    <v-card v-else class="py-2 pr-4" tile flat>
                      <v-card-title class="justify=end">   
                        <v-spacer></v-spacer>  
                        <span class="subTextTwoSubTable">
                          <p style="font-weight: bold;" >Printed {{ formatDateTimeSpli(time, 'TimeCashier') }}</p>
                          <p class="mt-n5">Cashier : {{cashier}} </p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row class="px-16">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n1 black"></v-divider>
                    <v-divider class="mt-n1 black"></v-divider>
                  </v-col>
                </v-row>

                <v-card-title class="mt-n11 justify-center subTextOneNoMargin">THANK YOU FOR YOUR VISIT</v-card-title>

                <v-row class="px-16">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n5 black"></v-divider>
                    <v-divider class="mt-n5 black"></v-divider>
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <v-btn color="primary" @click="cetak" >
              Continue
            </v-btn>
            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>
        </div> -->
      </v-stepper>
    </v-dialog>

    <v-dialog v-model="dialogKartu" persistent max-width="600px">
      <v-card>
        <v-form v-model="validIdKartu" ref="formKartu">
          <v-card-title>
            <span class="headline">Tambah Kartu</span>    
          </v-card-title>

          <v-card-text class="px-10">
            <v-container>
              <v-text-field
                v-model="formKartu.tipe_kartu"
                label="Tipe Kartu"
                readonly
                required>
              </v-text-field>

              <v-text-field v-if="formKartu.tipe_kartu == 'Credit'"
                v-model="formKartu.nama_pemilik_kartu"
                label="Nama Pemilik Kartu"
                :rules="namaPemilikKartuRules"
                clearable
                required
                counter>
              </v-text-field>

              <v-text-field
                v-model="formKartu.nomer_kartu"
                label="Nomer Kartu"
                type="number"
                :rules="nomorKartuRule"
                clearable
                required
                counter>
              </v-text-field>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red darken-1" :loading="loadingButton" text @click="cancleKartu">
              Cancel
            </v-btn>

            <v-btn  :loading="loadingButton" color="blue darken-2" text @click="saveKartu" :disabled="!validIdKartu">
              Save
            </v-btn>
          </v-card-actions>    
        </v-form>
      </v-card>
    </v-dialog>

      <v-dialog style="overflow: hidden;" v-model="dialogStruk" fullscreen hide-overlay transition="dialog-bottom-transition" >
        <v-card flat>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialogStruk = false" >
              <v-icon id="hidden-print" >mdi-close</v-icon>
            </v-btn>
            
            <v-toolbar-title id="hidden-print" >Struk Pembayaran</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn id="hidden-print" dark text @click="cetak" >
                Cetak
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          
            <div v-if="subLoading == true" class="pa-5">
              <v-progress-circular
                :size="100"
                :width="5"
                color="#d35d6e"
                indeterminate>
              </v-progress-circular>
            </div>
            
            <div v-else class="mt-16" id="show-print">
                <v-row class="px-5">
                    <v-col cols="4" class="d-flex child-flex">
                        <v-card tile flat height="200px">
                          <img height="100%" src="@/assets/akb_icon_dark.png" style="margin-bottom: 5px;"/>
                        </v-card>
                    </v-col>
                  
                    <v-row class="flex-column">
                        <v-col class="d-flex child-flex">
                          <span>
                            <h2 class="text"> 
                              Atma Korean BBQ
                            </h2>
                            <p class="red--text">FUN PLACE TO GRILL!</p>
                          </span>
                        </v-col>
                        <v-col class="d-flex child-flex mt-n10" >
                              <span>
                                <p  class="mt-5">Jl. Babarsari No. 43 Yogyakarta 552181 </p>
                                <p class="mt-n4">Telp. (0274) 487711 </p>
                                <p  class="mt-n4">http://www.atmakoreanbbq.com</p>
                              </span>
                        </v-col>
                    </v-row>
                </v-row>
                
                <v-row class="mt-n6 px-10">
                  <v-divider class="black"></v-divider>
                </v-row>

                <v-row no-gutters >
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2 px-8" height="55%" tile flat>
                      <v-card-title>
                        <span class="subTextOne">
                          <p style="font-weight: bold;">Recipt #</p>
                          <p class="mt-n4" style="font-weight: bold;" >Waiter</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwo">
                          <p>{{ recipt }}</p>
                          <p class="mt-n4" >{{ waiter }}</p>
                        </span>
                      </v-card-title>
                    </v-card>

                    <v-card v-else class="py-2 px-8"  height="55%" tile flat  >
                      <v-card-title>
                        <span class="subTextOne" >
                          <p style="font-weight: bold;">Date  #</p>
                          <p class="mt-n4" style="font-weight: bold;" >Time </p>
                          <p class="mt-n4 white--text" style="font-weight: bold;" >Customer </p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwo">
                          <p>{{ formatDateTimeSpli(time, 'Date') }}</p>
                          <p class="mt-n4" >{{ formatDateTimeSpli(time, 'Time') }}</p>
                          <p class="mt-n4 white--text" >{{ customerResi }}</p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
                
                <v-row class="mt-n14 px-10">
                  <v-divider class="black"></v-divider>
                </v-row>
                
                <v-row no-gutters class="mt-n3">
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2 px-8" tile flat>
                      <v-card-title>
                        <span class="subTextOne">
                          <p style="font-weight: bold;">Table #</p>
                          <p class="mt-n4 white--text" style="font-weight: bold;" hidden >Recipt</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwo">
                          <p class="pr-16 mr-10">{{ table}}</p>
                          <p class="mt-n4 white--text" hidden>{{ recipt }}</p>
                        </span>
                      </v-card-title>
                    </v-card>

                    <v-card v-else class="py-2 px-8" tile flat >
                      <v-card-title>
                        <span class="subTextOne" >
                          <p style="font-weight: bold;">Customer</p>
                          <p class="mt-n4 white--text" style="font-weight: bold;" hidden>Date  #</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwo">
                          <p>{{ customerResi }}</p>
                          <p class="mt-n4  white--text" hidden>{{ formatDateTimeSpli(time, 'Date') }}</p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n5 black"></v-divider>
                    <v-divider class="mt-n5 black"></v-divider>
                  </v-col>
                </v-row>

                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n10 black"></v-divider>
                    <v-divider class="mt-n10 black"></v-divider>
                  </v-col>
                </v-row>
                
                <v-row no-gutters class="mt-n12">
                  <v-col cols="12" class="d-flex child-flex px-5">
                    <v-data-table 
                      :headers="headersStruk" 
                      :items="dataDetailOrder" 
                      :items-per-page="-1" 
                      :hide-default-footer="true">
                      <template
                        v-for="header in headersStruk.filter((header) => header.hasOwnProperty('formatter'))"
                        v-slot:[`item.${header.value}`]="{ header, value }">
                        Rp. {{ header.formatter(value) }}
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>

                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n4 black"></v-divider>
                    <v-divider class="mt-n4 black"></v-divider>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-n3">
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2 pl-16" tile flat>
                    </v-card>

                    <v-card v-else class="py-2 pr-4 pl-16" tile flat>
                      <v-card-title class="justify=end">
                        <span class="subTextOneSubTable">
                          <p>Subtotal</p>
                          <p class="mt-n5">Service 5%</p>
                          <p class="mt-n5">Tax 10 %</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwoSubTable">
                          <p>Rp. {{formatExample(subtotal)}}</p>
                          <p class="mt-n5">Rp. {{formatExample(service)}}</p>
                          <p class="mt-n5">Rp. {{formatExample(pakjak)}}</p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n7 black"></v-divider>
                    <v-divider class="mt-n7 black"></v-divider>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-n9">
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2 px-8" tile flat>
                    </v-card>

                    <v-card v-else class="py-2 pr-4 pl-16" tile flat>
                      <v-card-title>
                        <span class="subTextOneSubTable">
                          <p  style="font-weight: bold;">Total</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwoSubTable">
                          <p style="font-weight: bold;">Rp. {{formatExample(totalkeseluruhan)}}</p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row> 
                
                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n10 black"></v-divider>
                    <v-divider class="mt-n10 black"></v-divider>
                  </v-col>
                </v-row>

                <v-row class="px-7">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n15 black"></v-divider>
                    <v-divider class="mt-n15 black"></v-divider>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-n16">
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2 px-8" tile flat>
                    </v-card>

                    <v-card v-else class="py-2 pr-4 pl-16" tile flat>
                      <v-card-title class="justify=end">
                        <span class="subTextOneSubTable">
                          <p>Total QTY : </p>
                          <p class="mt-n5">Total Item :</p>
                        </span>               
                        <v-spacer></v-spacer>       
                        <span class="subTextTwoSubTable">
                          <p>{{ totalPorsiMenu }}</p>
                          <p class="mt-n5">{{ totalItemMenu }}</p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mt-5">
                  <v-col v-for="n in 2" :key="n" cols="12" sm="6" >
                    <v-card v-if="n==1" class="py-2" tile flat>
                    </v-card>

                    <v-card v-else class="py-2 pr-4" tile flat>
                      <v-card-title class="justify=end">   
                        <v-spacer></v-spacer>  
                        <span class="subTextTwoSubTable">
                          <p style="font-weight: bold;" >Printed {{ formatDateTimeSpli(time, 'TimeCashier') }}</p>
                          <p class="mt-n5">Cashier : {{cashier}} </p>
                        </span>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row class="px-16">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n1 black"></v-divider>
                    <v-divider class="mt-n1 black"></v-divider>
                  </v-col>
                </v-row>

                <v-card-title class="mt-n11 justify-center subTextOneNoMargin">THANK YOU FOR YOUR VISIT</v-card-title>

                <v-row class="px-16">
                  <v-col cols="12" class="d-flex child-flex">
                    <v-divider class="mt-n5 black"></v-divider>
                    <v-divider class="mt-n5 black"></v-divider>
                  </v-col>
                </v-row>
            </div>
        </v-card>
      </v-dialog>
 
    <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>

<script>
//import html2pdf from 'html2pdf.js'
export default {
    name: "Pembayaran",
    data(){
      return{
        loadingButton:false,
        loading: true,
        subLoading: true,
        load: false,
        snackbar: false,
        error_message: '',  
        color: '',
        selection: 0,
        belumBayar:[],
        sudahBayar:[],
        nama_customer: '',
        id_table: '',
        customer:'',
        meja:'',
        tanggal:'',
        form: {
          subtotal_harga: null,
          biaya_pajak: null,
          biaya_service: null,
          total_harga: null,
          tipe_pembayaran: null,
          tanggal_transaksi: null,
          kode_resi:null,
          id_order: null,
          id_pegawai: null,
        },
        transaksi: new FormData,
        bayarId:'',
        readAction: '',
        dialog: false,
        stepperCounter: 1,
        valid: false,
        jenisPembayaran: ['Cash', 'Debit', 'Credit'],
        jenisPembayaranRule: [
          (v) => !!v || 'Jenis Pembayaran tidak boleh kosong :(',
        ],
        validIdKartu: false,
        formIdKartu:{
          id_kartu: null,
          kode_verivikasi_edc: null,
        },
        kartuAktif:[],
        idKartuRule: [
          (v) => !!v || 'Nama pemilik katru tidak boleh kosong :(',
        ],
        kodeVerivikasiEDCRule: [
          (v) => !!v || 'Kode verivikasi EDC tidak boleh kosong :(',
        ],
        dialogKartu: false,
        dialogStruk: false,
        validKartu: false,
        formKartu: {
          nama_pemilik_kartu: null,
          tipe_kartu: null,
          nomer_kartu: null
        },
        namaPemilikKartuRules: [
          (v) => !!v || 'Nama tidak boleh kosong :(',
          (v) => (v && v.length <= 60) || 'Name harus dibaawah 60 karakter',
        ],
        nomorKartuRule: [
          (v) => !!v || 'Nomor Kartu tidak valid :(',
          (v) => (v && /^[0-9]*$/.test(v)) || 'Nomor Kartu bilangan real :(',
          (v) => (v && v.length == 16) || 'Name harus 16 karakter',
        ],
        kartu: new FormData,
        validUang: false,
        formUang:{
          jumlah_uang: null
        },
        rules: {
          kosong(v){
            return !!v || 'Jumlah Uang tidak valid :('
          },
          minus(v){
            return v && /^[1-9]\d*$/.test(v) || 'Jumlah Uang tidak valid :('
          },
          min(min, v) { 
            return (v && v >= min) || 'Jumlah Uang Masih Kurang :(';
          }
        },
        transaksiID: '',
        dataTransaksiReservasi: '',
        dataTransaksiOrder: '',
        recipt: '',
        waiter: '',
        table: '',
        customerResi: '',
        time: '',
        totalPorsiMenu: '',
        totalItemMenu: '',
        cashier: '',
        dataDetailOrder:[],
        headersStruk: [
          { text: 'QTY',
            align: 'center',
            sortable: false,
            class:"font-weight-black",
            value: 'jumlah_item_order',
          },
          { text: 'Item Menu',
            align: 'start',
            sortable: false, 
            class:"font-weight-black",
            value: 'nama_menu' 
          },
          { text: 'Harga Item',
            align: 'end',
            sortable: false, 
            class:"font-weight-black",
            value: 'harga_item_order', 
            formatter: this.formatExample
          },
          { text: 'Sub Total',
            align: 'end',
            sortable: false, 
            class:"font-weight-black",
            value: 'SubTotal',
            formatter: this.formatExample
          },
        ],
        notifications: false,
        sound: true,
        widgets: false,
        subtotal: '',
        pakjak: '',
        service: '',
        totalkeseluruhan: '',
      };
    },

    methods: {
      formatExample(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      formatDateTimeSpli(time, check){
        var date_test = new Date(time);
        if(check == 'Date'){
          var dd = String(date_test.getDate()).padStart(2, '0');
          var mm = String(date_test.getMonth() + 1).padStart(2, '0');
          var yyyy = date_test.getFullYear();
          var value = dd + '/' + mm + '/' +yyyy;
          return value;
        } 
        else if (check == 'Time'){
          var valueTime = String(date_test.getHours()).padStart(2, '0') + ' : ' + String(date_test.getMinutes()).padStart(2, '0');
          return valueTime;
        }
        else {
          var myDate = new Date(time);

          let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];


          let date = String(myDate.getDate()).padStart(2, '0');
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
              let conversion = twentyFourHourTime;
              return `${conversion}`
            }else {
              amOrPm = 'AM';
              return `${myDate.getHours()}`}
            };
          let hours = String(twelveHours()).padStart(2, '0');
          let minutes = String(myDate.getMinutes()).padStart(2, '0');
          let seconds = String(myDate.getSeconds()).padStart(2, '0');

          let currentTime = `${hours}:${minutes}:${seconds} ${amOrPm}`;

          let dateTime = today + ' - ' + currentTime;

          return dateTime;
        }
      },
      setValue(){
        this.recipt            = this.dataTransaksiReservasi[0].kode_resi;
        this.waiter            = this.dataTransaksiReservasi[0].nama_pegawai;
        this.table             = this.dataTransaksiReservasi[0].id_table;
        this.customerResi      = this.dataTransaksiReservasi[0].nama_customer;
        this.time              = this.dataTransaksiReservasi[0].created_at;
        this.totalPorsiMenu    = this.dataTransaksiOrder[0].total_item_order;
        this.totalItemMenu     = this.dataTransaksiOrder[0].total_menu_order;
        this.cashier           = this.dataTransaksiOrder[0].nama_pegawai;
        this.subtotal          = this.dataTransaksiReservasi[0].subtotal_harga;
        this.pakjak            = this.dataTransaksiReservasi[0].biaya_pajak;
        this.service           = this.dataTransaksiReservasi[0].biaya_service;
        this.totalkeseluruhan  = this.dataTransaksiReservasi[0].total_harga;
      },
      getColor (value) {
        if (value == 0) return 'red'
        else if (value == 1) return 'green'
        else return 'blue'
      },
      readOrderByStatus(statusPesanan) {
        var url = this.$api + '/getOrderAndReservation/order/' + statusPesanan;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          if(statusPesanan == 1){
            this.belumBayar = response.data.data
          }
          else if(statusPesanan == 2){
            this.sudahBayar = response.data.data
          }
        }).finally(() => {
          this.loading = false;
        })
      },
      read(setAction){
        this.loading = true;
        if(setAction == 'Belum Bayar'){
          this.belumBayar = [];
          this.readOrderByStatus(1); //mengambil data
        } else if(setAction == 'Sudah Bayar'){
          this.sudahBayar = [];
          this.readOrderByStatus(2); //mengambil data
        }
      },
      bayarHendler(item, set){
        this.dialog = true;

        this.bayarId = item.id;
        this.readAction = set;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        this.form.subtotal_harga    = item.total_harga_order;
        this.form.biaya_pajak       = item.total_harga_order * 0.1;
        this.form.biaya_service     = item.total_harga_order * 0.05;
        this.form.total_harga       = this.form.subtotal_harga + this.form.biaya_pajak + this.form.biaya_service;
        this.form.tanggal_transaksi = yyyy + '-' + mm + '-' + dd;
        this.form.kode_resi         = 'AKB-' + dd + '-' + mm + '-' + yyyy.toString().substr(-2) + '-';
        this.form.id_order          = item.id;
        this.form.id_pegawai        = localStorage.getItem('id');

        this.customer  = item.nama_customer;
        this.meja      = item.id_table;
        this.tanggal   = item.tanggal_order;
      },
      detailHandler(item){
          this.subLoading = true;
          this.dialogStruk = true;
          this.transaksiID=item.transaksisID;
          this.readTransaksiReservasi();
      },
      returnstepperCounter(stepperCounterCek){
        if(stepperCounterCek == 1){
          if(this.$refs.form.validate()){
            if(this.form.tipe_pembayaran == 'Cash'){
              this.stepperCounter = 3;
            } else {
              this.stepperCounter = 2;
              this.kartuAktif = [];
              this.readKartu(this.form.tipe_pembayaran);
            }
          }
        } 
        else if (stepperCounterCek == 2){
          if(this.$refs.formIdKartu.validate()){
            this.subLoading = true;
            this.saveTransaksi();
            //this.stepperCounter = 4;
          }
        } 
        else if (stepperCounterCek == 3){
          if(this.$refs.formUang.validate()){
            this.subLoading = true;
            this.saveTransaksi();
            //this.stepperCounter = 4;
          }
        }
        return this.stepperCounter;
      },
      beforestepcounter(){
        this.stepperCounter = 1;
        return this.stepperCounter;
      },
      readKartu(tipe_kartu){
        this.subLoading = true;
        var url = this.$api + '/getKartuCustom/kartu/' + tipe_kartu;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
            this.kartuAktif = response.data.data
        }).finally(() => {
          this.subLoading = false;
          this.loadingButton= false;
        })
      },
      dlKartu(){
        this.dialogKartu = true;
        this.formKartu.tipe_kartu = this.form.tipe_pembayaran;
      },
      saveTransaksi(){
        this.transaksi.append('subtotal_harga', this.form.subtotal_harga);
        this.transaksi.append('biaya_pajak', this.form.biaya_pajak);
        this.transaksi.append('biaya_service', this.form.biaya_service);
        this.transaksi.append('total_harga', this.form.total_harga);
        this.transaksi.append('tipe_pembayaran', this.form.tipe_pembayaran);
        this.transaksi.append('tanggal_transaksi', this.form.tanggal_transaksi);
        this.transaksi.append('kode_resi', this.form.kode_resi);
        this.transaksi.append('id_order', this.form.id_order);
        this.transaksi.append('id_pegawai', this.form.id_pegawai);
        if(this.formIdKartu.id_kartu != null){
          this.transaksi.append('id_kartu', this.formIdKartu.id_kartu);
        }
        if(this.formIdKartu.kode_verivikasi_edc != null){
          this.transaksi.append('kode_verivikasi_edc', this.formIdKartu.kode_verivikasi_edc);
        }

        var url = this.$api + '/store/transaksi'
        this.load = true
        this.$http.post(url, this.transaksi, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => {
          this.error_message=response.data.message;
          this.transaksiID=response.data.data.id;
          this.dialogStruk = true;
          this.color="green"
          this.snackbar=true;
          this.load = false;
        }).catch(error => {
          this.error_message=error.response.data.message;
          this.color="red"
          this.snackbar=true;
          this.load = false;
        }).finally(() => {
          this.readTransaksiReservasi();
          this.cancel();
          if(this.formIdKartu.id_kartu != null){
            this.resetFormIdKartu();
          }else {
            this.resetFormUang();
          }
        }) 
      },
      resetFormIdKartu() {
        this.formIdKartu = {
          id_kartu: null,
          kode_verivikasi_edc: null,
        };
        this.validIdKartu= false;
      },
      resetFormUang() {
        this.formUang = {
          jumlah_uang: null,
        };
        this.$refs.formUang.resetValidation();
        this.validUang= false;
      },
      cancel() {
        this.loadingButton= false;
        this.resetForm();
        this.read('Belum Bayar'); 
        this.valid = false
        this.bayarId = '';
        this.dialog = false;
        this.stepperCounter = 1;
      },
      resetForm() {
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
        this.transaksi= new FormData;
      },
      readTransaksiReservasi(){
        var url = this.$api + '/getOneReservasi/transaksi/' + this.transaksiID;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
            this.dataTransaksiReservasi = '';
            this.dataTransaksiReservasi = response.data.data
        }).finally(() => {
          this.readTransaksiOrder();
        })
      },
      readTransaksiOrder(){
        var url = this.$api + '/getOneOrder/transaksi/' + this.transaksiID;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
            this.dataTransaksiOrder = '';
            this.dataTransaksiOrder = response.data.data
        }).finally(() => {
          this.setValue();
          this.readTransaksiDetailOrder();
        })
      },
      readTransaksiDetailOrder(){
        this.subLoading = true;
        this.loadingButton= true;
        var url = this.$api + '/getDetailOrder/transaksi/' + this.transaksiID;
        this.$http.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
            this.dataDetailOrder = [];
            this.dataDetailOrder = response.data.data
        }).finally(() => {
          this.subLoading = false;
          this.loadingButton= false;
        })
      },
      cetak(){
				/*html2pdf(this.$refs.contentQR, {
					margin: 0,
					filename: 'QR.pdf',
					image: { type: 'jpeg', quality: 1.00 },
          html2canvas:  { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
				})*/
        window.print();

        /*var printContents = document.getElementById('contentQR').innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;*/
      },
      saveKartu(){
          this.loadingButton= true;

          this.kartu.append('tipe_kartu', this.formKartu.tipe_kartu);
          this.kartu.append('nomer_kartu', this.formKartu.nomer_kartu);
          if(this.formKartu.nama_pemilik_kartu != null){
              this.kartu.append('nama_pemilik_kartu', this.formKartu.nama_pemilik_kartu);
          }

        var url = this.$api + '/store/kartu'
        this.load = true
        this.$http.post(url, this.kartu, {
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
          this.cancleKartu();
        }) 
      },
      cancleKartu() {
        this.loadingButton= false;
        this.resetFormKartu();
        this.readKartu(this.form.tipe_pembayaran);
        this.validKartu = false
        this.dialogKartu = false;
      },
      resetFormKartu() {
        this.$refs.formKartu.reset();
        this.$refs.formKartu.resetValidation();
        this.kartu= new FormData;
      },
    },

    computed: {
        headers(){
            return [
                { text: "Nama customer", 
                    align: "center", 
                    sortable: true, 
                    value: "nama_customer",
                    filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'nama_customer' ].toLowerCase() ) }
                },
                { text: "No. Meja",
                    value: "id_table", 
                    align: "center" ,
                    filter: value => {
                        if (!this.id_table) return true;
                        return value == parseInt(this.id_table);
                    }
                },
                { text: "Tanggal Order",   value: "tanggal_order",  align: "center" }, 
                { text: "Total Harga",   value: "total_harga_order",  align: "center" , formatter: this.formatExample  }, 
                { text: "Status Order",   value: "status_order",  align: "center" }, 
                { text: "Actions", value: "actions" , align: "center"}, 
            ]
        } 
    },

    mounted() {
      this.read('Belum Bayar'); 
    },
};
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
    
    .text{
        margin-top: 30px;
        font-weight: bold;
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
      font-size: 17px !important;
      color: rgb(1, 13, 41);
    }
    
    .subTextTwo{ 
      text-align:left;
      margin-top: -30px;
      margin-bottom: -35px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 17px !important;
      color: rgb(1, 13, 41);
    }

    .subTextOneNoMargin{ 
      text-align:left;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 17px !important;
      color: rgb(1, 13, 41);
    }
    
    .subTextTwoNoMargin{ 
      text-align:left;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 17px !important;
      color: rgb(1, 13, 41);
    }

    .subTextOneSubTable{ 
      text-align:left;
      margin-top: -30px;
      margin-bottom: -35px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 14px !important;
      color: rgb(1, 13, 41);
    }

    .subTextTwoSubTable{ 
      text-align:right;
      margin-top: -30px;
      margin-bottom: -35px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 14px !important;
      color: rgb(1, 13, 41);
    }

    @media print {
      #hidden-print {
        display: none !important;
      }
    }
</style> 
