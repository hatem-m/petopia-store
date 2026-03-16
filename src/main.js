import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { createI18n } from "vue-i18n";
import en from "@/assets/locales/en.json";
import ar from "@/assets/locales/ar.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/style/Global.css";

const i18n = createI18n({
  legacy: false, // استخدام API الحديثة
  locale: "en", // اللغة الافتراضية
  fallbackLocale: "en",
  messages: {
    en,
    ar,
  },
});

createApp(App)
  .use(createPinia())
  .use(store)
  .use(router)
  .use(i18n)
  .mount("#app");
