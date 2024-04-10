<template>
  <div style="margin: 75px">
    <p style="font-size: 20px">Lista de usuarios con insignia</p>

    <table v-if="usuarios.length > 0" class="custom-table">
      <!-- Encabezado de la tabla -->
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo electrónico</th>
          <th>Planes creados</th>
          <th>Planes participó</th>
          <th>Tiempo conectado</th>
          <th>Eliminar insignia</th>
        </tr>
      </thead>
      <!-- Cuerpo de la tabla -->
      <tbody>
        <tr v-for="user in usuariosPaginados" :key="user._id">
          <td>{{ user.name }} {{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.creados ? user.creados : 0 }}</td>
          <td>{{ user.participo ? user.participo : 0 }}</td>
          <td>{{ user.tiempoWeb }}</td>
          <td>
            <button @click="eliminarInsignia(user._id)">
              Eliminar insignia
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>No hay usuarios con insignia</div>

    <!-- Botones de paginación -->
    <div style="margin-top: 50px">
      <q-btn
        @click="paginaActual--"
        :disable="paginaActual === 1"
        label="Anterior"
        color="primary"
      />
      <span style="margin: 0 50px"
        >Página {{ paginaActual }} de {{ totalPaginas }}</span
      >
      <q-btn
        @click="paginaActual++"
        :disable="paginaActual === totalPaginas"
        label="Siguiente"
        color="primary"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usuarios: [], // Lista de usuarios con insignia
      paginaActual: 1,
      tamañoPagina: 10
    }
  },
  computed: {
    totalPaginas () {
      return Math.ceil(this.usuarios.length / this.tamañoPagina)
    },
    usuariosPaginados () {
      const indiceInicial = (this.paginaActual - 1) * this.tamañoPagina
      const indiceFinal = this.paginaActual * this.tamañoPagina
      return this.usuarios.slice(indiceInicial, indiceFinal)
    }
  },
  created () {
    this.getAllUsersWithBadge()
  },
  methods: {
    getAllUsersWithBadge () {
      // Llama a la API para obtener los usuarios con insignia
      this.$api
        .get('all_user_admin')
        .then(res => {
          if (res.success) {
            this.usuarios = res.data.filter(user => user.deleted !== true)
          }
        })
        .catch(error => {
          console.error('Error al obtener usuarios con insignia:', error)
        })
    },
    eliminarInsignia (userId) {
      console.log('Boton eliminar insignia para el usuario con ID:', userId)
      // Aquí deberías implementar la lógica para eliminar la insignia del usuario con el ID proporcionado
    }
  }
}
</script>

<style>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.custom-table th {
  background-color: #f2f2f2;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
