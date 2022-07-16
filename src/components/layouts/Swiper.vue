<template>
  <section class="swiper">
    <Carousel
      :autoplay="2000"
      :wrap-around="true">
      <Slide
        v-for="slide in swiperSrc"
        :key="slide.imgsrc">
        <div class="slide-area">
          <img :src="`/src/assets/swiper/${slide.imgsrc}.jpg`">
          <div class="image-Info">
            <strong class="title">{{ slide.imgtitle }}</strong>
            <span class="desc">{{ slide.imgdes }}</span>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Autoplay',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      settings: {
        itemsToshow: 1,
        snapAlign: 'center',
      },
      swiperSrc: [
        {
          imgsrc : 'slide1',
          imgtitle: 'BOSE',
          imgdes : '묵직한 베이스의 강자'
        },
        {
          imgsrc : 'slide2',
          imgtitle: 'XBOX',
          imgdes : 'SERIES X/S'
        },
        {
          imgsrc : 'slide3',
          imgtitle: 'SENHEISER',
          imgdes : '최고의 소재와 음질'
        },
        {
          imgsrc : 'slide4',
          imgtitle: '뱅앤올룹슨',
          imgdes : '프리미엄 명품 사운드'
        },
        {
          imgsrc : 'slide5',
          imgtitle: 'EGLOOCAM',
          imgdes : '해킹되지 않는 안전한 카메라'
        },
      ]
    }
  },
  // metohds: {
  //   getImageUrl(name) {
  //     return new URL(`./dir/${name}.jpg`, import.meta.url).href
  //   }
  // }
})
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";
.temp {
  width: 100vw;
  height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
}

.slide-area {
  width: 100%;
  height: 100%;
  position: relative;
  .image-Info {
    text-align: left;
    position: absolute;
    top: 40%;
    left: 10%;
    transform: translate(-10%, -30%);
    display: flex;
    flex-flow: column;
    gap: 2rem;
    font-size: 2rem;
    .title {
      font-size: 3rem;
    }
    .desc {
      align-self: start;
    }
  }
} 

img {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 1024px) {
  .temp {
    height: 220px;
  }
}
 
</style>
