<template>
    <div v-if="chunck.length" class="q-mt-sm" style="margin-bottom: 50px">
        <div class="fit row items-center justify-center q-px-sm q-py-sm">
            <CardWithoutImg v-for="(item, index) in chunck" :key="index"
            :thumbStyleScroll=thumbStyleScroll
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :user="user"
            :item="item"
            />
        </div>
    </div>
</template>
<script>
import CardWithoutImg from './CardWithoutImg.vue'
export default {
  props: ['chunck', 'thumbStyleScroll', 'baseuQuedada', 'baseuPerfil', 'user'],
  components: { CardWithoutImg }
}
</script>
