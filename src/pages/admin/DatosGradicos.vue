<template>
  <div>
    <div>
      <!-- Contenido dinámico -->
      <div class="text-center" style="padding: 50px">
        <!--  semi-colon expected -->
        <div v-if="currentIndex === 0">
          <h4>Gráficos</h4>
          <div style="display: flex; gap: 10%">
            <UsuariosPorcentaje :totalUsers="totalUsers" />
            <UsuariosPlanesPorcentaje :totalUsers="totalUsers"  :totalQuedadas="totalQuedadas"/>
          </div>
        </div>
        <div v-else-if="currentIndex === 1">
          <HombrePorcentaje :totalUsers="totalUsers" />
        </div>
        <div v-else-if="currentIndex === 2">
          <MujeresPorcentaje :totalUsers="totalUsers" />
        </div>
        <div v-else-if="currentIndex === 3">
          <SinDefinirPorcentaje :totalUsers="totalUsers" />
        </div>
        <div v-else>
          <NoBinariosPorcentaje :totalUsers="totalUsers" />
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

    <div class="invertir-flex" style="width: 100%; display: flex; gap: 8%; padding: 0 200px">
      <PremiumPorcentaje />
      <CategoriasPorcentaje class="agrandar-flex"/>
    </div>
    <div class="q-pa-lg">
      <TabloidePorcentaje />
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
import UsuariosPlanesPorcentaje from '../../components/porcentaje/UsuariosPlanesPorcentaje.vue'
import TabloidePorcentaje from '../../components/porcentaje/TabloidePorcentaje.vue'

export default {
  data () {
    return {
      currentIndex: 0,
      totalUsers: 0,
      totalQuedadas: []
    }
  },
  created () {
    this.fetchTotalUsers()
    this.fetchTotalQuedadas()
  },
  methods: {
    // Método para cambiar el componente según el índice
    changeComponent (index) {
      this.currentIndex = index
    },
    fetchTotalUsers () {
      this.$api
        .get('all_user_admin')
        .then(res => {
          if (res.success) {
            this.totalUsers = res.data
          }
        })
        .catch(error => {
          console.error('Error fetching user statistics:', error)
        })
    },
    fetchTotalQuedadas () {
      this.$api
        .get('all_quedadas_admin')
        .then(response => {
          this.totalQuedadas = response
          console.log('this.totalQuedadas padre ' + this.totalQuedadas)
        })
        .catch(error => {
          console.error('Error al obtener las quedadas:', error)
        })
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
    UsuariosPlanesPorcentaje,
    TabloidePorcentaje
  }
}
</script>

<style scoped>
/* Estilos específicos del componente */
.espacio_botontes {
  width: max-content;
  display: flex;
  gap: 5px;
  padding: 0 10px;
  margin: auto;
}
.flex {
  display: flex;
  flex-direction: row;
}
.gap {
  gap: 70px;
}
.maxWidth {
  width: 1000px;
}
@media (width < 1850px){
.invertir-flex{
  flex-direction: column;
}
}
</style>
