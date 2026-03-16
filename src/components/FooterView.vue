<template>
  <div class="footer">
    <div class="subscribe">
      <div class="container">
        <form action="">
          <select name="pet" id="pet" aria-label="Choose your pet">
            <option value="">{{ form[0] }}</option>
            <option value="dog">{{ allpets[0] }}</option>
            <option value="cat">{{ allpets[1] }}</option>
            <option value="bird">{{ allpets[2] }}</option>
            <option value="fish">{{ allpets[3] }}</option>
            <option value="wild">{{ allpets[4] }}</option>
          </select>
          <input type="email" placeholder="E-mail" name="" id="" />
          <input type="submit" :value="form[1]" />
        </form>
      </div>
    </div>
    <div class="footer-nav">
      <div class="container">
        <div>
          <p role="button" @click="footNavActive = 'language'">
            {{ footNav[0] }}
          </p>
          <ul :class="footNavActive === 'language' ? 'active' : ''">
            <li>{{ arabic }}</li>
            <li>{{ english }}</li>
          </ul>
        </div>
        <div>
          <p role="button" @click="footNavActive = 'feed'">{{ footNav[1] }}</p>
          <ul :class="footNavActive == 'feed' ? 'active' : ''">
            <li>{{ rateus }}</li>
            <li>{{ contactus }}</li>
          </ul>
        </div>
        <div>
          <p role="button" @click="footNavActive = 'account'">
            {{ footNav[2] }}
          </p>
          <ul :class="footNavActive == 'account' ? 'active' : ''">
            <li>{{ profile }}</li>
            <li>{{ signin }}</li>
            <li>{{ login }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="contact">
      <div class="logo">
        <router-link to="/" custom v-slot="{ navigate, href }">
          <a :href="href" @click="navigate" class="navbar-brand logo">
            <span class="text-first-color">P</span>
            <span class="">ETOPIA</span>
          </a>
        </router-link>
      </div>
      <div class="contact-icons ms-4">
        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#"><i class="fa-brands fa-twitter"></i></a>
        <a href="#"><i class="fa-solid fa-house-chimney"></i></a>
        <a href="#"><i class="fa-brands fa-instagram"></i></a>
      </div>
      <p class="text-end mb-0 pb-0">© petopia SE 2025</p>
      <p class="text-end mt-0 pt-0">hatem mansour</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { tm } = useI18n();

// قائمة الروابط
// const navLinks = computed(() => [
//   { path: "/", label: t("nav.home") },
//   { path: "/about", label: t("nav.about") },
// ]);
// const search = computed(() => t("form.search"));
const arabic = computed(() => tm("subnav.arabic"));
const english = computed(() => tm("subnav.english"));
const rateus = computed(() => tm("subnav.rateus"));
const contactus = computed(() => tm("subnav.contactus"));
const profile = computed(() => tm("subnav.profile"));
const signin = computed(() => tm("subnav.signin"));
const login = computed(() => tm("subnav.login"));
const allpets = computed(() => tm("shopPage.allpets"));
const form = computed(() => tm("footer.form"));
const footNav = computed(() => tm("footer.footNav"));
const footNavActive = ref(null);
</script>

<style scoped>
.subscribe {
  min-height: 50vh;
  background: #e9c46a;
  background: linear-gradient(
    60deg,
    rgba(233, 196, 106) 0%,
    rgba(244, 162, 97) 50%,
    rgba(231, 111, 81) 100%
  );
  display: flex;
  justify-content: center;
  align-items: end;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}
form > * {
  display: block;
  width: 100%;
  padding: 5px;
  border: none;
  outline: none;
  background-color: var(--third-color);
  border-radius: 6px;
}
form input[type="submit"]:hover {
  background-color: var(--second-color);
  color: #fff;
}
.footer-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 0;
  overflow: hidden;
  transition: 0.5s;
}
.footer-nav ul.active {
  height: 100px;
}
.footer-nav ul li {
  width: fit-content;
  background-color: #fff;
  padding: 5px 10px;
  color: var(--fivth-color);
}
.footer-nav ul li:hover {
  background-color: var(--third-color);
}
.footer-nav {
}
@media (min-width: 767px) {
  .footer-nav .container {
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }
  .footer-nav ul {
    height: 100px;
  }
}
.contact {
  background: #e9c46a;
  background: linear-gradient(
    60deg,
    rgba(233, 196, 106, 0.4) 0%,
    rgba(244, 162, 97, 0.4) 50%,
    rgba(231, 111, 81, 0.4) 100%
  );
}
/* .contact .logo {
  font-size: 60px !important;
} */
.text-first-color {
  color: var(--first-color);
}
.logo {
  font-family: serif;
  font-weight: bold;
}
.logo span:first-child {
  font-size: 60px;
}
.logo span:last-child {
  /* background-color: rgba(200, 200, 200, 0.3); */
  color: var(--forth-color);
  letter-spacing: 2px;
  border: 2px solid var(--second-color);
  font-size: 50px;
  position: relative;
  /* z-index: -1; */
}
.logo span:last-child::before {
  content: "";
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  right: 15px;
  background-color: var(--second-color);
  z-index: -1;
  transform: skew(30deg);
}
.logo span:last-child::after {
  content: "\f6be";
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
}
.contact-icons a {
  display: inline-block;
  padding: 5px;
  margin-right: 5px;
  font-size: 18px;
  color: var(--forth-color) !important;
}
.contact-icons a:hover {
  color: var(--first-color) !important;
}
</style>
