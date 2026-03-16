import { defineStore } from "pinia";
import productsData from "@/assets/productsJson.json";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),
  actions: {
    loadProducts() {
      this.products = productsData.products;
    },
  },
});
