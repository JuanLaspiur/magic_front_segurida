<template>
  <div v-if="item" class="q-mt-lg q-mr-sm" style="width: 380px">
    <q-card v-if="width < 365" style="border-radius: 10px; width: 100%">
      <!-- <q-img
        :src="baseuQuedada + item._id"
        style="height: 130px"
        @click="$router.push('/quedada/' + item._id)"
      /> -->
      <q-card-section class="row items-start justify-between q-pa-none q-pt-xs">
        <div class="col-3 column items-center q-px-xs q-pb-xs q-mt-md">
          <q-avatar
            size="40px"
            @click="
              user._id === item.user_id
                ? $router.push('/muro_usuario')
                : $router.push('/muro_usuario/' + item.user_id)
            "
          >
            <q-img :src="baseuPerfil + item.user_id" class="full-height" />
          </q-avatar>
          <div
            class="text-center text-grey-8 text-caption ellipsis q-mt-sm"
            style="width: 100%; font-size: 11px;"
          >
            {{ item.userInfo.name }} {{ item.userInfo.last_name }}
          </div>
        </div>
        <div
          style="height: 100%"
          class="col-9 q-pr-xs q-pl-sm column justify-center"
        >
          <div style="height: 55px;">
            <div
              class="text-primary text-bold pointer"
              @click="$router.push('/quedada/' + item._id)"
              style="font-size: 12px;"
            >
              {{
                item.name.length > 24
                  ? item.name.substring(0, 20) + "..."
                  : item.name
              }}
            </div>
            <div class="text-primary" style="font-size: 11px;">
              <b>Fecha: </b
              >{{
                item.dateTime.charAt(0).toUpperCase() + item.dateTime.slice(1).substring(0, 12) + "..."
              }}
            </div>
            <div class="col-9 q-pr-xs row items-center justify-between">
              <div class="text-primary col-6" style="font-size: 11px;">
                <b>Edad: </b>{{ ageMath(item.userInfo.birthdate) }}
              </div>
              <div
                v-if="item.asistentes.length === item.limit"
                class="text-primary col-5"
                style="font-size: 11px;"
              >
                <b>Completado</b>
              </div>
              <div v-else class="text-primary col-6" style="font-size: 11px;">
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
                  !item.asistentes.find((v) => v.user_id === user._id) &&
                  fechaAnterior > 0
                "
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="thumb_up_off_alt" />
                  <div class="text-center" style="font-size: 8px;">Asistiré</div>
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
                  !item.asistentes.find((v) => v.user_id === user._id) &&
                  fechaAnterior < 0
                "
                class="no-pointer"
              >
                <div class="row items-center no-wrap">
                  <div class="text-center" style="font-size: 8px;">Finalizado</div>
                </div>
              </q-btn>
            </div>
            <div class="text-grey-8 text-caption" style="font-size: 8px;">
              <b>Límite de personas</b>
              {{
                item.limit.toString().length > 5
                  ? item.limit.toString().substring(0, 2) + "..."
                  : item.limit.toString()
              }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card v-else-if="width < 600" style="border-radius: 10px; width: 100%">
      <q-card-section class="row items-center justify-between q-pa-none q-pt-xs" style="height: 175px;">
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
          class="col-9 q-pr-xs q-pl-sm column justify-center"
        >
          <div>
            <div
              class="text-primary text-bold pointer"
              @click="$router.push('/quedada/' + item._id)"
            >
              {{
                item.name.length > 24
                  ? item.name.substring(0, 24) + "..."
                  : item.name
              }}
            </div>
            <div v-if="width < 500" class="text-primary">
              <b>Fecha: </b
              >{{
                item.dateTime.charAt(0).toUpperCase() + item.dateTime.slice(1).substring(0, 13) + "..."
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
          <div class="column justify-between items-start q-pb-sm q-mt-sm">
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
                  !item.asistentes.find((v) => v.user_id === user._id) &&
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
                  !item.asistentes.find((v) => v.user_id === user._id) &&
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
                  ? item.limit.toString().substring(0, 2) + "..."
                  : item.limit.toString()
              }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card v-else style="border-radius: 10px; width: 100%">
      <!-- <q-img
        :src="baseuQuedada + item._id"
        :style="{height: '130px', display:item.privacy !== 'Premium' && 'none'}"
        @click="$router.push('/quedada/' + item._id)"
      /> -->
      <q-card-section class="row items-start justify-between q-pa-none q-pt-xs">
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
            <div
              class="text-primary text-bold pointer"
              @click="$router.push('/quedada/' + item._id)"
            >
              {{
                item.name.length > 24
                  ? item.name.substring(0, 24) + "..."
                  : item.name
              }}
            </div>
            <div v-if="width < 500" class="text-primary">
              <b>Fecha: </b
              >{{
                item.dateTime.charAt(0).toUpperCase() + item.dateTime.slice(1).substring(0, 13) + "..."
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
                  !item.asistentes.find((v) => v.user_id === user._id) &&
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
                  !item.asistentes.find((v) => v.user_id === user._id) &&
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
                  ? item.limit.toString().substring(0, 2) + "..."
                  : item.limit.toString()
              }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: ['thumbStyleScroll', 'baseuQuedada', 'baseuPerfil', 'user', 'item', 'allPlans'],
  data () {
    return {
      fechaActual: moment(),
      width: '',
      height: ''
    }
  },
  computed: {
    fechaVariableFormateada () {
      return moment(this.item.dateTime, 'dddd DD MMM YYYY, HH:mm', 'es').format('YYYY-MM-DD HH:mm')
    },
    fechaAnterior () {
      return moment(this.fechaVariableFormateada, 'YYYY-MM-DD HH:mm').diff(this.fechaActual)
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
    asistir (data, bool) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas asistir a este evento?',
        cancel: { label: 'No', color: 'secondary' },
        ok: { label: 'Si', color: 'primary' },
        persistent: true
      }).onOk(() => {
        this.$api.post('asistir/' + data._id, { asistencia: bool }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Podras ver tus quedadas en el modulo de Asistidos',
              color: 'positive'
            })
            this.getQuedadas()
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    ageMath (date) {
      return moment().diff(moment(date), 'years')
    },
    handleResize () {
      this.width = window.innerWidth
      this.height = window.innerHeight
    }
  }
}
</script>
<style scoped>
.no-pointer {
  pointer-events: none;
}
</style>
