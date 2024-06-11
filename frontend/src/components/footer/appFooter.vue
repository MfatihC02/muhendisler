<template>
    <footer class="footer bg-dark text-light py-4 mt-4 ">
      <div class="container">
        <!-- Logo ve Açıklama -->
        <div class="row mb-4 ">
          <div class="col-md-4 text-center border-end">
            <img src="@/assets/fotos/analogoheader.png" alt="" class="footer-logo mb-2">
            <p class="image-text">Türkiye'nin en büyük tohum deposu...</p>
          </div>
  
          <!-- Menü ve Yasal Bilgiler -->
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-4 border-end">
                <h5>KOLAY MENÜ</h5>
                <ul class="list-unstyled">
                  <li><a href="#" class="text-white">Hakkımızda</a></li>
                  <li><a href="#" class="text-white">Öneri ve Şikayet</a></li>
                  <!-- Diğer menü linkleri -->
                </ul>
              </div>
              <div class="col-md-4 border-end">
                <h5 class="">YASAL</h5>
                <ul class="list-unstyled ">
                  <li><a href="#" class="text-white">Mesafeli Satış Sözleşmesi</a></li>
                  <li><a href="#" class="text-white">Teslimat ve İade şartları</a></li>
                  <!-- Diğer yasal linkler -->
                </ul>
              </div>
              <div class="col-md-4">
                <h5>Bizi Takip Edin!</h5>
                <!-- Sosyal Medya İkonları -->
                <div class="social-icons">
                  <a href="#" class="text-white"><i class="fab fa-facebook-f"></i></a>
                  <a href="#" class="text-white"><i class="fab fa-instagram"></i></a>
                  <!-- Diğer sosyal medya ikonları -->
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Ödeme Yöntemleri ve Güvenlik Sertifikaları -->
        <div class="row">
          <div class="col text-center">
            <!-- Ödeme yöntemi ikonları ve sertifika logoları -->
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent'
  };
  </script>
  
  <style scoped>
  .footer {
      background-color: #343a40;
  }
  .footer-logo {
      max-width: 150px;
  }
  .social-icons a {
      margin-right: 10px;
  }
  .social-icons i {
      font-size: 1.5rem; /* Sosyal medya ikon boyutu */
  }
  .image-text{
    font-size: 10px;
  }
  /* Diğer stil tanımlamaları */
  </style>
  