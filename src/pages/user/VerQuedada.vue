<template>
  <div class="verQuedada">
    <div class="verQuedada_container">
      <q-layout view="lHh Lpr lFf">
        <q-header class="bg-white">
          <q-toolbar class="row justify-between text-black">
            <q-btn
              flat
              @click="$router.go(-1)"
              color="grey-8"
              round
              dense
              icon="arrow_back"
            />
            <div class="self-center cursor-pointer text-bold text-subtitle1">
              Detalle de Plan
            </div>
            <div></div>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-carousel
            animated
            v-model="slide"
            infinite
            :autoplay="autoplay"
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
            class="verQuedada_carousel shadow-1"
          >
            <template
              v-slot:control
              v-if="user && user._id === quedada.user_id && quedada.status > 0"
            >
              <q-carousel-control position="top-right" :offset="[18, 18]">
              </q-carousel-control>
            </template>
            <q-carousel-slide
              :name="0"
              :img-src="
                quedada && quedada._id ? baseuQuedada + quedada._id : ''
              "
              class="carousel-slide"
            />
            <q-carousel-slide
              v-for="(img, index) of quedada.images"
              :key="index"
              :name="index + 1"
              :img-src="baseuQuedada + img"
              class="carousel-slide"
            />
          </q-carousel>
          <!--AQUI COMIENZAN LOS BOTONES DE GESTIÓN DE QUEDADA-->
          <div class="full-width q-my-md">
            <!-- botones USUARIO creador -->

            <q-btn
              no-caps
              dense
              color="primary"
              class="full-width"
              @click="modificar(quedada)"
              v-if="user && user._id === quedada.user_id"
            >
              <div class="row items-center no-wrap">
                <q-icon left name="edit" />
                <div class="text-center">Editar Plan</div>
              </div>
            </q-btn>

            <q-btn
              no-caps
              dense
              color="negative"
              class="full-width q-mt-sm"
              @click="cancelarPlan(quedada)"
              v-if="user && quedada && user._id === quedada.user_id"
            >
              <div class="row items-center no-wrap">
                <q-icon left name="close" />
                <div class="text-center">Cancelar Plan</div>
              </div>
            </q-btn>

            <!-- botones PARTICIPANTE -->
            <div v-if="quedada.privacy === 'Premium'">
              <q-btn
                v-if="
                  user &&
                  user._id !== quedada.user_id &&
                  quedada.asistentes.length < quedada.limit &&
                  !quedada.asistentes.find(v => v.user_id === user._id) &&
                  (!quedada.solicitudesDeParticipacion ||
                    !quedada.solicitudesDeParticipacion.includes(user._id))
                "
                no-caps
                dense
                style="color: #f44336"
                class="full-width"
                @click="soliciutdAsistencia(quedada, true)"
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="inbox" />
                  <div class="text-center" style="font-size: 18px">
                    Solicitar participación
                  </div>
                </div>
              </q-btn>
              <!-- confirmar asistencia -->
              <!-- Solicitar participación
              <q-btn
                v-if="
                  user &&
                  user._id !== quedada.user_id &&
                  quedada.asistentes.length < quedada.limit &&
                  !quedada.asistentes.find(v => v.user_id === user._id) &&
                  (!quedada.solicitudesDeParticipacion ||
                    !quedada.solicitudesDeParticipacion.includes(user._id))
                "
                no-caps
                dense
                style="color: #f44336"
                class="full-width"
                @click="soliciutdAsistencia(quedada, true)"
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="inbox" />
                  <div class="text-center" style="font-size: 18px">
                    Solicitar participación
                  </div>
                </div>
              </q-btn> -->
              <!-- Confirmar asistencia -->
              <q-btn
                v-else-if="
                  user &&
                  user._id !== quedada.user_id &&
                  quedada.asistentes.length < quedada.limit &&
                  quedada.asistentes.find(
                    v => v.user_id === user._id && !v.asistencia
                  )
                "
                no-caps
                dense
                style="background-color: #0065d8; color: white"
                class="full-width"
                @click="asistir(quedada, true)"
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="thumb_up_off_alt" />
                  <div class="text-center">Confirmar Asistencia</div>
                </div>
              </q-btn>
              <!-- Dejar plan -->
              <q-btn
                v-else-if="
                  user &&
                  user._id !== quedada.user_id &&
                  quedada.asistentes.find(
                    v => v.user_id === user._id && v.asistencia
                  )
                "
                no-caps
                dense
                color="negative"
                class="full-width"
                @click="dejarPlan(quedada, false)"
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="close" />
                  <div class="text-center">Dejar Plan</div>
                </div>
              </q-btn>

              <q-btn
                v-if="
                  user._id !== quedada.user_id &&
                  !(
                    quedada.reportes &&
                    quedada.reportes.find(v => v.reportingUser._id === user._id)
                  )
                "
                no-caps
                dense
                color="warning"
                class="full-width q-my-sm"
                @click="reportar(quedada)"
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="report_problem" />
                  <div class="text-center">Reportar</div>
                </div>
              </q-btn>
            </div>

            <!-- botones quedada común -->
            <div v-else>
              <q-btn
                no-caps
                dense
                style="background-color: #0065d8; color: white"
                class="full-width"
                @click="asistir(quedada, true)"
                v-if="
                  user &&
                  user._id !== quedada.user_id &&
                  quedada.asistentes.length < quedada.limit
                "
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="thumb_up_off_alt" />
                  <div class="text-center">Asistir</div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                color="negative"
                class="full-width"
                @click="dejarPlan(quedada, false)"
                v-else-if="
                  quedada.status !== 2 &&
                  user._id !== quedada.user_id &&
                  quedada.asistentes.find(v => v.user_id === user._id)
                "
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="close" />
                  <div class="text-center">Dejar Plan</div>
                </div>
              </q-btn>
              <q-btn
                v-if="
                  user._id !== quedada.user_id &&
                  !(
                    quedada.reportes &&
                    quedada.reportes.find(v => v.reportingUser._id === user._id)
                  )
                "
                no-caps
                dense
                color="warning"
                class="full-width q-my-sm"
                @click="reportar(quedada)"
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="report_problem" />
                  <div class="text-center">Reportar</div>
                </div>
              </q-btn>
            </div>

            <!-- botones fin PARTICIPANTE -->
          </div>

          <!--AQUI TERMINAN LOS BOTONES DE GESTIÓN DE QUEDADA-->
          <div class="q-pa-md">
            <!-- <div class="">{{quedada.dateTime}}</div> -->
            <div class="text-h5 text-bold q-mb-md">
              {{ quedada && quedada.name }}
            </div>
            <div class="row no-wrap q-pb-md">
              <q-icon name="event" size="lg" color="primary" />
              <div class="q-pl-sm text-subtitle1">
                <div class="text-bold text-primary">Fecha del plan</div>
                <div class="text-grey-7">{{ quedada && quedada.dateTime }}</div>
              </div>
            </div>

            <div class="row no-wrap q-pb-md">
              <q-icon name="edit" size="lg" color="primary" />
              <div class="q-pl-sm text-subtitle1">
                <div class="text-bold text-primary">Descripción</div>
                <div class="text-grey-7">
                  {{ quedada && quedada.description }}
                </div>
              </div>
            </div>
            <div class="row no-wrap q-pb-md">
              <q-icon name="place" size="lg" color="primary" />
              <div class="q-pl-sm text-subtitle1">
                <div class="text-bold text-primary">Ubicación</div>
                <div class="text-grey-7">
                  {{ quedada && quedada.location }}, Zona
                  {{ quedada && quedada.zone }}
                </div>
              </div>
            </div>
            <div class="row no-wrap q-pb-md">
              <q-icon name="group" size="lg" color="primary" />
              <div class="q-pl-sm text-subtitle1">
                <div class="text-bold text-primary">Límite de personas</div>
                <div class="text-grey-7">{{ quedada && quedada.limit }}</div>
              </div>
            </div>
            <div class="row no-wrap items-center q-pb-md">
              <div class="agregar-invitados_conainer">
                <q-btn
                  round
                  dense
                  color="positive"
                  icon="add"
                  @click="agregarInvitados(quedada)"
                  v-if="user && quedada && user._id === quedada.user_id && quedada.privacy === 'Premium'"
                  class="agregar_invitados"
                >
                </q-btn>
              </div>
              <div class="full-width text-center text-bold text-subtitle1">
                Participantes
              </div>
            </div>
            <div
              @click="
                quedada && $router.push('/muro_usuario/' + quedada.userInfo._id)
              "
              class="row no-wrap q-pb-md items-center cursor-pointer"
            >
              <img
                :src="baseuPerfil + quedada.userInfo._id"
                alt=""
                style="width: 60px; height: 60px; border-radius: 50%"
              />
              <div class="q-pl-sm text-subtitle1">
                <div class="text-bold">
                  {{
                    quedada && quedada.userInfo
                      ? quedada.userInfo.name +
                        ' ' +
                        (quedada.userInfo.last_name
                          ? quedada.userInfo.last_name
                          : '')
                      : ''
                  }}
                </div>
                <div class="text-grey-7" v-if="user.edadPriv">
                  {{
                    quedada &&
                    quedada.userInfo &&
                    quedada.userInfo.birthdate &&
                    calcularEdad(quedada.userInfo.birthdate)
                  }}
                  años
                </div>
                <div class="text-weight-regular text-italic text-primary">
                  Creador
                </div>
                <!-- <div>{{quedada.userInfo}}</div> -->
              </div>
            </div>

            <div v-for="(item, index) of listaAsistentes" :key="index">
              <q-item tag="label" class="column q-py-none" v-ripple>
                <!---->
                <q-item class="q-pa-none q-mb-sm">
                  <q-item-section avatar>
                    <q-avatar
                      size="50px"
                      @click="
                        user && user._id === item.user_id
                          ? $router.push('/muro_usuario')
                          : $router.push('/muro_usuario/' + item.user_id)
                      "
                    >
                      <q-img
                        :src="baseuPerfil + item.user_id"
                        class="full-height"
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label
                      class="text-subtitle1 text-bold ellipsis-2-lines"
                      @click="
                        user && user._id === item.user_id
                          ? $router.push('/muro_usuario')
                          : $router.push('/muro_usuario/' + item.user_id)
                      "
                    >
                      {{ item.userInfo && item.userInfo.name }}
                      {{ item.userInfo && item.userInfo.last_name }}
                    </q-item-label>
                    <q-item-label
                      class="text-grey-7 ellipsis"
                      v-if="user.edadPriv"
                    >
                      <b>({{ item.userInfo && item.userInfo.age }} años)</b>
                    </q-item-label>
                    <q-item-label
                      class="text-subtitle2"
                      :class="item.asistencia ? 'text-positive' : 'text-grey-8'"
                    >
                      {{
                        item && item.asistencia ? 'Confirmado' : 'Por confirmar'
                      }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section v-if="item.rating_id !== null" top side>
                    <q-rating
                      :value="getItemRating(item)"
                      size="1.3em"
                      class="q-my-sm"
                      color="yellow"
                      readonly
                    />
                  </q-item-section>
                </q-item>

                <q-item-section
                  v-if="
                    item.rating_id !== null &&
                    item.ratingInfo &&
                    item.ratingInfo.comment
                  "
                  class="q-mb-sm"
                >
                  <q-item-label class="text-grey" lines="3">
                    {{ item.ratingInfo && item.ratingInfo.comment }}
                  </q-item-label>
                </q-item-section>

                <!---->
              </q-item>
              <q-separator color="grey" class="q-mx-md q-mb-sm" />
            </div>
          </div>

          <q-page-sticky
            position="bottom-right"
            :offset="[10, 25]"
            v-if="
              quedada &&
              user &&
              quedada.status === 1 &&
              (quedada.user_id === user._id ||
                quedada.asistentes.find(
                  v => v.user_id === user._id && v.asistencia
                ))
            "
          >
            <q-btn
              round
              flat
              size="25px"
              color="white"
              style="background: linear-gradient(to top, #0065d8, #d80048)"
              @click="$router.push('/chat/' + quedada.chat_id)"
            >
              <q-avatar size="42px">
                <img src="chat3 2.png" />
              </q-avatar>
            </q-btn>
          </q-page-sticky>

          <!-- q-dialog  -->
          <q-dialog v-model="rtg" full-width>
            <q-card style="border-radius: 10px; width: 100%">
              <q-img :src="baseuQuedada + quedada._id" style="height: 175px" />
              <q-card-section class="column items-center">
                <div class="text-subtitle1 text-bold text-grey">Califica</div>
                <div class="text-h6 text-bold">{{ quedada.name }}</div>
                <q-rating
                  v-model="rating"
                  class="q-mb-sm"
                  max="5"
                  size="3.5em"
                  :color="$v.rating.$error ? 'red' : 'yellow'"
                  icon="star_border"
                  icon-selected="star"
                  icon-half="star_half"
                  no-dimming
                />
                <q-input
                  outlined
                  dense
                  class="q-mb-md full-width"
                  v-model="comment"
                  type="textarea"
                  label="¿Como estuvo la quedada?"
                />
                <q-btn
                  color="primary"
                  text-color="white"
                  label="Guardar"
                  style="width: 100%"
                  @click="ratingSave()"
                />
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-page-container>
      </q-layout>
    </div>

    <!-- q-dialog  -->
    <q-dialog v-model="reportModal">
      <report-modal @close="closeReportModal" :reportData="reportData" />
    </q-dialog>

    <!-- q-dialog  -->
    <q-dialog
      v-model="modalOpen"
      persistent
      v-if="
        listaDeSolicitudes &&
        listaDeSolicitudes.length > 0 &&
        quedada.user_id === user._id
      "
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">Lista de Solicitudes</div>
        </q-card-section>
        <!--  CONTAINER SOLICITUDES -->
        <q-card-section v-if="quedada.user_id === user._id">
          <table class="q-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Aceptar</th>
                <th>Rechazar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="solicitud in listaDeSolicitudes" :key="solicitud.id">
                <td>
                  <div class="row items-center">
                    <q-avatar
                      v-if="solicitud.avatar"
                      :src="solicitud.avatar"
                    ></q-avatar>
                    <span>{{ solicitud.name }} {{ solicitud.last_name }}</span>
                  </div>
                </td>
                <td>
                  <q-btn
                    color="primary"
                    icon="check"
                    @click="aceptarSolicitud(solicitud)"
                  />
                </td>
                <td>
                  <q-btn
                    color="negative"
                    icon="close"
                    @click="rechazarSolicitud(solicitud)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Salir"
            color="primary"
            @click="modalOpen = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { required, minValue } from 'vuelidate/lib/validators'
import env from '../../env'
import moment from 'moment'
import ReportModal from 'src/components/ReportModal.vue'
import { date } from 'quasar'
import AlertSolicitudPremiumModal from '../../components/AlertSolicitudPremiumModal.vue'
export default {
  components: { ReportModal, AlertSolicitudPremiumModal },
  data () {
    return {
      reportData: null,
      reportModal: false,
      slide: 0,
      autoplay: true,
      baseuPerfil: '',
      baseuQuedada: '',
      img: null,
      user: {},
      quedada: {},
      rtg: false,
      rating: 0,
      comment: null,
      listaDeSolicitudes: [],
      modalOpen: false,
      listaAsistentes: [],
      upload: false,
      solicitudPremiumModalVisible: false,
      solicitudPremiumModalTitle: '',
      solicitudPremiumModalMessage: ''
    }
  },
  computed: {
    // Calcula si el usuario actual es igual al quedada.user_id
    isQuedadaOwner () {
      return this.user && this.quedada && this.user._id === this.quedada.user_id
    }
  },
  watch: {
    modalOpen (newVal) {
      if (!newVal) {
        this.actualizarParticipantes()
      }
    }
  },
  validations: {
    rating: { required, minValue: minValue(1) }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.getUser()
  },
  methods: {
    async soliciutdAsistencia (data, bool) {
      try {
        const sessionInfo = JSON.parse(localStorage.getItem('SESSION_INFO'))
        if (!sessionInfo) {
          return
        } else {
          console.log('token  ' + JSON.stringify(sessionInfo.token))
        }
        const token = sessionInfo.token
        const response = await fetch(
          `${env.apiUrl}solicitarPremium/${data._id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )

        console.error('Respuesta del servidor ' + JSON.stringify(response))

        const info = await response.json()
        console.log(info) // Verifica el contenido de la respuesta

        const sendValue = info.send

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
      } catch (error) {
        console.error(error)
        this.solicitudPremiumModalTitle = 'Error'
        this.solicitudPremiumModalMessage =
          'Ha ocurrido un error al solicitar participación.'
        this.solicitudPremiumModalVisible = true
      }
    },
    async actualizarParticipantes () {
      const res = await this.$api.get('quedada_info/' + this.quedada._id)
      if (res) {
        this.listaAsistentes = res.asistentes.filter(
          item => item.asistencia === true
        )
      }
    },
    getItemRating (item) {
      return item && item.ratingInfo && item.ratingInfo.rating
        ? item.ratingInfo.rating
        : 0
    },
    closeReportModal () {
      this.reportModal = false
    },
    reportar (quedada) {
      this.$q
        .dialog({
          title: 'Confirma',
          message: '¿Seguro deseas reportar este evento?',
          cancel: { label: 'No', color: 'secondary' },
          ok: { label: 'Si', color: 'primary' },
          persistent: true
        })
        .onOk(() => {
          this.reportData = {
            quedada_id: quedada._id,
            userObj: this.user,
            date: date.formatDate(Date.now(), 'DD/MM/YYYY')
          }
          this.reportModal = true
        })
        .onCancel(() => {
          // cancel
        })
    },
    cancelarPlan (data) {
      this.$q
        .dialog({
          title: 'Confirma',
          message: '¿Seguro deseas cancelar este evento?',
          cancel: { label: 'No', color: 'secondary' },
          ok: { label: 'Si', color: 'primary' },
          persistent: true
        })
        .onOk(() => {
          this.$api.put('edit_quedada/' + data._id, { status: 3 }).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Plan cancelado.',
                color: 'positive'
              })
              this.$router.push('/inicio')
            }
          })
        })
        .onCancel(() => {
          // cancel
        })
    },
    dejarPlan (data, bool) {
      this.$q
        .dialog({
          title: 'Confirma',
          message: '¿Seguro deseas dejar este evento?',
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
                  message: 'Exito al dejar plan',
                  color: 'positive'
                })
                this.getQuedada(this.$route.params.id)
              }
            })
        })
        .onCancel(() => {
          // cancel
        })
    },
    modificar (quedada) {
      this.$router.push('/modificar_quedada/' + quedada._id)
    },
    asistir (data, bool) {
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
                  message: 'Podras ver tus quedadas en el modulo de Asistidos',
                  color: 'positive'
                })
                this.getQuedada(this.$route.params.id)
              }
            })
        })
        .onCancel(() => {
          // cancel
        })
    },
    calcularEdad (fecha) {
      return moment().diff(moment(fecha), 'years')
    },
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user = res
          this.getQuedada(this.$route.params.id)
        }
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
          this.listaAsistentes = res.asistentes.filter(
            item => item.asistencia === true
          )

          if (
            this.quedada.asistentes.find(
              v =>
                v.user_id === this.user._id &&
                v.asistencia &&
                v.rating_id === null
            ) &&
            this.quedada.status === 2
          ) {
            this.rtg = true
          } else {
            this.rtg = false
          }
        }
        this.$q.loading.hide()
        if (this.quedada.solicitudesDeParticipacion) {
          const res = await this.$api.get(
            'getSolicitudesParticipacion/' + this.quedada._id
          )
          this.listaDeSolicitudes = res.usuarios
          if (this.listaDeSolicitudes && this.listaDeSolicitudes.length > 0) {
            this.modalOpen = true
          }
        }
      } catch (error) {
        console.error('Error al obtener la quedada:', error)
        this.$q.loading.hide()
      }
    },

    async ratingSave () {
      this.$v.$touch()
      if (!this.$v.rating.$error) {
        this.$q.loading.show({
          message: 'Guardando Calificacion...'
        })
        const data = {
          rating: this.rating,
          comment: this.comment,
          user_id: this.user._id,
          quedada_id: this.quedada._id,
          amphitryon_id: this.quedada.user_id
        }
        try {
          const res = await this.$api.post('register_rating', data)
          if (res) {
            this.$q.notify({
              message: 'Calificacion guardada con exito',
              color: 'positive'
            })
            this.rtg = false
            this.getQuedada(this.$route.params.id)
          }
          this.$q.loading.hide()
        } catch (error) {
          console.error('Error al guardar la calificación:', error)
          this.$q.loading.hide()
        }
      } else {
        this.$q.notify({
          message: 'Debe ingresar una calificación valida',
          color: 'negative'
        })
      }
    },
    async aceptarSolicitud (solicitud) {
      await this.$api.put(
        `gestionarSolicitudParticipacion/${this.quedada._id}`,
        {
          user_id: solicitud._id,
          status: true
        }
      )
      const index = this.listaDeSolicitudes.indexOf(solicitud)
      if (index !== -1) {
        this.listaDeSolicitudes.splice(index, 1)
      }
      // Actualizar el modal
      this.actualizarModal()
    },

    async rechazarSolicitud (solicitud) {
      await this.$api.put(
        `gestionarSolicitudParticipacion/${this.quedada._id}`,
        {
          user_id: solicitud._id,
          status: false
        }
      )
      const index = this.listaDeSolicitudes.indexOf(solicitud)
      if (index !== -1) {
        this.listaDeSolicitudes.splice(index, 1)
      }
      // Actualizar el modal
      this.actualizarModal()
    },
    chunckFromArray (array, size) {
      const newArray = [...array]
      for (let i = 0; i < newArray.length; i += size) {
        this.chunck.push(newArray.slice(i, i + size))
      }
    },
    agregarInvitados () {
      this.$router.push('/inviteUsers/' + this.quedada._id)
    },
    async addImg () {
      this.$q.loading.show({
        message: 'Subiendo imagen...'
      })
      const formData = new FormData()
      formData.append('files', this.img)
      await this.$api
        .put('add_quedadaImg/' + this.quedada._id, formData, {
          headers: {
            'Content-Type': undefined
          }
        })
        .then(res => {
          if (res) {
            this.$q.notify({
              message: 'Imagen añadida correctamente',
              color: 'positive'
            })
            this.getQuedada(this.$route.params.id)
            this.slide = this.quedada.images.length
            this.autoplay = true
          }
          this.$q.loading.hide()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border: 3px solid $accent;
}
@import url('../../scss/user/VerQuedada.scss');
.verQuedada_carousel {
  width: 100%;
}

.carousel-slide img {
  object-fit: contain;
  width: 100%;
  height: auto;
}

.q-carousel__slides {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.agregar-invitados_conainer {
  position: absolute;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: end;
  padding: 0 3%;
  z-index: 10;
}

.agregar_invitados {
  height: 45px;
  width: 45px;
}
</style>
