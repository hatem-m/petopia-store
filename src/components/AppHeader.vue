<template>
  <nav class="navbar navbar-expand-lg pt-2 pb-2 text-center">
    <div class="container-fluid">
      <div class="d-flex">
        <router-link to="/" custom v-slot="{ navigate, href }">
          <a :href="href" @click="navigate" class="navbar-brand logo">
            <span class="text-first-color">P</span>
            <span class="">ETOPIA</span>
          </a>
        </router-link>
        <div
          class="user-icons d-flex justify-content-center align-items-center"
        >
          <div
            class="dropdown p-0 d-flex justify-content-center align-items-center"
          >
            <button
              class="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-language"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <button
                  @click="switchLang('ar')"
                  class="dropdown-item"
                  type="button"
                >
                  {{ arabic }}
                </button>
              </li>
              <li>
                <button
                  @click="switchLang('en')"
                  class="dropdown-item"
                  type="button"
                >
                  {{ english }}
                </button>
              </li>
            </ul>
          </div>
          <div
            class="dropdown p-0 d-flex justify-content-center align-items-center"
          >
            <button
              class="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-regular fa-heart"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" type="button">
                  {{ rateus }}
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button">
                  {{ contactus }}
                </button>
              </li>
            </ul>
          </div>
          <div
            class="dropdown p-0 d-flex justify-content-center align-items-center"
          >
            <button
              class="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-regular fa-user"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" type="button">
                  {{ profile }}
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button">
                  {{ signin }}
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button">{{ login }}</button>
              </li>
            </ul>
          </div>
          <div>
            <router-link custom v-slot="{ navigate, href }" to="/basket"
              ><a
                class="basket btn"
                :data-notific="totalItems"
                @click="navigate"
                :href="href"
                ><i class="fa-regular fa-basket-shopping nav-link"></i></a
            ></router-link>
          </div>
        </div>
      </div>

      <button
        class="navbar-toggler text-white border-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon text-white"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            custom
            v-slot="{ navigate, href, isActive }"
          >
            <li class="nav-item">
              <a
                :class="['nav-link', { active: isActive }]"
                :href="href"
                @click="navigate"
                aria-current="page"
                >{{ link.label }}</a
              >
            </li>
          </router-link>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ pet }} <i class="fa-solid fa-chevron-down font-small"></i>
            </a>
            <ul
              class="dropdown-menu p-0 overflow-hidden"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <router-link
                v-for="type in pettypes"
                :key="type.path"
                :to="type.path"
                custom
                v-slot="{ navigate, href }"
              >
                <li>
                  <a class="subnav-pet" @click="navigate" :href="href">{{
                    type.label
                  }}</a>
                </li>
              </router-link>
            </ul>
          </li>
        </ul>
        <div class="d-flex">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              :placeholder="search"
              aria-label="Search"
            />
            <button class="btn btn-theme" type="submit">{{ search }}</button>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm, locale } = useI18n();
import { useCartStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
const cart = useCartStore();
const { totalItems } = storeToRefs(cart);
// قائمة الروابط
const navLinks = computed(() => [
  { path: "/", label: t("nav.home") },
  { path: "/about", label: t("nav.about") },
  { path: "/product", label: t("nav.product") },
]);
const search = computed(() => t("form.search"));
const arabic = computed(() => t("subnav.arabic"));
const english = computed(() => t("subnav.english"));
const rateus = computed(() => t("subnav.rateus"));
const contactus = computed(() => t("subnav.contactus"));
const profile = computed(() => t("subnav.profile"));
const signin = computed(() => t("subnav.signin"));
const login = computed(() => t("subnav.login"));
const pet = computed(() => t("nav.pet"));
const pettypes = computed(() => [
  { path: "/pets/dog", label: tm("shopPage.allpets[0]") },
  { path: "/pets/cat", label: tm("shopPage.allpets[1]") },
  { path: "/pets/bird", label: tm("shopPage.allpets[2]") },
  { path: "/pets/fish", label: tm("shopPage.allpets[3]") },
  { path: "/pets/wild", label: tm("shopPage.allpets[4]") },
]);
// التبديل بين اللغتين
function switchLang(lang) {
  locale.value = lang;
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("lang", lang);
}
</script>

<style scoped>
a.subnav-pet {
  text-decoration: none;
  display: block;
  color: var(--fivth-color);
  text-align: center;
  background-color: #e9c56a79;
}
a.subnav-pet:hover {
  background-color: var(--third-color);
}
.font-small {
  font-size: 12px;
}
nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background: #e9c46a;
  background: linear-gradient(
    60deg,
    rgba(233, 196, 106, 0.6) 0%,
    rgba(244, 162, 97, 0.6) 50%,
    rgba(231, 111, 81, 0.6) 100%
  );
  box-shadow: 0px 8px 10px rgb(231, 111, 81, 0.1);
}
.nav-link {
  color: var(--fivth-color) !important;
  font-weight: bold !important;
  text-decoration: none;
}
.nav-link.active {
  color: var(--forth-color) !important;
}
.btn-theme {
  color: var(--second-color) !important;
  border: 1px solid var(--second-color) !important;
  background-color: #fff !important;
  transition: 0.5s;
}
.btn-theme:hover {
  color: #fff !important;
  border: 1px solid var(--second-color) !important;
  background-color: var(--second-color) !important;
}
.text-first-color {
  color: var(--first-color);
}
.logo {
  font-family: serif;
  font-weight: bold;
}
.logo span:first-child {
  font-size: 24px;
}
.logo span:last-child {
  /* background-color: rgba(200, 200, 200, 0.3); */

  color: var(--forth-color);
  letter-spacing: 2px;
  border: 2px solid var(--second-color);
  font-size: 18px;
  position: relative;
}
.logo span:last-child::before {
  content: "";
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  right: 5px;
  background-color: var(--second-color);
  z-index: -1;
  transform: skew(30deg);
}
.logo span:last-child::after {
  content: "\f6be";
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
}
.dropdown button {
  border: none !important;
}
.dropdown {
  color: var(--first-color) !important;
}
.dropdown i {
  color: var(--fivth-color) !important;
}
.dropdown-toggle::after {
  display: none !important;
}
li.nav-item.dropdown {
  position: relative;
  z-index: 100;
}
.basket {
  position: relative;
}
.basket::after {
  content: attr(data-notific);
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--fivth-color);
  color: #fff;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 9px;
}
.basket[data-notific="0"]::after {
  display: none;
}
</style>
