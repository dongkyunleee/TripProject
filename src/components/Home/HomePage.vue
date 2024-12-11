<template>
  <div class="page-container">
    <Header />
    <!-- Swiper 슬라이더 추가 -->
    <swiper :pagination="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="(destination, index) in popularDestinations" :key="index">
        <img :src="destination.image" :alt="destination.title" />
        <div class="slide-content">
          <h3>{{ destination.title }}</h3>
          <p>{{ destination.description }}</p>
        </div>
      </swiper-slide>
    </swiper>
    <!-- 기존 destination 리스트 -->
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
import { Swiper, SwiperSlide } from "swiper/vue"; // Swiper 추가
import { Pagination } from "swiper/modules"; // Swiper 모듈 추가
import 'swiper/css';
import 'swiper/css/pagination';
import DestinationCard from "@/components/DestinationCard.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import parisImage from "@/assets/image/paris.jpg";
import newYorkImage from "@/assets/image/NewYork.jpg";

export default {
  name: "HomePage",
  components: { Header, Footer, DestinationCard, Swiper, SwiperSlide },
  setup() {
    const popularDestinations = ref([
      { id: 1, image: parisImage, title: "Paris", description: "The city of lights." },
      { id: 2, image: newYorkImage, title: "New York", description: "A Great City" },
      // ... 나머지 destination들
    ]);

    return {
      popularDestinations,
      modules: [Pagination], // Swiper에서 사용하는 모듈 등록
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

.mySwiper {
  width: 100%;
  height: 300px;
  margin: 20px 0;
}

.swiper-slide {
  text-align: center;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.swiper-slide img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.slide-content {
  margin-top: 10px;
}

.slide-content h3 {
  margin: 5px 0;
  font-size: 18px;
  font-weight: bold;
}

.slide-content p {
  font-size: 14px;
  color: #555;
}
</style>