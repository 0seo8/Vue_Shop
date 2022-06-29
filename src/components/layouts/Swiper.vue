<template>
  <div class="box">
    <Carousel
      :autoplay="2000"
      :wrap-around="true">
      <Slide
        v-for="slide in 3"
        :key="slide">
        <div class="carousel__item">
          <div class="temp">
            {{ slide }}
          </div>
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
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
  data(){
    return {
      settings: {
        itemsToshow: 1,
        snapAlign: 'center',        
      }
    }
  }
})
</script>

<style scoped lang="scss">
.temp {
  width: 100vw;
  height: 650px;
}

ul {
  margin: 0;
}

</style>
