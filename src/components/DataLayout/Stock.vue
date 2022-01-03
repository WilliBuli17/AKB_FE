<template>
    <v-main>
        <v-card v-if="selection==0" class="mx-4 mt-10 px-5">
            <v-sheet
                class="v-sheet--offset mx-auto mb-n3"
                color="#B2D0DA"
                elevation="8"
                max-width="calc(100% - 32px)">    
                <h1 class="text-h4 mb-1 font-weight-medium">Stock</h1>
                    
                <div style="display: flex; justify-content: center;">
                    <v-chip-group
                        v-model="selection"
                        active-class="red lighten-1 white--text"
                        column mandatory>
                        <v-chip @click="read('Incoming Stock', null)">Incoming Stock</v-chip>
                
                        <v-chip @click="read('Waste Stock', null)">Waste Stock</v-chip>

                        <v-chip @click="read('Remaining Stock', null)">Remaining Stock</v-chip>

                        <v-chip>Historical Stok</v-chip>
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
                        <v-chip @click="read('Incoming Stock', 'Incoming Stock Aktif')">Incoming Stock Aktif</v-chip>
                
                        <v-chip @click="read('Incoming Stock', 'Incoming Stock Hapus')">Incoming Stock Hapus</v-chip>
                    </v-chip-group>
                </div>

                <div v-if="subSelection==0">
                    <v-card-title>
                        <v-toolbar-title>Incoming Stock Aktif</v-toolbar-title>
                            
                        <v-divider class="mx-4" inset vertical></v-divider>
                            
                        <v-spacer></v-spacer>

                        <v-spacer v-if="!incomingStockAktif || !incomingStockAktif.length"></v-spacer>

                        <v-text-field 
                            v-else 
                            v-model="searchIncomingStockAktif"
                            outlined
                            clearable 
                            hide-details 
                            prepend-inner-icon="mdi-magnify" 
                            label="Search">
                        </v-text-field>

                        <v-spacer></v-spacer>

                        <v-btn color="primary" dark  @click="setAction(null,'Tambah Incoming Stock', 'Incoming Stock', 'Incoming Stock Aktif')">
                            Tambah
                        </v-btn>
                    </v-card-title>
                        
                    <v-data-table :sort-by="['tanggal_stock', 'nama_bahan']" :sort-desc="[true, false]" :headers="headersIncoming" :items="incomingStockAktif" :search="searchIncomingStockAktif" >                        
                        <template
                            v-for="header in headersIncoming.filter((header) => header.hasOwnProperty('formatter'))"
                            v-slot:[`item.${header.value}`]="{ header, value }">
                            Rp. {{ header.formatter(value) }}
                        </template>

                        <template v-slot:[`item.actions`]="{ item }">  
                            <v-btn outlined elevation="2" small class="ma-2 green--text" @click="setAction(item,'Updated Incoming Stock', 'Incoming Stock', 'Incoming Stock Aktif')"> 
                                <v-icon small class="mr-2">
                                    mdi-pencil 
                                </v-icon>
                                Edit
                            </v-btn>  

                            <v-btn outlined elevation="2" small class="ma-2 red--text" @click="setAction(item,'Delete Incoming Stock', 'Incoming Stock', 'Incoming Stock Aktif')"> 
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
                        <v-toolbar-title>Incoming Stock Hapus</v-toolbar-title>
                            
                        <v-divider class="mx-4" inset vertical></v-divider>
                            
                        <v-spacer></v-spacer>

                        <v-spacer v-if="!incomingStockHapus || !incomingStockHapus.length"></v-spacer>

                        <v-text-field 
                            v-else 
                            v-model="searchIncomingStockHapus"
                            outlined
                            clearable 
                            hide-details 
                            prepend-inner-icon="mdi-magnify" 
                            label="Search">
                        </v-text-field>
                    </v-card-title>
                        
                    <v-data-table :sort-by="['tanggal_stock', 'nama_bahan']" :sort-desc="[true, false]" :headers="headersIncoming" :items="incomingStockHapus" :search="searchIncomingStockHapus" >
                        <template
                            v-for="header in headersIncoming.filter((header) => header.hasOwnProperty('formatter'))"
                            v-slot:[`item.${header.value}`]="{ header, value }">
                            Rp. {{ header.formatter(value) }}
                        </template>
                        
                        <template v-slot:[`item.actions`]="{ item }">  
                            <v-btn outlined elevation="2" small class="ma-2 orange--text" @click="setAction(item,'Restore Incoming Stock', 'Incoming Stock', 'Incoming Stock Hapus')"> 
                                <v-icon small class="mr-2">
                                    mdi-refresh 
                                </v-icon>
                                Restore
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
                <h1 class="text-h4 mb-1 font-weight-medium">Stock</h1>
                    
                <div style="display: flex; justify-content: center;">
                    <v-chip-group
                        v-model="selection"
                        active-class="red lighten-1 white--text"
                        column mandatory>
                        <v-chip @click="read('Incoming Stock', null)">Incoming Stock</v-chip>
                
                        <v-chip @click="read('Waste Stock', null)">Waste Stock</v-chip>

                        <v-chip @click="read('Remaining Stock', null)">Remaining Stock</v-chip>

                        <v-chip>Historical Stok</v-chip>
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
                        <v-chip @click="read('Waste Stock', 'Waste Stock Aktif')">Waste Stock Aktif</v-chip>
                
                        <v-chip @click="read('Waste Stock', 'Waste Stock Hapus')">Waste Stock Hapus</v-chip>
                    </v-chip-group>
                </div>

                <div v-if="subSelection==0">
                    <v-card-title>
                        <v-toolbar-title>Waste Stock Aktif</v-toolbar-title>
                            
                        <v-divider class="mx-4" inset vertical></v-divider>
                            
                        <v-spacer></v-spacer>

                        <v-spacer v-if="!wasteStockAktif || !wasteStockAktif.length"></v-spacer>

                        <v-text-field 
                            v-else 
                            v-model="searchWasteStockAktif"
                            outlined
                            clearable 
                            hide-details 
                            prepend-inner-icon="mdi-magnify" 
                            label="Search">
                        </v-text-field>

                        <v-spacer></v-spacer>

                        <v-btn color="primary" dark  @click="setAction(null,'Tambah Waste Stock', 'Waste Stock', 'Waste Stock Aktif')">
                            Tambah
                        </v-btn>
                    </v-card-title>
                        
                    <v-data-table :sort-by="['tanggal_stock', 'nama_bahan']" :sort-desc="[true, false]" :headers="headersWasteRemaining" :items="wasteStockAktif" :search="searchWasteStockAktif" >
                        <template v-slot:[`item.actions`]="{ item }">  
                            <v-btn outlined elevation="2" small class="ma-2 green--text" @click="setAction(item,'Updated Waste Stock', 'Waste Stock', 'Waste Stock Aktif')"> 
                                <v-icon small class="mr-2">
                                    mdi-pencil 
                                </v-icon>
                                Edit
                            </v-btn>  

                            <v-btn outlined elevation="2" small class="ma-2 red--text" @click="setAction(item,'Delete Waste Stock', 'Waste Stock', 'Waste Stock Aktif')"> 
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
                        <v-toolbar-title>Waste Stock Hapus</v-toolbar-title>
                            
                        <v-divider class="mx-4" inset vertical></v-divider>
                            
                        <v-spacer></v-spacer>

                        <v-spacer v-if="!wasteStockHapus || !wasteStockHapus.length"></v-spacer>

                        <v-text-field 
                            v-else 
                            v-model="searchWasteStockHapus"
                            outlined
                            clearable 
                            hide-details 
                            prepend-inner-icon="mdi-magnify" 
                            label="Search">
                        </v-text-field>
                    </v-card-title>
                        
                    <v-data-table :sort-by="['tanggal_stock', 'nama_bahan']" :sort-desc="[true, false]" :headers="headersWasteRemaining" :items="wasteStockHapus" :search="searchWasteStockHapus" >
                        <template v-slot:[`item.actions`]="{ item }"> 
                            <v-btn outlined elevation="2" small class="ma-2 orange--text" @click="setAction(item,'Restore Waste Stock', 'Waste Stock', 'Waste Stock Hapus')"> 
                                <v-icon small class="mr-2">
                                    mdi-refresh 
                                </v-icon>
                                Restore
                            </v-btn>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </v-card>

        <v-card v-if="selection==2" class="mx-4 mt-10 px-5">
            <v-sheet
                class="v-sheet--offset mx-auto mb-n3"
                color="#B2D0DA"
                elevation="8"
                max-width="calc(100% - 32px)">    
                <h1 class="text-h4 mb-1 font-weight-medium">Stock</h1>
                    
                <div style="display: flex; justify-content: center;">
                    <v-chip-group
                        v-model="selection"
                        active-class="red lighten-1 white--text"
                        column mandatory>
                        <v-chip @click="read('Incoming Stock', null)">Incoming Stock</v-chip>
                
                        <v-chip @click="read('Waste Stock', null)">Waste Stock</v-chip>

                        <v-chip @click="read('Remaining Stock', null)">Remaining Stock</v-chip>

                        <v-chip>Historical Stok</v-chip>
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
                        <v-chip @click="read('Remaining Stock', 'Remaining Stock Aktif')">Remaining Stock Aktif</v-chip>
                
                        <v-chip @click="read('Remaining Stock', 'Remaining Stock Hapus')">Remaining Stock Hapus</v-chip>
                    </v-chip-group>
                </div>

                <div v-if="subSelection==0">
                    <v-card-title>
                        <v-toolbar-title>Remaining Stock Aktif</v-toolbar-title>
                            
                        <v-divider class="mx-4" inset vertical></v-divider>
                            
                        <v-spacer></v-spacer>

                        <v-spacer v-if="!remainingStockAktif || !remainingStockAktif.length"></v-spacer>

                        <v-text-field 
                            v-else 
                            v-model="searchRemainingStockAktif"
                            outlined
                            clearable 
                            hide-details 
                            prepend-inner-icon="mdi-magnify" 
                            label="Search">
                        </v-text-field>

                        <v-spacer></v-spacer>

                        <v-btn color="primary" dark  @click="setAction(null,'Tambah Remaining Stock', 'Remaining Stock', 'Remaining Stock Aktif')">
                            Tambah
                        </v-btn>
                    </v-card-title>
                        
                    <v-data-table :sort-by="['tanggal_stock', 'nama_bahan']" :sort-desc="[true, false]" :headers="headersWasteRemaining" :items="remainingStockAktif" :search="searchRemainingStockAktif" >
                        <template v-slot:[`item.actions`]="{ item }"> 
                            <v-btn outlined elevation="2" small class="ma-2 green--text" @click="setAction(item,'Updated Remaining Stock', 'Remaining Stock', 'Remaining Stock Aktif')"> 
                                <v-icon small class="mr-2">
                                    mdi-pencil 
                                </v-icon>
                                Edit
                            </v-btn>  

                            <v-btn outlined elevation="2" small class="ma-2 red--text" @click="setAction(item,'Delete Remaining Stock', 'Remaining Stock', 'Remaining Stock Aktif')"> 
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
                        <v-toolbar-title>Remaining Stock Hapus</v-toolbar-title>
                            
                        <v-divider class="mx-4" inset vertical></v-divider>
                            
                        <v-spacer></v-spacer>

                        <v-spacer v-if="!remainingStockHapus || !remainingStockHapus.length"></v-spacer>

                        <v-text-field 
                            v-else 
                            v-model="searchRemainingStockHapus"
                            outlined
                            clearable 
                            hide-details 
                            prepend-inner-icon="mdi-magnify" 
                            label="Search">
                            </v-text-field>
                    </v-card-title>
                        
                    <v-data-table :sort-by="['tanggal_stock', 'nama_bahan']" :sort-desc="[true, false]" :headers="headersWasteRemaining" :items="remainingStockHapus" :search="searchRemainingStockHapus" >
                        <template v-slot:[`item.actions`]="{ item }"> 
                            <v-btn outlined elevation="2" small class="ma-2 orange--text" @click="setAction(item,'Restore Remaining Stock', 'Remaining Stock', 'Remaining Stock Hapus')"> 
                                <v-icon small class="mr-2">
                                    mdi-refresh 
                                </v-icon>
                                Restore
                            </v-btn>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </v-card>

        <v-card v-if="selection==3" class="mx-4 mt-10 px-5">
            <v-sheet
                class="v-sheet--offset mx-auto mb-n3"
                color="#B2D0DA"
                elevation="8"
                max-width="calc(100% - 32px)">    
                <h1 class="text-h4 mb-1 font-weight-medium">Stock</h1>
                    
                <div style="display: flex; justify-content: center;">
                    <v-chip-group
                        v-model="selection"
                        active-class="red lighten-1 white--text"
                        column mandatory>
                        <v-chip @click="read('Incoming Stock', null)">Incoming Stock</v-chip>
                
                        <v-chip @click="read('Waste Stock', null)">Waste Stock</v-chip>

                        <v-chip @click="read('Remaining Stock', null)">Remaining Stock</v-chip>

                        <v-chip>Historical Stok</v-chip>
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
                <v-card-title >
                    <v-toolbar-title>Historical Stok</v-toolbar-title>
                    
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <v-spacer></v-spacer>
                    
                    <v-col cols="12" sm="4" md="4">
                        <v-spacer v-if="!historicalStock || !historicalStock.length"></v-spacer>
                    
                        <!-- <v-text-field v-else
                            v-model="searchHistoricalStock" 
                            outlined
                            clearable
                            hide-details prepend-inner-icon="mdi-magnify" 
                            label="Search...">
                        </v-text-field> -->
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-form ref="formHistorical"  v-model="validHistorical" lazy-validation>
                        <v-row class="justify-end pt-7 mr-4">
                            <v-col cols="12" sm="5" md="5" class="mx-2">
                                <v-menu
                                    v-model="dateInputAwal"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="formHistorical.tanggalAwal"
                                        outlined
                                        clearable
                                        label="Tanggal Awal"
                                        :rules="tanggalAwalRule"
                                        readonly
                                        required
                                        v-bind="attrs"
                                        v-on="on">
                                        </v-text-field>
                                    </template>
                                            
                                    <v-date-picker
                                        v-model="formHistorical.tanggalAwal"
                                        @input="dateInputAwal = false">
                                    </v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="12" sm="5" md="5" class="mx-2">
                                <v-menu
                                    v-model="dateInputAkhir"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="formHistorical.tanggalAkhir"
                                        outlined
                                        clearable
                                        label="Tanggal Akhir"
                                        :rules="tanggalAkhirRule"
                                        readonly
                                        required
                                        v-bind="attrs"
                                        v-on="on">
                                        </v-text-field>
                                    </template>
                                            
                                    <v-date-picker
                                        v-model="formHistorical.tanggalAkhir"
                                        @input="dateInputAkhir = false">
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        
                            <v-col cols="12" sm="1" md="1" class="mt-4 mx-2">
                                <v-btn  :loading="loadingButton" :disabled="validHistorical == false" class="success--text" color="#F5F5EC" @click="cariHistorical">
                                    <v-icon medium>
                                        mdi-magnify 
                                    </v-icon>
                                    CARI
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-title>
                        
                <v-data-table  :sort-by="['tanggal_stock', 'status_stock','nama_bahan']"  
                :items-per-page="-1" 
                :hide-default-footer="true" 
                :headers="headersHistorical" :items="historicalStock">
                    <template v-slot:item.status_stock="{ item }">
                        <v-chip
                            :color="getColor(item.status_stock)"
                            dark>
                            {{ item.status_stock }}
                        </v-chip>
                    </template>
                </v-data-table>
            </div>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card  class="pa-5">
                <div v-if="loadingTambah == true" class="pa-5">
                    <v-progress-circular
                        :size="100"
                        :width="5"
                        color="#d35d6e"
                        indeterminate>
                    </v-progress-circular>
                </div>

                <div v-else>
                    <v-card-title class="justify-center headerClass">
                        {{status}}
                    </v-card-title>

                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card-text v-if="status == 'Updated Incoming Stock' || status == 'Tambah Incoming Stock'">
                            <v-row>
                                <v-col cols="12" md="6" class="px-8">
                                    <v-autocomplete
                                        v-model="form.id_bahan"
                                        label="Nama Bahan"
                                        :items="bahanAktif"
                                        :rules="idBahanRule"
                                        item-text="nama_bahan"
                                        item-value="id"
                                        persistent-hint
                                        :return-object="false"
                                        single-line
                                        placeholder="Select..."
                                        required
                                        :readonly="status == 'Updated Incoming Stock'">
                                    </v-autocomplete>
                                </v-col>

                                <v-col cols="12" md="6" class="px-8">
                                    <v-autocomplete
                                        v-model="form.satuan_stock"
                                        label=" Satuan Stok"
                                        :items="satuanStock"
                                        :rules="satuanStockRule"
                                        placeholder="Select..."
                                        required>
                                    </v-autocomplete>
                                </v-col>
                            </v-row>

                            <v-row  class="mt-5">
                                <v-col cols="12" md="4" class="px-8">
                                    <v-text-field
                                        v-model="form.jumlah_stock"
                                        label=" Jumlah Stock (Berat Kotor)"
                                        type="number"
                                        :rules="jumlahStockRule"
                                        required>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="4" class="px-8">
                                    <v-text-field
                                        v-model="form.harga_stock"
                                        label="Total Harga Stock"
                                        type="number"
                                        :rules="hargaStockRule"
                                        prefix="Rp."
                                        required>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="4" class="px-8">
                                    <v-menu
                                        v-model="dateInput"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="form.tanggal_stock"
                                                label="Tanggal Stock"
                                                :rules="tanggalStockRule"
                                                readonly
                                                required
                                                v-bind="attrs"
                                                v-on="on">
                                            </v-text-field>
                                        </template>
                                        
                                        <v-date-picker
                                            v-model="form.tanggal_stock"
                                            @input="dateInput = false"
                                            :max="new Date().toISOString().substr(0, 10)">
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-text v-else>
                            <v-row>
                                <v-col cols="12" md="6" class="px-8">
                                    <v-autocomplete
                                        v-model="form.id_bahan"
                                        label="Nama Bahan"
                                        :items="bahanAktif"
                                        :rules="idBahanRule"
                                        item-text="nama_bahan"
                                        item-value="id"
                                        persistent-hint
                                        :return-object="false"
                                        single-line
                                        placeholder="Select..."
                                        required
                                        :readonly="status == 'Updated Waste Stock' || status == 'Updated Remaining Stock'">
                                    </v-autocomplete>
                                </v-col>

                                <v-col cols="12" md="6" class="px-8">
                                    <v-autocomplete
                                        v-model="form.satuan_stock"
                                        label=" Satuan Stok"
                                        :items="satuanStock"
                                        :rules="satuanStockRule"
                                        placeholder="Select..."
                                        required>
                                    </v-autocomplete>
                                </v-col>
                            </v-row>

                            <v-row  class="mt-5">
                                <v-col cols="12" md="6" class="px-8">
                                    <v-text-field
                                        v-model="form.jumlah_stock"
                                        label=" Jumlah Stock"
                                        type="number"
                                        :rules="jumlahStockRule"
                                        required>
                                    </v-text-field>
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
                                                v-model="form.tanggal_stock"
                                                label="Tanggal Stock"
                                                :rules="tanggalStockRule"
                                                readonly
                                                required
                                                v-bind="attrs"
                                                v-on="on">
                                            </v-text-field>
                                        </template>
                                        
                                        <v-date-picker
                                            v-model="form.tanggal_stock"
                                            @input="dateInput = false"
                                            :max="new Date().toISOString().substr(0, 10)">
                                        </v-date-picker>
                                    </v-menu>
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
                </div>
            </v-card>
        </v-dialog>
      
        <v-dialog v-model="dialogConfirmDelRes" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>

                <v-card-text>
                    Anda yakin ingin {{status}} ini?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn :loading="loadingButton" color="red" text  @click="dialogConfirmDelRes = false, loadingButton = false">
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
    name: "Stock",
    data(){
        return{
            loadingButton:false,
            loadingTambah: true,
            loading: true,
            load: false,
            snackbar: false,
            error_message: '',  
            color: '',
            selection: 0,
            subSelection:0,
            incomingStockAktif:[],
            searchIncomingStockAktif: '',
            incomingStockHapus:[],
            searchIncomingStockHapus: '',
            wasteStockAktif:[],
            searchWasteStockAktif: '',
            wasteStockHapus:[],
            searchWasteStockHapus: '',
            remainingStockAktif:[],
            searchRemainingStockAktif: '',
            remainingStockHapus:[],
            searchRemainingStockHapus: '',
            historicalStock:[],
            searchHistoricalStock: '',
            dialog: false,
            dateInput: false,
            headersIncoming: [
                { text: "Nama Bahan", 
                    align: "center", 
                    value: "nama_bahan"
                },
                { text: "Tanggal Stock", value: "tanggal_stock", align: "center" },
                { text: "Jumlah Stock", value: "jumlah_stock" , align: "center"}, 
                { text: "Satuan Stock", value: "satuan_stock" , align: "center"},
                { text: "Total Harga Stock", value: "harga_stock", align: "center", formatter: this.formatExample},
                { text: "Actions", value: "actions" , align: "center"}, 
            ],
            headersWasteRemaining: [
                { text: "Nama Bahan", 
                    align: "center", 
                    value: "nama_bahan"
                },
                { text: "Tanggal Stock", value: "tanggal_stock" , align: "center"},
                { text: "Jumlah Stock", value: "jumlah_stock" , align: "center"}, 
                { text: "Satuan Stock", value: "satuan_stock" , align: "center"},
                { text: "Actions", value: "actions" , align: "center"}, 
            ],
            headersHistorical: [
                { text: "Nama Bahan", 
                    align: "center", 
                    value: "nama_bahan"
                },
                { text: "Status Stock", value: "status_stock" , align: "center"},
                { text: "Tanggal Stock", value: "tanggal_stock" , align: "center"},
                { text: "Jumlah Stock", value: "jumlah_stock" , align: "center"}, 
                { text: "Satuan Stock", value: "satuan_stock" , align: "center"},
            ],
            form: {
                id_bahan: '',
                jumlah_stock: '',
                satuan_stock: '',
                harga_stock: '',
                tanggal_stock: '',
            },
            bahanAktif:[],
            idBahanRule: [
                (v) => !!v || 'Nama Bahan tidak boleh kosong :(',
            ],
            satuanStock: ['gram', 'ml', 'bottle'],
            satuanStockRule: [
                (v) => !!v || 'Satuan Stock tidak boleh kosong :(',
            ],
            jumlahStockRule: [
                (v) => !!v || 'Jumlah Stock tidak valid :(',
                (v) =>  (v && /^[0-9]*$/.test(v)) || 'Jumlah Stock minimal 0 dan bilangan real :(',
            ],
            hargaStockRule: [
                (v) => !!v || 'Total Harga Stock tidak valid :(',
                (v) =>  (v && /^[0-9]*$/.test(v)) || 'Total Harga Stock minimal 0 dan bilangan real :(',
            ],
            tanggalStockRule: [
                (v) => !!v || 'Tanggal Stock tidak boleh kosong :(',
            ],
            valid: false,
            status:'',
            deleteId: '',
            restoreId: '',
            editId: '',
            stock: new FormData,
            dialogConfirmDelRes: false,
            readActOne: null,
            readActTwo: null,
            formHistorical: {
                tanggalAwal: '',
                tanggalAkhir: '',
            },
            tanggalAwalRule: [
                (v) => !!v || 'Tanggal Awal tidak boleh kosong :(',
            ],
            tanggalAkhirRule: [
                (v) => !!v || 'Tanggal Akhir tidak boleh kosong :(',
            ],
            validHistorical:false,
            dateInputAwal: false,
            dateInputAkhir: false,
        };
    },

    methods: {
        getColor (value) {
            if (value == "Incoming Stock") return 'red'
            else if (value == "Remaining Stock") return 'green'
            else return 'blue'
        },
        formatExample(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        read(setOne, setTwo){
            this.loading = true;
            if(setOne == 'Incoming Stock'){
                if(setTwo == null || setTwo == 'Incoming Stock Aktif'){
                    this.subSelection = 0;
                    this.incomingStockAktif= [];
                    this.readStockByStatus(setOne, 0);
                } else if(setTwo == 'Incoming Stock Hapus'){
                    this.incomingStockHapus= [];
                    this.readStockByStatus(setOne, 1);
                } 
            }
            else if(setOne == 'Waste Stock'){
                if(setTwo == null || setTwo == 'Waste Stock Aktif'){
                    this.subSelection = 0;
                    this.wasteStockAktif= [];
                    this.readStockByStatus(setOne, 0);
                } else if(setTwo == 'Waste Stock Hapus'){
                    this.wasteStockHapus= [];
                    this.readStockByStatus(setOne, 1);
                } 
            }
            else if(setOne == 'Remaining Stock'){
                if(setTwo == null || setTwo == 'Remaining Stock Aktif'){
                    this.subSelection = 0;
                    this.remainingStockAktif= [];
                    this.readStockByStatus(setOne, 0);
                } else if(setTwo == 'Remaining Stock Hapus'){
                    this.remainingStockHapus= [];
                    this.readStockByStatus(setOne, 1);
                } 
            }
        },
        readStockByStatus(stockStatus, is_Deleted){
            var url;
            if(stockStatus == 'Incoming Stock'){
                url = this.$api + '/getCustomStatus/incomingStock/' + is_Deleted;
            } 
            else if(stockStatus == 'Waste Stock'){
                url = this.$api + '/getCustomStatus/wasteStock/' + is_Deleted;
            }
            else if(stockStatus == 'Remaining Stock'){
                url = this.$api + '/getCustomStatus/remainingStock/' + is_Deleted;
            }
            this.$http.get(url, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            } 
            }).then(response => {
                if(stockStatus == 'Incoming Stock'){
                    if(is_Deleted == 1){
                        this.incomingStockHapus = response.data.data
                    } else {
                        this.incomingStockAktif = response.data.data
                    }
                } 
                else if(stockStatus == 'Waste Stock'){
                    if(is_Deleted == 1){
                        this.wasteStockHapus = response.data.data
                    } else {
                        this.wasteStockAktif = response.data.data
                    }
                }
                else if(stockStatus == 'Remaining Stock'){
                    if(is_Deleted == 1){
                        this.remainingStockHapus = response.data.data
                    } else {
                        this.remainingStockAktif = response.data.data
                    }
                }
            }).finally(() => {
                this.loading = false
            })
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
                this.loadingTambah = false
                this.loading = false
            })
        },
        cariHistorical(){
            if(this.$refs.formHistorical.validate()){
                this.loadingButton= true;
                this.historicalStock = []
                this.readHistorical(this.formHistorical.tanggalAwal, this.formHistorical.tanggalAkhir);
            }
        },
        readHistorical(tanggalAwal, tanggalAkhir) {
            var url = this.$api + '/getHistorycal/incomingStock' 
            + '/' + 0 + '/' + tanggalAwal + '/' + tanggalAkhir;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.historicalStock = response.data.data
            }).finally(() => {
                this.loadingButton= false;
                this.$refs.formHistorical.resetValidation();
            })
        },
        setAction(item, set, setOne, setTwo) {
            this.readActOne = setOne;
            this.readActTwo = setTwo;

            this.loadingTambah = true;
            this.bahanAktif = [];
            this.readBahan();

            if(set == 'Tambah Incoming Stock' || set == 'Tambah Waste Stock' || set == 'Tambah Remaining Stock'){
                this.status = set;
                this.dialog = true;
            }
            else if(set == 'Updated Incoming Stock'){ 
                this.form = {
                    id_bahan: item.id_bahan,
                    jumlah_stock: item.jumlah_stock,
                    satuan_stock: item.satuan_stock,
                    harga_stock: item.harga_stock,
                    tanggal_stock: item.tanggal_stock,
                };
                this.editId = item.id;
                this.status = set;
                this.dialog = true;
            }
            else if(set == 'Updated Waste Stock' || set == 'Updated Remaining Stock'){ 
                this.form = {
                    id_bahan: item.id_bahan,
                    jumlah_stock: item.jumlah_stock,
                    satuan_stock: item.satuan_stock,
                    tanggal_stock: item.tanggal_stock,
                };
                this.editId = item.id;
                this.status = set;
                this.dialog = true;
            }
            else if(set == 'Delete Incoming Stock' || set == 'Delete Waste Stock' || set == 'Delete Remaining Stock'){
                this.status = set;
                this.deleteId = item.id;
                this.dialogConfirmDelRes = true
            }
            else if(set == 'Restore Incoming Stock' || set == 'Restore Waste Stock' || set == 'Restore Remaining Stock'){
                this.status = set;
                this.restoreId = item.id;
                this.dialogConfirmDelRes = true
            }
        },
        saveStoreUpdated(set){
            if(this.$refs.form.validate()){
                this.loadingButton= true;
                if(set == 'Tambah Incoming Stock' || set == 'Tambah Waste Stock' || set == 'Tambah Remaining Stock'){
                    this.save(set);
                } 
                else if(set == 'Updated Incoming Stock' || set == 'Updated Waste Stock' || set == 'Updated Remaining Stock'){
                    this.update(set);
                }
            }
        },
        //simpan data stock
        save(set){
            var url;
                
            this.stock.append('id_bahan', this.form.id_bahan);
            this.stock.append('jumlah_stock', this.form.jumlah_stock);
            this.stock.append('satuan_stock', this.form.satuan_stock);
            this.stock.append('tanggal_stock', this.form.tanggal_stock);

            if(set == 'Tambah Incoming Stock'){
                this.stock.append('harga_stock', this.form.harga_stock);
                url = this.$api + '/store/incomingStock';
            } 
            else if(set == 'Tambah Waste Stock'){
                url = this.$api + '/store/wasteStock';
            }
            else if(set == 'Tambah Remaining Stock'){
                url = this.$api + '/store/remainingStock';
            } 

            this.load = true
            this.$http.post(url, this.stock, {
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
        //simpan data stock
        update(set){
            var url;
            let newData;

            if(set == 'Updated Incoming Stock'){
                newData= {
                    id_bahan: this.form.id_bahan,
                    jumlah_stock: this.form.jumlah_stock,
                    harga_stock: this.form.harga_stock,
                    satuan_stock: this.form.satuan_stock,
                    tanggal_stock: this.form.tanggal_stock,
                }

                url = this.$api + '/update/incomingStock/' + this.editId;
            } 
            else if(set == 'Updated Waste Stock'){
                newData= {
                    id_bahan: this.form.id_bahan,
                    jumlah_stock: this.form.jumlah_stock,
                    satuan_stock: this.form.satuan_stock,
                    tanggal_stock: this.form.tanggal_stock,
                }

                url = this.$api + '/update/wasteStock/' + this.editId;
            } 
            else if(set == 'Updated Remaining Stock'){
                newData= {
                    id_bahan: this.form.id_bahan,
                    jumlah_stock: this.form.jumlah_stock,
                    satuan_stock: this.form.satuan_stock,
                    tanggal_stock: this.form.tanggal_stock,
                }

                url = this.$api + '/update/remainingStock/' + this.editId;
            }

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
            if(confirm == 'Delete Incoming Stock' || confirm == 'Delete Waste Stock' || confirm == 'Delete Remaining Stock'){
                this.deleteStock(confirm);
            }
            else if (confirm == 'Restore Incoming Stock' || confirm == 'Restore Waste Stock' || confirm == 'Restore Remaining Stock'){
                this.restoreStock(confirm);
            }
        },
        //delete data stock
        deleteStock(confirm){
            var url;
            if(confirm == 'Delete Incoming Stock'){
                url = this.$api + '/delete/incomingStock/' + this.deleteId;
            } 
            else if(confirm == 'Delete Waste Stock'){
                url = this.$api + '/delete/wasteStock/' + this.deleteId;
            }
            else if(confirm == 'Delete Remaining Stock'){
                url = this.$api + '/delete/remainingStock/' + this.deleteId;
            }

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
        //restore data stock
        restoreStock(confirm){
            var url;
            if(confirm == 'Restore Incoming Stock'){
                url = this.$api + '/restore/incomingStock/' + this.restoreId;
            } 
            else if(confirm == 'Restore Waste Stock'){
                url = this.$api + '/restore/wasteStock/' + this.restoreId;
            }
            else if(confirm == 'Restore Remaining Stock'){
                url = this.$api + '/restore/remainingStock/' + this.restoreId;
            }

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
            this.stock = new FormData,
            this.$refs.form.resetValidation();
            this.$refs.form.reset();
        },
    },

    computed: {
    },

    mounted() {
        this.read('Incoming Stock', null);
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
