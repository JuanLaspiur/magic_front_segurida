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
    height="350px"
    >
    <q-carousel-slide v-for="(item, index) in chunck" :key="index" :name="index + 1"
       horizontal class="q-mt-md q-mb-xl" style="height: 260px; width: 100%;" :thumb-style="thumbStyleScroll">
      <div class="row items-center justify-start no-wrap" >
        <CardPlan
        :thumbStyleScroll="thumbStyleScroll"
        :baseuQuedada="baseuQuedada"
        :baseuPerfil="baseuPerfil"
        :user="user"
        :item="item[0]"
        />
        <CardPlan
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
import CardPlan from './CardPlan.vue'
export default {
  props: ['chunck', 'thumbStyleScroll', 'baseuQuedada', 'baseuPerfil', 'user'],
  components: { CardPlan },
  data () {
    return {
      slide: 1
    }
  }
}
</script>
