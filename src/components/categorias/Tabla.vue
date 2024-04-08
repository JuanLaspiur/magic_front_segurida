<template>
  <div>
    <h6>Lista de categorías</h6>
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
              style="font-size: 24px; cursor: pointer; margin-right: 10px"
              @click="abrirModal(category._id)"
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
    <!-- Modal de edición -->
    <div v-if="showEditModal" class="p-4">
      <h4>Editar Categoría</h4>
      <q-input v-model="editedCategory.id" label="id" class="margen" />
      <q-input v-model="editedCategory.name" label="Nombre" class="margen" />
      <q-input
        v-model="editedCategory.description"
        label="Descripción"
        class="margen"
      />
      <q-btn
        type="submit"
        label="Guardar Cambios"
        color="primary"
        class="margen"
        @click="actualizarCategoria"
      />
      <q-btn
        type="submit"
        label="Cancelar Edición"
        color="primary"
        class="margen"
        @click="cancelarEdicion"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: [],
      showEditModal: false,
      editedCategory: {
        _id: '',
        id: '',
        name: '', // Nombre de la categoría
        description: '' // Descripción de la categoría
      }
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
      const date = new Date(dateString)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return `${day}-${month}-${year}`
    },
    eliminarCategoria (categoriaId) {
      // Mostrar un cuadro de diálogo de confirmación
      if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
        this.$api
          .delete(`categories/${categoriaId}`)
          .then(() => {
            this.fetchCategorias()
            alert('Categoría eliminada con éxito')
          })
          .catch(error => {
            console.error('Error al eliminar la categoría:', error)
          })
      } else {
        console.log('Eliminación cancelada por el usuario')
      }
    },
    buscarCategoriaPorId (categoriaId) {
      const categoriaEncontrada = this.categories.find(
        categoria => categoria._id === categoriaId
      )
      if (categoriaEncontrada) {
        return categoriaEncontrada
      } else {
        alert('No se encontró la categoría con el ID especificado')
        return null
      }
    },
    abrirModal (categoriaId) {
      const categoria = this.buscarCategoriaPorId(categoriaId)
      if (categoria) {
        // Carga los valores de la categoría
        this.editedCategory._id = categoria._id
        this.editedCategory.id = categoria.id
        this.editedCategory.name = categoria.name
        this.editedCategory.description = categoria.description
        this.showEditModal = true
      }
    },
    actualizarCategoria () {
      this.$api
        .put(`categories/${this.editedCategory._id}`, {
          name: this.editedCategory.name,
          description: this.editedCategory.description
        })
        .then(() => {
          // Actualiza la lista de categorías después de la actualización
          this.fetchCategorias()
          alert('Categoría actualizada con éxito')
          // Cierra el modal
          this.showEditModal = false
        })
        .catch(error => {
          console.error('Error al actualizar la categoría:', error)
        })
    },
    cancelarEdicion () {
      this.editedCategory._id = ''
      this.editedCategory.id = ''
      this.editedCategory.name = ''
      this.editedCategory.description = ''
      this.showEditModal = false
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
.margen{
  margin: 10px 20px;
}
</style>
