<template>
  <div>
    <div class="tutorial-modal" v-if="showTutorialModal">
      <div class="modal-content">
        <h5>¡Bienvenido a Magic!</h5>
        <q-img
          src="./logo_final_png-02.png"
          style="
            height: 120px;
            width: 120px;
            position: absolute;
            top: 0;
            right: 0;
          "
        />
        <p style="margin-top: -24px; font-size: 20px">
          Estamos muy <strong>contentos</strong> de que formes parte de
          <strong>nuestra comunidad</strong>
        </p>
        <!-- Botón para cerrar el tutorial -->
        <p style="margin-top: -24px; font-size: 20px">
          ¿Quieres comenzar un <strong>tutorial</strong>?
        </p>
        <q-btn
          label="Nunca"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="nuncaTutorial"
        />
        <q-btn
          label="Más tarde"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="closeTutorial"
        />
        <!-- Botón para ir al siguiente paso del tutorial -->
        <q-btn
          label="¡Si! Adelante"
          color="primary"
          style="margin-right: 10px"
          @click="nextTutorialStep"
        />
      </div>
    </div>
    <div class="tutorial-modal-DOS" v-if="showTutorialModalDOS">
      <div class="modal-content" :style="{ transform: arrowMovement }">
        <h5>Tutorial</h5>
        <div style="max-width: 300px; margin-top: -24px; margin-bottom: 10px">
          <p style="font-size: 20px">
            Este es el <strong>inicio</strong>,
            <strong> tu panel principal</strong>, aqui puedes buscar los
            <strong>planes</strong> mas cercanos a ti, o los planes que más te
            interesen
          </p>
        </div>
        <q-btn
          label="Nunca"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="nuncaTutorial"
        />
        <q-btn
          label="Seguir tarde"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="closeTutorialDOS"
        />
        <!-- Botón para ir al siguiente paso del tutorial -->
        <q-btn
          label="Continuar"
          color="primary"
          style="margin-right: 10px"
          @click="nextTutorialStepDOS"
        />
        <div class="arrow"></div>
      </div>
    </div>
    <div class="tutorial-modal-TRES" v-if="showTutorialModalTRES">
      <div class="modal-content" :style="{ transform: arrowMovementTRES }">
        <h5 style="color: black">Tutorial</h5>
        <div style="width: 300px; margin-top: -24px">
          <p style="color: black; font-size: 20px">
            ¡Acceso rapido a tus ultimas <strong>conversasiones</strong>! Las
            conversasiones se crean al momento de participar de un plan o puedes
            hacerlo entablar tu mismo con quien lo desees.
          </p>
        </div>

        <q-btn
          label="Nunca"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="nuncaTutorial"
        />
        <q-btn
          label="Seguir más tarde"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="closeTutorialTRES"
        />
        <!-- Botón para ir al siguiente paso del tutorial -->
        <q-btn
          label="Continuar"
          color="primary"
          style="margin-right: 10px"
          @click="nextTutorialStepTRES"
        />
        <div class="arrow-up"></div>
      </div>
    </div>
    <div class="tutorial-modal-CUATRO" v-if="showTutorialModalCUATRO">
      <div class="modal-content" :style="{ transform: arrowMovementCUATRO }">
        <h5 style="color: black; margin-top: 1px">Tutorial</h5>
        <div style="max-width: 300px; margin-top: -24px; margin-bottom: 10px">
          <p style="font-size: 20px; color: black">
            Crea un <strong>nuevo plan</strong> reunete con tus
            <strong>amigos</strong> o conocé gente nueva.
          </p>
        </div>
        <q-btn
          label="Nunca"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="nuncaTutorial"
        />
        <q-btn
          label="Seguir más tarde"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="closeTutorialCUATRO"
        />
        <!-- Botón para ir al siguiente paso del tutorial -->
        <q-btn
          label="Continuar"
          color="primary"
          style="margin-right: 10px"
          @click="nextTutorialStepCUATRO"
        />
        <div class="arrow-left"></div>
      </div>
    </div>
    <div class="tutorial-modal-CINCO" v-if="showTutorialModalCINCO">
      <div class="modal-content" :style="{ transform: arrowMovementCINCO }">
        <h5 style="color: black; margin-top: 1px">Tutorial</h5>
        <div style="max-width: 300px; margin-top: -24px; margin-bottom: 10px">
          <p style="font-size: 20px; color: black">
            Tu <strong>perfil</strong> recibe reconocimientos y observa los
            datos que has compartido con la <strong>comunidad</strong>
          </p>
        </div>
        <q-btn
          label="Nunca"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="nuncaTutorial"
        />
        <q-btn
          label="Seguir más tarde"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="closeTutorialCINCO"
        />
        <!-- Botón para ir al siguiente paso del tutorial -->
        <q-btn
          label="Continuar"
          color="primary"
          style="margin-right: 10px"
          @click="nextTutorialStepCINCO"
        />
        <div class="arrow-left"></div>
      </div>
    </div>
    <div class="tutorial-modal-SEIS" v-if="showTutorialModalSEIS">
      <div class="modal-content" :style="{ transform: arrowMovementSEIS }">
        <h5 style="color: black; margin-top: 1px">Tutorial</h5>
        <div style="max-width: 300px; margin-top: -24px; margin-bottom: 10px">
          <p style="font-size: 20px; color: black">
            Tu Sala de <strong>chats</strong>, bandeja de mensajes
          </p>
        </div>
        <q-btn
          label="Nunca"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="nuncaTutorial"
        />
        <q-btn
          label="Seguir más tarde"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="closeTutorialSEIS"
        />
        <!-- Botón para ir al siguiente paso del tutorial -->
        <q-btn
          label="Continuar"
          color="primary"
          style="margin-right: 10px"
          @click="nextTutorialStepSEIS"
        />
        <div class="arrow-left"></div>
      </div>
    </div>
    <div class="tutorial-modal-SIETE" v-if="showTutorialModalSIETE">
      <div class="modal-content" :style="{ transform: arrowMovementSIETE }">
        <h5 style="color: black; margin-top: 1px">Tutorial</h5>
        <div style="max-width: 300px; margin-top: -24px; margin-bottom: 10px">
          <p style="font-size: 20px; color: black">
            ¡Acceso tu sección de <strong>amistades</strong>, busca a tu amigos!
          </p>
        </div>
        <q-btn
          label="Nunca"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="nuncaTutorial"
        />
        <q-btn
          label="Seguir más tarde"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="closeTutorialSIETE"
        />
        <!-- Botón para ir al siguiente paso del tutorial -->
        <q-btn
          label="Continuar"
          color="primary"
          style="margin-right: 10px"
          @click="nextTutorialStepSIETE"
        />
        <div class="arrow-left"></div>
      </div>
    </div>
    <div class="tutorial-modal-OCHO" v-if="showTutorialModalOCHO">
      <div class="modal-content" :style="{ transform: arrowMovementOCHO }">
        <h5 style="color: black; margin-top: 1px">Tutorial</h5>
        <div style="max-width: 300px; margin-top: -24px; margin-bottom: 10px">
          <p style="font-size: 20px; color: black">
            ¡Accede a <strong> los rankings de planes </strong>¡Fijate si tu
            estas entre los más activos de la <strong> comunidad</strong>!
          </p>
        </div>
        <q-btn
          label="Nunca"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="nuncaTutorial"
        />
        <q-btn
          label="Seguir más tarde"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="closeTutorialOCHO"
        />
        <!-- Botón para ir al siguiente paso del tutorial -->
        <q-btn
          label="Continuar"
          color="primary"
          style="margin-right: 10px"
          @click="nextTutorialStepOCHO"
        />
        <div class="arrow-left"></div>
      </div>
    </div>
    <div class="tutorial-modal-NUEVE" v-if="showTutorialModalNUEVE">
      <div class="modal-content" :style="{ transform: arrowMovementNUEVE }">
        <h5 style="color: black; margin-top: 1px">Tutorial</h5>
        <div style="max-width: 300px; margin-top: -24px; margin-bottom: 10px">
          <p style="font-size: 20px; color: black">
            ¡Busca y accede a <strong> los de planes </strong> por
            <strong>categoría</strong> con información más detallada
          </p>
        </div>
        <q-btn
          label="Nunca"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="nuncaTutorial"
        />
        <q-btn
          label="Seguir más tarde"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="closeTutorialNUEVE"
        />
        <!-- Botón para ir al siguiente paso del tutorial -->
        <q-btn
          label="Continuar"
          color="primary"
          style="margin-right: 10px"
          @click="nextTutorialStepNUEVE"
        />
        <div class="arrow-left"></div>
      </div>
    </div>
    <div class="tutorial-modal" v-if="showTutorialModalDIEZ">
      <div class="modal-content">
        <q-img
          src="./logo_final_png-02.png"
          style="
            height: 120px;
            width: 120px;
            position: absolute;
            top: 0;
            right: 0;
          "
        />
        <h5>Tutorial finalizado ¡Bienvenido a Magic!</h5>
        <p style="margin-top: -24px; font-size: 20px">
          Estamos muy <strong>contentos</strong> de que formes parte de
          <strong>nuestra comunidad</strong>
        </p>
        <!-- Botón para cerrar el tutorial -->
        <q-btn
          label="¡Iniciar en Magic!"
          color="primary"
          class="btn btn-primary"
          style="margin-right: 10px"
          @click="nuncaTutorial"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  data () {
    return {
      showTutorialModal: true,
      showTutorialModalDOS: false,
      showTutorialModalTRES: false,
      showTutorialModalCUATRO: false,
      showTutorialModalCINCO: false,
      showTutorialModalSIETE: false,
      showTutorialModalOCHO: false,
      showTutorialModalNUEVE: false,
      showTutorialModalDIEZ: false
    }
  },
  methods: {
    nuncaTutorial () {
      this.showTutorialModal = false
      this.showTutorialModalDOS = false
      this.showTutorialModalTRES = false
      this.showTutorialModalCUATRO = false
      this.showTutorialModalCINCO = false
      this.showTutorialModalSIETE = false
      this.showTutorialModalOCHO = false
      this.showTutorialModalNUEVE = false
      this.showTutorialModalDIEZ = false
      console.log('User ' + this.user)
      console.log('User id ' + this.user._id)

      this.$api
        .put(`users/${this.user._id}/tutorial`, { tutorialState: true })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          // Manejar errores de red u otras excepciones
          console.error('Error al realizar la solicitud PUT:', error)
        })
    },
    closeTutorial () {
      this.showTutorialModal = false
    },
    nextTutorialStep () {
      this.showTutorialModal = false
      this.showTutorialModalDOS = true
      // Aquí podrías implementar la lógica para ir al siguiente paso del tutorial
    },
    closeTutorialDOS () {
      this.showTutorialModalDOS = false
    },
    nextTutorialStepDOS () {
      this.showTutorialModalDOS = false
      this.showTutorialModalTRES = true
      // Aquí podrías implementar la lógica para ir al siguiente paso del tutorial
    },
    closeTutorialTRES () {
      this.showTutorialModalTRES = false
    },
    nextTutorialStepTRES () {
      // Aquí podrías implementar la lógica para ir al siguiente paso del tutorial
      this.showTutorialModalTRES = false
      this.showTutorialModalCUATRO = true
    },
    closeTutorialCUATRO () {
      this.showTutorialModalCUATRO = false
    },
    nextTutorialStepCUATRO () {
      this.showTutorialModalCUATRO = false
      this.showTutorialModalCINCO = true
    },
    closeTutorialCINCO () {
      this.showTutorialModalCINCO = false
    },
    nextTutorialStepCINCO () {
      this.showTutorialModalCINCO = false
      this.showTutorialModalSEIS = true
    },
    closeTutorialSEIS () {
      this.showTutorialModalSEIS = false
    },
    nextTutorialStepSEIS () {
      this.showTutorialModalSEIS = false
      this.showTutorialModalSIETE = true
    },
    closeTutorialSIETE () {
      this.showTutorialModalSIETE = false
    },
    nextTutorialStepSIETE () {
      this.showTutorialModalSIETE = false
      this.showTutorialModalOCHO = true
    },
    closeTutorialOCHO () {
      this.showTutorialModalOCHO = false
    },
    nextTutorialStepOCHO () {
      this.showTutorialModalOCHO = false
      this.showTutorialModalNUEVE = true
    },
    closeTutorialNUEVE () {
      this.showTutorialModalNUEVE = false
    },
    nextTutorialStepNUEVE () {
      this.showTutorialModalNUEVE = false
      this.showTutorialModalDIEZ = true
      console.log('Tutorial 9')
    },
    closeTutorialDIEZ () {
      this.showTutorialModalDIEZ = false
    },
    nextTutorialStepDIEZ () {
      console.log('Tutorial 9')
    }
  },
  computed: {
    arrowMovement () {
      return this.showTutorialModalDOS ? 'translateX(-10px)' : 'none'
    },
    arrowMovementTRES () {
      return this.showTutorialModalTRES ? 'translateY(-10px)' : 'none'
    },
    arrowMovementCUATRO () {
      return this.showTutorialModalCUATRO ? 'translateX(10px)' : 'none'
    },
    arrowMovementCINCO () {
      return this.showTutorialModalCINCO ? 'translateX(10px)' : 'none'
    },
    arrowMovementSEIS () {
      return this.showTutorialModalSEIS ? 'translateX(10px)' : 'none'
    },
    arrowMovementSIETE () {
      return this.showTutorialModalSIETE ? 'translateX(10px)' : 'none'
    },
    arrowMovementOCHO () {
      return this.showTutorialModalOCHO ? 'translateX(10px)' : 'none'
    },
    arrowMovementNUEVE () {
      return this.showTutorialModalNUEVE ? 'translateX(10px)' : 'none'
    }
  }
}
</script>

