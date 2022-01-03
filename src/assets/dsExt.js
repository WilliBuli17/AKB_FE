Vue.component('sidebar', {
    template: '#navbar',
    props: {
        items: Array
    },
})

new Vue({
  el: '#app',
  router: router,
  vuetify: new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#007bff',
                secondary: '#333',
                accent: '#37474F',
            }
        }
    }
  }),
  computed: {
      mini() {
          return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
      }
  },
  data: () => ({
      sidebarMenu: true,
      toggleMini: false,
      items: [
        { title:"Home", href:"/", icon:"mdi-home-outline" },
        { title:"Reports", href:"/reports", icon:"mdi-file-document-box-outline" },
        { title:"Inbox", href:"/inbox", icon:"mdi-mailbox" },
        { title:"Premiums", href:"/premiums", icon:"mdi-crown-outline" },
        { title:"Alerts", href:"/alerts", icon:"mdi-alarm-light-outline" },
        { title:"Detections", href:"/detections", icon:"mdi-shield-account" },
        { title:"Components", href:"/comp", icon:"mdi-palette-swatch" },
        { title:"Customers", href:"/customers", icon:"mdi-account-search-outline" },
        { title:"Orders", href:"/orders", icon:"mdi-bus-clock" },
        { title:"Settings", href:"/settings", icon:"mdi-settings-outline" },
      ],
    }),
})


