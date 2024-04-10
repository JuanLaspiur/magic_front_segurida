<template>
  <div>
    <h5>Crear Insignia</h5>
    <q-form @submit="submitInsignia">
      <div style="width: 500px">
        <q-input
          v-model="insignia.nombre"
          label="Nombre de la Insignia"
          required
        />

        <q-input
          v-model="insignia.descripcion"
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
        nombre: '',
        descripcion: '',
        imagen: null
      },
      imageUrl: null
    }
  },
  methods: {
    submitInsignia () {
      // Implementa la lógica para enviar los datos de la insignia (por ejemplo, a una API)
      console.log('Insignia creada:', this.insignia)
      // Limpia el formulario
      this.insignia = {
        nombre: '',
        descripcion: '',
        imagen: null
      }
      this.imageUrl = null
    },
    handleImageUpload (event) {
      const file = event.target.files[0]
      if (file) {
        this.insignia.imagen = file
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
