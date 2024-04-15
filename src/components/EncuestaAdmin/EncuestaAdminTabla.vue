<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Pregunta</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="encuesta in encuestas" :key="encuesta.id">
          <td>{{ encuesta.pregunta }}</td>
          <td>
            <button class="btn-primary" @click="verResultado(encuesta.id)">
              Ver Resultado
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: { ultimaEncuesta: {} },
  data () {
    return {
      encuestas: []
    }
  },
  mounted () {
    this.fetchObtenerListaDeEncuestas()
  },
  watch: {
    ultimaEncuesta: {
      handler: 'fetchObtenerListaDeEncuestas',
      immediate: true
    } // La coma extra aquí estaba causando el error
  },
  methods: {
    fetchObtenerListaDeEncuestas () {
      this.$api
        .get('/encuestas-admin')
        .then(response => {
          this.encuestas = response.slice(0, -1)
          console.error(' Encuesta  ' + this.encuestas)
        })
        .catch(error => {
          console.error('Error al obtener las encuestas:', error)
        })
    },
    verResultado (encuestaId) {
      // Aquí puedes agregar el código para mostrar los resultados de la encuesta con el ID 'encuestaId'
      this.$q.dialog({
        title: 'Resultados de la encuesta',
        message: `Mostrar resultados de la encuesta ${encuestaId}`,
        color: 'primary'
        // Puedes reemplazar este mensaje con tu lógica real para mostrar los resultados
      })
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
  background-color: #4caf50;
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
  background-color: #45a049;
}
</style>
