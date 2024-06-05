<template>
  <div style="width: 40%; margin-top: 19px;">
    <h6>Eventos según categoría</h6>
    <!-- Aquí se mostrarán las categorías -->
    <div v-for="(category, index) in categories" :key="index" class="linear_category">
      <q-linear-progress
        size="20px"
        :value="calculateCategoryPercentage(category._id)"
        :color="barColors[index % barColors.length]"
      />
      <p class="text-grey"  style="width: 15%;">{{ category.name }}</p>
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
    this.fetchQuedadas().then(() => {
      this.fetchCategories()
    })
  },
  methods: {
    // Método para llamar a la API y obtener las categorías
    fetchCategories () {
      this.$api
        .get('categories')
        .then(response => {
          this.categories = response
        })
        .catch(error => {
          console.error('Error al obtener categorías:', error)
        })
    },
    // Método para llamar a la API y obtener las quedadas
    async fetchQuedadas () {
      try {
        this.$api.get('all_quedadas_admin').then(res => {
          this.quedadas = res
        })
      } catch (error) {
        console.error('Error al obtener quedadas:', error)
      }
    },
    // Método para obtener una quedada por su ID
    getQuedadaById (quedadaId) {
      return this.quedadas.find(quedada => quedada._id === quedadaId)
    },
    // Método para calcular el porcentaje de quedadas en una categoría específica
    calculateCategoryPercentage (categoryId) {
      const quedadasInCategory = this.quedadas.filter(
        quedada => quedada.category === categoryId
      )
      const totalQuedadas = this.quedadas.length
      const quedadasCount = quedadasInCategory.length

      //  Control de consola para depuración
      console.log('Quedadas en la categoría:', quedadasInCategory)
      // bien  console.log('Total de quedadas:', totalQuedadas)
      console.log('Cantidad de quedadas en la categoría:', quedadasCount)

      // Si no hay quedadas en la categoría o en total, el porcentaje es 0
      if (totalQuedadas === 0 || quedadasCount === 0) {
        return 0
      }

      // Calcula el porcentaje y asegúrate de que esté entre 0 y 1
      let percentage = quedadasCount / totalQuedadas
      percentage = Math.min(1, Math.max(0, percentage))

      // Control de consola para el porcentaje calculado
      // console.log('Porcentaje calculado:', percentage)

      return percentage
    }
  }
}
</script>

<style>
.linear_category {
  display:flex;
  gap: 20px
}

</style>
