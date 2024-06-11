<template>
<div>
  <headerapp />
  <div class="container my-5">
    <div class="row">
      <!-- Biz Kimiz Bölümü -->
      <div class="col-lg-6 mb-4 border-end ">
        <h2 class="border-bottom">Biz Kimiz</h2>
        <p>Bu bölümde şirketinizin misyonu, vizyonu, tarihçesi ve başarıları hakkında bilgiler yer alacak.</p>
      </div>

      <!-- İletişim Bölümü -->
      <div class="col-lg-5 mb-4 ms-2">
        <h2 class="border-bottom">İletişim</h2>
        <!-- Bayi Haritaları -->
        <div id="dealer-maps">
          <!-- Harita komponentleri buraya eklenecek -->
          <AppMaps />
        </div>
        <!-- İletişim Bilgileri -->
        <div id="contact-info">
          <app-contact />
        </div>
        <!-- İletişim Formu -->
        <div id="contact-form">
          <app-contact-form />
        </div>
      </div>
    </div>
  </div>
</div>
  </template>
  
  <script>
  import headerapp from '@/components/headerapp.vue';
import AppMaps from '../components/aboutPage/appMaps.vue';
import AppContact from '../components/aboutPage/appContact.vue';
import AppContactForm from '../components/aboutPage/appContactForm.vue';
  export default {
    components:{
      headerapp,
        AppMaps,
        AppContact,
        AppContactForm  }
  }
  </script>
  
  <style>
  /* Profesyonel bir görünüm için özel stil tanımlamaları */
  .container {
    max-width: 1140px; /* Konteyner genişliği */
  }
  h2 {
    color: #0056b3; /* Başlık rengi */
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.1rem; /* Paragraf font boyutu */
    line-height: 1.6; /* Satır yüksekliği */
  }
  /* Diğer stil tanımlamaları */
  </style>
  