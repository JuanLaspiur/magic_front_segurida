<template>
  <div class="container">
    <div class="colum_2">
      <q-list v-if="seguidos.length" class="q-py-sm full-width">
        <div v-for="(item, index) of seguidos" :key="index" class="q-mb-sm" >
          <q-item clickable>
              <q-item-section avatar @click="$router.push('/muro_usuario/' + item.seguido)">
                <q-avatar size="50px">
                  <q-img :src="baseuPerfil + item.seguido" class="full-height"/>
                </q-avatar>
              </q-item-section>

              <q-item-section @click="user_id !== item.seguido ? $router.push('/muro_usuario/' + item.seguido) : $router.push('/muro_usuario')">
                <q-item-label class="text-subtitle1 text-bold ellipsis-2-lines">{{item.seguidoInfo.name}} {{item.seguidoInfo.last_name}}</q-item-label>
                <q-item-label class="text-grey-7 ellipsis"><b>{{item.seguidoInfo.age}}</b> años - de <b>{{item.seguidoInfo.city_name}}</b></q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn v-if="user_id !== item.seguido" no-caps dense label="Seguido" text-color="white" color="green" class="q-px-sm"
                @click="seguir(item)"/>
              </q-item-section>
          </q-item>
        </div>
      </q-list>
      <div v-else class="text-center q-py-md">Aún no hay usuarios</div>
    </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseuPerfil: '',
      user_id: '',
      seguidos: []
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.getUser()
    this.getSeguidos(this.$route.params.id)
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user_id = res._id
        }
      })
    },
    async getSeguidos (id) {
      this.$q.loading.show({
        message: 'Buscando seguidos...'
      })
      this.$api.get('seguidores_seguidos/2/' + id).then(res => {
        if (res) {
          this.seguidos = res
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    async seguir (item) {
      this.$q.dialog({
        title: 'Confirma',
        message: `¿Seguro deseas dejar de seguir a ${item.seguidoInfo.name + ' ' + item.seguidoInfo.last_name}?`,
        cancel: { label: 'Cancelar' },
        persistent: true
      }).onOk(() => {
        const data = {
          seguido: item.seguido
        }
        this.$api.post('seguir_user', data).then(res => {
          if (res) {
            this.getSeguidos(this.$route.params.id)
          }
        })
      }).onCancel(() => {
        // cancel
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import url(../../scss/user/Notificaciones.scss);
</style>