<style>
/* Estilos para el modal de tutorial */
.tutorial-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative; /* Necesario para posicionar la flecha correctamente */
}

/* Estilos para el segundo modal de tutorial */
.tutorial-modal-DOS {
  position: fixed;
  top: 69px; /* Posición más arriba en la pantalla */
  left: 2%; /* Posición más a la derecha en la pantalla */
  background-color: rgba(230, 6, 6, 0.623); /* Fondo semi-transparente */
  padding: 20px;
  border-radius: 30px;
  color: blue;
  animation: modalMovement 1s infinite alternate; /* Animación para el movimiento del panel */
}

/* Estilos para el tercer modal de tutorial */
.tutorial-modal-TRES {
  position: fixed;
  bottom: 20px; /* Posición más abajo en la pantalla */
  right: 2%; /* Posición más a la derecha en la pantalla */
  background-color: rgba(230, 6, 6, 0.623); /* Fondo semi-transparente */
  padding: 20px 20px 20px 10px;
  border-radius: 30px;
  color: white;
  animation: modalMovement 1s infinite alternate; /* Animación para el movimiento del panel */
}

.arrow {
  position: absolute;
  top: 50%;
  right: -20px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid white;
  transform: translateY(-50%);
  animation: arrowMovement 1s infinite alternate;
}

