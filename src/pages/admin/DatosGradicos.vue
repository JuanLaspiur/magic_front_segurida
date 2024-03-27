<template>
  <div style="contenedor">
  <div class="q-pa-md">
    <!-- Contenido dinámico -->
    <div class="text-center">
      <!-- Mostrar el componente actual -->
      <div v-if="currentIndex === 0">
        <SinDefinirPorcentaje />
      </div>
      <div v-else-if="currentIndex === 1">
        <HombrePorcentaje />
      </div>
      <div v-else-if="currentIndex === 2">
        <MujeresPorcentaje />
      </div>
      <div v-else>
        <NoBinariosPorcentaje />
      </div>
    </div>

    <!-- Botones numerados para seleccionar componente -->
    <q-btn @click="changeComponent(0)" color="primary" label="1" class="mr-2" />
    <q-btn @click="changeComponent(1)" color="primary" label="2" class="mr-2" />
    <q-btn @click="changeComponent(2)" color="primary" label="3"  class="mr-2"/>
    <q-btn @click="changeComponent(3)" color="primary" label="4"  class="mr-2"/>
  </div>

  <div class="q-pa-md">
    <PremiumPorcentaje/>
  </div>
  <div class="q-pa-md">
    <CategoriasPorcentaje/>
  </div>

</div>
</template>

<script>

import SinDefinirPorcentaje from '../../components/SinDefinirPorcentaje.vue'
import HombrePorcentaje from '../../components/HombresPorcentaje.vue'
import MujeresPorcentaje from '../../components/MujeresPorcentaje.vue'
import PremiumPorcentaje from '../../components/PremiumPorcentaje.vue'
import CategoriasPorcentaje from '../../components/CategoriasPorcentaje.vue'
import NoBinariosPorcentaje from '../../components/NoBinariosPorcentaje.vue'
export default {
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    // Método para cambiar el componente según el índice
    changeComponent (index) {
      this.currentIndex = index
    }
  },
  components: {
    SinDefinirPorcentaje,
    HombrePorcentaje,
    MujeresPorcentaje,
    NoBinariosPorcentaje,
    PremiumPorcentaje,
    CategoriasPorcentaje
  }
}
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
