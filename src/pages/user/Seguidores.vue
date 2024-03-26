<template>
  <div class="container">
    <div class="colum_2">
      <q-list v-if="seguidores.length" class="q-py-sm full-width">
        <div v-for="(item, index) of seguidores" :key="index" class="q-mb-sm" >
          <q-item clickable>
              <q-item-section avatar @click="$router.push('/muro_usuario/' + item.seguidor)">
                <q-avatar size="50px">
                  <q-img :src="baseuPerfil + item.seguidor" class="full-height"/>
                </q-avatar>
              </q-item-section>

              <q-item-section @click="user_id !== item.seguidor ? $router.push('/muro_usuario/' + item.seguidor) : $router.push('/muro_usuario')">
                <q-item-label class="text-subtitle1 text-bold ellipsis-2-lines">{{item.seguidorInfo.name}} {{item.seguidorInfo.last_name}}</q-item-label>
                <q-item-label class="text-grey-7 ellipsis"><b>{{item.seguidorInfo.age}}</b> años - de <b>{{item.seguidorInfo.city_name}}</b></q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn v-if="user_id !== item.seguidor" no-caps dense :label="item.seguidoBool ? 'Seguido' : 'Seguir'" :text-color="item.seguidoBool ? 'white' : 'primary'" :color="item.seguidoBool ? 'green' : 'blue-2'" class="q-px-sm"
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
      seguidores: []
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.getUser()
    this.getSeguidores(this.$route.params.id)
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user_id = res._id
        }
      })
    },
    async getSeguidores (id) {
      this.$q.loading.show({
        message: 'Buscando seguidores...'
      })
      this.$api.get('seguidores_seguidos/1/' + id).then(res => {
        if (res) {
          this.seguidores = res
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    async seguir (item) {
      const text = item.seguidoBool ? 'dejar de' : ''
      this.$q.dialog({
        title: 'Confirma',
        message: `¿Seguro deseas ${text} seguir a ${item.seguidorInfo.name + ' ' + item.seguidorInfo.last_name}?`,
        cancel: { label: 'Cancelar' },
        persistent: true
      }).onOk(() => {
        const data = {
          seguido: item.seguidor
        }
        this.$api.post('seguir_user', data).then(res => {
          if (res) {
            this.getSeguidores(this.$route.params.id)
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