.arrow-up {
  position: absolute;
  top: 5px;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid rgb(218, 50, 3); /* Color de la flecha */
  transform: translateX(-50%);
  animation: arrowMovement 1s infinite alternate; /* Animación para el movimiento de la flecha */
}

@keyframes modalMovement {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(5px);
  }
}

/* Estilos para el cuarto modal de tutorial */
.tutorial-modal-CUATRO {
  position: fixed;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 0, 0, 0.623);
  padding: 20px;
  border-radius: 10px;
  color: white;
  animation: modalMovement 1s infinite alternate;
}

.arrow-left {
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
}

@keyframes modalMovement {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(5px);
  }
}
/* Estilos para el quinto modal de tutorial */
.tutorial-modal-CINCO {
  position: fixed;
  top: 38%; /* Posición un poco más arriba */
  left: 20%; /* Posición igual a la izquierda */
  transform: translate(-50%, -50%);
  background-color: rgba(255, 0, 0, 0.623); /* Fondo semi-transparente */
  padding: 20px;
  border-radius: 10px;
  color: white;
  animation: modalMovement 1s infinite alternate; /* Animación para el movimiento del panel */
}

.arrow-left {
  position: absolute;
  top: 50%;
  right: 100%; /* Coloca la flecha a la izquierda */
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white; /* Color de la flecha */
}

