<template>
  <div class="invitacion_container">
    <q-btn
      flat
      round
      icon="arrow_back"
      class="back-button"
      @click="goBack"
      size="lg"
    />
    <q-carousel-slide :name="3" class="q-pa-md">
      <div class="text-center text-h6 q-mb-sm">Enviar invitaciones</div>
      <q-btn
        round
        flat
        icon="done"
        color="positive"
        class="absolute-top-right q-pa-sm"
        @click="actualizar(true)"
      />
      <q-separator />
      <div class="q-px-md q-py-md">
        <q-input
          v-model="filter"
          dense
          rounded
          outlined
          bg-color="grey-3"
          placeholder="Buscar usuario..."
          @input="filterFn(filter)"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <q-item class="q-mb-sm">
        <q-item-section avatar>
          <q-avatar size="60px"> </q-avatar>
        </q-item-section>
      </q-item>

      <q-list class="q-py-sm">
        <div class="text-h6">Sugerencias</div>
        <q-item v-for="(item, index) in users" :key="index" v-ripple>
          <q-item-section avatar>
            <q-avatar size="60px"> </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1 text-bold">
              {{ item.seguidoInfo.name }} {{ item.seguidoInfo.last_name }}
            </q-item-label>
            <q-item-label class="text-grey-7 ellipsis">
              <b>({{ item.seguidoInfo.age }}</b> años)
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              no-caps
              dense
              :label="
                asistentes.find(v => v.user_id === item.seguidoInfo._id)
                  ? 'Invitado'
                  : 'Invitar'
              "
              :text-color="
                asistentes.find(v => v.user_id === item.seguidoInfo._id)
                  ? 'white'
                  : 'primary'
              "
              :color="
                asistentes.find(v => v.user_id === item.seguidoInfo._id)
                  ? 'positive'
                  : 'blue-2'
              "
              class="q-px-sm"
              @click="
                invitar(
                  item.seguidoInfo._id,
                  !asistentes.find(v => v.user_id === item.seguidoInfo._id) // Y aquí también se corrigió item._id
                )
              "
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-carousel-slide>
  </div>
</template>

<script>
export default {
  data () {
    return {
      quedada: {},
      user: {},
      filter: '',
      asistentes: [],
      users: []
    }
  },
  mounted () {
    this.getUser()
  },
  computed: {
    filteredUsers () {
      if (!this.filter) return this.users
      return this.users.filter(user =>
        (user.seguidoInfo.name + ' ' + user.seguidoInfo.last_name)
          .toLowerCase()
          .includes(this.filter.toLowerCase())
      )
    }
  },
  methods: {
    invitar (id, quedadaID) {
      this.$api
        .post('invitar/' + quedadaID, {
          invitado: { user_id: id, asistencia: false, rating_id: null },
          invitar: true
        })
        .then(res => {
          if (res) {
            this.asistentes = res
          }
        })
    },
    goBack () {
      this.$router.go(-1)
    },
    getUser () {
      this.$api
        .get('user_info')
        .then(res => {
          if (res) {
            this.user = res
            this.getQuedada(this.$route.params.quedadaId)
            this.getInvitados()
          }
        })
        .catch(error => {
          console.error('Error al obtener el usuario:', error)
        })
    },
    async getQuedada (id) {
      this.$q.loading.show({
        message: 'Cargando datos...'
      })

      try {
        const res = await this.$api.get('quedada_info/' + id)
        if (res) {
          this.quedada = res
          this.asistentes = res.asistentes
        }
      } catch (error) {
        console.error('Error al obtener la quedada:', error)
      } finally {
        this.$q.loading.hide()
      }
    },
    getInvitados () {
      this.$api
        .get('seguidores_seguidos/2/' + this.user._id)
        .then(res => {
          if (res) {
            this.users = res
            console.log('Chile ' + JSON.stringify(this.users))
          }
        })
        .catch(error => {
          console.error('Error al obtener los invitados:', error)
        })
    },
    filterFn (filter) {
      this.filter = filter
    },
    actualizar (value) {
      console.log('Actualizando...', value)
      // Lógica de actualización
    }
  }
}
</script>

<style scoped>
.invitacion_container {
  padding: 3% 10%;
}
.back-button {
  display: none;
}
@media (width > 1080px) {
  .back-button {
    display: block;
    position: absolute;
    top: 10px;
    left: 10px;
    height: 60px; /* Ajustar tamaño del botón */
    width: 60px;
    z-index: 99999;
  }
}
</style>
