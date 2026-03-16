<template>
  <div class="landing">
    <div ref="flashNews" class="flash-news">
      <p class="m-0 text-white"></p>
    </div>

    <div class="chevron-buttom">
      <i
        @click.prevent="next"
        role="button"
        class="fa-solid fa-chevron-right"
      ></i>
      <i
        @click.prevent="prev"
        role="button"
        class="fa-solid fa-chevron-left"
      ></i>
    </div>

    <div
      ref="backgrounds"
      class="backgrounds"
      :style="{
        transform: isRTL
          ? `translateX(-${index * 100}vw)` // نفس الاتجاه للسلايدات الفعلية
          : `translateX(-${index * 100}vw)`,
      }"
    >
      <div>
        <div class="article">
          <h2>{{ landingArticle.article1[0] }}</h2>
          <p>{{ landingArticle.article1[1] }}</p>
          <button class="btn">{{ landingArticle.article1[2] }}</button>
        </div>
      </div>
      <div>
        <div class="article">
          <h2>{{ landingArticle.article2[0] }}</h2>
          <button class="btn">{{ landingArticle.article2[1] }}</button>
        </div>
      </div>
      <div>
        <div class="article">
          <h2>{{ landingArticle.article3[0] }}</h2>
          <button class="btn">{{ landingArticle.article3[1] }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useI18n } from "vue-i18n";

const { tm, locale } = useI18n();
const index = ref(0);
const backgrounds = ref(null);
const flashNews = ref(null);
const slideCount = ref(0);
let letter = 0;
// let intervalId = null;
let intervalSec = null;

const newsList = computed(() => tm("flashnews.texts"));
const landingArticle = computed(() => tm("landingArticle"));
const currentNewsIndex = ref(0);
const isRTL = computed(() => locale.value === "ar");

// ----------------------
// تحريك السلايدات
// ----------------------
function next() {
  index.value = (index.value + 1) % slideCount.value;
  // resetAutoSlide();
}

function prev() {
  index.value = (index.value - 1 + slideCount.value) % slideCount.value;
  // resetAutoSlide();
}

// function startAutoSlide() {
//   stopAutoSlide();
//   intervalId = setInterval(() => {
//     index.value = (index.value + 1) % slideCount.value;
//   }, 5000);
// }

// function stopAutoSlide() {
//   if (intervalId) {
//     clearInterval(intervalId);
//     intervalId = null;
//   }
// }

// function resetAutoSlide() {
//   startAutoSlide();
// }

// ----------------------
// أخبار الفلاش
// ----------------------
function startFlashNews() {
  if (!flashNews.value) return; // ✅ حماية
  const p = flashNews.value.querySelector("p");
  if (!p) return; // ✅ حماية

  p.textContent = "";
  p.style.transition = "none";
  p.style.transform = "translateX(0)";
  letter = 0;

  const currentText = newsList.value[currentNewsIndex.value];
  if (!currentText) return;

  if (intervalSec) clearInterval(intervalSec);

  intervalSec = setInterval(() => {
    if (letter < currentText.length) {
      p.textContent += currentText[letter];
      letter++;
    } else {
      stopFlashNews();
    }
  }, 80);
}

function stopFlashNews() {
  if (!flashNews.value) return; // ✅ حماية
  const p = flashNews.value.querySelector("p");
  if (!p) return; // ✅ حماية

  if (intervalSec) {
    clearInterval(intervalSec);
    intervalSec = null;
    removeText();
  }
}

function removeText() {
  if (!flashNews.value) return; // ✅ حماية
  const p = flashNews.value.querySelector("p");
  if (!p) return; // ✅ حماية

  p.style.transition = "transform 1s ease";
  p.style.transform = isRTL.value ? "translateX(-100vw)" : "translateX(100vw)";

  setTimeout(() => {
    currentNewsIndex.value =
      (currentNewsIndex.value + 1) % newsList.value.length;
    startFlashNews();
  }, 1500);
}

// ----------------------
// دورة حياة المكون
// ----------------------
onMounted(() => {
  slideCount.value = backgrounds.value.children.length;
  // startAutoSlide();
  startFlashNews();
});

onUnmounted(() => {
  // stopAutoSlide();
  stopFlashNews();
});

// ✅ عند تغيير اللغة — إعادة التشغيل بالكامل
watch(locale, () => {
  index.value = 0;
  currentNewsIndex.value = 0;
  // stopAutoSlide();
  stopFlashNews();
  // startAutoSlide();
  startFlashNews();
});
//
</script>

<style scoped>
.landing {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.flash-news {
  position: absolute;
  z-index: 20;
  top: 62px;
  left: 0;
  height: 62px;
  width: 100%;
  background-color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
}
.flash-news p {
  transition: 4s ease;
}
/* الحاوية الأساسية للخلفيات */
.backgrounds {
  display: flex;
  height: 100%;
  width: 300%;
  transition: transform 2s ease;
}

.backgrounds > div {
  height: 100%;
  width: 100vw;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  position: relative;
}
.backgrounds > div > .article {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgb(119, 119, 119, 0.5);
  z-index: 30;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  font-family: "Lobster Two", sans-serif;
  background: #e9c46a;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgba(233, 196, 106, 0.6) 0%,
    rgba(244, 162, 97, 0.6) 50%,
    rgba(231, 111, 81, 0.6) 100%
  );
}
@media (min-width: 767px) {
  .backgrounds > div > .article {
    height: 50%;
    width: 50%;
  }
}
/* الصور */
.backgrounds > div:nth-child(1) {
  background-image: url(../assets/images/covers/cover4.jpg);
}
.backgrounds > div:nth-child(2) {
  background-image: url(../assets/images/covers/cover2.jpg);
}
.backgrounds > div:nth-child(3) {
  background-image: url(../assets/images/covers/cover3.jpg);
}

/* الأسهم */
.chevron-buttom i {
  color: #fff;
  position: absolute;
  z-index: 15;
  top: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.chevron-buttom i:hover {
  transform: scale(1.2);
}

.chevron-buttom i:first-child {
  right: 10px;
}

.chevron-buttom i:last-child {
  left: 10px;
}

.article h2 {
  font-size: 60px;
}
.article p {
  font-size: 24px;
}
.article button {
  font-family: "Cairo", sans-serif;
  border: none;
  background-color: var(--first-color);
}
</style>
