<template>
  <div class="destination-detail">
    <h1>{{ destinationData?.title || "Destination Details" }}</h1>
    <img :src="destinationData?.image" alt="" />
    <p>{{ destinationData?.description || "No additional information available." }}</p>

    <div class="landmarks">
      <h2>Famous Landmarks</h2>
      <ul>
        <li v-for="landmark in destinationData?.landmarks" :key="landmark.name">
          <img :src="landmark.image" :alt="landmark.name" />
          <p>{{ landmark.name }}</p>
        </li>
      </ul>
    </div>

    <div class="travel-info">
      <h2>Travel Information</h2>
      <ul>
        <li><strong>Best Time to Visit:</strong> {{ destinationData?.bestTime }}</li>
        <li><strong>Average Cost:</strong> {{ destinationData?.averageCost }}</li>
        <li><strong>Recommended Duration:</strong> {{ destinationData?.duration }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "DestinationDetail",
  setup() {
    const route = useRoute();
    const destinationId = ref(route.params.id);
    const destinationData = ref();

    // Mock 데이터베이스
    const destinations  = [
      {
        id: 1,
        image: "/assets/image/paris.jpg",
        title: "Paris",
        description: "The city of lights.",
        landmarks: [
          { name: "Eiffel Tower", image: "/assets/mage/eiffel.jpg" },
          { name: "Louvre Museum", image: "/assets/image/louvre.jpg" },
        ],
        bestTime: "April to June, September to November",
        averageCost: "$1500 - $2500",
        duration: "3 to 5 days",
      },
      {
        id: 2,
        image: "/assets/image/NewYork.jpg",
        title: "New York",
        description: "A Great City",
        landmarks: [
          { name: "Statue of Liberty", image: "/assets/image/statue.jpg" },
          { name: "Times Square", image: "/assets/image/timessquare.jpg" },
        ],
        bestTime: "April to June, September to November",
        averageCost: "$2000 - $3000",
        duration: "5 to 7 days",
      },
    ];

    onMounted(() => {
      destinationData.value = destinations.find((d) => d.id === Number(destinationId.value));
    });

  },
};
</script>

<style scoped>
.destination-detail {
  text-align: center;
  padding: 20px;
}

.destination-detail img {
  max-width: 600px;
  border-radius: 10px;
  margin: 20px 0;
}

.landmarks ul {
  display: flex;
  gap: 20px;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.landmarks img {
  max-width: 200px;
  border-radius: 10px;
}

.travel-info ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.travel-info li {
  margin-bottom: 10px;
}
</style>
