<template>
  <div>
    <!-- Boton de inicio de sesión google-->
    <div id="buttonDiv"></div>
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-carousel class="window-height" animated v-model="slide" infinite>
          <q-carousel-slide :name="2">
            <q-layout view="lHh Lpr lFf">
              <q-header class="bg-white">
                <q-toolbar class="text-black row justify-between bg-primary">
                  <!-- <q-btn flat @click="slide = 1" color="grey-8" round dense icon="arrow_back"/> -->
                  <q-btn
                    flat
                    @click="handleCancel"
                    color="white"
                    rounded
                    dense
                    label="Cancelar"
                  />
                </q-toolbar>
              </q-header>

              <div class="fit row justify-center">
                <q-page-container class="registro_form">
                  <div class="text-h5 text-bold row justify-center">
                    Registro de Usuario
                  </div>
                  <div
                    class="text-h6 text-subtitle1 row justify-center q-mb-xl text-center"
                  >
                    Bienvenido a Magic Day, una aplicacion donde podras
                    encontrar todos los planes que necesites
                  </div>
                  <div class="text-h5 text-bold q-pb-md">
                    Selecciona una foto de perfil
                  </div>
                  <div class="row justify-center">
                    <q-avatar size="200px" class="bg-grey-5 q-mb-sm">
                      <q-img
                        :src="perfil ? perfilImg : 'logo_final_png-02.png'"
                        style="height: 100%"
                      />
                      <q-badge
                        class="bg-transparent"
                        floating
                        style="
                          border-radius: 100%;
                          margin-top: 140px;
                          width: 70px;
                          height: 70px;
                        "
                      >
                        <q-file
                          class="bg-primary"
                          borderless
                          v-model="perfil"
                          @input="changeImg()"
                          accept=".jpg, image/*"
                          style="
                            z-index: 7;
                            border-radius: 100%;
                            width: 100px;
                            font-size: 0px;
                          "
                        >
                          <template v-slot:prepend>
                            <div class="absolute-center" @click.stop>
                              <q-icon
                                :color="
                                  !$v.perfil.$error ? 'white' : 'negative'
                                "
                                size="35px"
                                name="add_a_photo"
                                class="cursor-pointer"
                              />
                            </div>
                          </template>
                        </q-file>
                      </q-badge>
                    </q-avatar>
                  </div>

                  <div class="text-h5 text-bold q-pb-md">Datos del Usuario</div>
                  <q-input
                    class="q-mb-sm"
                    outlined
                    v-model="form.name"
                    label="Nombre"
                    :error="$v.form.name.$error"
                    error-message="Este campo es requerido"
                    @blur="$v.form.name.$touch()"
                  />
                  <q-input
                    outlined
                    v-model="form.last_name"
                    label="Apellido"
                    :error="$v.form.last_name.$error"
                    error-message="Este campo es requerido"
                    @blur="$v.form.last_name.$touch()"
                  />
                  <q-select
                    class="q-mb-md"
                    outlined
                    label="Género"
                    v-model="form.gender"
                    :options="[
                      'Hombre',
                      'Mujer',
                      'No binario',
                      'Prefiero no decirlo'
                    ]"
                    :error="$v.form.gender.$error"
                    error-message="Este campo es requerido"
                    @blur="$v.form.gender.$touch()"
                  />
                  <div class="row">
                    <div style="width: 50%">
                      <q-input
                        class="q-mb-md"
                        outlined
                        readonly
                        v-model="form.birthdate"
                        label="Fecha de nacimiento"
                        @click="$refs.qDateProxy.show()"
                        error-message="Este campo es requerido"
                        :error="$v.form.birthdate.$error"
                        @blur="$v.form.birthdate.$touch()"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                default-view="Years"
                                :locale="myLocale"
                                v-model="form.birthdate"
                                mask="YYYY/MM/DD"
                                @input="calcularEdad(form.birthdate)"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Cerrar"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <q-input
                        outlined
                        readonly
                        v-model.number="age"
                        type="number"
                        label="Edad"
                        :error="$v.age.$error"
                        error-message="La edad debe ser de 18 en adelante"
                        @blur="$v.age.$touch()"
                      />
                    </div>
                    <div class="q-ml-md" style="width: 40%">
                      <div class="column items-center q-mb-sm">
                        <q-avatar size="100px" clickable v-ripple v-if="animal">
                          <img
                            :src="
                              animal && animal.img
                                ? 'animales/' + animal.img
                                : ''
                            "
                            style="border-radius: 100%; height: 100%"
                          />
                        </q-avatar>
                        <div class="q-pb-sm">
                          <q-btn
                            no-caps
                            label="Selecciona un animal"
                            icon="pets"
                            :color="!$v.animal.$error ? 'primary' : 'red'"
                            @click="verAnimales = true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="text-h5 text-bold q-pb-md q-pt-lg">
                    Completa tu perfil
                  </div>
                  <q-input
                    outlined
                    v-model="form.bornCountry"
                    label="País de nacimiento"
                    :error="$v.form.bornCountry.$error"
                    error-message="Este campo es requerido"
                    @blur="$v.form.bornCountry.$touch()"
                  />
                  <q-input
                    outlined
                    type="number"
                    v-model.number="form.phone"
                    label="Teléfono de contacto"
                  />
                  <div class="q-mb-md text-italic text-grey-9 text-caption">
                    (Solamente visible por los administradores, y únicamente
                    utilizable en situaciones de emergencia).
                  </div>
                  <q-input
                    outlined
                    v-model="form.cargo"
                    label="Cargo o profesión"
                    class="q-mb-md"
                  />
                  <q-input
                    maxlength="150"
                    outlined
                    class="q-mb-sm"
                    v-model="form.description"
                    type="textarea"
                    label="Breve descripción sobre ti o tus hobbies."
                  />

                  <div class="text-h5 text-bold q-pb-md q-pt-lg">
                    Información geográfica
                  </div>
                  <q-select
                    class="q-mb-sm"
                    outlined
                    label="Ciudad actual"
                    v-model="form.city"
                    :options="ciudades"
                    option-label="name"
                    option-value="_id"
                    emit-value
                    map-options
                    error-message="Este campo es requerido"
                    :error="$v.form.city.$error"
                    @blur="$v.form.city.$touch()"
                  />
                  <div class="row width-full">
                    <q-checkbox
                      style="width: 7%"
                      class="q-mb-sm"
                      dense
                      v-model="comunidad"
                      label=""
                      color="primary"
                    >
                    </q-checkbox>
                    <q-select
                      style="width: 93%"
                      :disable="!comunidad"
                      outlined
                      label="Comunidad autónoma natal"
                      v-model="form.community"
                      :options="comunidades"
                      option-label="name"
                      option-value="_id"
                      emit-value
                      map-options
                      error-message="Este campo es requerido"
                      :error="$v.form.community.$error"
                      @blur="$v.form.community.$touch()"
                    />
                  </div>
                  <q-select
                    outlined
                    label="Zona de Madrid"
                    v-model="form.zone"
                    :options="['Norte', 'Sur', 'Centro', 'Este', 'Oeste']"
                    error-message="Este campo es requerido"
                    :error="$v.form.zone.$error"
                    @blur="$v.form.zone.$touch()"
                  />
                  <div class="q-px-md q-pb-lg q-pt-md">
                    <q-btn
                      no-caps
                      color="primary"
                      text-color="white"
                      label="Siguiente"
                      @click="siguiente(3)"
                      class="full-width q-py-xs q-my-sm"
                    ></q-btn>
                    <q-btn
                      no-caps
                      color="white"
                      text-color="primary"
                      label="Volver"
                      @click="handleCancel"
                      class="full-width q-py-xs q-my-sm"
                    ></q-btn>
                  </div>
                </q-page-container>
              </div>
            </q-layout>
          </q-carousel-slide>

          <q-carousel-slide :name="3" class="registro_form q-pa-none">
            <q-layout view="lHh Lpr lFf">
              <q-header class="bg-white">
                <q-toolbar class="text-black row justify-between">
                  <q-btn
                    flat
                    @click="slide = 2"
                    color="grey-8"
                    round
                    dense
                    icon="arrow_back"
                  />
                  <!-- <q-btn flat @click="$router.push('/login')" color="grey-8" rounded dense label="Cancelar"/> -->
                </q-toolbar>
              </q-header>

              <q-page-container>
                <div class="row justify-center">
                  <q-avatar size="200px" class="bg-grey-5 q-mb-sm">
                    <q-img
                      :src="perfil ? perfilImg : 'logo_final_png-02.png'"
                      style="height: 100%"
                    />
                  </q-avatar>
                </div>
                <div class="column items-center">
                  <div class="text-bold text-h6">
                    {{ form.name }} {{ form.last_name }}
                  </div>
                  <div class="q-pa-md">
                    <div v-if="form.cargo" class="row items-start">
                      <q-icon
                        class="q-mr-xs"
                        name="work"
                        size="25px"
                        color="primary"
                      />
                      <div class="text-grey-8">
                        <b class="text-primary">Cargo o profesión: </b> <br />
                        {{ form.cargo }}
                      </div>
                    </div>
                    <div v-if="form.community" class="row items-start">
                      <q-icon
                        class="q-mr-xs"
                        name="home"
                        size="25px"
                        color="primary"
                      />
                      <div class="text-grey-8">
                        <b class="text-primary">Comunidad Autónoma natal:</b>
                        <br />
                        {{
                          form.community
                            ? comunidades.filter(
                                v => v._id === form.community
                              )[0].name
                            : ''
                        }}
                      </div>
                    </div>
                    <div v-if="form.zone" class="row items-start">
                      <q-icon
                        class="q-mr-xs"
                        name="place"
                        size="25px"
                        color="primary"
                      />
                      <div class="text-grey-8">
                        <b class="text-primary">Zona de Madrid: </b> <br />
                        {{ form.zone }}
                      </div>
                    </div>
                    <div class="row items-center">
                      <q-icon
                        class="q-mr-xs"
                        name="groups"
                        size="25px"
                        color="primary"
                      />
                      <div class="text-grey-8">
                        <b class="text-primary">Genero: </b>{{ form.gender }}
                      </div>
                    </div>
                  </div>
                  <div class="q-my-lg q-px-md q-pb-lg" style="min-width: 360px">
                    <q-btn
                      no-caps
                      color="primary"
                      text-color="white"
                      label="¡Regístrate ahora!"
                      @click="actualizar()"
                      class="q-py-xs full-width"
                    >
                    </q-btn>
                  </div>
                </div>
              </q-page-container>
            </q-layout>
          </q-carousel-slide>
        </q-carousel>

        <q-dialog v-model="verAnimales">
          <q-card class="q-pa-sm" style="width: 100%">
            <div class="text-center q-pb-md text-h6">Selecciona un animal</div>
            <div class="row justify-around">
              <q-avatar
                v-for="(item, index) of animales"
                :key="index"
                size="90px"
                clickable
                v-ripple
                @click="
                  animal = item
                  verAnimales = false
                "
              >
                <img
                  :src="'animales/' + item.img"
                  style="border-radius: 100%; height: 100%"
                />
              </q-avatar>
            </div>
          </q-card>
        </q-dialog>
        <q-dialog v-model="showCropper">
          <div class="column">
            <cropper
              :src="perfilImg"
              ref="cropperr"
              :stencil-props="{
                previewClass: 'circle-cropper__preview'
              }"
              class="circle-cropper"
              stencil-component="circle-stencil"
            />
            <q-btn @click="saveImg()" color="primary" label="Cambiar" />
            <q-btn
              @click="
                ;(showCropper = false), (perfilImg = null), (perfil = null)
              "
              color="negative"
              label="Cancelar"
            />
          </div>
        </q-dialog>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import moment from 'moment'
