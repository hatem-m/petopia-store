import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import BasketView from "@/views/BasketView.vue";
import PetsView from "@/views/PetsView.vue";
import DogView from "@/components/allPets/DogView.vue";
import CatView from "@/components/allPets/CatView.vue";
import FishView from "@/components/allPets/FishView.vue";
import BirdView from "@/components/allPets/BirdView.vue";
import WildView from "@/components/allPets/WildView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/product",
    name: "product",
    component: ProductView,
  },
  {
    path: "/basket",
    name: "basket",
    component: BasketView,
  },
  {
    path: "/pets",
    name: "pets",
    component: PetsView,
    children: [
      { path: "dog", component: DogView },
      { path: "cat", component: CatView },
      { path: "bird", component: BirdView },
      { path: "fish", component: FishView },
      { path: "wild", component: WildView },
    ],
  },
  {
    path: "/pets/:id",
    name: "PetDetails",
    component: () => import("@/components/allPets/PetDetailsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
