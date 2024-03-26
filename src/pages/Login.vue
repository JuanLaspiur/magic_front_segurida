<template>
  <q-layout>
    <q-page-container>
      <q-page class="column justify-between no-wrap">
        <div>
          <q-img src="Ellipse 1.png" class="absolute-top-right" style="height: 150px; width: 170px;"/>
          <q-img src="Ellipse 2.png" style="height: 260px; width: 250px;"/>
          <q-img src="ic2.png" class="absolute-top q-ma-lg" style="height: 175px; width: 175px;"/>
          <div class="fit row justify-center">
            <div class="q-pa-md login_form">
              <div class="column items-center">
                <div class="text-h6 text-center text-bold q-mb-md">Inicia sesión con Google</div>
                <google-login-button />
              </div>
              <q-separator class="q-my-md"/>
              <div class="text-h6  text-center text-bold q-mb-md">O hazlo con tu email</div>
              <q-input outlined class="q-mb-sm" type="email" v-model="form.email" label="Correo" :error="$v.form.email.$error" error-message="Este campo es requerido"  @blur="$v.form.email.$touch()"/>
              <q-input outlined class="q-mb-sm" type="password" v-model="form.password" label="Contraseña" :error="$v.form.password.$error" error-message="Este campo es requerido"  @blur="$v.form.password.$touch()"/>
              <q-btn color="primary" text-color="white" label="Iniciar" :loading="loading" @click="verify()" class="text-bold full-width q-py-xs q-mb-md">
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-center" />
                  loading...
                </template>
              </q-btn>
              <div class="row justify-center q-pb-sm">
                <div class="text-grey-8 text-caption q-mr-xs">¿Olvidaste tu contraseña?</div>
                <div class="text-bold text-caption text-primary cursor-pointer" @click="cambio = true">Presiona aquí</div>
              </div>
              <div class="row justify-center">
                <div class="text-grey-8 q-mr-xs">¿No tienes cuenta aún?</div>
                <div class="text-bold text-primary cursor-pointer" @click="$router.push('/registro')">Crear una cuenta</div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center text-caption text-grey-8 q-pb-sm">Magic Day versión {{packageVar.version}}</div>

        <q-dialog v-model="cambio">
          <!-- <q-card class="column items-center justify-center" style="width: 350px; height:350px;">
            <q-card-section>
              <div class="text-h6">¿Olvidaste tu contraseña?</div>
            </q-card-section>
            <q-card-section>
              <q-input rounded outlined v-model="email" label="Introduce tu correo aquí" autofocus>
                <template v-slot:prepend>
                  <q-icon color="primary" name="mail" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                :loading="loading2"
                rounded
                no-caps
                icon-right="arrow_right"
                color="primary"
                @click="recuperar()"
              >Recuperar contraseña
              <template v-slot:loading>
                <q-spinner-hourglass class="on-center" />
                Loading...
              </template>
              </q-btn>
            </q-card-actions>
            <q-card-actions class="absolute-top-right">
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-actions>
          </q-card> -->
          <q-carousel
            v-model="slide"
            swipeable
            animated
            :padding="false"
            :vertical="false"
            :arrows="false"
            :navigation="false"
            navigation-position="style"
            height="300px"
            class="bg-purple text-white rounded-borders full-width"
          >
            <q-carousel-slide name="1" class="column no-wrap flex-center bg-primary">
              <div class="q-my-md text-center text-h6 ">Recupera tu Cuenta</div>
              <q-input class="full-width q-mb-lg" type="email" color="primary" bg-color="white" rounded outlined v-model="email" label="Introduce tu correo aquí" autofocus>
                <template v-slot:prepend>
                  <q-icon color="primary" name="mail" />
                </template>
              </q-input>
              <q-btn :loading="loading2" rounded no-caps icon-right="arrow_right" color="primary" @click="recuperar()">
                Recuperar contraseña
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-center" />
                  Loading...
                </template>
              </q-btn>
            </q-carousel-slide>
            <q-carousel-slide name="2" class="column no-wrap flex-center bg-primary">
              <q-icon name="lock" size="50px"/>
              <div class="q-my-md text-center text-h6 ">
                Revisa la casilla de correo {{email}} e ingresa el codigo</div>
              <v-otp-input
                ref="otpInput"
                input-classes="otp-input"
                separator="-"
                :num-inputs="4"
                :should-auto-focus="true"
                :is-input-num="true"
                @on-change="handleOnChange"
                @on-complete="handleOnComplete"
              />
            </q-carousel-slide>
            <q-carousel-slide name="3" class="column no-wrap flex-center bg-white">
              <div class="q-my-md text-center text-black text-h6 ">Ingresa tu nueva contraseña</div>
              <q-input bg-color="white" :type="isPwdM ? 'password' : 'text'"  class="full-width q-mb-md" rounded outlined v-model="password" label="Introduce tu contraseña" autofocus
                :error="errorPass" error-message="Debe ingresar una contraseña segura. Mínimo 8 caracteres y por lo menos una mayúscula."  @input="verifyPass(password)">
                <template v-slot:prepend>
                  <q-icon color="primary" name="vpn_key" />
                </template>
                <template v-slot:append>
                  <q-icon :name="isPwdM ? 'visibility' : 'visibility_off'" class="cursor-pointer" color="primary" @click="isPwdM = !isPwdM" />
                </template>
              </q-input>
              <q-input bg-color="white" :type="isPwd2M ? 'password' : 'text'" class="full-width" rounded outlined v-model="repeatPassword" label="Repite tu contraseña" error-message="las contraseñas deben ser iguales"
                :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
                <template v-slot:prepend>
                  <q-icon color="primary" name="vpn_key" />
                </template>
                <template v-slot:append>
                  <q-icon :name="isPwd2M ? 'visibility' : 'visibility_off'" class="cursor-pointer" color="primary" @click="isPwd2M = !isPwd2M" />
                </template>
              </q-input>
              <q-btn rounded no-caps icon-right="arrow_right" color="primary" @click="changePassword()">
                Continuar
              </q-btn>
            </q-carousel-slide>
          </q-carousel>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import packageV from '../../package.json'
