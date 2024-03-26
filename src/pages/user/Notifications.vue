<template>
  <div class="container">
    <div class="colum_2">
      <q-list v-if="notifications.length" class="q-pa-sm">
        <div v-for="(item, index) of notifications" :key="index" class="q-mb-md" >
          <q-item clickable :class="item.visto ? 'bg-blue-2' : 'bg-red-1'" style="border-radius:15px"
            @click="irNotif(item)">
              <q-item-section avatar>
                <q-avatar size="50px">
                  <q-img v-if="item.perfil || item.quedada" :src="item.perfil ? baseuPerfil + item.perfil : baseuQuedada + item.quedada" class="full-height"/>
                  <q-icon v-if="item.icon" :name="item.icon" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label v-if="item.visto" class="text-subtitle1 text-bold ellipsis-2-lines">
                  Mensaje Leido
                </q-item-label>
              <q-item-label v-else class="text-subtitle1 text-bold ellipsis-2-lines">
                {{item.title}}
                <q-icon
                  name="error"
                  color="red-7"
                  />
              </q-item-label>
                <q-item-label caption class="text-grey-9 text-italic">{{item.date}}</q-item-label>
                <q-item-label caption class="text-grey-9">{{item.message}}</q-item-label>
              </q-item-section>

              <q-item-section side>
                </q-item-section>
          </q-item>
        </div>
      </q-list>
      <div v-else class="text-center q-py-lg">No hay notificaciones</div>
    </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseuPerfil: '',
      baseuQuedada: '',
      notifications: []
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.getNotifications()
  },
  methods: {
    getNotifications () {
      this.$q.loading.show({
        message: 'Cargando datos...'
      })
      this.$api.get('notifications').then(v => {
        if (v) {
          this.notifications = v
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    irNotif (data) {
      if (data.visto) {
        this.$router.push(data.ruta)
      } else {
        this.$api.put('see_notif/' + data._id).then(res => {
          if (res) {
            this.$router.push(data.ruta)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border: 3px solid $accent;
}
@import url(../../scss/user/Notificaciones.scss);
</style>
