<template>
  <v-main>
    <v-card class="cardStyle mx-10 mt-10 px-5">
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="#B2D0DA"
        elevation="8"
        max-width="calc(100% - 32px)">  
        <p class="text-h4 font-weight-medium mb-1">Profil Pegawai</p>
      </v-sheet>

      <div v-if="loading == true">
        <v-progress-circular
          :size="100"
          :width="5"
          color="#d35d6e"
          indeterminate>
        </v-progress-circular>
      </div>

      <div v-else>
        <v-card-title class="justify-center">
          <v-avatar size="300" color="white" dark>
            <v-img width="300" height="300" :src="images + 'data_pegawai/' + user.foto_pegawai"></v-img>
          </v-avatar>
        </v-card-title>

        <div class="headerClass my-4">Pegawai Aktif</div>

        <v-form ref="form" class="mb-5" v-model="valid" lazy-validation>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12" class="px-8">
                <v-text-field
                  v-model="user.nama_pegawai"
                  label="Nama Pegawai"
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
                  v-model="user.email"
                  label="E-mail Pegawai"
                  :rules="emailRules"
                  prepend-icon="mdi-email"
                  required
                  readonly>
                </v-text-field>
              </v-col>
                  
              <v-col cols="12" md="6" class="px-8">
                <v-text-field
                  v-model="user.telepon_pegawai"
                  label="Telepon Pegawai"
                  prepend-icon="mdi-phone"
                  required
                  counter
                  readonly>
                </v-text-field>
              </v-col>
            </v-row>

            <v-row  class="mt-5">
              <v-col cols="12"  md="4" class="px-8">
                <v-autocomplete
                  v-model="user.jabatan_pegawai"
                  label="Jabatan Pegawai"
                  :items="jabatanPegawai"
                  prepend-icon="mdi-account-multiple"
                  placeholder="Select..."
                  required
                  readonly>
                </v-autocomplete>
              </v-col>
                    
              <v-col cols="12" md="4" class="px-8">
                <v-autocomplete
                  v-model="user.gender_pegawai"
                  label="Gender Pegawai"
                  :items="jenisKelamin"
                  prepend-icon="mdi-gender-male-female"
                  placeholder="Select..."
                  required
                  readonly>
                </v-autocomplete>
              </v-col>
              
              <v-col cols="12" md="4" class="px-8">
                <v-menu
                  v-model="dateInput"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  disabled>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="user.tanggal_bergabung_pegawai"
                      label="Tanggal Bergabung Pegawai"
                      prepend-icon="mdi-calendar"
                      readonly
                      required
                      v-bind="attrs"
                      v-on="on">
                    </v-text-field>
                  </template>
                      
                  <v-date-picker
                    v-model="user.tanggal_bergabung_pegawai"
                    @input="dateInput = false">
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary" class="mx-2" @click="dialog = true" >
              Update Account
            </v-btn>
          </v-card-actions>
        </v-form>
      </div>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card  >
        <v-form v-model="valid" ref="form">
          <v-card-title>
            <span class="headline">Update Account</span>    
          </v-card-title>

          <v-card-text class="px-10">
            <v-container>
              <v-text-field
                v-model="form.email"
                label="Email Customer"
                :rules="emailRules"
                clearable
                required>
              </v-text-field>

              <v-text-field 
                label="Password Baru" 
                v-model="form.password"
                :rules="passwordRules" 
                counter 
                required
                clearable
                @click:append="show = !show"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'">
              </v-text-field>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="loadingButton" color="red" text @click="cancel">
              Cancel
            </v-btn>

             <v-btn :loading="loadingButton" color="blue darken-2" text @click="updateAccount" :disabled="!valid">
              Save
            </v-btn>
          </v-card-actions>    
        </v-form>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>

<script>
    export default {
        name: "Profil",
        data() {
          return {
            loadingButton:false,
            loading: true,
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            show: false,
            valid: true,
            user:'',
            jenisKelamin: ['Laki-Laki', 'Perempuan'],
            jabatanPegawai: ['Owner', 'Operational Manager', 
                            'Cashier', 'Waiter', 
                            'Chef'],
            images: this.$image,
            dateInput: false,
            dialog: false,
            form : {
              email: '',
              password: '',
            },
            emailRules: [
                (v) => !!v || 'Email tidak boleh kosong :(',
                (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail tidak valid :(',
            ],
            passwordRules: [
                (v) => !v || v.length >=6 || 'Password minimal 6 karakter :(',
            ],
          };
      },

      methods: {
        readUser() {
          var url = this.$api + '/userAktif/' + localStorage.getItem('id');
          this.$http.get(url, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            } 
          }).then(response => {
            this.user = response.data.data;
            this.form.email = this.user.email;
          }).finally(() => {
            this.loading = false;
          })
        },
        updateAccount(){
          this.loadingButton= true;

          let newData = {
            email: this.form.email,
            password: this.form.password,
          }

          var url = this.$api + '/updateAccount/pegawai/' + localStorage.getItem('id');
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
            this.loadingButton= false;
            this.loading = false;
          })
        },
        cancel() {
          this.loading = true;
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.readUser();
          this.valid = true
          this.dialog = false;
          this.show = false;
        },
      },
      
      mounted() {
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
      font-size: 21px !important;
      white-space: nowrap !important;
      word-break: normal!important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }
</style> 