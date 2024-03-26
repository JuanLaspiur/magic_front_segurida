<template>
    <q-carousel
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    control-color="primary"
    navigation
    padding
    arrows
    height="250px"
    >
    <q-carousel-slide v-for="(item, index) in chunck" :key="index" :name="index + 1"
       horizontal class="q-mt-md q-mb-xl" style="height: 260px; width: 100%;" :thumb-style="thumbStyleScroll">
      <div class="row items-center justify-start no-wrap" >
        <CardWithoutImg
        :thumbStyleScroll="thumbStyleScroll"
        :baseuQuedada="baseuQuedada"
        :baseuPerfil="baseuPerfil"
        :user="user"
        :item="item[0]"
        />
        <CardWithoutImg
        :chunck="chunck"
        :thumbStyleScroll="thumbStyleScroll"
        :baseuQuedada="baseuQuedada"
        :baseuPerfil="baseuPerfil"
        :user="user"
        :item="item[1]"
        />
      </div>
    </q-carousel-slide>
    </q-carousel>
</template>

<script>
import CardWithoutImg from './CardWithoutImg.vue'
export default {
  props: ['chunck', 'thumbStyleScroll', 'baseuQuedada', 'baseuPerfil', 'user'],
  components: { CardWithoutImg },
  data () {
    return {
      slide: 1
    }
  }
}
</script>
