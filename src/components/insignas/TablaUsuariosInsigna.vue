<template>
  <div style="margin: 75px">
    <p style="font-size: 20px">Lista de usuarios para agregar insigna</p>

    <!-- Input de búsqueda -->
    <q-input
      style="width: 500px; margin: 20px 0"
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
            <button @click="openModal">Agregar insigna</button>
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

    <!-- Modal -->
    <q-dialog ref="modal" v-model="showModal" persistent>
      <q-card>
        <q-card-section class="row items-center justify-center">
          <h4>Selecciona una Insignia</h4>
        </q-card-section>

        <!-- Lista de Insignias -->
        <q-list bordered separator>
          <q-item
            v-for="(insignia, index) in insignias"
            :key="index"
            clickable
            @click="selectInsignia(insignia)"
          >
            <q-item-section avatar>
              <q-avatar>
                <img :src="insignia.image" alt="Insignia" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ insignia.name }}</q-item-label>
              <q-item-label caption>{{ insignia.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <!-- Botón para cerrar el modal -->
        <q-card-actions align="right">
          <q-btn color="primary" label="Cerrar" @click="closeModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showModal: false,
      usuarios: [],
      filtroCorreo: '', // Variable para filtrar por correo electrónico
      paginaActual: 1,
      tamañoPagina: 10,
      insignias: [
        {
          name: 'Insignia 1',
          description: 'Descripción de la Insignia 1',
          image: '/assets/insignia1.png' // Ruta de la imagen de la insignia 1
        },
        {
          name: 'Insignia 2',
          description: 'Descripción de la Insignia 2',
          image: '/assets/insignia2.png' // Ruta de la imagen de la insignia 2
        }
        // Agrega más insignias según sea necesario
      ],
      selectedInsignia: null
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
      console.log('Boton agregar insignia para el usuario con ID:', userId)
    },
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    selectInsignia (insignia) {
      // Aquí puedes manejar la lógica cuando se selecciona una insignia
      this.selectedInsignia = insignia
      console.log('Insignia seleccionada:', insignia)
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