import 'vue-advanced-cropper/dist/style.css'
import { required, email, minValue } from 'vuelidate/lib/validators'
import env from '../env'
export default {
  data () {
    return {
      baseuPerfil: env.apiUrl + 'perfil_img/',
      googleToken: null,
      dialog: false,
      maximizedToggle: true,
      isLogin: false,
      google_client_id: env.google_client_id,
      showCropper: false,
      checkBox: {
        first: false,
        second: false
      },
      comunidad: false,
      term: false,
      term1: false,
      perfil: null,
      perfilImg: null,
      animal: null,
      age: null,
      verAnimales: false,
      loading: false,
      errorPass: false,
      slide: 2,
      password: '',
      repeatPassword: '',
      form: {},
      comunidades: [],
      ciudades: [],
      animales: [],
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months:
          'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
            '_'
          ),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split(
          '_'
        ),
        firstDayOfWeek: 1
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      name: { required },
      last_name: {},
      birthdate: { required },
      gender: { required },
      bornCountry: {},
      community: {},
      city: { required },
      zone: {}
    },
    age: { required, minValue: minValue(18) },
    animal: { required },
    perfil: {}
  },
  mounted () {
    this.getCommunities()
    this.getCities()
    this.getAnimales()
    window.google.accounts.id.initialize({
      client_id: this.google_client_id,
      callback: this.saludar
    })
    window.google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'xlarge' } // customization attributes
    )
    // window.google.accounts.id.disableAutoSelect() //funcion para deslogear
  },
  methods: {
    handleCancel () {
      this.dialog = false
      this.$router.push('/login')
      this.form = {}
      this.age = null
      this.animal = null
      this.perfil = null
    },
    ...mapMutations('generals', ['login']),
    async handleCredentialResponse (response) {
      const res = await this.$api.post('loginByGoogle', {
        googleToken: response.credential
      })
      // . Le pasa el token
      if (res.success && res.login) {
        this.user = res.data.SESSION_INFO
        this.login(res.data)
        if (this.user.roles[0] === 1 || this.user.roles[0] === 3) {
          this.$router.push('/administrador')
        } else {
          this.$router.push('/inicio')
        }
      } else if (res.success && res.newUser) {
        this.googleToken = response
        const { userData } = res
        this.perfil = true
        this.perfilImg = this.baseuPerfil + userData._id
        this.form._id = userData._id
        this.form.name = userData.name
        this.form.last_name = userData.last_name
        this.form.email = userData.email
        this.dialog = true // se abre q-dialog
      }
    },
    async actualizar () {
      this.$v.form.$touch()
      this.$v.age.$touch()
      if (!this.$v.form.$error && !this.$v.age.$error) {
        this.$q.loading.show({
          message: 'Guardando...'
        })
        this.form.animal = this.animal._id
        this.form.newUser = false
        await this.$api
          .put('update_user_info_new_user/' + this.form._id, this.form)
          .then(res => {
            if (res.success) {
              this.$q.loading.hide()
              this.$q.notify({
                message: 'Perfil guardado con éxito',
                color: 'positive'
              })
              this.handleCredentialResponse(this.googleToken)
            } else {
              this.$q.loading.hide()
            }
          })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    },
    siguiente (idx) {
      if (idx === 2) {
        this.$v.form.email.$touch()
        this.$v.repeatPassword.$touch()
        if (this.password === '') {
          this.errorPass = true
        } else {
          this.verifyPass(this.password)
        }
        if (
          !this.$v.form.email.$error &&
          !this.errorPass &&
          !this.$v.repeatPassword.$error
        ) {
          this.form.password = this.password
          this.slide = 2
        } else {
          this.$q.notify({
            message: 'Faltan campos por llenar',
            color: 'negative'
          })
        }
      } else {
        this.$v.form.$touch()
        this.$v.age.$touch()
        this.$v.animal.$touch()
        if (
          !this.$v.form.$error &&
          !this.$v.animal.$error &&
          !this.$v.age.$error
        ) {
          this.slide = 3
        } else {
          this.$q.notify({
            message: 'Faltan campos por llenar',
            color: 'negative'
          })
        }
      }
    },
    terminos () {
      this.$v.form.$touch()
      this.$v.age.$touch()
      this.$v.animal.$touch()
      this.$v.perfil.$touch()
      if (
        !this.$v.form.$error &&
        !this.$v.animal.$error &&
        !this.$v.age.$error &&
        !this.$v.perfil.$error
      ) {
        this.term = true
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    getCommunities () {
      this.$api.get('communities').then(res => {
        if (res) {
          this.comunidades = res
        }
      })
    },
    getCities () {
      this.$api.get('cities').then(res => {
        if (res) {
          this.ciudades = res
        }
      })
    },
    getAnimales () {
      this.$api.get('animales').then(res => {
        if (res) {
          this.animales = res
          this.animal = res.find(a => a.img === 'ICONOS A COLOR-00.png')
        }
      })
    },
    calcularEdad (fecha) {
      this.age = moment().diff(moment(fecha), 'years')
    },
    changePerfil () {
      if (this.perfil) {
        this.perfilImg = URL.createObjectURL(this.perfil)
      }
    },
    saveImg () {
      const { canvas } = this.$refs.cropperr.getResult()
      canvas.toBlob(blob => {
        this.perfil = blob
        this.perfilImg = URL.createObjectURL(blob)
      })
      this.showCropper = false
    },
    changeImg () {
      if (this.perfil) {
        this.perfilImg = URL.createObjectURL(this.perfil)
        this.showCropper = true
      }
    }
  }
}
</script>
<style lang=""></style>
