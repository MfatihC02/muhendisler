<template>
  <div>
    <div class="container-fluid px-3 pt-3">
      <div class="row">
        <!-- Main Content -->
        <div class="col-md-12">
          <div class="row">
            <categories />
            <!-- Carousel Section -->
            <div class="col-12">
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      src="@/assets/fotos/slider2.jpg"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src="@/assets/fotos/slider2.jpg"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src="@/assets/fotos/slider2.jpg"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <!--Ürünler alanı-->
    <products />
    <!--Footer alanı-->
    <app-footer />

  </div>
</template>
  
  <script>
import categories from "./categories.vue";
import products from "./products.vue";
import appFooter from '@/components/footer/appFooter.vue'

export default {
  name: "PageLayout",
  // Komponentler ve veri yönetimi için script alanı
  components: {
    categories,
    products,
    appFooter,
  },
};
</script>
  
  <style scoped>
</style>