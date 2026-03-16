<template>
  <div class="shop">
    <div ref="container" class="container">
      <div class="d-flex gap-sm-5 mb-3">
        <h2 class="section-heading">{{ shopPage.header[0] }}</h2>
        <div
          :style="{ direction: isRTL ? 'rtl' : 'ltr' }"
          ref="textToggle"
          class="text-toggle p-2 d-flex gap-sm-3 justify-content-center align-items-center"
        >
          <span role="button" @click.prevent="toggleShopOption('allpet')">{{
            shopPage.toggle[0]
          }}</span>
          <span role="button" @click.prevent="toggleShopOption('mypet')">{{
            shopPage.toggle[1]
          }}</span>
        </div>
      </div>
      <div
        v-if="ShopOption === 'allpet'"
        ref="petTypes"
        class="pet-types pb-5"
        :style="{ '--box-width': progressWidth + '%' }"
      >
        <div class="chevron-buttom">
          <i
            @click.prevent="scrollNext()"
            role="button"
            class="fa-solid fa-arrow-right"
          ></i>
          <i
            @click.prevent="scrollPrev()"
            role="button"
            class="fa-solid fa-arrow-left"
          ></i>
        </div>
        <div ref="scrollContainer" class="d-flex types">
          <router-link to="/pets/dog" custom v-slot="{ navigate, href }">
            <div
              @click="navigate"
              :href="href"
              class="dogs d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <div class="image"></div>
              <p>{{ shopPage.allpets[0] }}</p>
            </div>
          </router-link>
          <router-link to="/pets/cat" custom v-slot="{ navigate, href }">
            <div
              @click="navigate"
              :href="href"
              class="cats d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <div class="image"></div>
              <p>{{ shopPage.allpets[1] }}</p>
            </div>
          </router-link>
          <router-link to="/pets/bird" custom v-slot="{ navigate, href }">
            <div
              @click="navigate"
              :href="href"
              class="bird d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <div class="image"></div>
              <p>{{ shopPage.allpets[2] }}</p>
            </div>
          </router-link>
          <router-link to="/pets/fish" custom v-slot="{ navigate, href }">
            <div
              @click="navigate"
              :href="href"
              class="fish d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <div class="image"></div>
              <p>{{ shopPage.allpets[3] }}</p>
            </div>
          </router-link>
          <router-link to="/pets/wild" custom v-slot="{ navigate, href }">
            <div
              @click="navigate"
              :href="href"
              class="wild d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <div class="image"></div>
              <p>{{ shopPage.allpets[4] }}</p>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else-if="ShopOption === 'mypet'" class="my-pets">
        <div
          class="d-flex flex-column gap-3 justify-content-center align-items-center"
        >
          <div>
            <div class="dogs">
              <div class="image"></div>
            </div>
            <div class="cats">
              <div class="image"></div>
            </div>
            <div class="bird">
              <div class="image"></div>
            </div>
          </div>
          <p class="mw-50 text-center m-auto">
            <a href="#">{{ shopPage.mypetsunsign[0] }}</a>
            {{ shopPage.mypetsunsign[1] }}
            <a href="#">{{ shopPage.mypetsunsign[2] }}</a>
          </p>
          <button @click.prevent="" class="btn m-auto">
            {{ shopPage.mypetsunsign[3] }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { tm, locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");
const shopPage = computed(() => tm("shopPage"));

const textToggle = ref(null);
const petTypes = ref(null);
const container = ref(null);
const scrollContainer = ref(null);
const progressWidth = ref(20);
const ShopOption = ref("allpet");
// function transformPet(move) {
//   if (move == "next") {
//     petTypes.value.classList.add("next");
//     petTypes.value.querySelector(".types").classList.add("next");
//   } else if (move == "prev") {
//     petTypes.value.classList.remove("next");
//     petTypes.value.querySelector(".types").classList.remove("next");
//   }
// }
function toggleShopOption(className) {
  textToggle.value.classList.remove("allpet");
  textToggle.value.classList.remove("mypet");
  textToggle.value.classList.add(className);
  ShopOption.value = className;
}
function scrollNext() {
  const el = scrollContainer.value;
  el.scrollBy({ left: el.clientWidth / 2, behavior: "smooth" });
}

function scrollPrev() {
  const el = scrollContainer.value;
  el.scrollBy({ left: -el.clientWidth / 2, behavior: "smooth" });
}
function updateProgress() {
  const el = scrollContainer.value;
  const scrollLeft = el.scrollLeft;
  const scrollWidth = el.scrollWidth - el.clientWidth;
  progressWidth.value = (scrollLeft / scrollWidth) * 100;
}
onMounted(() => {
  const el = scrollContainer.value;
  el.addEventListener("scroll", updateProgress);
});
onUnmounted(() => {
  const el = scrollContainer.value;
  if (el) {
    el.removeEventListener("scroll", updateProgress);
  }
});
</script>

<style scoped>
.shop {
  padding-bottom: var(--section-padding);
  padding-top: var(--section-padding);
}
.text-toggle {
  background-color: #ccc;
  border-radius: 6px;
  position: relative;
}
.text-toggle::after {
  content: "";
  position: absolute;
  width: 45%;
  height: 80%;
  background-color: #fff;
  top: 10%;
  left: 5%;
  border-radius: 6px;
  transition: 0.5s;
}
.text-toggle.allpet::after {
  top: 10%;
  left: 5%;
}
.text-toggle.mypet::after {
  top: 10%;
  left: 50%;
}
.text-toggle span {
  flex-grow: 1;
  width: 100px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 100;
  color: var(--fivth-color);
  font-weight: bold;
}
.pet-types {
  --box-width: 0%;
  position: relative;
  overflow: hidden;
}
.pet-types::before {
  content: "";
  position: absolute;
  width: calc(100% - 80px);
  height: 4px;
  background-color: #bbb;
  left: 40px;
  bottom: 5px;
}

.pet-types::after {
  content: "";
  position: absolute;
  width: calc(var(--box-width) - 80px);
  height: 4px;
  background-color: var(--first-color);
  left: 40px;
  bottom: 5px;
  transition: 0.5s ease;
}

.chevron-buttom i {
  color: var(--forth-color);
  position: absolute;
  z-index: 30;
  bottom: 6px;
  font-size: 1.5rem;
  cursor: pointer;
  transform: translateY(50%);
}
.chevron-buttom i:first-child {
  right: 10px;
}

.chevron-buttom i:last-child {
  left: 10px;
}
.image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  background-size: cover;
}
.my-pets .image {
  border: 10px solid #bbb;
}
.my-pets > div > div {
  width: fit-content;
  margin: auto;
}
.my-pets .dogs,
.my-pets .cats,
.my-pets .bird {
  width: fit-content;
  display: inline-block;
}
.my-pets .cats,
.my-pets .bird {
  margin-left: -60px;
}
.pet-types p {
  font-weight: bold;
  color: var(--fivth-color);
}
.dogs .image {
  background-image: url("@/assets/images/dogs/dog-8262506_1920.jpg");
}
.cats .image {
  background-image: url("@/assets/images/cats/kitten-1285341_1920.jpg");
}
.bird .image {
  background-image: url("@/assets/images/birds/flamingo-7086655_1920.jpg");
}
.fish .image {
  background-image: url("@/assets/images/pexels-moilens-31956916.jpg");
}
.wild .image {
  background-image: url("@/assets/images/pexels-pixabay-158340.jpg");
}
.types {
  transition: 0.5s ease;
  transform: translateX(0);
  gap: 20px;
}
.types {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* لتفعيل السحب باللمس على iOS */
  scrollbar-width: none; /* إخفاء شريط التمرير في فايرفوكس */
}

.types::-webkit-scrollbar {
  display: none; /* إخفاء شريط التمرير في كروم وسفاري */
}
button {
  padding: 10px;
  background-color: #fff;
  color: var(--fivth-color);
  border: 1px solid var(--fivth-color);
  transition: 0.5s;
}
button:hover {
  background-color: var(--fivth-color);
  color: #fff;
}
</style>
