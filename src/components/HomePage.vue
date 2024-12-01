<template>
  <div class="page-container">
    <Header />
    <div class="destination-list">
      <DestinationCard
          v-for="destination in popularDestinations"
          :key="destination.id"
          :image="destination.image"
          :title="destination.title"
          :description="destination.description"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref } from "vue";
import DestinationCard from "@/components/DestinationCard.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import parisImage from "@/assets/image/paris.jpg";
import newYorkImage from "@/assets/image/NewYork.jpg";

export default {
  name: "HomePage",
  components: { Header, Footer, DestinationCard },
  setup() {
    const popularDestinations = ref([
      { id: 1, image: parisImage, title: "Paris", description: "The city of lights." },
      { id: 2, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 3, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 4, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 5, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 6, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 7, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 8, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 9, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 10, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 11, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 12, image: newYorkImage, title: "New York", description: "A Great City" },
      { id: 13, image: newYorkImage, title: "New York", description: "A Great City" },
    ]);

    return {
      popularDestinations,
    };
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.destination-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1400px;
  margin: 30px auto;
}
</style>