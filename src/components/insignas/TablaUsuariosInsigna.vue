<template>
  <div style="margin: 75px">
    <p style="font-size: 20px">Lista de usuarios para agregar insigna</p>

    <!-- Input de búsqueda -->
    <q-input
    style="width:500px; margin: 20px 0;"
      v-model="filtroCorreo"
      label="Buscar por correo electrónico"
      outlined
      dense
      clearable
    />

    <table v-if="usuarios.length > 0" class="custom-table">
      <!-- Encabezado de la tabla -->
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo electrónico</th>
          <th>Planes creados</th>
          <th>Planes participó</th>
          <th>Tiempo conectado</th>
          <th>Agregar insigna</th>
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
            <button @click="agregarInsigna(user._id)">Agregar insigna</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Cargando usuarios...</div>

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
      usuarios: [],
      filtroCorreo: '', // Variable para filtrar por correo electrónico
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
      return this.usuarios
        .filter(user => {
          // Filtrar por correo electrónico si hay un filtro aplicado
          if (this.filtroCorreo.trim() === '') {
            return true // Si no hay filtro, mostrar todos los usuarios
          } else {
            return user.email
              .toLowerCase()
              .includes(this.filtroCorreo.toLowerCase())
          }
        })
        .slice(indiceInicial, indiceFinal)
    }
  },
  created () {
    this.getAllUsers()
  },
  methods: {
    getAllUsers () {
      this.$api
        .get('all_user_admin')
        .then(res => {
          if (res.success) {
            this.usuarios = res.data.filter(user => user.deleted !== true)
          }
        })
        .catch(error => {
          console.error('Error al obtener usuarios:', error)
        })
    },
    agregarInsigna (userId) {
      console.log('Boton agregar insigna para el usuario con ID:', userId)
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
