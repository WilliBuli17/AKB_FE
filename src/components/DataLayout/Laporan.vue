<template>
  <v-main>
    <v-card class="cardStyle mx-10 mt-10 px-5">
        <v-sheet
            class="v-sheet--offset mx-auto"
            color="#B2D0DA"
            elevation="8"
            max-width="calc(100% - 32px)">  
            <p class="text-h4 font-weight-medium mb-1">Laporan</p>
        </v-sheet>

        <div v-if="loading == true" class="pa-5">
            <v-progress-circular
            :size="100"
            :width="5"
            color="#d35d6e"
            indeterminate>
            </v-progress-circular>
        </div>

        <v-card-actions class="justify-center align-center">
            <v-btn class="green darken-1" dark @click="dialogForm('Pendapatan Bulanan')">Pendapatan Bulanan</v-btn>
            <v-btn class="green darken-1" dark @click="dialogForm('Pendapatan Tahunan')">Pendapatan Tahunan</v-btn>
            <v-btn class="deep-orange darken-1" dark @click="dialogForm('Pengeluaran Bulanan')">Pengeluaran Bulanan</v-btn>
            <v-btn class="deep-orange darken-1" dark @click="dialogForm('Pengeluaran Tahunan')">Pengeluaran Tahunan</v-btn>
            <v-btn class="primary" dark @click="dialogForm('Penjualan Item')">Penjualan Item</v-btn>
            <v-btn class="red darken-1" dark @click="dialogForm('Stock Bulanan')">Stock Bulanan</v-btn>
            <v-btn class="red darken-1" dark @click="dialogForm('Stock Custom')">Stock Custom</v-btn>
        </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card >
        <v-form v-model="validPendapatanPengeluaranBulanan" ref="formPendapatanPengeluaranBulanan"
        v-if="judulDialog == 'Pendapatan Bulanan' || judulDialog == 'Pengeluaran Bulanan'" >
          <v-card-title>
            <span class="headline">{{ judulDialog }}</span>    
          </v-card-title>

          <v-card-text class="px-10">
            <v-container>
                <v-autocomplete
                    :items="tahunSelect"
                    item-text="TAHUN"
                    item-value="TAHUN"
                    persistent-hint
                    :return-object="false"
                    placeholder="Select..."    
                    v-model="formPendapatanPengeluaranBulanan.tahun"
                    label="Tahun"
                    :rules="rulePendapatanPengeluaranBulanan"
                    clearable
                    required>
                  </v-autocomplete>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="cancleDialogForm, dialog = false">
              Cancel
            </v-btn>

             <v-btn color="blue darken-2" text @click="read">
              Continue
            </v-btn>
          </v-card-actions>    
        </v-form>

        <v-form v-model="validPendapatanPengeluaranTahunan" ref="formPendapatanPengeluaranTahunan"
        v-else-if="judulDialog == 'Pendapatan Tahunan' || judulDialog == 'Pengeluaran Tahunan'" >
          <v-card-title>
            <span class="headline">{{ judulDialog }}</span>    
          </v-card-title>

          <v-card-text class="px-10">
            <v-container>
                <v-autocomplete
                    :items="tahunSelect"
                    item-text="TAHUN"
                    item-value="TAHUN"
                    persistent-hint
                    :return-object="false"
                    placeholder="Select..."
                    v-model="formPendapatanPengeluaranTahunan.tahunAwal"
                    label="Tahun Mulai"
                    :rules="rulePendapatanPengeluaranTahunanAwal"
                    clearable
                    required>
                </v-autocomplete>
                <v-autocomplete
                    :items="tahunSelect"
                    item-text="TAHUN"
                    item-value="TAHUN"
                    persistent-hint
                    :return-object="false"
                    placeholder="Select..."
                    v-model="formPendapatanPengeluaranTahunan.tahunAkhir"
                    label="Tahun Selesai"
                    :rules="rulePendapatanPengeluaranTahunanAkhir"
                    clearable
                    required>
                </v-autocomplete>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="cancleDialogForm, dialog = false">
              Cancel
            </v-btn>

             <v-btn color="blue darken-2" text @click="read">
              Continue
            </v-btn>
          </v-card-actions>    
        </v-form>

        <v-form v-model="validStockCustom" ref="formStockCustom"
        v-else-if="judulDialog == 'Stock Custom'" >
          <v-card-title>
            <span class="headline">{{ judulDialog }}</span>    
          </v-card-title>

          <v-card-text class="px-10">
            <v-container>
                <v-menu
                    v-model="dateInputAwal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="formStockCustom.tanggalMulai"
                            clearable
                            label="Tanggal Mulai"
                            :rules="ruleStockCustomAwal"
                            readonly
                            required
                            v-bind="attrs"
                            v-on="on">
                        </v-text-field>
                    </template>
                                            
                    <v-date-picker
                        v-model="formStockCustom.tanggalMulai"
                        @input="dateInputAwal = false">
                    </v-date-picker>
                </v-menu>

                <v-menu
                    v-model="dateInputAkhir"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="formStockCustom.tanggalSelesai"
                            clearable
                            label="Tanggal Mulai"
                            :rules="ruleStockCustomAkhir"
                            readonly
                            required
                            v-bind="attrs"
                            v-on="on">
                        </v-text-field>
                    </template>
                                            
                    <v-date-picker
                        v-model="formStockCustom.tanggalSelesai"
                        @input="dateInputAkhir = false">
                    </v-date-picker>
                </v-menu>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="cancleDialogForm, dialog = false">
              Cancel
            </v-btn>

             <v-btn color="blue darken-2" text @click="read">
              Continue
            </v-btn>
          </v-card-actions>    
        </v-form>

        <v-form v-model="validStockBulan" ref="formStockBulan"  
        v-else-if="judulDialog == 'Stock Bulanan'" >
          <v-card-title>
            <span class="headline">{{ judulDialog }}</span>    
          </v-card-title>

          <v-card-text class="px-10">
            <v-container>
                <v-autocomplete
                    v-model="formStockBulan.idBahan"
                    label="Nama Bahan"
                    :items="bahanAktif"
                    :rules="ruleStockBulanAwal"
                    item-text="nama_bahan"
                    item-value="id"
                    persistent-hint
                    :return-object="false"
                    placeholder="Select..."
                    required
                    clearable>
                </v-autocomplete>

                <v-menu
                    v-model="dateInputAkhir"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="formStockBulan.monthYear"
                            clearable
                            label="Tanggal Mulai"
                            :rules="ruleStockBulanAkhir"
                            readonly
                            required
                            v-bind="attrs"
                            v-on="on">
                        </v-text-field>
                    </template>
                                            
                    <v-date-picker
                        v-model="formStockBulan.monthYear"
                        type="month"
                        @input="dateInputAkhir = false">
                    </v-date-picker>
                </v-menu>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="cancleDialogForm, dialog = false">
              Cancel
            </v-btn>

             <v-btn color="blue darken-2" text @click="read">
              Continue
            </v-btn>
          </v-card-actions>    
        </v-form>

        <v-form v-model="validPenjualanItem" ref="formPenjualanItem"
        v-else-if="judulDialog == 'Penjualan Item'" >
          <v-card-title>
            <span class="headline">{{ judulDialog }}</span>    
          </v-card-title>

          <v-card-text class="px-10">
            <v-container>
                <v-autocomplete
                    :items="tahunSelect"
                    item-text="TAHUN"
                    item-value="TAHUN"
                    persistent-hint
                    :return-object="false"
                    placeholder="Select..."
                    v-model="formPenjualanItem.tahun"
                    label="Tahun"
                    :rules="rulePenjualanItemTahun"
                    clearable
                    required>
                </v-autocomplete>
                <v-autocomplete
                    :items="bulanSelect"
                    placeholder="Select..."
                    v-model="formPenjualanItem.bulan"
                    label="Bulan"
                    :rules="rulePenjualanItemBulan"
                    item-text="text"
                    item-value="id"
                    persistent-hint
                    :return-object="false"
                    clearable
                    required>
                </v-autocomplete>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="cancleDialogForm, dialog = false">
              Cancel
            </v-btn>

             <v-btn color="blue darken-2" text @click="read">
              Continue
            </v-btn>
          </v-card-actions>    
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog  class="px-16" style="overflow: hidden;" v-model="dialogLaporan" fullscreen hide-overlay transition="dialog-bottom-transition" >
        <v-card flat>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="cancelDialogLaporan" >
                    <v-icon id="hidden-print" >mdi-close</v-icon>
                </v-btn>
                
                <v-toolbar-title id="hidden-print" >{{ judulDialog }}</v-toolbar-title>
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

                <v-card-title class="justify-center subTextOneNoMargin">
                    Laporan {{ judulDialog }}
                </v-card-title>

                <div v-if="judulDialog == 'Pendapatan Bulanan' || judulDialog == 'Pengeluaran Bulanan'" >
                    <v-row no-gutters >
                        <span class="subTextTwoNoMargin px-16">
                            <p>Tahun : {{formPendapatanPengeluaranBulanan.tahun}}</p>
                        </span>
                    </v-row>

                    <v-row no-gutters class="mt-5">
                        <v-col cols="12" class="d-flex child-flex px-16">
                            <v-data-table 
                                :headers="headersPendapatanPengeluaranBulanan" 
                                :items="pendapatanPengeluaranBulanan" 
                                :items-per-page="-1" 
                                :hide-default-footer="true">
                                <template v-slot:[`item.no`]="{ item }">
                                    {{ pendapatanPengeluaranBulanan.indexOf(item) + 1}}
                                </template>
                                        
                                <template
                                    v-for="header in headersPendapatanPengeluaranBulanan.filter((header) => header.hasOwnProperty('formatter'))"
                                    v-slot:[`item.${header.value}`]="{ header, value }">
                                    Rp. {{ header.formatter(value) }}
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </div>

                <div v-else-if="judulDialog == 'Pendapatan Tahunan' || judulDialog == 'Pengeluaran Tahunan'" >
                    <v-row no-gutters >
                        <span class="subTextTwoNoMargin px-16">
                            <p>Tahun : {{formPendapatanPengeluaranTahunan.tahunAwal}} s/d {{formPendapatanPengeluaranTahunan.tahunAkhir}}</p>
                        </span>
                    </v-row>

                    <v-row no-gutters class="mt-5">
                        <v-col cols="12" class="d-flex child-flex px-16">
                            <v-data-table 
                                :headers="headersPendapatanPengeluaranTahunan" 
                                :items="pendapatanPengeluaranTahunan" 
                                :items-per-page="-1" 
                                :hide-default-footer="true">
                                <template v-slot:[`item.no`]="{ item }">
                                    {{ pendapatanPengeluaranTahunan.indexOf(item) + 1}}
                                </template>
                                        
                                <template
                                    v-for="header in headersPendapatanPengeluaranTahunan.filter((header) => header.hasOwnProperty('formatter'))"
                                    v-slot:[`item.${header.value}`]="{ header, value }">
                                    Rp. {{ header.formatter(value) }}
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </div>

                <div v-else-if="judulDialog == 'Stock Custom'" >
                    <v-row no-gutters >
                        <span class="subTextTwoNoMargin px-16">
                            <p>Item Menu : ALL</p>
                        </span>
                    </v-row>
                    <v-row no-gutters >
                        <span class="subTextTwoNoMargin px-16">
                            <p>Periode : Custom ({{formStockCustom.tanggalMulai}} s/d {{formStockCustom.tanggalSelesai}})</p>
                        </span>
                    </v-row>

                    <v-row no-gutters class="mt-5">
                        <v-col cols="12" class="d-flex child-flex px-16">
                            <v-data-table 
                                :headers="headersStockCustom" 
                                :items="stockCustom" 
                                :items-per-page="-1" 
                                :hide-default-footer="true">
                                <template v-slot:[`item.no`]="{ item }">
                                    {{ stockCustom.indexOf(item) + 1}}
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </div>

                <div v-else-if="judulDialog == 'Stock Bulanan'" >
                    <v-row no-gutters >
                        <span class="subTextTwoNoMargin px-16">
                            <p>Item Menu : {{namaBahan}}</p>
                        </span>
                    </v-row>
                    <v-row no-gutters >
                        <span class="subTextTwoNoMargin px-16">
                            <p>Periode : {{dateStockBulan(formStockBulan.monthYear + '-01')}}</p>
                        </span>
                    </v-row>

                    <v-row no-gutters class="mt-5">
                        <v-col cols="12" class="d-flex child-flex px-16">
                            <v-data-table 
                                :headers="headersStockBulan" 
                                :items="stockBulan" 
                                :items-per-page="-1" 
                                :hide-default-footer="true">
                                <template v-slot:[`item.no`]="{ item }">
                                    {{ stockBulan.indexOf(item) + 1}}
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </div>

                <div v-else-if="judulDialog == 'Penjualan Item'" >
                    <v-row no-gutters >
                        <span class="subTextTwoNoMargin px-16">
                            <p>Tahun : {{formPenjualanItem.tahun}}</p>
                        </span>
                    </v-row>
                    <v-row no-gutters >
                        <span class="subTextTwoNoMargin px-16">
                            <p>Bulan : {{namaBulan}}</p>
                        </span>
                    </v-row>

                    <v-row no-gutters class="mt-5">
                        <v-col cols="12" class="d-flex child-flex px-16">
                            <v-data-table 
                                :headers="headersPenjualanItem" 
                                :items="penjualanItem" 
                                :items-per-page="-1" 
                                :hide-default-footer="true">
                                <template v-slot:[`item.no`]="{ item }">
                                    {{ penjualanItem.indexOf(item) + 1}}
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </div>

                <v-card-text class="justify-center subTextThreeNoMargin mt-16">
                    <p  style="font-weight: bold;">Printed {{dateTimeNow()}}</p>
                    <p>Printed By {{ user.nama_pegawai }}</p>
                </v-card-text>
            </div>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>
        {{ error_message }}
    </v-snackbar>
  </v-main>
