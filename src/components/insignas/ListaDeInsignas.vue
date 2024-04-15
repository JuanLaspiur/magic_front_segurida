<template>
  <div>
    <h5>Lista de Insignias</h5>
    <q-list>
      <q-item v-for="insignia in insignasDeLaApi" :key="insignia.id">
        <q-avatar style="margin-right: 10px">
          <img :src="getImagenUrl(insignia.image)" alt="Imagen de Insignia" />
        </q-avatar>
        <div class="q-item-main" style="width: 390px">
          <p>{{ insignia.name }}</p>
          <p>{{ insignia.description }}</p>
        </div>
        <div class="q-item-side text-center" style="padding: 22px">
          <q-btn color="red" icon="delete" @click="confirmDelete(insignia)" />
        </div>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      insignasDeLaApi: [] // Inicializar insignasDeLaApi como un arreglo vacío
    }
  },
  methods: {
    getImagenUrl (nombreImagen) {
      if (nombreImagen) {
        console.error(nombreImagen)
        return '../../../magic_day_back-dev/storage/uploads/insignas/45d5318dfcde9463a21707bca9642628a8a3ba0d.jpg'
      }
      return ''
    },
    confirmDelete (insignia) {
      if (confirm('¿Estás seguro de que deseas eliminar esta insignia?')) {
        this.$api
          .delete(`/insignas/${insignia._id}`)
          .then(() => {
            // Eliminar la insignia de la lista local
            this.insignasDeLaApi = this.insignasDeLaApi.filter(
              item => item._id !== insignia._id
            )
          })
          .catch(error => {
            console.error('Error al eliminar la insignia:', error)
          })
      }
    },
    async fetchTraerInsignas () {
      try {
        const response = await this.$api.get('/insignas')
        this.insignasDeLaApi = response
        console.log('Llamado a la api ' + this.insignasDeLaApi)
      } catch (error) {
        console.error('Error fetching badges:', error)
      }
    }
  },
  mounted () {
    this.fetchTraerInsignas() // Llamar a fetchTraerInsignas cuando el componente se monta
  }
}
</script>
