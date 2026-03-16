<template>
  <div class="details">
    <!-- ========== MAIN IMAGE + THUMBNAILS ========== -->
    <div class="images-section">
      <!-- صورة رئيسية -->
      <div
        class="main-image"
        :style="{ backgroundImage: `url(${getImageUrl(activeImage)})` }"
      ></div>

      <!-- الصور المصغرة -->
      <div class="thumbnails">
        <div
          v-for="(img, index) in pet.images"
          :key="index"
          class="thumb"
          :style="{ backgroundImage: `url(${getImageUrl(img)})` }"
          :class="{ active: img === activeImage }"
          @click="activeImage = img"
        ></div>
      </div>
    </div>

    <!-- ========== INFO SECTION ========== -->
    <div class="info-section">
      <h1>{{ pet.name }}</h1>
      <p class="type">Species: {{ pet.species }} | Breed: {{ pet.breed }}</p>

      <div class="info-grid">
        <div>
          <h4>Sex</h4>
          <p>{{ pet.sex }}</p>
        </div>

        <div>
          <h4>Date of Birth</h4>
          <p>{{ pet.dateOfBirth }}</p>
        </div>

        <div>
          <h4>Reproductive Status</h4>
          <p>{{ pet.reproductiveStatus }}</p>
        </div>
      </div>

      <hr />

      <!-- ========== HEALTH ========== -->
      <div class="section">
        <h2>Health Information</h2>
        <ul>
          <li>
            <strong>Vaccinated:</strong>
            {{ pet.health.vaccinated ? "Yes" : "No" }}
          </li>
          <li v-if="pet.health.vaccines?.length">
            <strong>Vaccines:</strong> {{ pet.health.vaccines.join(", ") }}
          </li>
          <li>
            <strong>Notes:</strong>
            {{ pet.health.notes || "No medical notes available." }}
          </li>
        </ul>
      </div>

      <hr />

      <!-- ========== BEHAVIOR ========== -->
      <div class="section">
        <h2>Behavior</h2>
        <ul>
          <li v-if="pet.behavior.goodWithKids !== undefined">
            <strong>Good with kids:</strong>
            {{ pet.behavior.goodWithKids ? "Yes" : "No" }}
          </li>
          <li>
            <strong>Activity Level:</strong>
            {{ pet.behavior.activityLevel || "Unknown" }}
          </li>
          <li><strong>Personality:</strong> {{ pet.behavior.personality }}</li>
        </ul>
      </div>

      <hr />

      <!-- ========== DESCRIPTION ========== -->
      <div class="section">
        <h2>Description</h2>
        <p>
          {{
            pet.description ||
            "No additional description available for this pet."
          }}
        </p>
      </div>

      <!-- ========== BUTTON ========== -->
      <button class="book-btn">Book an Appointment</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { usePetsStore } from "../../store/pets.js";

const route = useRoute();
const store = usePetsStore();
const pet = store.getPetById(route.params.id);

// الصورة الأولى افتراضية
let activeImage = pet.images[0];

// دالة لتحميل الصورة كما في الكارد
function getImageUrl(path) {
  try {
    return require(`@/assets/${path}`);
  } catch (err) {
    console.warn("❌ Image not found:", path);
    return "";
  }
}
</script>

<style scoped>
.details {
  max-width: 1150px;
  margin: 40px auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
}

.images-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.main-image {
  width: 100%;
  height: 420px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 4px 12px #0003;
}

.thumbnails {
  display: flex;
  gap: 10px;
}

.thumb {
  width: 80px;
  height: 80px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s;
}

.thumb.active,
.thumb:hover {
  opacity: 1;
  transform: scale(1.08);
}

/* معلومات الحيوان */
.info-section h1 {
  margin-bottom: 5px;
}

.type {
  margin-bottom: 20px;
  color: #555;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  background: #fafafa;
  padding: 15px;
  border-radius: 8px;
}

.info-grid h4 {
  margin-bottom: 3px;
}

.section {
  margin: 25px 0;
}

.section h2 {
  margin-bottom: 10px;
}

.section ul {
  list-style: none;
  padding: 0;
}

.section li {
  margin: 6px 0;
}

.book-btn {
  margin-top: 20px;
  padding: 12px 20px;
  width: 100%;
  background: #e76f51;
  color: white;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.book-btn:hover {
  background: #d85f46;
}
</style>
