<template>
  <div>
    <div class="tutorial-mobile" v-if="showTutorialMobile">
      <div class="mobile-content">
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
        <p style="margin-top: -10px; font-size: 20px; margin-bottom: 30px">
          ¿Quieres comenzar un <strong>tutorial</strong>?
        </p>
        <q-btn
          label="No"
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
    <div class="tutorial-mobile-DOS" v-if="showTutorialMobileDOS">
      <div class="mobile-content">
        <h5>Tutorial:</h5>
        <h6 style="margin-top: -35px">Menú Principál</h6>
        <q-img
          src="./img2/casa.webp"
          style="
            position: absolute;
            top: 15%;
            left: 74%;
            height: 44px;
            width: 69px;
          "
        />
        <p style="margin-top: -35px; font-size: 20px">
          Este es el <strong>inicio</strong>,
          <strong>tu panel principal</strong>, aquí puedes buscar los
          <strong>planes</strong> más cercanos a ti, o los planes que más te
          interesen.
        </p>
        <p style="margin-top: 10px; font-size: 20px; margin-bottom: 40px">
          En la parte inferior puedes tu mismo
          <strong>Crear tu propio plan</strong> haciendo click en
          <strong>"nuevo plan"</strong>.
        </p>
        <q-img
          src="./img2/btnNuevoPlan.webp"
          style="
            position: absolute;
            top: 69%;
            left: 55%;
            height: 44px;
            width: 120px;
          "
        />

        <q-btn
          label="Salir"
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
      </div>
    </div>
    <div class="tutorial-mobile-TRES" v-if="showTutorialMobileTRES">
      <div class="mobile-content">
        <h5>Tutorial:</h5>
        <h6 style="margin-top: -35px">Menú Principal</h6>
        <q-img
          src="./img2/persona.webp"
          style="
            position: absolute;
            top: 15%;
            left: 74%;
            height: 44px;
            width: 69px;
          "
        />
        <p style="margin-top: -35px; font-size: 20px">
          ¡Accede a <strong> los rankings de planes </strong>¡Fijate si tu estas
          entre los más activos de la <strong> comunidad</strong>!
        </p>
        <q-btn
          label="Salir"
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
      </div>
    </div>
    <div class="tutorial-mobile-CUATRO" v-if="showTutorialMobileCUATRO">
      <div class="mobile-content">
        <h5>Tutorial:</h5>
        <h6 style="margin-top: -35px">Menú Principal</h6>
        <q-img
          src="./img2/amigos.webp"
          style="
            position: absolute;
            top: 15%;
            left: 74%;
            height: 44px;
            width: 69px;
          "
        />
        <p style="margin-top: -35px; font-size: 20px; margin-bottom: 25px">
          ¡Acceso tu sección de <strong>amistades</strong>, busca a tu amigos!
        </p>
        <q-btn
          label="Salir"
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
      </div>
    </div>
    <!-- Quinto modal -->
    <div class="tutorial-mobile-CINCO" v-if="showTutorialMobileCINCO">
      <div class="mobile-content-CINCO">
        <h5>Tutorial:</h5>
        <h6 style="margin-top: -35px">Sección de mensajes</h6>
        <q-img
          src="./img2/mensajes.webp"
          style="
            position: absolute;
            top: 15%;
            left: 74%;
            height: 44px;
            width: 69px;
          "
        />
        <p style="margin-top: -35px; font-size: 20px; margin-bottom: 25px">
          Tu Sala de <strong>chats</strong>, bandeja de mensajes
        </p>
        <q-btn
          label="Salir"
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
      </div>
    </div>

    <!-- Sexto modal -->
    <div class="tutorial-mobile-SEIS" v-if="showTutorialMobileSEIS">
      <div class="mobile-content-SEIS">
        <h5>Tutorial:</h5>
        <h6 style="margin-top: -35px">Tu Perfil</h6>
        <q-img
          src="./img2/perfil.webp"
          style="
            position: absolute;
            top: 15%;
            left: 74%;
            height: 44px;
            width: 69px;
          "
        />
        <p style="margin-top: -35px; font-size: 20px; margin-bottom: 25px">
          <strong>Perfil</strong>, recibe reconocimientos y observa los datos
          que has compartido con la <strong>comunidad</strong>
        </p>
        <q-btn
          label="Salir"
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
      </div>
    </div>

 <!-- Séptimo modal -->
<div class="tutorial-mobile-SIETE" v-if="showTutorialMobileSIETE">
  <div class="mobile-content-SIETE">
    <h5 style="padding-right: 50px">
      Tutorial finalizado ¡Bienvenido a Magic!
    </h5>
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
    <p style="margin-top: -24px; font-size: 20px; margin-bottom: 30px">
      Estamos muy <strong>contentos</strong> de que formes parte de
      <strong>nuestra comunidad</strong>
    </p>
    <q-btn
      label="¡Iniciar en Magic!"
      color="primary"
      class="btn btn-primary"
      style="margin-right: 10px"
      @click="closeTutorialSIETE"
    />
    <!-- Botón para ir al siguiente paso del tutorial
      <q-btn
        label=""
        color="primary"
        style="margin-right: 10px"
        @click="nextTutorialStepSIETE"
      /> -->
  </div>
