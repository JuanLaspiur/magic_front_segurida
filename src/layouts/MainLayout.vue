<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="rol === 2 && !$route.meta.chat" class="bg-white">
      <q-toolbar class="text-black">
        <q-btn flat @click="$router.go(-1)" round dense icon="arrow_back" color="grey-8" class="arrow-back"/>
        <q-space />
        <div class="row items-center" style="margin-left: -10px">
          <q-img src="logo_final_png-02.png" style="width:80px; height:80px"></q-img>
          <div class="text-bold text-subtitle1">{{$route.meta.title ? $route.meta.title : ''}}</div>
        </div>
        <q-space />
        <q-btn color="orange" icon="notifications_none" round flat
          @click="$router.push('/notificaciones')">
            <q-badge v-if="notifications > 0" color="red" floating transparent>
              {{notifications}}
            </q-badge>
          </q-btn>
        <q-fab
          v-model="fab"
          color="grey-8"
          flat
          dense
          icon="apps"
          direction="down"
        >
          <q-fab-action color="blue" icon="travel_explore" label="Solicitudes"
          label-class="bg-grey-3 text-primary text-subtitle2" external-label label-position="left"
          @click="visto = true, $router.push('/solicitudes')">
            <q-badge v-if="solicitudes.length && !visto" color="red" floating transparent>
              {{solicitudes.length}}
            </q-badge>
          </q-fab-action>
          <q-fab-action color="red" icon="feedback" label="Mediaciones"
          label-class="bg-grey-3 text-primary text-subtitle2" external-label label-position="left"
          @click="$router.push('/mediaciones')" />
        </q-fab>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer
      v-if="admin"
        v-model="admin"
        :width="250"
        :breakpoint="500"
      >
        <q-scroll-area class="fit bg-primary">
            <div class="row justify-center q-pa-sm">
              <q-img src="logo_final_png-02.png" style="width:100%;" />
            </div>
            <q-item clickable v-ripple dark>
              <q-item-section @click="$router.push('/administrador')">
                {{ `Cantidad de usuarios: ${usersNumber}` }}
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple dark>
              <q-item-section @click="$router.push('/usuarios-online')">
                {{ `Usuarios conectados: ${onlineUsers}` }}
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple dark>
              <q-item-section @click="$router.push('/usuarios-bloqueados')">
                {{ `Usuarios bloqueados` }}
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple dark>
              <q-item-section @click="$router.push('/rankings')">
                Rankings
              </q-item-section>
            </q-item>
            <div v-for="(item, index) in menu" :key="index">
              <q-item clickable v-ripple dark
              @click="item.label === 'Cerrar sesión' ? areYouSureModal() : ruta(item)">
                <q-item-section>
                  {{ item.label }}
                </q-item-section>
              </q-item>
            </div>
        </q-scroll-area>
      </q-drawer>

    <q-footer  v-if="!admin">
      <div class="bg-primary full-width row justify-around q-py-sm layout_footer" style="height: 60px;">
        <div class="row items-center bg-primary q-pa-sm"  v-for="(item, index) in menu" :key="index">
          <q-btn color="white" flat round stack dense size="15px'" @click="item.label === 'Exit' ? areYouSureModal() : ruta(item)"
          :class="selecBtn === item.label ? 'shadow-5' : ''" :style="selecBtn === item.label ? 'background: linear-gradient(to top, #0065d8, #d80048);' : ''">
            <q-avatar size="35px" :style="item.label !== 'Muro' ? 'border-radius: 0px;' : ''">
              <q-img :src="item.src"/>
            </q-avatar>
          </q-btn>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapMutations } from 'vuex'
