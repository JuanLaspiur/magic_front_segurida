<template>
  <div class="row justify-center">
    <q-layout eview="lHh Lpr lFf">

    <q-page-container class="chat_container">
      <div class="q-pa-sm chat_layout shadow-1" style="width: 100%">
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

    <q-footer style="height: 8vh" elevated class="bg-primary row">
        <q-input
           @keyup.enter="sendChat()"
            v-model="text"
            placeholder="Mensaje..."
            class="q-pa-sm col-10"
            bg-color="white"
            :disable="data.status === 3"
            autogrow
            outlined
            />
        <q-icon href="#fin" @click="sendChat()" size="40px" name="send" color="white" class="col-2" />
    </q-footer>
    </q-layout>
  </div>
</template>
<script>
import env from '../../env'
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      text: '',
      baseuPerfil: ''
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
  },
  methods: {
    sendChat () {
      if (this.text !== '') {
        this.$api.post('send_message_mediacion/' + this.id, { message: this.text }).then(res => {
          this.text = ''
          this.$emit('getData')
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
    height: 92vh;
    @media(min-width: 800px){
      width: 800px;
    }
  }
</style>