</div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      showTutorialMobile: true,
      showTutorialMobileDOS: false,
      showTutorialMobileTRES: false,
      showTutorialMobileCUATRO: false,
      showTutorialMobileCINCO: false,
      showTutorialMobileSIETE: false,
      showTutorialMobileOCHO: false,
      showTutorialMobileNUEVE: false,
      showTutorialMobileDIEZ: false
    }
  },
  methods: {
    closeTutorial () {
      this.showTutorialMobile = false
    },
    nextTutorialStep () {
      this.showTutorialMobile = false
      this.showTutorialMobileDOS = true
      // Aquí podrías implementar la lógica para ir al siguiente paso del tutorial
    },
    closeTutorialDOS () {
      this.showTutorialMobileDOS = false
    },
    nextTutorialStepDOS () {
      this.showTutorialMobileDOS = false
      this.showTutorialMobileTRES = true
      console.log('Se tendria que mostrar el tutorial tres')
      // Aquí podrías implementar la lógica para ir al siguiente paso del tutorial
    },
    closeTutorialTRES () {
      this.showTutorialMobileTRES = false
    },
    nextTutorialStepTRES () {
      // Aquí podrías implementar la lógica para ir al siguiente paso del tutorial
      this.showTutorialMobileTRES = false
      this.showTutorialMobileCUATRO = true
    },
    closeTutorialCUATRO () {
      this.showTutorialMobileCUATRO = false
    },
    nextTutorialStepCUATRO () {
      this.showTutorialMobileCUATRO = false
      this.showTutorialMobileCINCO = true
    },
    closeTutorialCINCO () {
      this.showTutorialMobileCINCO = false
    },
    nextTutorialStepCINCO () {
      this.showTutorialMobileCINCO = false
      this.showTutorialMobileSEIS = true
    },
    closeTutorialSEIS () {
      this.showTutorialMobileSEIS = false
    },
    nextTutorialStepSEIS () {
      this.showTutorialMobileSEIS = false
      this.showTutorialMobileSIETE = true
    },
    closeTutorialSIETE () {
      this.showTutorialMobileSIETE = false
    },
    nextTutorialStepSIETE () {
      this.showTutorialMobileSIETE = false
      this.showTutorialMobileOCHO = true
    },
    closeTutorialOCHO () {
      this.showTutorialMobileOCHO = false
    },
    nextTutorialStepOCHO () {
      this.showTutorialMobileOCHO = false
      this.showTutorialMobileNUEVE = true
    },
    closeTutorialNUEVE () {
      this.showTutorialMobileNUEVE = false
    },
    nextTutorialStepNUEVE () {
      this.showTutorialMobileNUEVE = false
      this.showTutorialMobileDIEZ = true
      console.log('Tutorial 9')
    },
    closeTutorialDIEZ () {
      this.showTutorialMobileDIEZ = false
    },
    nextTutorialStepDIEZ () {
      console.log('Tutorial 9')
    }
  }
}
</script>
<style>
/* Estilos para los modales de tutorial */
.tutorial-mobile,
.tutorial-mobile-DOS,
.tutorial-mobile-TRES,
.tutorial-mobile-CUATRO,
.tutorial-mobile-CINCO,
.tutorial-mobile-SEIS,
.tutorial-mobile-SIETE {
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

.mobile-content,
.mobile-content-DOS,
.mobile-content-TRES,
.mobile-content-CUATRO,
.mobile-content-CINCO,
.mobile-content-SEIS,
.mobile-content-SIETE {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative; /* Necesario para posicionar la flecha correctamente */
}

/* Estilos para los logos dentro de los modales */
q-img,
q-img-DOS,
q-img-TRES,
q-img-CUATRO,
q-img-CINCO,
q-img-SEIS,
q-img-SIETE {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Estilos para los botones y textos dentro de los modales */
p,
p-DOS,
p-TRES,
p-CUATRO,
p-CINCO,
p-SEIS,
p-SIETE {
  font-size: 20px;
  margin-top: -24px;
}

.btn,
.btn-DOS,
.btn-TRES,
.btn-CUATRO,
.btn-CINCO,
.btn-SEIS,
.btn-SIETE {
  margin-right: 10px;
}

/* Ajustes específicos para el séptimo modal */
.tutorial-mobile-SIETE .mobile-content {
  width: 80%;
  max-width: 400px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

.mobile-content-SIETE h5,
.mobile-content-SIETE h6,
.mobile-content-SIETE p,
.mobile-content-SIETE strong {
  color: black;
}

.mobile-content-SIETE q-img {
  position: absolute;
}

.mobile-content-SIETE q-btn {
  margin-right: 10px;
}
</style>
