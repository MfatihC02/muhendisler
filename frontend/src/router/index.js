import { createRouter, createWebHistory } from 'vue-router';
import homePage from '@/views/homePage.vue';
import aboutPage from '@/views/aboutPage.vue';
import loginPage from '@/views/loginPage.vue';
import registerPage from '@/views/registerPage.vue';
import productDetails from '@/views/productDetails.vue';
import dashboardPage from '@/views/dashboardPage.vue';
import addProduct from '@/components/admin/addProducts.vue';
import adminProduct from '@/views/admin/adminProducts.vue';
import adminProductDetails from '@/views/admin/adminProductDetails.vue';
import UpdateProductDetailsComponent from '@/components/admin/updateProductDetails.vue';
import hybridSeeds from '@/components/products/productsCategoryListByHybridSeeds.vue'
import standartSeeds from '@/components/products/productsCategoryListByStandartSeeds.vue'
import gardenEquipment from '@/components/products/productsCategoryListByGardenEquipment.vue'
import anchorEngines from '@/components/products/productsCategoryListByAnchorEngines.vue'
import allproducts from '@/views/allProducts.vue'
import addMainCategory from '@/components/admin/MainCategories.vue'
import subCategory from '@/components/admin/subCategories.vue';
import adminorder from '@/views/admin/adminOrders.vue';
import orderdetail from '@/components/admin/OrderDetail.vue';
import adminindexpage from '@/views/admin/adminİndexPage.vue';
import checkout from '@/views/checkout.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: homePage,
    },
    {
      path: "/hakkımızda",
      name: "about",
      component: aboutPage,
    },
    {
      path: "/register",
      name: "register",
      component: registerPage,
    },
    {
      path: "/login",
      name: "login",
      component: loginPage,
    },
    {
      path: "/allProduct",
      name: "allproducts",
      component: allproducts,
    },
    {
      path: "/allProduct/:id",
      name: "hybridSeeds",
      component: hybridSeeds,
    },
    {
      path: "/allProduct/:id",
      name: "standartSeeds",
      component: standartSeeds,
    },
    {
      path: "/allProduct/:id",
      name: "gardenEquipment",
      component: gardenEquipment,
    },
    {
      path: "/allProduct/:id",
      name: "anchorEngines",
      component: anchorEngines,
    },

    {
      path: "/products/:id",
      name: "productDetails",
      component: productDetails,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: dashboardPage,
      meta: { equiresAuth: true }
    },
    {
      path: '/admin/addProduct',
      name: 'addProduct',
      component: addProduct,
      meta: { requiresAuth: true }// AdminProduct bileşenini burada tanımlayın
    },
    {
      path: '/admin/addmaincategories',
      name: 'addmaincategories',
      component: addMainCategory,
      meta: { requiresAuth: true }// AdminProduct bileşenini burada tanımlayın
    },
    {
      path: '/admin/subcategories',
      name: 'subcategories',
      component: subCategory,
      meta: { requiresAuth: true }// AdminProduct bileşenini burada tanımlayın
    },
    {
      path: '/admin/product',
      name: 'adminProduct',
      component: adminProduct,
      meta: { requiresAuth: true }// AdminProduct bileşenini burada tanımlayın
    },
    {
      path: '/admin/productDetails/:id',
      name: 'adminProductDetails',
      component: adminProductDetails,
      meta: { requiresAuth: true }
      // AdminProduct bileşenini burada tanımlayın
    },
    {
      path: '/admin/updateProductDetails/:id',
      name: 'adminUpdateProductDetails',
      component: UpdateProductDetailsComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/orders/',
      name: 'adminorder',
      component: adminorder,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/orders/:id',
      name: 'orderdetail',
      component: orderdetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/',
      name: 'adminindexpage',
      component: adminindexpage,
      meta: { requiresAuth: true }
    },

    {
      path: '/checkout',
      name: 'checkout',
      component: checkout // Cart bileşenine rota tanımlıyoruz
    },

  ],

});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = localStorage.getItem('user'); // Kullanıcı bilgisi localStorage'dan alınır
  const isLoggedIn = user !== null && user !== ''; // Kullanıcı bilgisi hem null hem de boş string olmamalı

  if (requiresAuth && !isLoggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = localStorage.getItem('user'); // Kullanıcı bilgisi localStorage'dan alınır
  const isLoggedIn = user !== null && user !== ''; // Kullanıcı bilgisi hem null hem de boş string olmamalı

  if (requiresAuth && !isLoggedIn) {
    next({ name: 'login' });
  } else if (requiresAuth) {
    try {
      const parsedUser = JSON.parse(user); // Kullanıcı bilgisi JSON olarak ayrıştırılır
      const isAdmin = parsedUser.admin; // "isAdmin" veya "admin" anahtarını kontrol et
      if (isAdmin) {
        next(); // Sadece admin olanlara izin ver
      } else {
        next({ name: 'home' }); // Admin değilse başka bir sayfaya yönlendir
      }
    } catch (error) {
      console.error('Kullanıcı nesnesi ayrıştırılamadı:', error);
      next({ name: 'home' }); // Hata durumunda ana sayfaya yönlendir
    }
  } else {
    next(); // Kimlik doğrulama gerektirmeyen sayfalara izin ver
  }
});

export default router