<template>
  <div>
    <!-- Botón para abrir el modal -->
    <q-btn
      @click="abrirModalEdicion(category)"
      label="Editar Categoría"
      color="primary"
      class="margen"
    />

    <!-- Modal de edición -->
    <q-dialog v-model="showEditModal">
      <q-card>
        <q-card-section>
          <h4>Editar Categoría</h4>
          <q-form @submit.prevent="guardarCambios">
            <q-input
              v-model="editedCategory.name"
              label="Nombre"
              class="margen"
            />
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
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showEditModal: false,
      editedCategory: {
        _id: '', // Este será el ID de la categoría que se está editando
        name: '', // Nombre de la categoría
        description: '' // Descripción de la categoría
      }
    }
  },
  methods: {
    abrirModalEdicion (category) {
      this.editedCategory = { ...category }
      this.showEditModal = true
    },
    async guardarCambios () {
      try {
        const response = await this.$api.put(
          `categories/${this.editedCategory._id}`,
          {
            name: this.editedCategory.name,
            description: this.editedCategory.description
          }
        )
        console.log('Categoría actualizada:', response.data)
        this.showEditModal = false // Cerrar el modal después de guardar los cambios
      } catch (error) {
        console.error('Error al actualizar la categoría:', error)
      }
    }
  }
}
</script>

<style scoped>
.margen {
  margin: 20px 0;
}
</style>
