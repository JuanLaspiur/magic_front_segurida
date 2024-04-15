<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Pregunta</th>
          <th>Fecha de creacion</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="encuesta in encuestas" :key="encuesta._id">
          <td>{{ encuesta.pregunta }}</td>
          <td>{{ convertirFecha(encuesta.created_at) }}</td>
          <td>
            <button class="btn-primary" @click="verResultado(encuesta)">
              Ver Resultado
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para mostrar los resultados -->
    <q-dialog v-model="mostrarModal" persistent>
      <q-card style="min-width: 300px;">
        <q-card-section >
          <!-- Aquí mostramos la pregunta y las opciones de la encuesta seleccionada -->
          <h6>{{ preguntaSeleccionada }}</h6>
          <ul>
            <li
              v-for="opcion in opcionesEncuestaSeleccionada"
              :key="opcion._id"
            >
              {{ opcion.texto }}
              {{ opcion.usuario_ids ? contarObjetos(opcion.usuario_ids) : 0 }}
            </li>
          </ul>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="primary" @click="cerrarModal" style="margin: 10px;"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: { ultimaEncuesta: {} },
  data () {
    return {
      encuestas: [],
      opcionesEncuestaSeleccionada: [],
      mostrarModal: false,
      preguntaSeleccionada: '',
      opcionesSeleccionadas: []
    }
  },
  mounted () {
    this.fetchObtenerListaDeEncuestas()
  },
  watch: {
    ultimaEncuesta: {
      handler: 'fetchObtenerListaDeEncuestas',
      immediate: true
    }
  },
  methods: {
    fetchObtenerListaDeEncuestas () {
      this.$api
        .get('/encuestas-admin')
        .then(response => {
          this.encuestas = response.slice(0, -1)
        })
        .catch(error => {
          console.error('Error al obtener las encuestas:', error)
        })
    },
    fetchObtenerOpcionesEncuesta (enuestaId) {
      this.$api
        .get('opciones_admin123/id/' + enuestaId)
        .then(response => {
          this.opcionesEncuestaSeleccionada = response
          console.error(
            'Opciones de la encuesta seleccionada  ' +
              this.opcionesEncuestaSeleccionada
          )
          this.mostrarModal = true
        })
        .catch(error => {
          console.error('Error al obtener las opciones:', error)
        })
    },
    verResultado (encuesta) {
      this.preguntaSeleccionada = encuesta.pregunta
      this.fetchObtenerOpcionesEncuesta(encuesta._id)
    },
    cerrarModal () {
      this.mostrarModal = false
    },
    contarObjetos (cadena) {
      // Eliminar espacios en blanco y dividir la cadena por comas
      const objetos = cadena.replace(/\s/g, '').split(',')
      // Retornar la cantidad de objetos
      return objetos.length
    },
    convertirFecha (fechaISO) {
      const fecha = new Date(fechaISO)
      let dia = fecha.getDate()
      let mes = fecha.getMonth() + 1
      const anio = fecha.getFullYear()
      dia = dia < 10 ? '0' + dia : dia
      mes = mes < 10 ? '0' + mes : mes
      const fechaFormateada = dia + '-' + mes + '-' + anio
      return fechaFormateada
    }
  }
}
</script>

<style scoped>
.table-container {
  margin: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px 15px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f8f8f8;
}

.btn-primary {
  background-color: #0065d8;
  border: none;
  color: white;
  padding: 8px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #fe1e26;
}
</style>
