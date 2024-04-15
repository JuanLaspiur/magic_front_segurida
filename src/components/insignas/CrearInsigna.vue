<template>
  <div>
    <h5>Crear Insignia</h5>
    <q-form @submit.prevent="submitInsigna">
      <div style="width: 500px">
        <q-input
          v-model="insignia.name"
          label="Nombre de la Insignia"
          required
        />

        <q-input
          v-model="insignia.description"
          label="Descripción"
          type="textarea"
          required
        />

        <!-- Agregamos un id al input de archivo -->
        <div style="width: 100%; margin: 15px 0">
          <input
            type="file"
            id="fileInput"
            @change="handleImageUpload"
            accept="image/*"
            style="display: none"
          />
          <label for="fileInput" class="q-btn">Seleccionar Archivo</label>
        </div>

        <div>
          <q-avatar style="margin-right: 10px">
            <img v-if="imageUrl" :src="imageUrl" alt="Imagen de Insignia" />
          </q-avatar>
        </div>
        <q-btn
          type="submit"
          color="primary"
          label="Crear Insignia"
          style="margin-top: 50px"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      insignia: {
        name: '',
        description: '',
        image: null
      },
      imageUrl: null
    }
  },
  methods: {
    async submitInsigna () {
      // oqirenbiu
      try {
        const formData = new FormData()
        formData.append('name', this.insignia.name)
        formData.append('description', this.insignia.description)

        await this.$api.post('/insignas', formData)
        await this.submitImagenInsigna()
        this.imageUrl = null
      } catch (error) {
        console.error('Error al crear la insignia:', error)
      }
    },
    async submitImagenInsigna () {
      try {
        const formData = new FormData()
        formData.append('files', this.insignia.image)

        await this.$api.put('cargarImagen', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        // Limpiar el formulario
        this.insignia = {
          name: '',
          description: '',
          image: null
        }
        this.imageUrl = null

        // Mostrar notificación de éxito
        this.$q.notify({
          message: 'Insignia creada correctamente',
          color: 'positive'
        })
      } catch (error) {
        console.error('Error al crear la insignia:', error)
        // Mostrar notificación de error
        this.$q.notify({
          message: 'Error al crear la insignia',
          color: 'negative'
        })
      }
    },
    handleImageUpload (event) {
      const file = event.target.files[0]
      if (file) {
        this.insignia.image = file
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          this.imageUrl = e.target.result
        }
      } else {
        console.error('No selecciono ningun archivo ')
      }
    }
  }
}
</script>
