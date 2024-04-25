<template>
  <div class="fixed ">
    <div class="">
      <div class="_logo">
            <img src="logo_final_png-02.png" alt="logo2">
      </div>
      <q-card dark bordered class="bg-negative my-card q-mt-xl _sidebar column content-center" >
          <q-card-section class="column content-center">
            <div class="text-h6 text-center pointer" @click="$router.push('/inicio')">Inicio</div>
            <div class="text-h6 text-center pointer" @click="$router.push('/planes')">Todos los planes</div>
            <div class="text-h6 text-center pointer" @click="$router.push('/users-rankings')">Rankings</div>
            <div class="text-h6 text-center pointer" @click="$router.push('/amistades')">Amistades</div>
            <div class="text-h6 text-center pointer" @click="$router.push('/mis_chats')">Sala de chat</div>
            <div class="text-h6 text-center pointer" @click="$router.push('/muro_usuario')">Mi perfil</div>
            <!--div class="text-h6 text-center pointer" @click="$router.push('/muro_imagenes')">Mi Muro</div-->
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center pointer" @click="areYouSureModal()">Salir</div>
          </q-card-section>
        </q-card>
        <q-btn v-if="user.quedadas" no-caps @click="$router.push('/nueva_quedada')" color="primary" class="text-h6" style="width:250px;border-radius: 10px;margin: 1rem 0 5rem 0;" >Nuevo plan</q-btn>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SideBar',
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user = res
        }
      })
    },
    ...mapMutations('generals', ['logout']),
    async cerrarSesion () {
      this.logout()
      await this.$api.put('offline_user', this.user)
      localStorage.removeItem('Btn')
      this.$router.push('/login')
    },
    areYouSureModal () {
      this.$q.dialog({
        title: 'Cerrar Sesión',
        message: '¿Seguro deseas cerrar sesión?',
        cancel: { label: 'No', color: 'secondary' },
        ok: { label: 'Si', color: 'primary' },
        persistent: true
      }).onOk(() => {
        this.cerrarSesion()
      }).onCancel(() => {
        // cancel
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  ._sidebar{
    width: 250px;
    margin: 1rem 0;
    border-radius: 10px;
    padding: 0;
  }
  ._logo{
    display: none;
    @media(min-height: 720px){
      width: 250px;
      height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        object-fit: cover;
        width: 500px;
        height: 500px
      }
    }
  }
</style>
