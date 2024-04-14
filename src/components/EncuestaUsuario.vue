<template>
  <q-card
    style="padding: 0px 20px 10px 20px; border-radius: 5px"
    v-if="ultimaEncuesta"
  >
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
            style="cursor: pointer"
          />
          <label :for="'opcion_' + index" style="cursor: pointer">{{
            opcion.texto
          }}</label>
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
    ultimaEncuesta: {
      type: [Array, Object, String, Number, Boolean],
      default: () => []
    },
    user: {
      type: [Array, Object, String, Number, Boolean],
      default: Object
    }
  },
  data () {
    return {
      opcionesUltimaEncuesta: [],
      opcionSeleccionada: null
    }
  },
  watch: {
    ultimaEncuesta: {
      handler: 'obtenerOpcionesEncuesta',
      immediate: true
    },
    user: {
      handler: 'remontarComponente',
      immediate: true
    }
  },
  methods: {
    remontarComponente () {
      // Incrementamos la clave del componente para forzar su remontaje
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },
    actualizarSeleccion (index) {
      // Desmarcar todas las opciones excepto la seleccionada
      this.opcionesUltimaEncuesta.forEach((opcion, i) => {
        opcion.seleccionada = i === index
      })
    },
    enviarEncuesta (opcionSeleccionada) {
      if (this.isRespondioTrue()) {
        console.log('Respondió ')
      } else {
        console.log('No resondio')
      }

      const data = {
        opcionId: opcionSeleccionada,
        usuarioId: this.user._id
      }
      console.log(
        'Descompocicion de data opciónId  ' +
          data.opcionId +
          '   usuarioId   ' +
          data.usuarioId
      )
      this.$api
        .post('opciones_admin123/votar', data)
        .then(response => {
          this.opcionesUltimaEncuesta = response
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
    obtenerOpcionesEncuesta () {
      const nuevaEncuesta = this.ultimaEncuesta
      if (nuevaEncuesta && Object.keys(nuevaEncuesta).length !== 0) {
        // Verificar que ultimaEncuesta no esté vacío
        this.$api
          .get('opciones_admin123/id/' + nuevaEncuesta._id)
          .then(response => {
            this.opcionesUltimaEncuesta = response
            console.log('Opciones de la encuesta:', this.opcionesUltimaEncuesta)
          })
          .catch(error => {
            console.error('Error al obtener todas las opciones:', error)
          })
      }
    },
    isRespondioTrue () {
      if (!this.opcionesUltimaEncuesta) {
        return false
      }

      for (const option of this.opcionesUltimaEncuesta) {
        if (option.usuario_ids) {
          // sí no es undefined, entonces..
          const usuarioIds = option.usuario_ids
            .replace(/["[\]]/g, '')
            .split(',')
          console.error('Usuarios filtrados  ' + this.usuario._id)
          if (usuarioIds.includes(this.user_id)) {
            console.log('Respuesta es true')
            return true
          }
        }
      }
    }
  }
}
</script>
