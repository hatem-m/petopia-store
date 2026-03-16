<template>
  <div class="home">
    <LandingPage />
    <ShopPage />
    <TrendingProducts />
  </div>
</template>

<script>
// @ is an alias to /src

import LandingPage from "@/components/LandingPage.vue";
import ShopPage from "@/components/ShopPage.vue";
import TrendingProducts from "@/components/TrendingProducts.vue";
export default {
  name: "HomeView",
  components: {
    LandingPage,
    ShopPage,
    TrendingProducts,
  },
};
</script>
