<template>
  <q-card
    style="padding: 0px 20px 10px 20px; border-radius: 5px"
    v-if="ultimaEncuesta"
  >
    <q-card-section class="q-pa-md">
      <!-- Contenido de la encuesta -->
      <h5 class="text-center" style="margin-bottom: 20px; color: #0065D8">
        {{ ultimaEncuesta.pregunta }}
      </h5>

      <div>
        <div class="opciones-container">
          <div
            v-for="(opcion, index) in opcionesUltimaEncuesta"
            :key="index"
            class="opcion-item"
          >
            <input
              type="radio"
              :id="'opcion_' + index"
              :value="opcion._id"
              v-model="opcionSeleccionada"
              @change="actualizarSeleccion(index)"
              class="opcion-input"
            />
            <label :for="'opcion_' + index" class="opcion-label">{{
              opcion.texto
            }}</label>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn
        color="primary"
        label="Enviar"
        @click="enviarEncuesta(opcionSeleccionada)"
        class="custom-btn"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { Notify } from 'quasar'
export default {
  props: {
    ultimaEncuesta: {
      type: [Array, Object, String, Number, Boolean],
      default: () => []
    },
    user: {
      mostrarComponente: true,
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
    },
    mostrarComponente: {
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
        Notify.create({
          message:
            'Ya respondió. Solo es posible responder una vez. Agradecemos su participacion',
          color: 'negative' // Color rojo para indicar un mensaje de advertencia
        })
        this.remontarComponente()
        return
      }

      const data = {
        opcionId: opcionSeleccionada,
        usuarioId: this.user._id
      }

      this.$api
        .post('opciones_admin123/votar', data)
        .then(response => {
          this.$q.notify({
            message: 'Encuesta enviada. Gracias por responder',
            color: 'positive'
          })
          this.remontarComponente()
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
      if (!this.opcionesUltimaEncuesta || !this.user || !this.user._id) {
        return false // Si falta información, no se puede determinar si el usuario respondió
      }

      const usuarioId = this.user._id // ID del usuario actual

      for (const option of this.opcionesUltimaEncuesta) {
        if (option.usuario_ids) {
          // Si la cadena de usuarios existe en la opción
          const usuarioIds = option.usuario_ids
            .replace(/["[\]]/g, '') // Eliminar caracteres no deseados
            .split(',') // Dividir los IDs usando la coma
            .map(id => id.trim()) // Eliminar espacios en blanco de cada ID
          console.error('Id de los usuarios sin [Ñ[]] ni ""   ' + usuarioIds)
          if (usuarioIds.includes(usuarioId)) {
            console.log('Respuesta es true')
            return true // Si el usuario actual está en la lista de IDs, retorna true
          }
        }
      }
      return false // Si el usuario actual no se encuentra en ninguna opción, retorna false
    }
  }
}
</script>
<style>

.custom-btn {
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 20px;
  text-transform: uppercase;
}

/* Estilos adicionales cuando el botón está en estado hover (sobre) */
.custom-btn:hover {
  background-color: #0065D8;
  color: white;
}
.opciones-container {
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  border-radius: 20px;
}

.opcion-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.opcion-input {
  cursor: pointer;
  margin-right: 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #333;
  outline: none;
}

.opcion-label {
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

/* Estilos cuando el botón de radio está seleccionado */
.opcion-input:checked {
  background-color: #0065D8;
}
</style>
