<template>
  <div class="container">
    <div class="colum_2 ">
      <div v-if="solicitudes.length" class="q-mt-lg" style="margin-bottom: 50px">
        <!-- <div v-for="(item, index) of solicitudes" :key="index" class="q-px-md q-mb-lg">
          <q-card style="border-radius: 10px; width: 100%;">
                <q-img :src="baseuQuedada + item._id" style="height: 130px" @click="$router.push('/quedada/' + item._id)"/>
                <div class="text-primary text-subtitle1 text-right q-pr-xs">{{item.dateTime}}</div>
                <q-card-section class="row items-start justify-between q-pa-none">
                  <div class="col-4 column items-center q-px-xs q-pb-xs">
                    <q-avatar size="70px" @click="$router.push('/muro_usuario/' + item.user_id)">
                      <q-img :src="baseuPerfil + item.user_id" class="full-height"/>
                      <div class="absolute-top" style="margin-left: -10px">
                        <q-avatar size="30px" class="">
                          <q-img :src="item.animal_img ? 'animales/' + item.animal_img : ''" style="border-radius: 100%; height: 100%"/>
                        </q-avatar>
                      </div>
                    </q-avatar>
                    <div class="text-center text-grey-8 text-caption ellipsis" style="width:100%">{{item.userInfo.name}} {{item.userInfo.last_name}}</div>
                  </div>
                  <div class="col-8 q-pr-xs column items-between">
                    <div class="text-grey-8 text-bold" @click="$router.push('/quedada/' + item._id)">{{item.name}}</div>
                    <div class="text-grey-7 text-caption q-mb-md ellipsis-3-lines" @click="$router.push('/quedada/' + item._id)">{{item.description}}</div>
                    <div class="row no-wrap justify-between items-center q-pb-sm">
                      <div>
                        <q-btn no-caps dense color="primary" size="0.9em" @click="asistir(item, true)">
                          <div class="row items-center no-wrap">
                            <q-icon left name="thumb_up_off_alt" />
                            <div class="text-center">
                              Asistiré
                            </div>
                          </div>
                        </q-btn>
                      </div>
                      <div class="text-grey-8 text-caption q-pl-xs"><b>{{item.privacy}} participantes</b> {{item.limit}}</div>
                    </div>
                  </div>
                </q-card-section>
          </q-card>
        </div> -->
        <div v-for="(item, index) of solicitudes" :key="index" class="q-px-md q-mb-lg">
            <q-card style=" border-radius: 10px; width: 100%;">
              <q-img :src="baseuQuedada + item._id" style="height: 130px" @click="$router.push('/quedada/' + item._id)"/>
              <q-card-section class="row items-start justify-between q-pa-none q-pt-xs">
                <div class="col-3 column items-center q-px-xs q-pb-xs">
                  <q-avatar size="70px" @click="$router.push('/muro_usuario/' + item.user_id)">
                    <q-img :src="baseuPerfil + item.user_id" class="full-height"/>
                  </q-avatar>
                  <div class="text-center text-grey-8 text-caption ellipsis" style="width:100%">{{item.userInfo.name}} {{item.userInfo.last_name}}</div>
                </div>
                <div style="height: 105px" class="col-9 q-pr-xs column items-between justify-between ">
                  <div>
                    <div class="text-primary text-bold pointer" @click="$router.push('/quedada/' + item._id)">{{item.name.length > 32 ? item.name.substring(0,32) + '...' : item.name}}</div>
                    <div class="text-primary"><b>Fecha: </b>{{item.dateTime.charAt(0).toUpperCase() + item.dateTime.slice(1)}}</div>
                    <div class="col-9 q-pr-xs row items-center justify-between ">
                      <div class="text-primary col-6"><b>Edad: </b>{{ageMath(item.userInfo.birthdate)}}</div>
                      <div v-if="item.asistentes.length === item.limit" class="text-primary col-5">
                        <b>Completado</b>
                      </div>
                      <div v-else class="text-primary col-6">
                        <b>Asistentes :</b> {{ item.asistentes.length }}
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap justify-between items-center q-pb-sm">
                    <div>
                      <q-btn no-caps dense color="primary" size="0.9em" @click="asistir(item, true)"
                      v-if="item.asistentes.length < item.limit && !item.asistentes.find(v => v.user_id === user._id)">
                        <div class="row items-center no-wrap">
                          <q-icon left name="thumb_up_off_alt" />
                          <div class="text-center">
                            Asistiré
                          </div>
                        </div>
                      </q-btn>
                    </div>
                    <div class="text-grey-8 text-caption q-pl-xs"><b>Límite de personas</b> {{item.limit}}</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
        </div>
      </div>
      <div v-else class="text-center q-py-lg">No hay solicitudes</div>
    </div>
  </div>
</template>

<script>
import env from '../../env'
import moment from 'moment'
export default {
  data () {
    return {
      baseuPerfil: '',
      baseuQuedada: '',
      solicitudes: [],
      user: {}
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.getSolicitudes()
  },
  methods: {
    getSolicitudes () {
      this.$q.loading.show({
        message: 'Cargando datos...'
      })
      this.$api.get('solicitudes').then(v => {
        if (v) {
          this.solicitudes = v
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    asistir (data, bool) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas asistir a este evento?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.post('asistir/' + data._id, { asistencia: bool }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Podras ver tus quedadas en el modulo de Asistidos',
              color: 'positive'
            })
            this.getSolicitudes()
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    ageMath (date) {
      return moment().diff(moment(date), 'years')
    },
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user = res
        }
      })
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
