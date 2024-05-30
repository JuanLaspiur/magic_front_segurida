<template>
  <div v-if="item" class="q-mt-lg q-mr-sm" style="width: 380px">
    <q-card v-if="width < 365" style="border-radius: 10px; width: 100%">
      <q-img
        :src="baseuQuedada + item._id"
        style="height: 130px"
        @click="navigate(item)"
      />
      <q-card-section
        class="row items-start justify-between q-pa-none q-pt-xs"
        style="height: 100px"
      >
        <div class="col-3 column items-center q-px-xs q-pb-xs q-mt-md">
          <q-avatar
            size="40px"
            @click="
              user._id === item.user_id
                ? navigate(item)
                : $router.push('/muro_usuario/' + item.user_id)
            "
          >
            <q-img :src="baseuPerfil + item.user_id" class="full-height" />
          </q-avatar>
          <div
            class="text-center text-grey-8 text-caption ellipsis q-mt-sm"
            style="width: 100%; font-size: 11px"
          >
            {{ item.userInfo.name }} {{ item.userInfo.last_name }}
          </div>
        </div>
        <div
          style="height: 100%"
          class="col-9 q-pr-xs q-pl-sm column justify-center"
        >
          <div style="height: 55px">
            <div
              class="text-primary text-bold pointer"
              @click="navigate(item)"
              style="font-size: 12px"
            >
              {{
                item.name.length > 24
                  ? item.name.substring(0, 20) + '...'
                  : item.name
              }}
            </div>
            <div class="text-primary" style="font-size: 11px">
              <b>Fecha: </b
              >{{
                item.dateTime.charAt(0).toUpperCase() +
                item.dateTime.slice(1).substring(0, 12) +
                '...'
              }}
            </div>
            <div class="col-9 q-pr-xs row items-center justify-between">
              <div class="text-primary col-6" style="font-size: 11px">
                <b>Edad: </b>{{ ageMath(item.userInfo.birthdate) }}
              </div>
              <div
                v-if="item.asistentes.length === item.limit"
                class="text-primary col-5"
                style="font-size: 11px"
              >
                <b>Completado</b>
              </div>
              <div v-else class="text-primary col-6" style="font-size: 11px">
                <b>Asistentes :</b> {{ item.asistentes.length + 1 }}
              </div>
            </div>
          </div>
          <div class="column justify-between items-start q-pb-sm">
            <div>
              <q-btn
                no-caps
                dense
                color="primary"
                size="0.6em"
                @click="asistir(item, true)"
                v-if="
                  user._id !== item.user_id &&
                  item.asistentes.length < item.limit - 1 &&
                  !item.asistentes.find(v => v.user_id === user._id) &&
                  fechaAnterior > 0
                "
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="thumb_up_off_alt" />
                  <div class="text-center" style="font-size: 8px">Asistiré</div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                color="warning"
                size="0.6em"
                v-if="
                  user._id !== item.user_id &&
                  item.asistentes.length < item.limit &&
                  !item.asistentes.find(v => v.user_id === user._id) &&
                  fechaAnterior < 0
                "
                class="no-pointer"
              >
                <div class="row items-center no-wrap">
                  <div class="text-center" style="font-size: 8px">
                    Finalizado
                  </div>
                </div>
              </q-btn>
            </div>
            <div class="text-grey-8 text-caption" style="font-size: 8px">
              <b>Límite de personas</b>
              {{
                item.limit.toString().length > 5
                  ? item.limit.toString().substring(0, 2) + '...'
                  : item.limit.toString()
              }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card v-else-if="width < 600" style="border-radius: 10px; width: 100%">
      <q-img
        :src="baseuQuedada + item._id"
        style="height: 130px"
        @click="navigate(item)"
        v-if="item.privacy === 'Premium'"
      />
      <q-card-section
        class="row items-center justify-between q-pa-none q-pt-xs"
        style="height: 115px"
      >
        <div class="col-3 column items-center q-px-xs q-pb-xs">
          <q-avatar
            size="70px"
            @click="
              user._id === item.user_id
                ? $router.push('/muro_usuario')
                : $router.push('/muro_usuario/' + item.user_id)
            "
          >
            <q-img :src="baseuPerfil + item.user_id" class="full-height" />
          </q-avatar>
          <div
            class="text-center text-grey-8 text-caption ellipsis"
            style="width: 100%"
          >
            {{ item.userInfo.name }} {{ item.userInfo.last_name }}
          </div>
        </div>
        <div
          style="height: 100%"
          class="col-9 q-pr-xs q-pl-sm column justify-between"
        >
          <div>
            <div class="text-primary text-bold pointer" @click="navigate(item)">
              {{
                item.name.length > 24
                  ? item.name.substring(0, 24) + '...'
                  : item.name
              }}
            </div>
            <div v-if="width < 500" class="text-primary">
              <b>Fecha: </b
              >{{
                item.dateTime.charAt(0).toUpperCase() +
                item.dateTime.slice(1).substring(0, 13) +
                '...'
              }}
            </div>
            <div v-else class="text-primary">
              <b>Fecha: </b
              >{{
                item.dateTime.charAt(0).toUpperCase() + item.dateTime.slice(1)
              }}
            </div>
            <div class="col-9 q-pr-xs row items-center justify-between">
              <div class="text-primary col-6">
                <b>Edad: </b>{{ ageMath(item.userInfo.birthdate) }}
              </div>
              <div
                v-if="item.asistentes.length === item.limit"
                class="text-primary col-5"
              >
                <b>Completado</b>
              </div>
              <div v-else class="text-primary col-6 row no-wrap">
                <b>Asistentes:</b> {{ item.asistentes.length + 1 }}
              </div>
            </div>
          </div>
          <div class="column justify-between items-start q-pb-sm">
            <div>
              <q-btn
                no-caps
                dense
                color="primary"
                size="0.9em"
                @click="asistir(item, true)"
                v-if="
                  user._id !== item.user_id &&
                  item.asistentes.length < item.limit &&
                  //  !item.asistentes.find((v) => v.user_id === user._id) &&
                  fechaAnterior > 0
                "
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="thumb_up_off_alt" />
                  <div class="text-center">Asistiré</div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                color="warning"
                size="0.9em"
                v-if="
                  user._id !== item.user_id &&
                  item.asistentes.length < item.limit &&
                  !item.asistentes.find(v => v.user_id === user._id) &&
                  fechaAnterior < 0
                "
                class="no-pointer"
              >
                <div class="row items-center no-wrap">
                  <div class="text-center">Finalizado</div>
                </div>
              </q-btn>
            </div>
            <div class="text-grey-8 text-caption q-pl-xs q-pt-sm">
              <b>Límite de personas</b>
              {{
                item.limit.toString().length > 5
                  ? item.limit.toString().substring(0, 2) + '...'
                  : item.limit.toString()
              }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card v-else style="border-radius: 10px; width: 100%">
      <q-img
        :src="baseuQuedada + item._id"
        :style="{
          height: '130px',
          display: item.privacy !== 'Premium' && 'none'
        }"
        @click="navigate(item)"
      />
      <q-card-section
        class="row items-start justify-between q-pa-none q-pt-xs"
        :style="{ marginTop: item.privacy !== 'Premium' && '130px' }"
      >
        <div class="col-3 column items-center q-px-xs q-pb-xs">
          <q-avatar
            size="70px"
            @click="
              user._id === item.user_id
                ? $router.push('/muro_usuario')
                : $router.push('/muro_usuario/' + item.user_id)
            "
          >
            <q-img :src="baseuPerfil + item.user_id" class="full-height" />
          </q-avatar>
          <div
            class="text-center text-grey-8 text-caption ellipsis"
            style="width: 100%"
          >
            {{ item.userInfo.name }} {{ item.userInfo.last_name }}
          </div>
        </div>
        <div
          style="height: 105px"
          class="col-9 q-pr-xs column items-between justify-between"
        >
          <div>
            <div class="text-primary text-bold pointer" @click="navigate(item)">
              {{
                item.name.length > 24
                  ? item.name.substring(0, 24) + '...'
                  : item.name
              }}
            </div>
            <div v-if="width < 500" class="text-primary">
              <b>Fecha: </b
              >{{
                item.dateTime.charAt(0).toUpperCase() +
                item.dateTime.slice(1).substring(0, 13) +
                '...'
              }}
            </div>
            <div v-else class="text-primary">
              <b>Fecha: </b
              >{{
                item.dateTime.charAt(0).toUpperCase() + item.dateTime.slice(1)
              }}
            </div>
            <div class="col-9 q-pr-xs row items-center justify-between">
              <div class="text-primary col-6">
                <b>Edad: </b>{{ ageMath(item.userInfo.birthdate) }}
              </div>
              <div
                v-if="item.asistentes.length === item.limit"
                class="text-primary col-5"
              >
                <b>Completado</b>
              </div>
              <div v-else class="text-primary col-6 row no-wrap">
                <b>Asistentes:</b> {{ item.asistentes.length + 1 }}
              </div>
            </div>
          </div>
          <div class="row no-wrap justify-between items-center q-pb-sm">
            <div>
              <q-btn
                no-caps
                dense
                color="primary"
                size="0.9em"
                @click="asistir(item, true)"
                v-if="
                  user._id !== item.user_id &&
                  item.asistentes.length < item.limit &&
                  !item.asistentes.find(v => v.user_id === user._id) &&
                  fechaAnterior > 0
                "
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="thumb_up_off_alt" />
                  <div class="text-center">Asistiré</div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                color="warning"
                size="0.9em"
                v-if="
                  user._id !== item.user_id &&
                  item.asistentes.length < item.limit &&
                  !item.asistentes.find(v => v.user_id === user._id) &&
                  fechaAnterior < 0
                "
                class="no-pointer"
              >
                <div class="row items-center no-wrap">
                  <div class="text-center">Finalizado</div>
                </div>
              </q-btn>
            </div>
            <div class="text-grey-8 text-caption q-pl-xs">
              <b>Límite de personas</b>
              {{
                item.limit.toString().length > 5
                  ? item.limit.toString().substring(0, 2) + '...'
                  : item.limit.toString()
              }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Componente de Alerta de Solicitud Premium Modal -->
    <AlertSolicitudPremiumModal
      :visible="solicitudPremiumModalVisible"
      :title="solicitudPremiumModalTitle"
      :message="solicitudPremiumModalMessage"
      @close="solicitudPremiumModalVisible = false"
    />
  </div>
</template>
<script>
import moment from 'moment'
import AlertSolicitudPremiumModal from './AlertSolicitudPremiumModal.vue'

export default {
  components: {
    AlertSolicitudPremiumModal
  },
  props: [
    'thumbStyleScroll',
    'baseuQuedada',
    'baseuPerfil',
    'user',
    'item',
    'allPlans'
  ],
  data () {
    return {
      fechaActual: moment(),
      width: '',
      height: '',
      solicitudPremiumModalVisible: false,
      solicitudPremiumModalTitle: '',
      solicitudPremiumModalMessage: ''
    }
  },
  computed: {
    fechaVariableFormateada () {
      return moment(this.item.dateTime, 'dddd DD MMM YYYY, HH:mm', 'es').format(
        'YYYY-MM-DD HH:mm'
      )
    },
    fechaAnterior () {
      return moment(this.fechaVariableFormateada, 'YYYY-MM-DD HH:mm').diff(
        this.fechaActual
      )
    }
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  unmounted () {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    width: {
      async handler (newValue, old) {
        if (this.width < 800) {
          this.chunck = []
          this.chunckForBuscadas = []
          this.chunckFromArray(this.quedadas, 1)
          this.chunckFromArrayBuscadas(this.buscadas, 1)
        } else {
          this.chunck = []
          this.chunckForBuscadas = []
          this.chunckFromArray(this.quedadas, 2)
          this.chunckFromArrayBuscadas(this.buscadas, 2)
        }
      }
    }
  },
  methods: {
    navigate (item) {
      if (item.privacy === 'Premium') {
        let isUserAlreadyAttending = item.asistentes.find(
          v => v.user_id === this.user._id
        )
        if (item.user_id === this.user._id) {
          isUserAlreadyAttending = true
        }
        if (isUserAlreadyAttending) {
          this.$router.push('/quedada/' + item._id)
        } else {
          alert('Marca asistir para poder asistir al evento')
        }
      } else {
        this.$router.push('/quedada/' + item._id)
      }
    },
    asistir (data, bool) {
      const isUserAlreadyAttending = data.asistentes.find(
        v => v.user_id === this.user._id
      )

      if (isUserAlreadyAttending === undefined) {
        this.$api
          .post('solicitarPremium/' + data._id)
          .then(response => {
            console.log(response) // Verificar el contenido de la respuesta

            if (response && response.data) {
              const sendValue = response.data.send

              switch (sendValue) {
                case 1:
                  this.solicitudPremiumModalTitle = 'Solicitud Enviada'
                  this.solicitudPremiumModalMessage =
                    'Magic te enviará una notificación en caso de ser aceptado'
                  break
                case 2:
                  this.solicitudPremiumModalTitle = 'Solicitud Ya Enviada'
                  this.solicitudPremiumModalMessage =
                    'Ya has solicitado participar en esta quedada.'
                  break
                case 3:
                  this.solicitudPremiumModalTitle = 'Quedada No Encontrada'
                  this.solicitudPremiumModalMessage = 'Quedada no encontrada.'
                  break
                default:
                  this.solicitudPremiumModalTitle = 'Error'
                  this.solicitudPremiumModalMessage =
                    'Ha ocurrido un error al solicitar participación.'
                  break
              }

              this.solicitudPremiumModalVisible = true
            } else {
              this.solicitudPremiumModalTitle = 'Error'
              this.solicitudPremiumModalMessage =
                'Respuesta inválida del servidor.'
              this.solicitudPremiumModalVisible = true
            }
          })
          .catch(error => {
            console.error(error)
            this.solicitudPremiumModalTitle = 'Error'
            this.solicitudPremiumModalMessage =
              'Ha ocurrido un error al solicitar participación.'
            this.solicitudPremiumModalVisible = true
          })
      } else {
        this.$q
          .dialog({
            title: 'Confirma',
            message: '¿Seguro deseas asistir a este evento?',
            cancel: { label: 'No', color: 'secondary' },
            ok: { label: 'Si', color: 'primary' },
            persistent: true
          })
          .onOk(() => {
            this.$api
              .post('asistir/' + data._id, { asistencia: bool })
              .then(res => {
                if (res) {
                  this.$q.notify({
                    message:
                      'Podrás ver tus quedadas en el módulo de Asistidos',
                    color: 'positive'
                  })
                  this.getQuedadas()
                }
              })
          })
          .onCancel(() => {
            // Cancelar
          })
      }
    },
    ageMath (date) {
      return moment().diff(moment(date), 'years')
    },
    handleResize () {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    chunckFromArray (array, size) {
      const newArray = [...array]
      for (let i = 0; i < newArray.length; i += size) {
        this.chunck.push(newArray.slice(i, i + size))
      }
    }
  }
}
</script>

<style scoped>
.no-pointer {
  pointer-events: none;
}
</style>