</template>

<script>
    export default {
        name: "Laporan",
        data() {
            return {
                loading: true,
                subLoading:false,
                snackbar: false,
                error_message: '',
                color: '',
                show: false,
                dialog: false,
                judulDialog: '',
                validPendapatanPengeluaranBulanan: false,
                validPendapatanPengeluaranTahunan: false,
                validStockCustom: false,
                validStockBulan: false,
                validPenjualanItem: false,
                formPendapatanPengeluaranBulanan : {
                    tahun: '',
                },
                formPendapatanPengeluaranTahunan : {
                    tahunAwal: '',
                    tahunAkhir: '',
                },
                formStockCustom : {
                    tanggalMulai: '',
                    tanggalSelesai: '',
                },
                formStockBulan : {
                    idBahan: '',
                    monthYear: '',
                },
                formPenjualanItem : {
                    tahun: '',
                    bulan: '',
                },
                dateInput: false,
                rulePendapatanPengeluaranBulanan: [
                    (v) => !!v || 'Tahun tidak boleh kosong :(',
                ],
                rulePendapatanPengeluaranTahunanAwal: [
                    (v) => !!v || 'Tahun Mulai tidak boleh kosong :(',
                ],
                rulePendapatanPengeluaranTahunanAkhir: [
                    (v) => !!v || 'Tahun Selesai tidak boleh kosong :(',
                ],
                ruleStockCustomAwal: [
                    (v) => !!v || 'Tanggal Mulai tidak boleh kosong :(',
                ],
                ruleStockCustomAkhir: [
                    (v) => !!v || 'Tanggal Selesai tidak boleh kosong :(',
                ],
                ruleStockBulanAwal: [
                    (v) => !!v || 'Nama Bahan tidak boleh kosong :(',
                ],
                ruleStockBulanAkhir: [
                    (v) => !!v || 'Bulan tidak boleh kosong :(',
                ],
                rulePenjualanItemTahun: [
                    (v) => !!v || 'Tahun tidak boleh kosong :(',
                ],
                rulePenjualanItemBulan: [
                    (v) => !!v || 'Bulan tidak boleh kosong :(',
                ],
                dialogLaporan: false,
                pendapatanPengeluaranBulanan: [],
                headersPendapatanPengeluaranBulanan: [
                    { text: 'No',
                        align: 'center',
                        sortable: false,
                        class:"font-weight-black",
                        value: 'no',
                    },
                    { text: 'Bulan',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Bulan' 
                    },
                    { text: 'Makanan',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Makanan', 
                        formatter: this.formatExample
                    },
                    { text: 'Side Dish',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Side',
                        formatter: this.formatExample
                    },
                    { text: 'Minuman',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Minuman',
                        formatter: this.formatExample
                    },
                    { text: 'Total',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Total',
                        formatter: this.formatExample
                    },
                ],
                pendapatanPengeluaranTahunan: [],
                headersPendapatanPengeluaranTahunan: [
                    { text: 'No',
                        align: 'center',
                        sortable: false,
                        class:"font-weight-black",
                        value: 'no',
                    },
                    { text: 'Tahun',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Tahun' 
                    },
                    { text: 'Makanan',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Makanan', 
                        formatter: this.formatExample
                    },
                    { text: 'Side Dish',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Side',
                        formatter: this.formatExample
                    },
                    { text: 'Minuman',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Minuman',
                        formatter: this.formatExample
                    },
                    { text: 'Total',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Total',
                        formatter: this.formatExample
                    },
                ],
                penjualanItem: [],
                headersPenjualanItem: [
                    { text: 'No',
                        align: 'center',
                        sortable: false,
                        class:"font-weight-black",
                        value: 'no',
                    },
                    { text: 'Item Menu',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'nama_menu' 
                    },
                    { text: 'Tipe Menu',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'tipe_menu', 
                    },
                    { text: 'Unit',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'satuan_menu',
                    },
                    { text: 'Penjualan Harian Tertinggi',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'penjualan_tertinggi',
                    },
                    { text: 'Total Penjualan',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'total'
                    },
                ],
                stockCustom: [],
                stockCustomIncoming: [],
                stockCustomRemaining: [],
                stockCustomWate: [],
                headersStockCustom: [
                    { text: 'No',
                        align: 'center',
                        sortable: false,
                        class:"font-weight-black",
                        value: 'no',
                    },
                    { text: 'Nama Bahan',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'nama_bahan' 
                    },
                    { text: 'Unit',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'satuan_bahan', 
                    },
                    { text: 'Incoming Stok',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Incoming_Stok',
                    },
                    { text: 'Remaining Stok',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Remaining_Stok'
                    },
                    { text: 'Waste Stok',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Waste_Stok'
                    },
                ],
                stockBulan: [],
                stockBulanIncoming: [],
                stockBulanRemaining: [],
                stockBulanWate: [],
                headersStockBulan: [
                    { text: 'No',
                        align: 'center',
                        sortable: false,
                        class:"font-weight-black",
                        value: 'no',
                    },
                    { text: 'Tanggal',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'tanggal' 
                    },
                    { text: 'Incoming Stok',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Incoming_Stok',
                    },
                    { text: 'Remaining Stok',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Remaining_Stok'
                    },
                    { text: 'Waste Stok',
                        align: 'center',
                        sortable: false, 
                        class:"font-weight-black",
                        value: 'Waste_Stok'
                    },
                ],
                tahunSelect: [],
                bulanSelect: [
                    { text: 'January', id: 1, },
                    { text: 'February', id: 2, },
                    { text: 'March', id: 3, },
                    { text: 'April', id: 4, },
                    { text: 'May', id: 5, },
                    { text: 'June', id: 6, },
                    { text: 'July', id: 7, },
                    { text: 'August', id: 8, },
                    { text: 'September', id: 9, },
                    { text: 'October', id: 10, },
                    { text: 'November', id: 11, },
                    { text: 'December', id: 12, },
                    { text: 'ALL', id: 13, }
                ],
                namaBulan: '',
                user: [],
                bahanAktif:[],
                dateInputAwal: false,
                dateInputAkhir: false,
                namaBahan:'',
            };
        },

        methods: {
            formatExample(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            dialogForm(value){
                if(value == 'Pendapatan Bulanan'){
                    this.judulDialog=value;
                    this.dialog = true
                } 
                else if(value == 'Pendapatan Tahunan'){
                    this.judulDialog=value;
                    this.dialog = true
                }
                else if(value == 'Pengeluaran Bulanan'){
                    this.judulDialog=value;
                    this.dialog = true

                }
                else if(value == 'Pengeluaran Tahunan'){
                    this.judulDialog=value;
                    this.dialog = true
                }
                else if(value == 'Penjualan Item'){
                    this.judulDialog=value;
                    this.dialog = true
                }
                else if(value == 'Stock Bulanan'){
                    this.judulDialog=value;
                    this.dialog = true
                }
                else{
                    this.judulDialog=value;
                    this.dialog = true
                }
            },
            read(){
                if(this.judulDialog == 'Pendapatan Bulanan'){
                    if(this.$refs.formPendapatanPengeluaranBulanan.validate()){
                        this.dialog = false
                        this.dialogLaporan = true
                        this.readLaporanPendapatanBulanan();
                    }
                } 
                else if(this.judulDialog == 'Pendapatan Tahunan'){
                    if(this.$refs.formPendapatanPengeluaranTahunan.validate()){
                        this.dialog = false
                        this.dialogLaporan = true
                        this.readLaporanPendapatanTahunan();
                    }
                }
                else if(this.judulDialog == 'Pengeluaran Bulanan'){
                    if(this.$refs.formPendapatanPengeluaranBulanan.validate()){
                        this.dialog = false
                        this.dialogLaporan = true
                        this.readLaporanPengeluaranBulanan();
                    }
                }
                else if(this.judulDialog == 'Pengeluaran Tahunan'){
                    if(this.$refs.formPendapatanPengeluaranTahunan.validate()){
                        this.dialog = false
                        this.dialogLaporan = true
                        this.readLaporanPengeluaranTahunan();
                    }
                }
                else if(this.judulDialog == 'Penjualan Item'){
                    if(this.$refs.formPenjualanItem.validate()){
                        this.dialog = false
                        this.namaBulan = this.bulanSelect[this.formPenjualanItem.bulan-1].text
                        this.dialogLaporan = true
                        this.readLaporanPenjualanItem();
                    } 
                }
                else if(this.judulDialog == 'Stock Bulanan'){
                    if(this.$refs.formStockBulan.validate()){
                        this.dialog = false
                        this.dialogLaporan = true
                        this.readLaporanStockBulan();
                    }
                }
                else{
                    if(this.$refs.formStockCustom.validate()){
                        this.dialog = false
                        this.dialogLaporan = true
                        this.readLaporanStockCustom();
                    }
                }
            },
            cetak(){
                window.print();
            },
            cancelDialogLaporan(){
                this.dialogLaporan = false;
                this.cancleDialogForm();
                this.judulDialog = '';
            },
            cancleDialogForm(){
                if(this.judulDialog == 'Pendapatan Bulanan'){
                    this.$refs.formPendapatanPengeluaranBulanan.reset();
                    this.$refs.formPendapatanPengeluaranBulanan.resetValidation();
                    this.validPendapatanPengeluaranBulanan = false;
                } 
                else if(this.judulDialog == 'Pendapatan Tahunan'){
                    this.$refs.formPendapatanPengeluaranTahunan.reset();
                    this.$refs.formPendapatanPengeluaranTahunan.resetValidation();
                    this.validPendapatanPengeluaranTahunan = false;
                }
                else if(this.judulDialog == 'Pengeluaran Bulanan'){
                    this.$refs.formPendapatanPengeluaranBulanan.reset();
                    this.$refs.formPendapatanPengeluaranBulanan.resetValidation();
                    this.validPendapatanPengeluaranBulanan = false;
                }
                else if(this.judulDialog == 'Pengeluaran Tahunan'){
                    this.$refs.formPendapatanPengeluaranTahunan.reset();
                    this.$refs.formPendapatanPengeluaranTahunan.resetValidation();
                    this.validPendapatanPengeluaranTahunan = false;
                }
                else if(this.judulDialog == 'Penjualan Item'){
                    this.$refs.formPenjualanItem.reset();
                    this.$refs.formPenjualanItem.resetValidation();
                    this.validPenjualanItem = false;
                }
                else if(this.judulDialog == 'Stock Bulanan'){
                    this.$refs.formStockBulan.reset();
                    this.$refs.formStockBulan.resetValidation();
                    this.validStockBulan = false;
                } 
                else{
                    this.$refs.formStockCustom.reset();
                    this.$refs.formStockCustom.resetValidation();
                    this.validStockCustom = false;
                }
            },
            readLaporanPendapatanBulanan(){
                this.subLoading = true;
                var url = this.$api + '/laporanPendapatanBulanan/laporan/' + this.formPendapatanPengeluaranBulanan.tahun;
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.pendapatanPengeluaranBulanan = [];
                    this.pendapatanPengeluaranBulanan = response.data.data
                }).finally(() => {
                    this.subLoading = false;
                })
            },
            readLaporanPendapatanTahunan(){
                this.subLoading = true;
                var url = this.$api + '/laporanPendapatanTahunan/laporan/' + this.formPendapatanPengeluaranTahunan.tahunAwal + '/' + this.formPendapatanPengeluaranTahunan.tahunAkhir;
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.pendapatanPengeluaranTahunan = [];
                    this.pendapatanPengeluaranTahunan = response.data.data
                }).finally(() => {
                    this.subLoading = false;
                })
            },
            readLaporanPengeluaranBulanan(){
                this.subLoading = true;
                var url = this.$api + '/laporanPengeluaranBulanan/laporan/' + this.formPendapatanPengeluaranBulanan.tahun;
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.pendapatanPengeluaranBulanan = [];
                    this.pendapatanPengeluaranBulanan = response.data.data
                }).finally(() => {
                    this.subLoading = false;
                })
            }, 
            readLaporanPengeluaranTahunan(){
                this.subLoading = true;
                var url = this.$api + '/laporanPengeluaranTahunan/laporan/' + this.formPendapatanPengeluaranTahunan.tahunAwal + '/' + this.formPendapatanPengeluaranTahunan.tahunAkhir;
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.pendapatanPengeluaranTahunan = [];
                    this.pendapatanPengeluaranTahunan = response.data.data
                }).finally(() => {
                    this.subLoading = false;
                })
            }, 
            readLaporanStockCustom(){
                this.subLoading = true;
                var url = this.$api + '/laporanStockCustom/laporan/' + this.formStockCustom.tanggalMulai + '/' + this.formStockCustom.tanggalSelesai;
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.stockCustom = [];
                    this.stockCustom = response.data.data
                }).finally(() => {
                    this.readLaporanStockCustomIncoming();
                    //this.subLoading = false;
                })
            }, 
            readLaporanStockCustomIncoming(){
                this.subLoading = true;
                var url = this.$api + '/laporanStockCustomincoming/laporan/' + this.formStockCustom.tanggalMulai + '/' + this.formStockCustom.tanggalSelesai;
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.stockCustomIncoming = [];
                    this.stockCustomIncoming = response.data.data
                }).finally(() => {
                    this.readLaporanStockCustomRemaining();
                    //this.subLoading = false;
                })
            }, 
            readLaporanStockCustomRemaining(){
                this.subLoading = true;
                var url = this.$api + '/laporanStockCustomRemaining/laporan/' + this.formStockCustom.tanggalMulai + '/' + this.formStockCustom.tanggalSelesai;
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.stockCustomRemaining = [];
                    this.stockCustomRemaining = response.data.data
                }).finally(() => {
                    this.readLaporanStockCustomWaste();
                    //this.subLoading = false;
                })
            }, 
            readLaporanStockCustomWaste(){
                this.subLoading = true;
                var url = this.$api + '/laporanStockCustomWaste/laporan/' + this.formStockCustom.tanggalMulai + '/' + this.formStockCustom.tanggalSelesai;
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.stockCustomWate = [];
                    this.stockCustomWate = response.data.data
                }).finally(() => {
                    this.changeValueStockCustom();
                    //this.subLoading = false;
                })
            }, 
            changeValueStockCustom(){
                for(var i=0; i < this.stockCustom.length; i++){
                    for(var j=0; j < this.stockCustomIncoming.length; j++){
                        if(this.stockCustom[i].id == this.stockCustomIncoming[j].id_bahan){
                            this.stockCustom[i].Incoming_Stok = this.stockCustomIncoming[j].jumlah_stock
                        }
                    }

                    for(var k=0; k < this.stockCustomRemaining.length; k++){
                        if(this.stockCustom[i].id == this.stockCustomRemaining[k].id_bahan){
                            this.stockCustom[i].Remaining_Stok = this.stockCustomRemaining[k].jumlah_stock
                        }
                    }

                    for(var l=0; l < this.stockCustomWate.length; l++){
                        if(this.stockCustom[i].id == this.stockCustomWate[l].id_bahan){
                            this.stockCustom[i].Waste_Stok = this.stockCustomWate[l].jumlah_stock
                        }
                    }

                    if(i == this.stockCustom.length-1){
                        this.subLoading = false;
                    }
                }
            },
            readLaporanStockBulan(){
                this.subLoading = true;
                var url = this.$api + '/laporanStockBulanan/laporan/' + this.formStockBulan.idBahan + '/' + this.formStockBulan.monthYear + '-01';
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.stockBulan = [];
                    this.stockBulan = response.data.data
                }).finally(() => {
                    this.readLaporanStockBulanIncoming();
                    //this.subLoading = false;
                })
            }, 
            readLaporanStockBulanIncoming(){
                this.subLoading = true;
                var url = this.$api + '/laporanStockBulananincoming/laporan/' + this.formStockBulan.idBahan + '/' + this.formStockBulan.monthYear + '-01';
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.stockBulanIncoming = [];
                    this.stockBulanIncoming = response.data.data
                }).finally(() => {
                    this.readLaporanStockBulanRemaining();
                    //this.subLoading = false;
                })
            }, 
            readLaporanStockBulanRemaining(){
                this.subLoading = true;
                var url = this.$api + '/laporanStockBulananRemaining/laporan/' + this.formStockBulan.idBahan + '/' + this.formStockBulan.monthYear + '-01';
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.stockBulanRemaining = [];
                    this.stockBulanRemaining = response.data.data
                }).finally(() => {
                    this.readLaporanStockBulanWaste();
                    //this.subLoading = false;
                })
            }, 
            readLaporanStockBulanWaste(){
                this.subLoading = true;
                var url = this.$api + '/laporanStockBulananWaste/laporan/' + this.formStockBulan.idBahan + '/' + this.formStockBulan.monthYear + '-01';
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.stockBulanWate = [];
                    this.stockBulanWate = response.data.data
                }).finally(() => {
                    this.changeValueStockBulan();
                    //this.subLoading = false;
                })
            }, 
            changeValueStockBulan(){
                for(var i=0; i < this.stockBulan.length; i++){
                    for(var j=0; j < this.stockBulanIncoming.length; j++){
                        if(this.stockBulan[i].tanggal == this.stockBulanIncoming[j].tanggal){
                            this.stockBulan[i].Incoming_Stok = this.stockBulanIncoming[j].Incoming_Stok
                        }
                    }

                    for(var k=0; k < this.stockBulanRemaining.length; k++){
                        if(this.stockBulan[i].tanggal == this.stockBulanRemaining[k].tanggal){
                            this.stockBulan[i].Remaining_Stok = this.stockBulanRemaining[k].Remaining_Stok
                        }
                    }

                    for(var l=0; l < this.stockBulanWate.length; l++){
                        if(this.stockBulan[i].tanggal == this.stockBulanWate[l].tanggal){
                            this.stockBulan[i].Waste_Stok = this.stockBulanWate[l].Waste_Stok
                        }
                    }

                    if(i == this.stockBulan.length-1){
                        this.returnNamaBahan()
                        this.subLoading = false;
                    }
                }
            },
            readLaporanPenjualanItem(){
                this.subLoading = true;
                var url = this.$api + '/laporanPenjualanItemMenu/laporan/' + this.formPenjualanItem.tahun + '/' + this.formPenjualanItem.bulan;
                this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
                }).then(response => {
                    this.penjualanItem = [];
                    this.penjualanItem = response.data.data
                }).finally(() => {
                    this.subLoading = false;
                })
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
            }, 
            dateStockBulan(value){
                var myDate = new Date(value);

                let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];

                let month = monthsList[myDate.getMonth()];
                let year = myDate.getFullYear();

                let today = `${month} ${year}`;

                return today;
            },
            returnNamaBahan(){
                let result = this.bahanAktif.find(obj => {
                    return obj.id == this.formStockBulan.idBahan
                })
                this.namaBahan = result.nama_bahan
            },
            readUser() {
                this.loading = false
                var url = this.$api + '/userAktif/' + localStorage.getItem('id');
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    } 
                }).then(response => {
                    this.user = [];
                    this.user = response.data.data;
                })
            },
            readDataTahun() {
                var url = this.$api + '/getDataTahun/laporan'
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    } 
                }).then(response => {
                    this.tahunSelect = [];
                    this.tahunSelect = response.data.data;
                })
            },
            readBahan(){
                var url = this.$api + '/getCustomStatus/bahan/0';
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    } 
                }).then(response => {
                    this.bahanAktif = [];
                    this.bahanAktif = response.data.data
                })
            },
        },
        
        mounted() { 
            this.readDataTahun();
            this.readBahan(); 
            this.readUser(); 
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
      font-family: 'Josefin Sans', sans-serif;
      font-size: 21px !important;
      white-space: nowrap !important;
      word-break: normal!important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    .subTextOneNoMargin{ 
        text-align:center;
        font-weight: bold;
        font-family: 'Josefin Sans', sans-serif;
        font-size: 22px !important;
        color: rgb(1, 13, 41);
    }

    .subTextTwoNoMargin{ 
      text-align:center;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 20px !important;
      color: rgb(1, 13, 41);
    }

    .subTextThreeNoMargin{ 
      text-align:center;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 16px !important;
      color: rgb(1, 13, 41);
    }

    @media print {
      #hidden-print {
        display: none !important;
      }
    }
</style> 