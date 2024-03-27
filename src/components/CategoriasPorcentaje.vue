<template>
  <div>
    <h1>Hola mundo</h1>
    <!-- Aquí se mostrarán las categorías -->
    <div v-for="(category, index) in categories" :key="index">
      <q-linear-progress
        size="20px"
        :value="calculateCategoryPercentage(category.id)"
        :color="barColors[index % barColors.length]"
      />
      <p class="text-grey">{{ category.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: [],
      quedadas: [],
      barColors: ['red', 'green', 'blue', 'yellow', 'purple'] // Colores de las barras de progreso
    }
  },
  created () {
    this.fetchCategories()
    this.fetchQuedadas()
  },
  methods: {
    // Método para llamar a la API y obtener las categorías
    async fetchCategories () {
      try {
        const response = await this.$api('categories')
        this.categories = response.data
      } catch (error) {
        console.error('Error al obtener categorías:', error)
      }
    },
    // Método para llamar a la API y obtener las quedadas
    async fetchQuedadas () {
      try {
        const response = await this.$api('all_quedadas_admin')
        this.quedadas = response.data
      } catch (error) {
        console.error('Error al obtener quedadas:', error)
      }
    },
    // Método para obtener una quedada por su ID
    getQuedadaById (quedadaId) {
      return this.quedadas.find(quedada => quedada.id === quedadaId)
    },
    // Método para calcular el porcentaje de quedadas en una categoría específica
    calculateCategoryPercentage (categoryId) {
      const quedadasInCategory = this.quedadas.filter(
        quedada => quedada.category === categoryId
      )
      const totalQuedadas = this.quedadas.length
      const quedadasCount = quedadasInCategory.length
      return totalQuedadas > 0 ? quedadasCount / totalQuedadas : 0
    }
  }
}
</script>

<style>
/* Estilos CSS aquí */
</style>
