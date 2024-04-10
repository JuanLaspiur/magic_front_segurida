<template>
  <div class="row justify-center" style="overflow: hidden">
    <q-layout view="lHh Lpr lFf">
      <q-header class="bg-white">
        <q-toolbar
          class="bg-primary text-black row justify-between"
          style="height: 6vh"
        >
          <div class="row">
            <q-btn
              flatz
              @click="$router.go(-1)"
              color="white"
              round
              dense
              icon="arrow_back"
            />
            <q-item class="q-pl-sm text-white">
              <q-item-section
                avatar
                @click="handleBubbleClick()"
                class="pointer"
              >
                <q-avatar size="40px">
                  <q-img
                    :src="
                      data.privado
                        ? baseuPerfil + data.user_principal
                        : data.evento_id
                        ? baseuQuedada + data.evento_id
                        : ''
                    "
                    class="full-height"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section @click="handleBubbleClick()" class="pointer">
                <q-item-label class="text-h6 text-bold ellipsis-2-lines">{{
                  data.privado
                    ? data.full_name
                    : data.eventoInfo
                    ? data.eventoInfo.name
                    : ''
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <q-fab color="white" flat dense icon="more_vert" direction="down">
            <q-fab-action
              v-if="data.privado"
              color="blue"
              icon="travel_explore"
              :label="data.locked ? 'Desbloquear' : 'Bloquear'"
              label-class="bg-blue text-white text-subtitle2"
              external-label
              label-position="left"
              @click="bloquear(data.locked)"
            ></q-fab-action>
            <q-fab-action
              color="red"
              icon="feedback"
              label="Reportar"
              label-class="bg-red text-white text-subtitle2"
              external-label
              label-position="left"
              @click="mediar()"
            />
          </q-fab>
        </q-toolbar>
      </q-header>

      <q-page-container
        class="full-width column no-wrap justify-center items-center content-start"
      >
        <div class="q-pa-sm chat_layout shadow-1">
          <q-scroll-area
            :thumb-style="thumbStyle"
            ref="scrollArea"
            style="height: 100%; max-width: 100%; padding-right: 2rem"
          >
            <div
              v-for="mens in this.data.messages"
              :key="mens.id"
              v-bind:id="mens._id"
            >
              <q-chat-message
                v-if="mens.text"
                :name="mens.full_name"
                :avatar="baseuPerfil + mens.user_id"
                :stamp="mens.stamp"
                :sent="mens.send"
                :bg-color="mens.send ? 'green-8' : 'blue-8'"
                text-color="white"
                size="6"
              >
                <div
                  v-if="mens.textAnswer"
                  style="display: flex; justify-content: end"
                >
                  <span
                    :style="{
                      width: '215px',
                      backgroundColor: mens.send ? '#43a047' : '#1e88e5',
                      fontStyle: 'italic',
                      fontWeight: '400',
                      padding: '5px'
                    }"
                  >
                    {{
                      mens.textAnswer.length > 28
                        ? mens.textAnswer.substring(0, 28) + '...'
                        : mens.textAnswer
                    }}
                  </span>
                </div>
                <div v-if="mens.image">
                  <img
                    :src="baseUrl + mens.image"
                    alt="Imagen del mensaje"
                    style="
                      max-width: 200px;
                      max-height: 200px;
                      border-radius: 8px;
                    "
                  />
                </div>
                <div v-html="linkify(mens.text)"></div>
                <q-menu>
                  <q-list dense style="min-width: 100px">
                    <q-item clickable v-close-popup>
                      <q-item-section @click="answer(mens.text)"
                        >Responder</q-item-section
                      >
                    </q-item>
                    <q-separator />
                  </q-list>
                </q-menu>
              </q-chat-message>
            </div>
          </q-scroll-area>
          <div id="fin"></div>
        </div>
        <div
          v-bind:class="
            messageForAnswer
              ? 'chat_for_answer_visible'
              : 'chat_for_answer_hidden'
          "
        >
          <q-card class="full-width">
            <q-card-section
              class="bg-green text-white row justify-between items-center"
            >
              <div class="text-subtitle2">{{ messageForAnswer }}</div>
              <q-btn
                @click="cleanAnswer()"
                round
                color="negative"
                dense
                icon="close"
              />
            </q-card-section>
          </q-card>
        </div>
      </q-page-container>
      <q-footer elevated class="full-width row" style="height: max-content">
        <q-file
          v-if="data.evento_id"
          bg-color="white"
          :display-value="image_chat && 'Subido'"
          standout="bg-green"
          class="col-2 max-width: 200 q-pa-sm"
          accept=".jpg, image/*"
          v-model="image_chat"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          <template v-if="model" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop.prevent="image_chat = null"
              class="cursor-pointer"
            />
          </template>
        </q-file>
        <q-file class="col-1 max-width: 10 q-pa-sm">
          <q-btn
            flat
            color="white"
            icon="poll"
            @click="mostrarEncuestaDialogo()"
          />
        </q-file>
        <q-input
          @keyup.enter="sendChat()"
          v-model="text"
          placeholder="Mensaje..."
          class="q-pa-sm col-md-6 col-xs-12"
          bg-color="white"
          :disable="data.locked"
          autogrow
          outlined
        >
          <template v-slot:append>
            <q-icon
              href="#fin"
              @click="!data.locked ? sendChat() : ''"
              size="40px"
              name="send"
              color=""
              class="col-2"
            />
          </template>
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </q-footer>

      <q-dialog v-model="mediacion">
        <q-card style="width: 100%; border-radius: 20px">
          <q-carousel v-model="slide" animated height="auto">
            <q-carousel-slide
              :name="1"
              class="column no-wrap justify-between items-center q-px-lg q-py-xl"
            >
              <div class="text-h6">Realizar reporte</div>
              <div class="text-center q-py-xl">
                Este reporte será enviado al administrador y se iniciará una
                nueva mediación
              </div>
              <div style="width: 100%">
                <q-btn
                  no-caps
                  color="primary"
                  label="Reportar"
                  class="q-py-xs"
                  style="width: 100%; border-radius: 10px"
                  @click="slide = 2"
                />
              </div>
            </q-carousel-slide>

            <q-carousel-slide
              :name="2"
              class="column no-wrap justify-between q-px-lg q-py-xl"
            >
              <div class="text-h6 text-center">Datos del reporte</div>
              <div>Introduce la descripción de la situación</div>
              <q-input
                v-model="form.description"
                outlined
                type="textarea"
                style="width: 100%"
                error-message="Requerido"
                :error="$v.form.description.$error"
                @blur="$v.form.description.$touch()"
              />
              <div class="row justify-center q-pb-md">
                <q-btn
                  dense
                  no-caps
                  :color="!$v.images.$error ? 'primary' : 'negative'"
                  style="width: 100%; height: 50px; border-radius: 15px"
                >
                  <q-file
                    borderless
                    dense
                    v-model="img"
                    accept=".jpg, image/*"
                    style="width: 100%; height: 100%; font-size: 0px"
                    @blur="$v.images.$touch()"
                    @input="addImg()"
                  >
                    <div
                      class="absolute-center text-center text-white full-width bg-transparent"
                      style="font-size: 15px"
                    >
                      Cargar imagenes
                    </div>
                  </q-file>
                </q-btn>
              </div>
              <div
                v-for="(item, index) in images"
                :key="index"
                class="row no-wrap items-center"
              >
                <q-icon name="image" />
                <div class="ellipsis">{{ item.name }}</div>
              </div>
              <div class="row justify-center q-pt-lg">
                <q-btn
                  no-caps
                  color="primary"
                  label="Reportar"
                  class="q-py-xs"
                  style="width: 100%; border-radius: 10px"
                  @click="reportar()"
                />
              </div>
            </q-carousel-slide>

            <q-carousel-slide
              :name="3"
              class="column no-wrap justify-between items-center q-px-lg q-py-xl"
            >
              <div class="text-h6">Realizar reporte</div>
              <div class="text-center q-py-xl">
                Reporte realizado con éxito, puedes ver tu historial de reportes
                en tu perfil
              </div>
              <div class="column no-wrap" style="width: 100%">
                <q-btn
                  no-caps
                  color="primary"
                  label="Ir al perfil"
                  class="q-py-xs"
                  style="width: 100%; border-radius: 10px"
                  @click="$router.push('/muro_usuario')"
                />
                <q-btn no-caps flat label="Cerrar" @click="mediacion = false" />
              </div>
            </q-carousel-slide>
          </q-carousel>
        </q-card>
      </q-dialog>
    </q-layout>

    {/*** Aquí empieza el modle de la encuesta */}
    <q-dialog v-model="mostrarDialogoEncuesta">
      <q-card>
        <q-card-section>
          <q-input
            v-model="preguntaEncuesta"
            label="Pregunta de la encuesta"
            outlined
          />
        </q-card-section>

        <!-- Sección para la cantidad de opciones -->
        <q-card-section>
          <q-input
            v-model="cantidadOpciones"
            label="Cantidad de opciones"
            type="number"
            outlined
          />
        </q-card-section>

        <!-- Sección para las opciones de la encuesta -->
        <q-card-section>
          <div
            v-for="(opcion, index) in opcionesEncuesta"
            :key="index"
            class="opcion-input"
          >
            <q-input
              v-model="opcionesEncuesta[index]"
              :label="'Opción ' + (index + 1)"
              outlined
            />
          </div>
        </q-card-section>

        <!-- Acciones del diálogo -->
        <q-card-actions>
          <q-btn label="Cancelar" @click="cerrarEncuestaModle" />
          <q-btn
            label="Enviar Encuesta"
            color="primary"
            @click="enviarEncuesta"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import env from '../../env'
import { required } from 'vuelidate/lib/validators'
import { scroll } from 'quasar'
const { setScrollPosition, getScrollTarget } = scroll
export default {
  data () {
    return {
      mediacion: false,
      id: this.$route.params.id,
      text: '',
      image_chat: null,
      htmlElement: document.getElementById(
        this.data?.messages[this.data?.messages.length - 1]?._id
      ),
      baseuPerfil: '',
      baseuQuedada: '',
      baseUrl: '',
      logueado_id: '',
      slide: 2,
      data: {},
      form: {},
      images: [],
      messageForAnswer: '',
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75'
      },
      mostrarDialogoEncuesta: false,
      preguntaEncuesta: '',
      cantidadOpciones: 0,
      opcionesEncuesta: [],
      model: '', // Define la propiedad "model" en tus datos
      img: ''
    }
  },
  validations: {
    form: {
      description: { required }
    },
    images: { required }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.baseUrl = env.apiUrl + 'chat_img/'
    this.getData()
    this.getlogueado()
    setTimeout(() => {
      this.scrollTo()
    }, 500)
    window.enviarRespuesta = this.enviarRespuesta
  },
  watch: {
    htmlElement: {
      async handler (newValue, old) {
        this.scrollToElement(newValue)
      }
    },
    cantidadOpciones (newVal, oldVal) {
      if (newVal > oldVal) {
        // Añadir nuevas opciones
        for (let i = oldVal; i < newVal; i++) {
          this.opcionesEncuesta.push('')
        }
      } else {
        // Eliminar opciones si la cantidad ha disminuido
        this.opcionesEncuesta.splice(newVal)
      }
    }
  },
  methods: {
    scrollToElement (el) {
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 0
      setScrollPosition(target, offset, duration)
    },
    answer (mens) {
      this.messageForAnswer = mens
    },
    cleanAnswer () {
      this.messageForAnswer = ''
    },
    linkify (value) {
      const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g
      return value.replace(urlPattern, function (match) {
        return match.startsWith('http')
          ? `<a href="${match}" target="_blank">${match}</a>`
          : `<a href="http://${match}" target="_blank">${match}</a>`
      })
    },
    handleBubbleClick () {
      if (this.data.privado) {
        this.$router.push('/muro_usuario/' + this.data.otro_id)
      } else {
        this.$router.push('/quedada/' + this.data.evento_id)
      }
    },
    scrollTo () {
      const scrollArea = this.$refs.scrollArea
      const scrollTarget = scrollArea.getScrollTarget()
      const duration = 0
      scrollArea.setScrollPosition(scrollTarget.scrollHeight, duration)
    },
    getlogueado () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.logueado_id = res._id
        }
      })
    },
    async getData () {
      await this.$api.get('chat_by_id/' + this.id).then(v => {
        if (v) {
          this.data = v
          this.countMessages = v.messages.length
          this.scrollTo()
        }
      })
    },
    sendChat () {
      const formData = new FormData()
      formData.append('message', this.text)
      formData.append('messageForAnswer', this.messageForAnswer)
      formData.append('file', this.image_chat)
      if (this.text.trim().length !== 0) {
        this.$api.post('send_message/' + this.id, formData).then(res => {
          this.text = ''
          this.getData()
          this.messageForAnswer = ''
          this.image_chat = ''
        })
      } else {
        this.text = ''
      }
    },
    mediar () {
      this.slide = 1
      this.form = {}
      this.images = []
      this.$v.form.$reset()
      this.$v.images.$reset()
      this.mediacion = true
    },
    reportar () {
      this.$v.form.$touch()
      this.$v.images.$touch()
      if (!this.$v.form.$error && !this.$v.images.$error) {
        this.$q.loading.show({ message: 'Enviando reporte' })
        this.form.chat_id = this.id
        this.form.user1 = this.data.user_id
        this.form.user2 = this.data.otro_id
        this.form.status = 1
        const formData = new FormData()
        if (this.images.length > 0) {
          for (let i = 0; i < this.images.length; i++) {
            formData.append('files' + i, this.images[i])
          }
          this.form.cantidadFiles = this.images.length
        } else {
          this.form.cantidadFiles = 0
        }
        formData.append('dat', JSON.stringify(this.form))
        this.$api
          .post('mediacion', formData, {
            headers: {
              'Content-Type': undefined
            }
          })
          .then(res => {
            if (res) {
              this.slide = 3
              this.$q.loading.hide()
            }
          })
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    addImg () {
      if (this.img) {
        this.images.push(this.img)
      }
    },
    bloquear (bool) {
      const obj = {
        locked: !bool
      }
      if (bool === false) {
        obj.user_locked = this.logueado_id
      }
      this.$q
        .dialog({
          title: 'Confirma',
          message: `¿Seguro deseas ${
            bool ? 'desbloquear' : 'bloquear'
          } este chat? ${
            !bool ? ', no se podrá enviar ni recibir ningún mensaje' : ''
          }`,
          cancel: { label: 'Cancelar' },
          persistent: true
        })
        .onOk(() => {
          this.$api.put('chat/' + this.id, obj).then(res => {
            if (res) {
              this.$q.notify({
                message: `Chat ${bool ? 'desbloqueado' : 'bloqueado'}`,
                color: 'positive'
              })
              this.getData()
            }
          })
        })
        .onCancel(() => {
          // cancel
        })
    },
    mostrarEncuestaDialogo () {
      this.mostrarDialogoEncuesta = true
    },
    enviarEncuesta () {
      // .            ENVIAR ENCUESTA a la BASE DE DATOS
      if (
        this.preguntaEncuesta.trim() === '' ||
        this.opcionesEncuesta.length === 0
      ) {
        return
      }

      const encuesta = {
        pregunta: this.preguntaEncuesta,
        opciones: this.opcionesEncuesta
      }
      this.enviarEncuestaAlChat(encuesta)
      this.cantidadOpciones = 0
      this.preguntaEncuesta = ''
      this.opcionesEncuesta = []
      this.mostrarDialogoEncuesta = false
    },
    enviarEncuestaAlChat (encuesta) {
      //
      // Realizar la solicitud POST para crear la encuesta
      this.$api
        .post('encuestas/', encuesta)
        .then(response => {
          // Verificar si la respuesta contiene la encuesta creada con su _id
          // Utilizar el _id de la encuesta creada en el mensajeChat
          let mensajeChat = `- ${encuesta.pregunta}<br><br>`
          encuesta.opciones.forEach((opcion, index) => {
            mensajeChat += `<input type="checkbox" id="opcion${
              index + 1
            }" name="opcion${
              index + 1
            }" value="${opcion}" onclick="enviarRespuesta('${opcion}', '${
              response._id
            }' )">
                    <label for="opcion${index + 1}">${
              index + 1
            }. ${opcion}</label><br>`
          })

          // Crear formData para enviar el mensaje de la encuesta al chat
          const formData = new FormData()
          formData.append('message', mensajeChat)

          // Realizar la solicitud POST para enviar el mensaje de la encuesta al chat
          this.$api
            .post('send_message/' + this.id, formData)
            .then(res => {
              console.log('Mensaje de encuesta enviado al chat:', mensajeChat)
              this.getData()
            })
            .catch(error => {
              console.error(
                'Error al enviar mensaje de encuesta al chat:',
                error
              )
            })
        })
        .catch(error => {
          console.error('Error al crear la encuesta:', error)
        })
    },
    async enviarRespuesta (opcionSeleccionada, idEncuesta) {
      try {
        // Paso 1: Obtener todas las opciones asociadas a la encuesta
        const opcionesResponse = await this.$api.get(
          `opciones-usuario/id/${idEncuesta}`
        )

        // Verificar si la respuesta contiene datos válidos
        if (!opcionesResponse) {
          console.error('Error obtener lista')
        }
        // Paso 2: Buscar la opción que coincide con el texto seleccionado por el usuario
        const opciones = opcionesResponse
        const opcionSeleccionadaObj = opciones.find(
          opcion => opcion.texto === opcionSeleccionada
        )
        if (!opcionSeleccionadaObj) {
          throw new Error(
            'La opción seleccionada no se encontró en las opciones de la encuesta.'
          )
        }

        // Paso 3: Enviar una solicitud para registrar el voto del usuario por esa opción
        const votoResponse = await this.$api.post('opciones-usuario/votar', {
          opcionId: opcionSeleccionadaObj._id,
          usuarioId: this.logueado_id // Asumiendo que logueado_id contiene el ID del usuario actual
        })
        console.log(votoResponse)
        // Si la solicitud se completa con éxito, podrías devolver algún tipo de confirmación al usuario
        alert('Voto registrado exitosamente')
        return 'Voto registrado exitosamente'
      } catch (error) {
        console.error('Error al enviar la respuesta:', error.message)
        return 'Error al enviar la respuesta. Por favor, inténtalo de nuevo.'
      }
    },
    cerrarEncuestaModle () {
      this.mostrarDialogoEncuesta = false
    }
  }
}
</script>
<style lang="scss" scoped>
.chat_container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.chat_layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 86vh;
  @media (min-width: 800px) {
    width: 800px;
  }
}

.chat_for_answer_visible {
  height: fit-content;
  width: 100%;
  position: absolute;
  bottom: 8vh;
}

.chat_for_answer_hidden {
  display: none;
}

.opcion-input {
  margin-bottom: 12px;
}

.cantidad-opciones-section {
  margin-bottom: 12px;
}
</style>
