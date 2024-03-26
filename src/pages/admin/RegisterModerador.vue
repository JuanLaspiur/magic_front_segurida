<template>
  <div>
    <div class="text-center text-h6 q-my-sm">{{edit ? 'Editar moderador' : 'Nuevo moderador'}}</div>
    <q-btn flat @click="$router.go(-1)" color="grey-8" round dense icon="arrow_back" class="absolute-top"/>
    <q-separator />

    <div class="q-px-md q-pt-md">
        <div class="text-h5 text-bold q-pb-md">Datos de la cuenta</div>
        <q-input :readonly="edit ? true : false" outlined type="email" v-model="form.email" label="Correo electrónico" :error="$v.form.email.$error" error-message="Este campo es requerido"  @blur="$v.form.email.$touch()"/>
        <q-input v-if="!edit" outlined type="password" v-model="password" label="Contraseña"
        :error="errorPass" error-message="Debe ingresar una contraseña segura. Mínimo 8 caracteres y por lo menos una mayúscula."  @input="verifyPass(password)"/>
        <q-input v-if="!edit" outlined type="password" v-model="repeatPassword" label="Repetir contraseña" :error="$v.repeatPassword.$error" error-message="Debe ser igual a la anterior"  @blur="$v.repeatPassword.$touch()"/>

        <div class="text-h5 text-bold q-pb-md">Datos del moderador</div>
        <q-input outlined v-model="form.name" label="Nombre Usuario" :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()"/>
        <q-input outlined v-model="form.last_name" label="Apellido Usuario" :error="$v.form.last_name.$error" error-message="Este campo es requerido"  @blur="$v.form.last_name.$touch()"/>
        <q-input outlined readonly v-model="form.birthdate" label="Fecha de nacimiento" @click="$refs.qDateProxy.show()"
        error-message="Este campo es requerido" :error="$v.form.birthdate.$error" @blur="$v.form.birthdate.$touch()">
            <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date default-view="Years" :locale="myLocale" v-model="form.birthdate" mask="YYYY/MM/DD"  @input="calcularEdad(form.birthdate)">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Cerrar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
        <q-input outlined readonly v-model.number="age" type="number" label="Edad" :error="$v.age.$error" error-message="La edad debe ser de 18 en adelante"  @blur="$v.age.$touch()"/>
        <q-input outlined type="number" v-model.number="form.phone" label="Teléfono de contacto" class="q-mb-md"/>
        <q-select outlined label="Género" v-model="form.gender" :options="['Hombre', 'Mujer', 'No binario', 'Prefiero no decirlo']" :error="$v.form.gender.$error" error-message="Este campo es requerido" @blur="$v.form.gender.$touch()"/>
        <q-select outlined label="Comunidad autónoma natal" v-model="form.community" :options="comunidades" option-label="name" option-value="_id" emit-value map-options error-message="Este campo es requerido" :error="$v.form.community.$error" @blur="$v.form.community.$touch()"/>
        <q-select outlined label="Ciudad" v-model="form.city" :options="ciudades" option-label="name" option-value="_id" emit-value map-options error-message="Este campo es requerido" :error="$v.form.city.$error" @blur="$v.form.city.$touch()"/>
        <q-select outlined label="Zona de Madrid" v-model="form.zone" :options="['Norte', 'Sur', 'Centro', 'Este', 'Oeste']" error-message="Este campo es requerido" :error="$v.form.zone.$error" @blur="$v.form.zone.$touch()"/>

        <div class="q-px-md q-pb-xl q-pt-md">
            <q-btn no-caps color="primary" text-color="white" label="Guardar" @click="edit ? actualizar() : guardar()" class="full-width q-py-xs"/>
        </div>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs, minValue } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
  data () {
    return {
      age: null,
      errorPass: false,
      edit: false,
      slide: 1,
      password: '',
      repeatPassword: '',
      comunidades: [],
      ciudades: [],
      form: {},
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      name: { required },
      last_name: { required },
      birthdate: { required },
      gender: { required },
      community: { required },
      city: { required },
      zone: { required }
    },
    repeatPassword: { sameAsPassword: sameAs('password') },
    age: { required, minValue: minValue(18) }
  },
  mounted () {
    if (this.$route.params.id) {
      this.edit = true
      this.getModerador(this.$route.params.id)
    }
    this.getCommunities()
    this.getCities()
  },
  methods: {
    getModerador (id) {
      this.$q.loading.show({
        message: 'Cargando datos...'
      })
      this.$api.get('user_edit/' + id).then(res => {
        if (res) {
          this.form = res
          this.calcularEdad(res.birthdate)
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
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
    calcularEdad (fecha) {
      this.age = moment().diff(moment(fecha), 'years')
    },
    async guardar () {
      this.$v.form.$touch()
      this.$v.age.$touch()
      this.$v.repeatPassword.$touch()
      if (this.password === '') {
        this.errorPass = true
      } else {
        this.verifyPass(this.password)
      }
      if (!this.$v.form.$error && !this.$v.age.$error && !this.errorPass && !this.$v.repeatPassword.$error) {
        this.$q.loading.show({
          message: 'Guardando...'
        })
        this.form.password = this.password
        await this.$api.post('register_moderador', this.form).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.$q.notify({
              message: 'Moderador guardado con éxito',
              color: 'positive'
            })
            this.$router.go(-1)
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
    async actualizar () {
      this.$v.form.$touch()
      this.$v.age.$touch()
      if (!this.$v.form.$error && !this.$v.age.$error) {
        this.$q.loading.show({
          message: 'Guardando...'
        })
        await this.$api.put('update_user_info/' + this.form._id, this.form).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.$q.notify({
              message: 'Moderador guardado con éxito',
              color: 'positive'
            })
            this.$router.go(-1)
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
    }
  }
}
</script>
