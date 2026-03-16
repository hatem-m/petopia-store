<template>
  <div class="basket">
    <div class="container">
      <h1 class="text-center">This is your basket</h1>
      <div class="empty fs-3 text-center" v-if="items.length === 0">
        your basket is empty
      </div>
      <div v-else>
        <table
          border="1"
          cellpadding="8"
          cellspacing="0"
          style="width: 100%; text-align: center"
        >
          <thead>
            <tr>
              <th>item</th>
              <th>count</th>
              <th>price</th>
              <th>total</th>
              <th>remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price }} $</td>
              <td>{{ item.price * item.quantity }} $</td>
              <td><button @click="removeItem(item.id)">🗑️</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- المجموع الكلي -->
      <div v-if="items.length" style="margin-top: 20px; text-align: right">
        <strong>total price {{ totalPrice }} $</strong>
      </div>

      <div v-if="items.length" style="margin-top: 10px; text-align: right">
        <button @click="cart.clearCart()">🧹 clear all</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
const cart = useCartStore();
const { items, totalPrice } = storeToRefs(cart);
function removeItem(id) {
  cart.removeFromCart(id);
}
</script>

<style scoped>
.basket {
  margin-top: 65px;
  margin-bottom: 65px;
  border-radius: 8px;
  box-shadow: 0 0 2px 2px #eee;
  overflow: hidden;
}
.empty {
  background-image: url("@/assets/images/covers/pexels-emirkhan-bal-221704-953864.jpg");
  background-position: center;
  min-height: 80vh;
}
</style>
