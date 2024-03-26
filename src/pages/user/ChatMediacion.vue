<template>
  <div class="row justify-center">
    <q-layout eview="lHh Lpr lFf">
      <q-header class="bg-white">
        <q-toolbar class="bg-primary text-black" style="height: 6vh">
          <q-btn flat @click="$router.go(-1)" color="white" round dense icon="arrow_back"/>
          <div class="q-pl-sm row">
            <q-avatar size="40px">
                <img src="logo_final_png_Mesa_de_trabajo_1.png"/>
            </q-avatar>
            <q-avatar size="40px" class="q-mx-xs">
                <q-img :src="baseuPerfil + data.user1" class="full-height"/>
            </q-avatar>
            <q-avatar size="40px">
                <q-img :src="baseuPerfil + data.user2" class="full-height"/>
            </q-avatar>
          </div>
          <q-space />
          <q-btn no-caps dense flat color="white" label="Reporte" @click="dialog = true" />
        </q-toolbar>
        <div style="position:fixed; right:.5rem; top:7vh" class="text-right text-primary q-px-md">{{data.status === 1 ? 'Pendiente' : data.status === 2 ? 'Activa' : 'Finalizada'}}</div>
      </q-header>

    <q-page-container class="chat_container">
      <div class="q-pa-sm chat_layout shadow-1">
        <q-scroll-area
        :thumb-style="thumbStyle" ref="scrollArea"
        style="height: 100%; max-width: 100%;padding-right: 2rem;"
        >
          <q-chat-message
            v-for="mens in this.data.messages" :key="mens.id"
            :name="mens.full_name"
            :text="[mens.text]"
            :avatar="mens.userInfo && mens.userInfo.roles[0] === 1 ? 'logo_final_png_Mesa_de_trabajo_1.png' : baseuPerfil + mens.user_id"
            :stamp="mens.stamp"
            :sent="mens.send"
            :bg-color="mens.send ? 'green-8' : 'blue-8'"
            text-color="white"
            size="6"
          />
        </q-scroll-area>
        <div id="fin"></div>
      </div>
    </q-page-container>

    <q-footer elevated class="bg-primary row" style="height: 8vh">
        <q-input
           @keyup.enter="sendChat()"
            v-model="text"
            placeholder="Mensaje..."
            class="q-pa-sm col-10"
            bg-color="white"
            :disable="data.status !== 2"
            autogrow
            outlined
            />
        <q-icon href="#fin" @click="!data.locked ? sendChat() : ''" size="40px" name="send" color="white" class="col-2" />
    </q-footer>

    <q-dialog v-model="dialog">
      <q-card class="q-px-md q-py-lg column no-wrap justify-between items-center" style="width: 100%; border-radius:15px">
        <div class="text-h5 text-bold">Reporte</div>
        <div class="text-center q-py-lg text-subtitle1">{{data.description}}</div>
        <q-btn dense no-caps color="primary" text-color="black" label="Ver material gráfico"
        style="width: 60%; height: 50px; border-radius: 15px" @click="seeGrafic = true"/>

        <q-btn flat no-caps label="Cerrar" color="grey-9" class="q-mt-lg" v-close-popup />
      </q-card>
    </q-dialog>

    <q-dialog v-model="seeGrafic">
          <q-card style="width:100%">
            <q-carousel
              animated
              v-model="slide"
              arrows
              control-color="black"
              style="border-radius:15px"
              navigation>
              <q-carousel-slide :name="index+1" v-for="(item, index) of data.images" :key="index" class="column justify-center">
                  <q-btn flat round color="grey-8" icon="clear" @click="seeGrafic = false" class="absolute-top-right" />
                  <img :src="baseuMediacion + item" style="width:100%" />
              </q-carousel-slide>
              </q-carousel>
          </q-card>
        </q-dialog>

    <q-dialog v-model="final" persistent>
      <q-card class="q-px-md q-py-lg column no-wrap justify-between items-center" style="width: 100%; border-radius:15px">
        <div class="text-h5 text-bold">Mediación finalizada</div>
        <div class="text-center q-py-lg text-subtitle1">Esta mediación ha sido finalizada con éxito. Puede revisar el historial de Mediaciones en el Módulo de Mediación.</div>

        <q-btn no-caps text-color="black" color="primary" label="Cerrar" class="q-py-xs q-mt-xl" style="width: 80%; border-radius: 10px"
          v-close-popup/>
      </q-card>
    </q-dialog>
    </q-layout>
  </div>
</template>
<script>
import env from '../../env'
export default {
  data () {
    return {
      dialog: false,
      final: false,
      seeGrafic: false,
      id: this.$route.params.id,
      text: '',
      baseuPerfil: '',
      baseuMediacion: '',
      slide: 1,
      data: {}
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuMediacion = env.apiUrl + 'mediacion_img/'
    this.getData()
  },
  methods: {
    scrollTo () {
      this.$refs.scrollArea.setScrollPercentage('vertical', 1)
    },
    async getData () {
      await this.$api.get('mediacion_by_id/' + this.id).then(v => {
        if (v) {
          this.data = v
          if (v.status === 3) {
            this.final = true
          }
        }
      })
    },
    sendChat () {
      if (this.text !== '') {
        this.$api.post('send_message_mediacion/' + this.id, { message: this.text }).then(res => {
          this.text = ''
          this.getData()
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .chat_container{
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .chat_layout{
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 86vh;
    @media(min-width: 800px){
      width: 800px;
    }
  }
</style>
