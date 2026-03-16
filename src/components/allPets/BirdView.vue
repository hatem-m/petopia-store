<template>
  <div class="birds py-4">
    <div class="container">
      <div class="row">
        <div
          class="col-12 col-md-4 col-lg-3 p-2"
          v-for="pet in birds"
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
const birds = store.getPetsByType("bird");
</script>

<style scoped>
.birds {
  position: relative;
  z-index: 100;
  min-height: 250px;
}
</style>
