<template>
  <div class="fishes py-4">
    <div class="container">
      <div class="row">
        <div
          class="col-12 col-md-4 col-lg-3 p-2"
          v-for="pet in fishes"
          :key="pet.id"
        >
          <PetCard :pet="pet" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePetsStore } from "@/store/pets";
import PetCard from "@/components/allPets/PetCard.vue";

const store = usePetsStore();
const fishes = store.getPetsByType("fish");
</script>

<style scoped>
.fishes {
  position: relative;
  z-index: 100;
  min-height: 250px;
}
</style>
