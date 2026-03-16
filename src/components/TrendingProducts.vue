<template>
  <div class="trending">
    <div class="container">
      <h2 class="section-heading">{{ productsConfig.Trending }}</h2>
      <div class="row m-0" style="margin-left: -10px; margin-right: -10px">
        <router-link
          custom
          v-slot="{ navigate, href }"
          to="/basket"
          v-for="product in trendingProducts"
          :key="product.id"
        >
          <div
            :href="href"
            @click="navigate"
            class="col-12 col-md-4 col-lg-3 m-0 p-2"
          >
            <div class="item">
              <div
                class="image"
                :style="{
                  backgroundImage: `url(${getImageUrl(product.poster)})`,
                }"
              ></div>
              <div class="details m-0">
                <div class="name m-0 mb-2">
                  {{ tm(`products.${product.name}`) }}
                </div>
                <div class="d-flex justify-content-between">
                  <div class="stars">
                    <span v-for="star in product.rate" :key="star">
                      <i class="fa-solid fa-star text-warning"></i>
                    </span>
                  </div>
                  <div class="reviews m-0 text-end">
                    {{ `${product.views} ${productsConfig.reviews}` }}
                  </div>
                </div>
                <div class="price m-0 mt-2">
                  <div class="offer m-0">
                    {{ tm(`products.${product.offer}`) }}
                  </div>
                  <div class="figure m-0 ms-2">
                    {{ `${product.price} $` }}
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <button @click.prevent="addToCart(product)">
                    {{ productsConfig.addToBasket }}
                  </button>
                  <div
                    class="d-flex justify-content-end gap-2 align-items-center"
                  >
                    <span
                      role="button"
                      class="fs-4"
                      @click.stop="
                        quantities[product.id] > 1 && quantities[product.id]--
                      "
                      >-</span
                    >
                    <span class="fs-3">{{ quantities[product.id] }}</span>
                    <span
                      role="button"
                      class="fs-4"
                      @click.stop="quantities[product.id]++"
                      >+</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <router-link custom v-slot="{ navigate, href }" to="/product"
        ><button
          class="text-center btn d-block m-auto mt-2 mb-2"
          :data-notific="totalItems"
          @click="navigate"
          :href="href"
        >
          {{ productsConfig.seeMore }}
        </button></router-link
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useProductsStore } from "@/store/products";
import { useCartStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
const { tm } = useI18n();
const productsConfig = computed(() => tm("productsConfig"));

const quantities = reactive({});
const productsStore = useProductsStore();
const cart = useCartStore();
const { products } = storeToRefs(productsStore);
const trendingProducts = computed(() =>
  products.value.filter((p) => p.rate === 5)
);
// const { totalItems } = storeToRefs(cart);
onMounted(() => {
  productsStore.loadProducts();
  products.value.forEach((product) => {
    quantities[product.id] = 1; // البداية 1 لكل منتج
  });
});
function addToCart(product) {
  const productWithQuantity = {
    ...product,
    quantity: quantities[product.id],
  };
  cart.addToCart(productWithQuantity);
}
function getImageUrl(path) {
  try {
    return require(`@/assets/${path}`);
  } catch (err) {
    console.warn("❌ لم يتم العثور على الصورة:", path);
    return "";
  }
}
</script>
<style scoped>
.image {
  width: 100%;
  min-height: 140px;
  background-size: cover;
}
.lower-content {
  padding: 10px;
}
.item {
  background-color: #eee;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 2px 2px #ddd;
}
.item .details {
  font-size: 13px;
  padding: 10px;
}
.item .details .name {
  font-size: 16px;
  color: var(--fivth-color);
}
.item .details .figure {
  font-size: 18px;
  font-weight: bold;
  color: var(--fivth-color);
}
button {
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: var(--fivth-color);
  background-color: var(--third-color);
  padding: 10px;
  border-radius: 6px;
}
button:hover {
  background-color: var(--second-color);
}
</style>
