<template>
    <div v-if="chunck.length" class="q-mt-sm" style="margin-bottom: 50px">
        <div class="fit row items-center justify-center q-px-sm q-py-sm">
            <CardPlan v-for="(item, index) in chunck" :key="index"
            :thumbStyleScroll=thumbStyleScroll
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :user="user"
            :item="item"
            :allPlans="allPlans"
            />
        </div>
    </div>
</template>
<script>
import CardPlan from './CardPlan.vue'
export default {
  props: ['chunck', 'thumbStyleScroll', 'baseuQuedada', 'baseuPerfil', 'user', 'allPlans'],
  components: { CardPlan }
}
</script>
