<template>
  <div class="pets">
    <div class="pets-head">
      <h2 class="text-center fs-1">
        Find your New Best Friend and Adopt a Pet with PetOpia
      </h2>
      <p class="text-center fs-3">
        Browse pets from our network of over 14,500 shelters and rescues.
      </p>
    </div>
    <router-view />
  </div>
</template>
<script setup></script>
<style scoped>
.pets {
  padding-top: 75px;
  min-height: 100vh;
  position: relative;
  background-color: rgba(244, 162, 97, 0.6);
}
.pets::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: #e9c46a;
  background: linear-gradient(
    60deg,
    rgba(233, 196, 106, 0.6) 0%,
    rgba(244, 162, 97, 0.6) 50%,
    rgba(231, 111, 81, 0.6) 100%
  );
  transform: skew(-60deg) translateX(-50%);
}
.pets .pets-head {
  font-family: "Lobster Two", sans-serif;
  color: #000;
  position: relative;
  z-index: 50;
}
</style>
