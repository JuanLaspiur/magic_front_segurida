<template>
  <div style="contenedor">
    <div class="q-pa-md">
      <!-- Contenido dinámico -->
      <div class="text-center">
        <!-- Mostrar el componente actual -->
        <div v-if="currentIndex === 0">
          <UsuariosPorcentaje />
        </div>
        <div v-else-if="currentIndex === 1">
          <HombrePorcentaje />
        </div>
        <div v-else-if="currentIndex === 2">
          <MujeresPorcentaje />
        </div>
        <div v-else-if="currentIndex === 3">
          <SinDefinirPorcentaje />
        </div>
        <div v-else>
          <NoBinariosPorcentaje />
        </div>
      </div>

      <div class="espacio_botontes">
        <!-- Botones numerados para seleccionar componente -->
        <q-btn
          @click="changeComponent(0)"
          color="primary"
          label="1"
          class="mr-2"
        />
        <q-btn
          @click="changeComponent(1)"
          color="primary"
          label="2"
          class="mr-2"
        />
        <q-btn
          @click="changeComponent(2)"
          color="primary"
          label="3"
          class="mr-2"
        />
        <q-btn
          @click="changeComponent(3)"
          color="primary"
          label="4"
          class="mr-2"
        />
        <q-btn
          @click="changeComponent(4)"
          color="primary"
          label="5"
          class="mr-2"
        />
      </div>
    </div>

    <div class="q-pa-lg flex">
      <PremiumPorcentaje />
      <CategoriasPorcentaje />
    </div>
    <div class="q-pa-lg">
       <TabloidePorcentaje/>
    </div>
  </div>
</template>

<script>
import SinDefinirPorcentaje from '../../components/porcentaje/SinDefinirPorcentaje.vue'
import HombrePorcentaje from '../../components/porcentaje/HombresPorcentaje.vue'
import MujeresPorcentaje from '../../components/porcentaje/MujeresPorcentaje.vue'
import PremiumPorcentaje from '../../components/porcentaje/PremiumPorcentaje.vue'
import CategoriasPorcentaje from '../../components/porcentaje/CategoriasPorcentaje.vue'
import NoBinariosPorcentaje from '../../components/porcentaje/NoBinariosPorcentaje.vue'
import UsuariosPorcentaje from '../../components/porcentaje/UsuariosPorcentaje.vue'
import TabloidePorcentaje from '../../components/porcentaje/TabloidePorcentaje.vue'

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
    CategoriasPorcentaje,
    UsuariosPorcentaje,
    TabloidePorcentaje
  }
}
</script>

<style scoped>
/* Estilos específicos del componente */
.espacio_botontes{
  width: max-content;
  display: flex;
  gap:5px;
  padding: 0 10px;
  margin: auto;
}
.flex{
  display: flex;
  flex-direction: row;
}
</style>
