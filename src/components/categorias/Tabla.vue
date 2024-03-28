<template>
  <div>
    <table class="q-table">
      <thead>
        <tr class="q-table__header">
          <th class="text-left">ID</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Descripción</th>
          <th class="text-left">Creado en</th>
          <th class="text-left">Actualizado en</th>
          <th class="text-left">Acciones</th>
          <!-- Nueva columna para el ícono de eliminar -->
        </tr>
      </thead>
   <tbody>
  <tr
    v-for="category in categories.sort((a, b) => a.id - b.id)"
    :key="category._id"
    class="q-table__body"
  >
    <td class="text-left">{{ category.id }}</td>
    <td class="text-left">{{ category.name }}</td>
    <td class="text-left">{{ category.description }}</td>
    <td class="text-left">{{ formatDate(category.created_at) }}</td>
    <td class="text-left">{{ formatDate(category.updated_at) }}</td>
    <td class="text-left">
      <!-- Icono de edición -->
      <q-icon
        name="edit"
        class="text-primary"
        style="font-size: 24px; cursor: pointer; margin-right: 10px;"
        @click="editarCategoria(category)"
      />
      <!-- Icono de eliminación -->
      <q-icon
        name="delete"
        class="text-danger"
        style="font-size: 24px; cursor: pointer"
        @click="eliminarCategoria(category._id)"
      />
    </td>
  </tr>
</tbody>

    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: []
    }
  },
  created () {
    this.fetchCategorias()
  },
  methods: {
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
    },
    formatDate (dateString) {
      // Formatea la fecha en formato dd-MM-yyyy
      const date = new Date(dateString)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return `${day}-${month}-${year}`
    },
    eliminarCategoria (categoriaId) {
      // Mostrar un cuadro de diálogo de confirmación
      if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
        // Si el usuario confirma, proceder con la eliminación
        this.$api
          .delete(`categories/${categoriaId}`)
          .then(() => {
            // Una vez que la categoría se haya eliminado correctamente,
            // vuelves a cargar las categorías actualizadas
            this.fetchCategorias()
            alert('Categoría eliminada con éxito')
          })
          .catch(error => {
            console.error('Error al eliminar la categoría:', error)
            // Puedes mostrar un mensaje de error al usuario aquí
          })
      } else {
        // Si el usuario cancela, no hacer nada
        console.log('Eliminación cancelada por el usuario')
      }
    }
  }
}
</script>

<style scoped>
.q-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: #fff; /* Color de fondo de la tabla */
}

.q-table__header th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc; /* Color del borde inferior de las celdas de encabezado */
  background-color: #f0f0f0; /* Color de fondo del encabezado de la tabla */
}

.q-table__body td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #eee; /* Color del borde inferior de las celdas del cuerpo de la tabla */
}

.text-left {
  text-align: left;
}

.text-danger {
  color: red; /* Color del ícono de eliminar */
}
</style>