import env from '../env'
export default {
  name: 'MainLayout',
  data (el) {
    return {
      usersNumber: 0,
      baseu: env.apiUrl + 'perfil_img/',
      visto: false,
      fab: false,
      admin: false,
      rol: null,
      user: {},
      onlineUsers: 0,
      bloquedUsers: 0,
      selecBtn: '',
      solicitudes: [],
      notifications: [],
      menu: [],
      startTime: null,
      intervalId: null,
      elapsedTime: 0,
      menuAdmin: [
        {
          label: 'Inicio',
          src: 'image 67.png',
          ruta: '/administrador'
        },
        {
          label: 'Módulo de Moderadores',
          src: 'amigos 2.png',
          ruta: '/moderadores'
        },
        {
          label: 'Módulo de Mediación',
          src: 'chat4 2.png',
          ruta: '/mediacion'
        },
        {
          label: 'Módulo de Planes',
          src: 'chat4 2.png',
          ruta: '/planes_module'
        },
        {
          label: 'Módulo de Categorias',
          src: 'chat4 2.png',
          ruta: '/categorias'
        },
        {
          label: 'Tabloide',
          src: 'chat4 2.png',
          ruta: '/tabloides'
        },
        {
          label: 'Encuestas',
          src: 'chat4 2.png',
          ruta: '/encuestas'
        },
        {
          label: 'Cerrar sesión',
          src: 'logout.png',
          ruta: ''
        }
      ],
      menuModerador: [
        {
          label: 'Inicio',
          src: 'image 67.png',
          ruta: '/administrador'
        },
        {
          label: 'Módulo de Planes',
          src: 'chat4 2.png',
          ruta: '/planes_module'
        },
        {
          label: 'Tabloide',
          src: 'chat4 2.png',
          ruta: '/tabloides'
        },
        {
          label: 'Cerrar sesión',
          src: 'logout.png',
          ruta: ''
        }
      ],
      menuUser: [
        {
          label: 'Home',
          src: 'image 67.png',
          ruta: '/inicio'
        },
        {
          label: 'Rankings',
          src: 'logoMagic.png',
          ruta: '/users-rankings'
        },
        {
          label: 'Amistades',
          src: 'amigos 2.png',
          ruta: '/amistades'
        },
        {
          label: 'Chats',
          src: 'chat4 2.png',
          ruta: '/mis_chats'
        },
        {
          label: 'Muro',
          src: 'person.png',
          ruta: '/muro_usuario'
        },
        {
          label: 'Exit',
          src: 'logout.png',
          ruta: ''
        }
      ]
    }
  },
  computed: {
    routerChange () {
      return this.$route.meta.change
    }
  },
  watch: {
    routerChange: function (val) {
      if (val && this.rol === 2) {
        this.getData()
      }
    },
    onlineUsers: {
      async handler (newValue, old) {
        this.onlineUsers = newValue
      }
    },
    bloquedUsers: {
      async handler (newValue, old) {
        this.bloquedUsers = newValue
      }
    }
  },
  async created () {
    await this.getAllUsers()
    await this.getUser()
    await this.getUsersNumber()
    await this.getBloquedUsers()
  },
  beforeDestroy () {
    this.detenerSeguimiento()
    window.removeEventListener('unload', this.guardarTiempo)
  },
  mounted () {
    window.addEventListener('unload', this.guardarTiempo)
  },
  async updated () {
    await this.getAllUsers()
  },
  methods: {
    guardarTiempo (event) {
      if (this.elapsedTime > 0) {
        event.preventDefault()
        this.$api.put('tiempoUserWeb', { tiempo: this.elapsedTime, id: this.user._id })
          .then(res => {
            console.log(res)
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    iniciarSesion () {
      this.startTime = new Date()
      this.intervalId = setInterval(this.actualizarTiempoTranscurrido, 1000)
    },
    actualizarTiempoTranscurrido () {
      if (this.startTime) {
        const currentTime = new Date()
        const timeDiff = Math.floor((currentTime - this.startTime) / 1000)
        this.elapsedTime = timeDiff
      }
    },
    detenerSeguimiento () {
      if (this.elapsedTime > 0) {
        this.$api.put('tiempoUserWeb', { tiempo: this.elapsedTime, id: this.user._id }).then(res => {
          console.log(res)
        })
      }
      clearInterval(this.intervalId)
    },
    getUsersNumber () {
      this.$api.get('all_user').then(res => {
        if (res) {
          this.usersNumber = res.filter((persona) => persona.enable === true).length
        }
      })
    },
    ...mapMutations('generals', ['logout']),
    async getUser () {
      await this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          this.user = v
          if (this.rol === 1) {
            this.admin = true
            this.menu = this.menuAdmin
          } else if (this.rol === 2) {
            this.detenerSeguimiento()
            this.iniciarSesion()
            this.menu = this.menuUser
            this.getData()
          } else if (this.rol === 3) {
            this.admin = true
            this.menu = this.menuModerador
          }
          const btn = JSON.parse(localStorage.getItem('Btn'))
          if (!btn) {
            this.selecBtn = this.rol === 1 || this.rol === 3 ? this.menu[0].label : this.menu[4].label
          } else {
            this.selecBtn = btn.label
          }
        }
      })
    },
    getData () {
      this.getSolicitudes()
      this.getNotifications()
    },
    getSolicitudes () {
      this.$api.get('solicitudes').then(v => {
        if (v) {
          this.solicitudes = v
        }
      })
    },
    getNotifications () {
      this.$api.get('new_notifications').then(v => {
        if (v) {
          this.notifications = v
        }
      })
    },
    cerrarSesion () {
      this.$api.put('tiempoUserWeb', { tiempo: this.elapsedTime, id: this.user._id }).then(res => {
        console.log(res)
      })
      this.logout()
      localStorage.removeItem('Btn')
      this.$router.push('/login')
    },
    ruta (itm) {
      localStorage.setItem('Btn', JSON.stringify(itm))
      this.selecBtn = itm.label
      this.$router.push(itm.ruta)
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
    },
    async getAllUsers () {
      await this.$api.get('all_user').then(res => {
        if (res) {
          this.onlineUsers = res.filter((people) => people.online === true).filter((persona) => persona.enable === true).length
        }
      })
    },
    async getBloquedUsers () {
      this.$api.get('users_bloq').then(res => {
        if (res.status === 200) {
          this.bloquedUsers = res.users.length
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import url(../scss/layouts/MainLayout.scss);
</style>
