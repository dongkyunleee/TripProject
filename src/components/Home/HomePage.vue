<template>
  <div class="page-container">
    <Header />
    <!-- Swiper 슬라이더 추가 -->
    <swiper
        class="mySwiper"
        :pagination="true"
        :spaceBetween="20"
        :slidesPerView="1"
        :autoplay="{ delay: 7000 }"
        :speed="2000"
        :modules="modules"
    >
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

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
}

/* Swiper 슬라이더 */
.mySwiper {
  width: 100%;
  height: 400px;
  margin: 20px auto;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
}

swiper-slide {
  text-align: center;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* 작은 화면 (모바일 등) */
@media (max-width: 768px) {
  .mySwiper {
    height: 300px;
  }
}

/* 큰 화면 (데스크탑 등) */
@media (min-width: 1024px) {
  .mySwiper {
    height: 500px;
  }
}

/* 그리드 레이아웃 (destination 카드) */
.destination-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* 각 카드가 화면에 맞게 표시되도록 설정 */
  gap: 30px;
  width: 100%;
  max-width: 1400px;
  margin: 30px auto;
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
