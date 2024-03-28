<template>
  <div>
    <q-card class="width margen">
      <q-card-section>
        <h6>Crear Nueva Categoría</h6>
        <q-form @submit.prevent="crearCategoria">
          <q-input
            outlined
            v-model.number="id"
            label="ID"
            type="number"
            class="margen"
          />
          <q-input outlined v-model="nombre" label="Nombre" class="margen" />
          <q-input
            outlined
            v-model="descripcion"
            label="Descripción"
            class="margen"
          />
          <q-btn
            type="submit"
            label="Crear Categoría"
            color="primary"
            class="margen"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: null,
      nombre: '',
      descripcion: '',
      categories: []
    }
  },
  methods: {
    async crearCategoria () {
      // Verificar si existe una categoría con el mismo ID
      const categoriaExistente = this.categories.find(cat => cat.id === this.id)
      if (categoriaExistente) {
        alert(
          'Ya existe una categoría con el mismo ID. No se puede crear una categoría duplicada.'
        )
        return
      }

      try {
        const response = await this.$api.post('categories', {
          id: this.id,
          name: this.nombre,
          description: this.descripcion
        })
        console.log('Categoría creada:', response.data)
        // Puedes manejar la respuesta de la API aquí, como redirigir al usuario a otra página o mostrar un mensaje de éxito.
      } catch (error) {
        console.error('Error al crear la categoría:', error)
        // Puedes mostrar un mensaje de error al usuario aquí.
      }
    },
    fetchCategorias () {
      this.$api
        .get('categories')
        .then(res => {
          this.categories = res
        })
        .catch(error => {
          alert('Error al obtener categorias')
          console.error('Error al obtener categorías:', error)
        })
    }
  },
  created () {
    this.fetchCategorias()
  }
}
</script>

<style>
.width {
  width: 700px;
}
.margen {
  margin: 20px 0px;
}
</style>
