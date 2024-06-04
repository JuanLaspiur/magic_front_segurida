<template>
  <div>
    <CabeceraQuedadaTerminada />
    <div class="container_general">
      <div class="panel_central">
        <q-btn
          flat
          round
          icon="arrow_back"
          class="back-button"
          @click="goBack"
          size="lg"
        />
        <div class="container_titulos">
          <h3>¡Quedada terminada!</h3>
          <h5 style="margin-top: -20px">
            Comparte tus mejores momentos y fotos en nuestra red social para que
            todos puedan ver lo genial que fue tu quedada. ¡Estamos ansiosos por
            ver tus recuerdos!
          </h5>
          <h5 style="margin-top: -35px">
            ¡Gracias por ser parte de nuestra comunidad y hacer que cada momento
            sea especial!
          </h5>
        </div>
        <div class="container_agregar_imagen">
          <button class="custom-btn" @click="agregarImagen">
            Agregar Imagen
          </button>
        </div>
        <CargarFotos :participants="participants" />
        <div class="container_btn_confirmacion">
          <button class="custom-btn" @click="agregarImagen">
            Cargar Quedada Finalizada
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CabeceraQuedadaTerminada from '../../components/QuedadaTerminadaFotos/CabeceraQuedadaTerminada'
import { QBtn } from 'quasar'
import CargarFotos from '../../components/QuedadaTerminadaFotos/CargarFotos'

export default {
  components: {
    CabeceraQuedadaTerminada,
    QBtn,
    CargarFotos
  },
  data () {
    return {
      participants: [
        {
          photo:
            'https://th.bing.com/th/id/OIP.AWm5PRocqyXsiXqmOL06NwHaFj?rs=1&pid=ImgDetMain',
          name: 'Participante 1'
        },
        {
          photo:
            'https://th.bing.com/th/id/OIP.AWm5PRocqyXsiXqmOL06NwHaFj?rs=1&pid=ImgDetMain',
          name: 'Participante 2'
        },
        {
          photo:
            'https://th.bing.com/th/id/OIP.AWm5PRocqyXsiXqmOL06NwHaFj?rs=1&pid=ImgDetMain',
          name: 'Participante 3'
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    agregarImagen () {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.multiple = true // Allow multiple selections

      input.onchange = event => {
        const files = event.target.files
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          // You can add additional validation or processing here (e.g., check file size)
          this.participants.push({
            name: file.name, // Store the file name
            path: URL.createObjectURL(file) // Generate a temporary URL
          })
        }
      }

      input.click()
    }
  }
}
</script>

<style scoped>
.container_general {
  width: 100%;
  min-height: 100vh;
  background: #0065d8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel_central {
  position: relative; /* Añadido para posicionar el botón */
  width: 80%;
  min-height: 1000px;
  padding: 0px 20px 10px 20px;
  border-radius: 15px;
  background-color: #fafafa;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container_titulos {
  margin-top: 50px;
}
.container_agregar_imagen {
  width: 100%;
  padding: 0 130px;
}
.container_btn_confirmacion {
  position: absolute;

  bottom: 0;
  width: 100%;
  height: 70px;
  padding: 0 130px;
  padding-bottom: 80px;
  display: flex;
  align-items: end;
  justify-content: end;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 60px; /* Ajustar tamaño del botón */
  width: 60px; /* Ajustar tamaño del botón */
}

.custom-btn {
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 25px;
  text-transform: uppercase;
  background-color: #f44336;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

.custom-btn:hover {
  background-color: #d32f2f;
}

@media (width < 2058px) {
  .container_agregar_imagen {
  width: 100%;
  padding: 0 20px;
}
}
@media (width < 1642px) {
  .container_btn_confirmacion {
  padding: 0 20px;
  padding-bottom: 80px;
}
}
</style>
