<template>
  <div style="margin: 75px">
    <p style="font-size: 20px; margin-bottom: 73px">
      Lista de usuarios con insignia
    </p>
    <table v-if="usuarios.length > 0" class="custom-table">
      <!-- Encabezado de la tabla -->
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo electrónico</th>
          <th>Planes creados</th>
          <th>Planes participó</th>
          <th>Tiempo conectado</th>
          <th>Tipo de Insigna</th>
          <th>Descriptcion Insigna</th>
          <th>Imagen Insignia</th>
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
          <td>{{buscarInsignaPorUsuario (user._id) && buscarInsignaPorUsuario (user._id).name}}</td>
          <td>{{buscarInsignaPorUsuario (user._id) && buscarInsignaPorUsuario (user._id).description}}</td>
          <td></td>
          <td>
            <button @click="buscarInsignaPorUsuario(user._id)">
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
      listaDeInsignias: [], // Lista de insignias
      paginaActual: 1,
      tamañoPagina: 10,
      usuariosConInsignia: []
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
    this.fetchInsignias() // Llama a la función para cargar las insignias al inicio
  },
  methods: {
    async getAllUsersWithBadge () {
      try {
        const res = await this.$api.get('all_user_admin')
        if (res.success) {
          this.usuarios = res.data
          const listaTexto = JSON.stringify(this.usuariosConInsignia)
          const ids = listaTexto.split(',')
          const usuariosCORRECTOS = []

          for (let i = 0; i < this.usuarios.length; i++) {
            for (let j = 0; j < ids.length; j++) {
              const idInsignia = ids[j].replace(/["[\]]/g, '') // Eliminar corchetes y comillas

              if (idInsignia === this.usuarios[i]._id) {
                usuariosCORRECTOS.push(this.usuarios[i])
                break // Salir del bucle interior si se encuentra una coincidencia
              }
            }
          }

          this.usuarios = usuariosCORRECTOS
        }
      } catch (error) {
        console.error('Error al obtener usuarios con insignia:', error)
      }
    },
    async fetchInsignias () {
      try {
        const res = await this.$api.get('/insignas')
        if (res) {
          this.listaDeInsignias = res
          res.forEach(insignia => {
            // Dividir el string de usuario_ids por comas y agregar los IDs a la lista
            const ids = insignia.usuario_ids.split(',').map(id => id.trim())
            this.usuariosConInsignia.push(...ids)
          })
        }
      } catch (error) {
        console.error('Error al obtener las insignias:', error)
      }
    },
    buscarInsignaPorUsuario (usuarioId) {
      // Inicializar la variable para almacenar la insignia encontrada
      let insigniaEncontrada = null
      for (const insignia of this.listaDeInsignias) {
        // Inicializar una lista para almacenar los IDs de usuario de la insignia sin corchetes y comillas
        const idsSinCorchetes = []
        // Recorrer la lista de IDs de usuario de la insignia
        for (const id of insignia.usuario_ids.split(',')) {
          // Eliminar los corchetes y comillas y agregar el ID a la lista
          idsSinCorchetes.push(id.replace(/["[\]]/g, ''))
        }

        // Verificar si el usuarioId está presente en la lista de usuario_ids de la insignia (sin corchetes ni comillas)
        if (idsSinCorchetes.includes(usuarioId)) {
          // Si se encuentra coincidencia, asignar la insignia a la variable y salir del bucle
          insigniaEncontrada = insignia
          break
        }
      }

      // Devolver la insignia encontrada (o null si no se encontró ninguna)
      return insigniaEncontrada
    },
    eliminarInsignia (userId) {
      // Aquí deberías implementar la lógica para eliminar la insignia del usuario con el ID proporcionado
      if (confirm('¿Seguro que desea eliminarle la insignia al usuario?')) {
        console.log('Boton eliminar insignia para el usuario con ID:', userId)
        // Lógica para eliminar la insignia
      }
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
