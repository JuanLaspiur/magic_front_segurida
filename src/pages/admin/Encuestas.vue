/* Comentarios: Verificar el correcto funcionamiento */
<template>
  <div class="container-fluid" style="padding: 80px">
    <div class="row justify-content-center">
      <!-- Tarjeta para crear encuesta -->
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title mb-0">Crear Encuesta</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitEncuesta">
              <div class="mb-3">
                <q-input
                  outlined
                  v-model="pregunta"
                  label="Pregunta"
                  dense
                  required
                />
              </div>
              <div class="mb-3">
                <q-input
                  outlined
                  v-model="cantidadOpciones"
                  label="Cantidad de Opciones"
                  type="number"
                  dense
                  @input="addInputs"
                  required
                />
              </div>
              <div
                v-for="(opcion, index) in opciones"
                :key="index"
                class="mb-3"
              >
                <q-input
                  outlined
                  v-model="opciones[index]"
                  :label="'Opción ' + (index + 1)"
                  dense
                  required
                />
              </div>
              <div class="mb-3" style="text-align: center">
                <q-btn type="submit" color="primary" label="Crear Encuesta" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- Tarjeta para mostrar encuesta actual -->
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title mb-0">Encuesta Actual</h5>
          </div>
          <div class="card-body">
            <!-- Aquí puedes mostrar la encuesta actual -->
            <p>Encuesta actual: {{ ultimaEncuesta.pregunta }}</p>
            <ul>
              <li
                v-for="(opcion, index) in opcionesUltimaEncuesta"
                :key="index"
              >
                {{ opcion.texto }} total votos:
                {{ opcion.usuario_ids ? contarObjetos (opcion.usuario_ids) : 0 }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pregunta: '',
      cantidadOpciones: 0,
      opciones: [],
      ultimaEncuesta: [],
      opcionesUltimaEncuesta: []
    }
  },
  methods: {
    addInputs () {
      this.opciones = Array.from(
        { length: parseInt(this.cantidadOpciones) },
        () => ''
      )
    },
    submitEncuesta () {
      this.$api
        .post('/encuestas-admin', {
          pregunta: this.pregunta,
          opciones: this.opciones
        })
        .then(response => {
          console.log('Encuesta enviada:', response.data)
          this.obtenerUltimaEncuesta()
        })
        .catch(error => {
          console.error('Error al enviar la encuesta:', error)
        })
    },
    obtenerUltimaEncuesta () {
      this.$api
        .get('/encuestas-admin')
        .then(response => {
          // Asignar la última encuesta a ultimaEncuesta
          this.ultimaEncuesta =
            response.length > 0 ? response[response.length - 1] : []

          // Llamar a obtenerOpcionesEncuesta dentro de la promesa
          this.obtenerOpcionesEncuesta(this.ultimaEncuesta._id)
        })
        .catch(error => {
          console.error('Error al obtener todas las encuestas:', error)
        })
    },
    obtenerOpcionesEncuesta (enuestaId) {
      this.$api
        .get('opciones_admin123/id/' + enuestaId)
        .then(response => {
          // Asignar la última encuesta a ultimaEncuesta
          this.opcionesUltimaEncuesta = response
        })
        .catch(error => {
          console.error('Error al obtener todas las opciones:', error)
        })
    },
    contarObjetos (cadena) {
      // Eliminar espacios en blanco y dividir la cadena por comas
      const objetos = cadena.replace(/\s/g, '').split(',')
      // Retornar la cantidad de objetos
      return objetos.length
    }
  },
  mounted () {
    this.obtenerUltimaEncuesta()
    console.log('Opciones actuales: ' + this.ultimaEncuesta[1])
  }
}
</script>

<style scoped>
.card {
  margin-top: 50px;
}
.card-header {
  padding: 12px 16px;
}
.card-body {
  padding: 20px 16px;
}
.card-body .mb-3 {
  margin-bottom: 1rem;
}
</style>
