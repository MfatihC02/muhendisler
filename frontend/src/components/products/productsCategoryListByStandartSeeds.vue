<template>
  <div>
    <Headerapp />
    <Categories />
    <div class="container-fluid">
      <div class="row">
        <div class="row">
          <div class="col-4">
            <div class="list-group" id="list-tab" role="tablist">
              <a
                class="list-group-item list-group-item-action active"
                id="list-home-list"
                data-bs-toggle="list"
                href="#list-home"
                role="tab"
                aria-controls="list-home"
                >Home</a
              >
              <a
                class="list-group-item list-group-item-action"
                id="list-profile-list"
                data-bs-toggle="list"
                href="#list-profile"
                role="tab"
                aria-controls="list-profile"
                >Profile</a
              >
              <a
                class="list-group-item list-group-item-action"
                id="list-messages-list"
                data-bs-toggle="list"
                href="#list-messages"
                role="tab"
                aria-controls="list-messages"
                >Messages</a
              >
              <a
                class="list-group-item list-group-item-action"
                id="list-settings-list"
                data-bs-toggle="list"
                href="#list-settings"
                role="tab"
                aria-controls="list-settings"
                >Settings</a
              >
            </div>
          </div>
          <div class="col-8">
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="list-home"
                role="tabpanel"
                aria-labelledby="list-home-list"
              >
                ...
              </div>
              <div
                class="tab-pane fade"
                id="list-profile"
                role="tabpanel"
                aria-labelledby="list-profile-list"
              >
                ...
              </div>
              <div
                class="tab-pane fade"
                id="list-messages"
                role="tabpanel"
                aria-labelledby="list-messages-list"
              >
                ...
              </div>
              <div
                class="tab-pane fade"
                id="list-settings"
                role="tabpanel"
                aria-labelledby="list-settings-list"
              >
                <products-card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsCard from "@/components/products/productsCard.vue";
import Categories from "@/components/categories.vue";
import Headerapp from "@/components/headerapp.vue";
export default {
  components: { productsCard, Categories, Headerapp },
};
</script>

<style>
</style>