@keyframes modalMovement {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(
      5px
    ); /* Cambia la cantidad de movimiento según prefieras */
  }
}

/* Estilos para el sexto modal de tutorial */
.tutorial-modal-SEIS {
  position: fixed;
  top: 35.4%; /* Posición un poco más arriba */
  left: 20%; /* Posición igual a la izquierda */
  transform: translate(-50%, -50%);
  background-color: rgba(255, 0, 0, 0.623); /* Fondo semi-transparente */
  padding: 20px;
  border-radius: 10px;
  color: white;
  animation: modalMovementSEIS 1s infinite alternate; /* Animación para el movimiento del panel */
}

.arrow-left-SEIS {
  position: absolute;
  top: 50%;
  right: 100%; /* Coloca la flecha a la izquierda */
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white; /* Color de la flecha */
}

@keyframes modalMovementSEIS {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(
      5px
    ); /* Cambia la cantidad de movimiento según prefieras */
  }
}

/* Estilos para el septimo modal de tutorial */
.tutorial-modal-SIETE {
  position: fixed;
  top: 33%; /* Posición un poco más arriba */
  left: 20%; /* Posición igual a la izquierda */
  transform: translate(-50%, -50%);
  background-color: rgba(255, 0, 0, 0.623); /* Fondo semi-transparente */
  padding: 20px;
  border-radius: 10px;
  color: white;
  animation: modalMovementSIETE 1s infinite alternate; /* Animación para el movimiento del panel */
}

