<template>
  <div>
    <div>
    <div class="fullscreen column justify-center items-center">
      <q-card flat class="column justify-center items-center" style="width: 100%; height:400px;">
        <q-card-section>
          <div class="column justify-center items-center">
            <div class="text-h6 q-mb-md">Recuperación de contraseña</div>
          </div>
            <q-input :type="isPwd ? 'password' : 'text'"  class="q-mb-md" rounded outlined v-model="password" label="Introduce tu contraseña" autofocus
             :error="errorPass" error-message="Debe ingresar una contraseña segura. Mínimo 8 caracteres y por lo menos una mayúscula."  @input="verifyPass(password)">
              <template v-slot:prepend>
                <q-icon color="primary" name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer" color="primary" @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <q-input :type="isPwd2 ? 'password' : 'text'" rounded outlined v-model="repeatPassword" label="Repite tu contraseña" error-message="las contraseñas deben ser iguales"
              :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
              <template v-slot:prepend>
                <q-icon color="primary" name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon :name="isPwd2 ? 'visibility' : 'visibility_off'" class="cursor-pointer" color="primary" @click="isPwd2 = !isPwd2" />
              </template>
            </q-input>
        </q-card-section>
        <div class="column justify-center items-center">
        <q-btn rounded no-caps icon-right="arrow_right" color="primary" @click="recuperar()"
        >Continuar
        </q-btn>
        </div>
      </q-card>
     </div>
    </div>
  </div>
</template>
<script>
import { required, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      password: '',
      repeatPassword: '',
      isPwd: true,
      errorPass: false,
      isPwd2: true
    }
  },
  validations: {
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
    recuperar () {
      this.$v.$touch()
      if (!this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.$api.put('actualizar_pass/' + this.$route.params.code, { password: this.password }).then(res => {
          if (res) {
            this.$router.push('/')
            this.$q.notify({
              message: 'Contraseña restablecida con éxito'
            })
          }
        })
      }
    }
  }
}
</script>
