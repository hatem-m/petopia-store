<template>
  <div class="about">
    <div class="container">
      <p>{{ aboutUs.about }}</p>
      <p>{{ aboutUs.aboutDisc }}</p>
      <p>{{ aboutUs.vision }}</p>
      <p>{{ aboutUs.visionDisc }}</p>
      <p>{{ aboutUs.mission }}</p>
      <p>{{ aboutUs.missionDisc }}</p>
      <p>{{ aboutUs.product }}</p>
      <ul>
        <li>{{ aboutUs.productDisc[0] }}</li>
        <li>{{ aboutUs.productDisc[1] }}</li>
        <li>{{ aboutUs.productDisc[2] }}</li>
        <li>{{ aboutUs.productDisc[3] }}</li>
        <li>{{ aboutUs.productDisc[4] }}</li>
        <li>{{ aboutUs.productDisc[5] }}</li>
      </ul>
      <p>{{ aboutUs.core }}</p>
      <ul>
        <li>{{ aboutUs.coreDisc[0] }}</li>
        <li>{{ aboutUs.coreDisc[1] }}</li>
        <li>{{ aboutUs.coreDisc[2] }}</li>
        <li>{{ aboutUs.coreDisc[3] }}</li>
      </ul>
      <p>{{ aboutUs.location }}</p>
      <p>{{ aboutUs.locationDisc }}</p>
      <p>{{ aboutUs.goals }}</p>
      <ul>
        <li>{{ aboutUs.goalsDisc[0] }}</li>
        <li>{{ aboutUs.goalsDisc[1] }}</li>
        <li>{{ aboutUs.goalsDisc[2] }}</li>
        <li>{{ aboutUs.goalsDisc[3] }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { tm } = useI18n();
const aboutUs = computed(() => tm("aboutUs"));
</script>
<style scoped>
.about {
  padding-top: 75px;
  padding-bottom: 75px;
  min-height: 100vh;
  background-image: url("@/assets/images/covers/cover1.jpg");
  background-size: cover;
  font-weight: 600;
}
.container {
  padding: 20px;
  border-radius: 6px;
  background: #e9c46a;
  background: linear-gradient(
    60deg,
    rgba(233, 196, 106, 0.6) 0%,
    rgba(244, 162, 97, 0.6) 50%,
    rgba(231, 111, 81, 0.6) 100%
  );
  backdrop-filter: blur(5px);
}
</style>
