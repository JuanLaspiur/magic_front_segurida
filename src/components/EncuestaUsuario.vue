<template>
  <q-card style="padding: 0px 20px 10px 20px; border-radius: 5px">
    <q-card-section class="q-pa-md">
      <!-- Contenido de la encuesta -->
      <h5 style="text-align: center; margin-bottom: 20px">
        {{ ultimaEncuesta.pregunta }}
      </h5>
      <div>
        <div v-for="(opcion, index) in opcionesUltimaEncuesta" :key="index">
          <input
            type="radio"
            :id="'opcion_' + index"
            :value="opcion._id"
            v-model="opcionSeleccionada"
            @change="actualizarSeleccion(index)"
          />
          <label :for="'opcion_' + index">{{ opcion.texto }}</label>
        </div>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn
        color="primary"
        label="Enviar"
        @click="enviarEncuesta(opcionSeleccionada)"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    ultimaEncuesta: []
  },
  data () {
    return {
      opcionesUltimaEncuesta: [],
      opcionSeleccionada: null
    }
  },
  mounted () {
    this.obtenerOpcionesEncuesta(this.ultimaEncuesta._id)
  },
  methods: {
    actualizarSeleccion (index) {
      // Desmarcar todas las opciones excepto la seleccionada
      this.opcionesUltimaEncuesta.forEach((opcion, i) => {
        opcion.seleccionada = i === index
      })
    },
    enviarEncuesta (opcionSeleccionada) {
      // Lógica para enviar la encuesta
      const data = {
        opcionId: opcionSeleccionada,
        usuarioId: this.user ? this.user._id : null // Asegúrate de tener definido user o manejar el caso de usuario no definido
      }

      this.$api
        .post('opciones_admin123/votar', data)
        .then(response => {
          this.opcionesUltimaEncuesta = response.data
          this.$q.notify({
            message: 'Encuesta enviada',
            color: 'positive'
          })
        })
        .catch(error => {
          console.error('Error al enviar la encuesta:', error)
          alert('No se pudo enviar su respuesta.. intente más tarde')
        })
    },
    obtenerOpcionesEncuesta (encuestaId) {
      console.log('Entre ')
      this.$api
        .get('opciones_admin123/id/' + encuestaId)
        .then(response => {
          // Asignar la última encuesta a ultimaEncuesta
          this.opcionesUltimaEncuesta = response
          console.error(
            'Opciones de la encuesta  ' + this.opcionesUltimaEncuesta
          )
        })
        .catch(error => {
          console.error('Error al obtener todas las opciones:', error)
        })
    }
  }
}
</script>
