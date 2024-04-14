<template>
  <div>
    <h5>Crear Insignia</h5>
    <q-form @submit.prevent="submitInsignia">
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

        <q-file
          @change="handleImageUpload"
          label="Imagen de la Insignia"
          accept="image/*"
          class="q-file--small"
        />

        <q-img v-if="imageUrl" :src="imageUrl" alt="Imagen de Insignia" />

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
    async submitInsignia () {
      /*   try {
        const formData = new FormData()
        formData.append('name', this.insignia.name)
        formData.append('description', this.insignia.description)
        formData.append('image', this.insignia.image)

        await this.$api.post('/insignas', formData)

        // Limpia el formulario
        this.insignia = {
          name: '',
          description: '',
          image: null
        }
        this.imageUrl = null
      } catch (error) {
        console.error('Error al crear la insignia:', error)
      } */
      try {
        // Mostrar mensaje de carga
        //    this.$q.loading.show({ message: 'Subiendo insignia...' })

        // Crear una instancia de FormData
        const formData = new FormData()

        // Agregar el archivo de la insignia al FormData
        formData.append('file', this.imageUrl)

        // Hacer el POST request utilizando Axios
        const response = await this.$api.post('/uploadInsignaImg', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        // Verificar si la solicitud fue exitosa
        if (response.status === 200) {
          // Ocultar el mensaje de carga
          this.$q.loading.hide()

          // Mostrar notificación de éxito
          this.$q.notify({
            message: 'Insignia subida correctamente',
            color: 'positive'
          })

          // Realizar cualquier acción adicional, como actualizar la lista de insignias, etc.
        }
      } catch (error) {
        // Manejar errores
        console.error('Error al subir la insignia:', error)

        // Ocultar el mensaje de carga
        this.$q.loading.hide()

        // Mostrar notificación de error
        this.$q.notify({
          message: 'Error al subir la insignia',
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
      }
    }
  }
}
</script>
