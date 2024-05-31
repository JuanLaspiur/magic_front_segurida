<template>
  <q-card
    class="encuesta-card"
    v-if="ultimaEncuesta"
  >
    <q-card-section class="encuesta-section">
      <img src="../assets/logoEncuesta.png" style="margin: -50px auto; width: 80px; height: 80px;"/>
      <!-- Contenido de la encuesta -->
      <h5 class="encuesta-title">
        {{ ultimaEncuesta.pregunta }}
      </h5>

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
    </q-card-section>
    <q-card-actions class="encuesta-actions">
      <q-btn
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
        return
      }

      const data = {
        opcionId: opcionSeleccionada,
        usuarioId: this.user._id
      }

      this.$api
        .post('opciones_admin123/votar', data)
        .then(response => {
          this.opcionesUltimaEncuesta = response
          this.$q.notify({
            message: 'Encuesta enviada. Gracias por responder',
            color: 'positive'
          })
          this.mostrarComponente = false
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
/* Estilos para la tarjeta de la encuesta */
.encuesta-card {
  width: 250px;
  padding: 0px 20px 10px 20px;
  border-radius: 15px;
  background-color: #fafafa;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  flex-direction: column;

}

/* Estilos para la sección de la encuesta */
.encuesta-section {
  padding: 20px;
}

/* Estilos para el título de la encuesta */
.encuesta-title {
  margin-bottom: 20px;
  color: #f44336;
  font-size: 20px;
  font-weight: bold;
  font-family: 'Arial', sans-serif; /* Cambiar la fuente a Arial */
}

/* Estilos para el contenedor de opciones */
.opciones-container {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  border-radius: 10px;

}

/* Estilos para cada opción */
.opcion-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* Estilos para el input de opción */
.opcion-input {
  cursor: pointer;
  margin-right: 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 2px solid #f44336;
  outline: none;
}

/* Estilos para la etiqueta de opción */
.opcion-label {
  cursor: pointer;
  font-size: 16px;
  color: #333;
  color: #b32b21;
}

/* Estilos cuando el botón de radio está seleccionado */
.opcion-input:checked {
  background-color: #f44336;
}

/* Estilos para los botones de acción */
.encuesta-actions {
  justify-content: center;
}

/* Estilos para el botón de enviar */
.custom-btn {
  font-size: 13px;
  padding: 4px 11px;
  border-radius: 25px;
  text-transform: uppercase;
  background-color: #f44336;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

/* Estilos adicionales cuando el botón está en estado hover (sobre) */
.custom-btn:hover {
  background-color: #d32f2f;
}
</style>