import { mapMutations, mapActions } from 'vuex'
import { required, sameAs } from 'vuelidate/lib/validators'
import GoogleLoginButton from 'src/components/GoogleLoginButton.vue'

export default {
  components: { GoogleLoginButton },
  data () {
    return {
      packageVar: packageV,
      slide: '1',
      loading: false,
      loading2: false,
      isPwd: true,
      isPwdM: true,
      errorPass: false,
      isPwd2M: true,
      cambio: false,
      code: null,
      password: '',
      repeatPassword: '',
      email: '',
      form: {},
      user: {}
    }
  },
  validations: {
    form: {
      email: { required },
      password: { required }
    },
    password: { required },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    verifyPass (pass) {
      const letrasMayusculas = 'ABCDEFGHYJKLMNÑOPQRSTUVWXYZ'
      function tieneMayusculas (texto) {
        for (let i = 0; i < texto.length; i++) {
          if (letrasMayusculas.indexOf(texto.charAt(i), 0) !== -1) {
            return true
          }
        }
        return false
      }
      if (pass === '') {
        this.errorPass = true
      } else if (pass.length < 8 || !tieneMayusculas(pass)) {
        this.errorPass = true
      } else {
        this.errorPass = false
      }
    },
    handleOnChange (value) {
      console.log('onChange', value)
    },
    handleOnComplete (value) {
      console.log('onComplete', value)
      this.$api.put('acceso_actualizar_pass/' + value, { email: this.email }).then(res => {
        if (res) {
          this.code = value
          this.$q.notify({
            color: 'positive',
            message: 'Codigo Correcto.'
          })
          this.slide = '3'
        } else {
          this.$q.notify({
            color: 'negative',
            message: 'Codigo Incorrecto. Intentalo nuevamente.'
          })
        }
      })
    },
    changePassword () {
      this.$v.$touch()
      if (!this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.$api.put('actualizar_pass/' + this.code, { password: this.password }).then(res => {
          if (res) {
            this.$q.notify({
              color: 'positive',
              message: 'Contraseña restablecida con éxito'
            })
            this.cambio = false
          }
        })
      }
    },
    ...mapMutations('generals', ['login']),
    ...mapActions('generals', ['saveUser']),
    async recuperar () {
      if (this.email) {
        // this.simulateProgress()
        this.loading2 = true
        this.$q.loading.show()
        await this.$api.get('email_send_app/' + this.email).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: 'Se envió un correo para recuperar tu contraseña',
              color: 'positive'
            })
            this.loading2 = false
            this.slide = '2'
          } else {
            this.loading2 = false
          }
        })
          .catch(error => console.log(error))
      } else {
        this.$q.notify({
          message: 'Campo Vacio',
          color: 'negative'
        })
      }
    },
    verify () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({})
        this.$api.post('verificar_user', this.form).then(res => {
          if (res) {
            if (res === 'si') {
              this.loguear()
            } else {
              this.$q.loading.hide()
              this.$q.dialog({
                title: 'Atención',
                message: 'Este usuario fué bloqueado por el administrador de la aplicación',
                cancel: false,
                persistent: true
              }).onOk(() => {
                // ok
              })
            }
            this.$q.loading.hide()
          } else {
            this.$q.loading.hide()
          }
        })
      }
    },
    loguear () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.loading = true
        this.$q.loading.show({
          message: 'Iniciando sesión'
        })
        this.$api.post('login', this.form).then(res => {
          if (res) {
            this.user = res.SESSION_INFO
            this.login(res)
            if (this.user.roles[0] === 1 || this.user.roles[0] === 3) {
              this.$router.push('/administrador')
            } else {
              this.$router.push('/inicio')
            }
            this.$q.loading.hide()
            this.loading = false
          } else {
            console.log('error de ususario')
            this.loading = false
            this.$q.loading.hide()
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import url(../scss/Login.scss);
</style>