.arrow-left-SIETE {
  position: absolute;
  top: 50%;
  right: 100%; /* Coloca la flecha a la izquierda */
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white; /* Color de la flecha */
}

@keyframes modalMovementSIETE {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(
      5px
    ); /* Cambia la cantidad de movimiento según prefieras */
  }
}

/* Estilos para el OCHO modal de tutorial */
.tutorial-modal-OCHO {
  position: fixed;
  top: 29.7%; /* Posición un poco más arriba 28% TODOS LOS PLANES*/
  left: 20%; /* Posición igual a la izquierda */
  transform: translate(-50%, -50%);
  background-color: rgba(255, 0, 0, 0.623); /* Fondo semi-transparente */
  padding: 20px;
  border-radius: 10px;
  color: white;
  animation: modalMovementOCHO 1s infinite alternate; /* Animación para el movimiento del panel */
}

.arrow-left-OCHO {
  position: absolute;
  top: 50%;
  right: 100%; /* Coloca la flecha a la izquierda */
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white; /* Color de la flecha */
}

@keyframes modalMovementOCHO {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(
      5px
    ); /* Cambia la cantidad de movimiento según prefieras */
  }
}

/* Estilos para el NUEVE modal de tutorial */
.tutorial-modal-NUEVE {
  position: fixed;
  top: 26.7%; /* Posición un poco más arriba 28% TODOS LOS PLANES*/
  left: 20%; /* Posición igual a la izquierda */
  transform: translate(-50%, -50%);
  background-color: rgba(255, 0, 0, 0.623); /* Fondo semi-transparente */
  padding: 20px;
  border-radius: 10px;
  color: white;
  animation: modalMovementNUEVE 1s infinite alternate; /* Animación para el movimiento del panel */
}

.arrow-left-NUEVE {
  position: absolute;
  top: 50%;
  right: 100%; /* Coloca la flecha a la izquierda */
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white; /* Color de la flecha */
}

@keyframes modalMovementNUEVE {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(
      5px
    ); /* Cambia la cantidad de movimiento según prefieras */
  }
}
</style>
