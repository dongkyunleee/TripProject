<template>
  <swiper :pagination="true" :modules="modules" class="mySwiper">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide><swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// import required modules
import { Pagination } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>
<style>
body {
position: relative;
height: 100%;
}

body {
background: #eee;
font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
font-size: 14px;
color: #000;
margin: 0;
padding: 0;
}

.swiper {
width: 100%;
height: 100%;
}

.swiper-slide {
text-align: center;
font-size: 18px;
background: #fff;

/* Center slide text vertically */
display: flex;
justify-content: center;
align-items: center;
}

.swiper-slide img {
display: block;
width: 50%;
height: 100%;
object-fit: cover;
}
</style>
