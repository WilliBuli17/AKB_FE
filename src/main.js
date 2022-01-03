import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/lib/css/mdb.min.css";
import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import router from "./router";
import axios from "axios";
import VueParticles from "vue-particles";
import ToggleButton from "vue-js-toggle-button";
import VueQRCodeComponent from "vue-qrcode-component";

Vue.use(ToggleButton);
Vue.use(VueParticles);
Vue.component("qr-code", VueQRCodeComponent);
Vue.config.productionTip = false;

Vue.prototype.$http = axios;
// Vue.prototype.$api   = 'http://192.168.1.16:8000/api'
// Vue.prototype.$image = 'http://192.168.1.16:8000/'
// Vue.prototype.$api   = 'http://192.168.1.2:8000/api'
// Vue.prototype.$image = 'http://192.168.1.2:8000/'
// Vue.prototype.$api = "http://192.168.1.65:8000/api";
// Vue.prototype.$image = "http://192.168.1.65:8000/";
Vue.prototype.$api = "http://127.0.0.1:8000/api";
Vue.prototype.$image = "http://127.0.0.1:8000/";

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
