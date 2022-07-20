<template>
  <section class="swiper">
    <Carousel
      :autoplay="2000"
      :wrap-around="true">
      <Slide
        v-for="slide in swiperSrc"
        :key="slide.imgsrc">
        <div class="slide-area">
          <div 
            :style="{backgroundImage: `url(/assets/swiper/${slide.imgsrc}.jpg)`}"
            class="poster" />
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
})
</script>

<style scoped lang="scss">
.temp {
  width: 100vw;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
}

.slide-area {
  width: 100%;
  height: 100%;
  position: relative;
  color: rgb(234, 233, 233);
  text-shadow: 1px 1px 1px black;
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

.poster {
    width: 100%;
    height: 600px;
    background-size: cover;
    background-position: center;
    position: relative;
    flex-shrink: 0;
  }
@media screen and (max-width: 1024px) {
  .temp {
    height: 220px;
  }

  .poster {
    height: 220px;   
    background-position: right;
  }

  .slide-area .image-Info {
    font-size:1.2rem;
      strong.title {
      font-size: 2rem;
    }
  } 
}

@media screen and (max-width: 650px) {
  .side-area {
    .image-Info {
      font-size: 1rem;
    }
  }
}

 
</style>
