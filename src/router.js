import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path){
    return () => import(`./components/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [{
        path: "/",
        name: "Login",
        meta: { title: 'Sistem Informasi AKB' },
        component: importComponent('Login'),
    },
    //Sistem AKB Manager
    {
        path: "/dashboardLayout",
        name: "DashboardLayout",
        meta: { title: 'DashboardLayout',
                Auth: true,
                roles: ['admin', 'Owner', 'Operational Manager', 'Cashier', 'Waiter', 'Chef']
            },
        component: importComponent('DashboardLayout'),
        children: [
            {//Profil
                path: "/profil",
                name: "Profil",
                meta: { title: 'Profil',
                        roles: ['Owner', 'Operational Manager', 'Cashier', 'Waiter', 'Chef']
                 },
                component: importComponent('DataLayout/Profil'),
            },
            {//Karyawan
                path: "/karyawan",
                name: "Karyawan",
                meta: { title: 'Karyawan',
                        roles: ['admin', 'Owner', 'Operational Manager']
                 },
                component: importComponent('DataLayout/Karyawan'),
            },
            {//Customer
                path: "/customer",
                name: "Customer",
                meta: { title: 'Customer',
                        roles: ['Operational Manager', 'Cashier', 'Waiter']
                },
                component: importComponent('DataLayout/Customer'),
            },
            {//Menu
                path: "/menu",
                name: "Menu",
                meta: { title: 'Menu',
                        roles: ['Operational Manager']
                },
                component: importComponent('DataLayout/Menu'),
            },
            {//Meja
                path: "/meja",
                name: "Meja",
                meta: { title: 'Meja',
                        roles: ['Operational Manager', 'Cashier', 'Waiter']
                },
                component: importComponent('DataLayout/Meja'),
            },
            {//Reservasi
                path: "/reservasi",
                name: "Reservasi",
                meta: { title: 'Reservasi' ,
                        roles: ['Operational Manager', 'Cashier', 'Waiter']
                },
                component: importComponent('DataLayout/Reservasi'),
            },
            {//Pesanan Customer
                path: "/pesananCustomer",
                name: "PesananCustomer",
                meta: { title: 'Pesanan Customer' ,
                        roles: ['Operational Manager', 'Chef', 'Waiter']
                },
                component: importComponent('DataLayout/PesananCustomer'),
            },
            {//Pembayaran
                path: "/pembayaran",
                name: "Pembayaran",
                meta: { title: 'Pembayaran' ,
                        roles: ['Operational Manager', 'Cashier']
                },
                component: importComponent('DataLayout/Pembayaran'),
            },
            {//Pembayaran
                path: "/stock",
                name: "Stock",
                meta: { title: 'Stock' ,
                        roles: ['Operational Manager', 'Chef']
                },
                component: importComponent('DataLayout/Stock'),
            },
            {//Bahan
                path: "/bahan",
                name: "Bahan",
                meta: { title: 'Bahan',
                        roles: ['Operational Manager', 'Chef']
            },
                component: importComponent('DataLayout/Bahan'),
            },
            {//Laporan
                path: "/laporan",
                name: "Laporan",
                meta: { title: 'Laporan',
                        roles: ['Owner', 'Operational Manager']
                 },
                component: importComponent('DataLayout/Laporan'),
            },
        ]
    },
    {
        path: '*',
        redirect: '/'
    },
  ],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.name == 'DashboardLayout' && !localStorage.getItem('token')){
        next({ name: 'Login' })
    }
    else if (localStorage.getItem('token') && to.name == 'Login') {
        next({ name: 'DashboardLayout' }) 
    }
    else if (localStorage.getItem('token') && to.name == 'DashboardLayout' && localStorage.getItem('role') != 'admin'){
        next({ name: 'Profil' })
    }
    else if (localStorage.getItem('token') && to.name == 'DashboardLayout' && localStorage.getItem('role') == 'admin'){
        next({ name: 'Karyawan' })
    }
    else if(localStorage.getItem('token')){
        if(to.meta.roles && to.meta.roles.includes(localStorage.getItem('role'))){
            next()
        }
        else{
            next({ name: 'DashboardLayout' })
        }
    }
    else {
        next()
    }
});

export default router;