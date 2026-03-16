<template>
  <div class="card">
    <div
      class="image"
      :style="{ backgroundImage: `url(${getImageUrl(pet.images[0])})` }"
    ></div>

    <div class="info">
      <p>{{ pet.name }}</p>
      <p>{{ pet.species }}</p>
      <p>{{ pet.breed }}</p>
      <p>{{ pet.dateOfBirth }}</p>
      <p>{{ pet.sex }}</p>
      <p>{{ pet.reproductiveStatus }}</p>
      <router-link :to="`/pets/${pet.id}`" custom v-slot="{ navigate }">
        <button class="btn" @click="navigate">Show More</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PetCard",
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl(path) {
      try {
        return require(`@/assets/${path}`);
      } catch (err) {
        console.warn("❌ لم يتم العثور على الصورة:", path);
        return "";
      }
    },
  },
};
</script>

<style scoped>
.card {
  display: block;
  min-height: 260px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
}

.image {
  width: 100%;
  height: 260px;
  background-size: cover;
  background-position: center;
  transition: 0.4s ease;
}

.card:hover .image {
  filter: brightness(0.7);
}

.info {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 0%;
  background: rgba(231, 111, 81, 0.85);
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  overflow: hidden;
  transition: width 0.4s ease;
}

.card:hover .info {
  width: 50%;
}

.info p {
  margin: 4px 0;
  font-size: 15px;
  display: none;
}

.info button {
  margin-top: 10px;
  background: #444;
  padding: 8px 15px;
  border-radius: 5px;
  border: none;
  color: white;

  font-size: 14px;
  cursor: pointer;
  display: none;
  transition: 0.3s ease;
}

.info button:hover {
  background: #fff;
  color: #444;
}

.card:hover .info p,
.card:hover .info button {
  display: block;
}
</style>
