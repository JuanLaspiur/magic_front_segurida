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
          <p class="text " style="margin-top: -20px">
            Comparte tus mejores momentos y fotos en nuestra red social para que
            todos puedan ver lo genial que fue tu quedada. ¡Estamos ansiosos por
            ver tus recuerdos!
          </p>
          <p class="text no-movile" style="margin-top: -53px">
            ¡Gracias por ser parte de nuestra comunidad y hacer que cada momento
            sea especial!
          </p>
         </div>
        <div class="container_agregar_imagen">
          <button class="custom-btn" @click="agregarImagen">
            Agregar Imagen
          </button>
        </div>
        <!--CargarFotos :participants="participants" /-->
        <!--Componente importado-->
        <div class="photos-container">
          <div class="photos-grid">
            <div
              class="photo-card"
              v-for="(participant, index) in participants"
              :key="index"
              @click="openModal(participant.photo, participant.name, index)"
            >
              <button class="delete-btn" @click.stop="removeImage(index)">
                ✖
              </button>
              <img
                :src="participant.photo"
                :alt="participant.name"
                class="photo"
              />
              <span class="participant-name">{{ participant.name }}</span>
            </div>
          </div>
          <div v-if="modalOpen" class="modal">
            <div class="modal-content">
              <span class="close" @click="closeModal">&times;</span>
              <img
                :src="selectedPhoto"
                :alt="selectedName"
                class="modal-image"
              />
              <div class="participant-name">{{ selectedName }}</div>
              <div class="modal-buttons">
                <button class="prev" @click="prevImage">Anterior</button>
                <button class="next" @click="nextImage">Siguiente</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Componente importado-->
        <div class="container_btn_confirmacion">
          <button class="custom-btn" @click="cargarQuedadaFinalizada">
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
// import CargarFotos from '../../components/QuedadaTerminadaFotos/CargarFotos'

export default {
  components: {
    CabeceraQuedadaTerminada,
    QBtn
  },
  data () {
    return {
      participants: [],
      reader: new FileReader()
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

          // Optional validation (adjust as needed)
          if (file.size > 1024 * 1024 * 5) {
            // 5MB limit (adjust as needed)
            console.warn(`File "${file.name}" exceeds the size limit of 5MB.`)
            continue // Skip processing this large file
          }

          this.reader.readAsDataURL(file) // Read the file as data URL for preview

          this.reader.onload = e => {
            this.participants.push({
              name: file.name,
              photo: e.target.result // Store the data URL for preview
            })
          }
        }
      }

      input.click()
    },
    removeImage (index) {
      this.participants.splice(index, 1)
    },
    openModal (photo, name, index) {
      // componente importado
      this.selectedPhoto = photo
      this.selectedName = name
      this.selectedIndex = index
      this.modalOpen = true
    },
    closeModal () {
      // componente importado
      this.modalOpen = false
    },
    prevImage () {
      // componente importado
      if (this.selectedIndex > 0) {
        this.selectedIndex--
        this.selectedPhoto = this.participants[this.selectedIndex].photo
        this.selectedName = this.participants[this.selectedIndex].name
      }
    },
    nextImage () {
      // componente importado
      if (this.selectedIndex < this.participants.length - 1) {
        this.selectedIndex++
        this.selectedPhoto = this.participants[this.selectedIndex].photo
        this.selectedName = this.participants[this.selectedIndex].name
      }
    },
    async cargarQuedadaFinalizada () {
      if (!this.participants.value.length) {
        return // No images to upload
      }

      try {
        const formData = new FormData()
        for (const participant of this.participants) {
          const file = participant.photo // Assuming 'photo' is the file object
          formData.append('imagenes_quedada', file)
        }

        const response = await this.$api.post(
          'cargarImagenesQuedadaTerminada',
          formData
        )
        const responseData = await response.json()

        if (
          responseData.message ===
          'Imágenes cargadas y convertidas a WebP con éxito'
        ) {
          // Handle successful upload
          console.log('Images uploaded and converted successfully')
        } else {
          console.error(
            'Error uploading and converting images:',
            responseData.message
          )
        }
      } catch (error) {
        console.error('Error uploading images:', error)
      }
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
.container_titulos .text {
  font-size: 25px;
 padding: 20px 0;
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
/* componente importado */

.photos-container {
  display: flex;
  justify-content: center;
}

.photos-grid {
  display: flex;
  margin-top: 20px;
  gap: 30px;
  padding: 0 15%;
}

.photo-card {
  position: relative;
  width: 390px;
  height: 240.9;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.photo-card:hover {
  transform: scale(1.05);
}

.photo {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.participant-name {
  display: block;
  padding: 10px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

/* Modal */
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  position: relative;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-image {
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 10px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.prev,
.next {
  font-size: 13px;
  padding: 8px 15px;
  border-radius: 25px;
  background-color: #f44336;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.prev:hover,
.next:hover {
  background-color: #d32f2f;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.delete-btn:hover {
  background-color: rgba(255, 0, 0, 0.9);
}

@media (width < 1642px) {
  .photo-card {
    width: 345px;
    height: 213.7px; /* Golden ratio height based on width */
  }
}
@media (width < 1500px){
  .container_btn_confirmacion {
    padding: 0 20px;
    padding-bottom: 50px;
  }
}
@media (width < 1088px){
  .panel_central {
    width: 87%;
  }
  .container_titulos .text {
    font-size: 19px;
  }
  .no-movile {
    display: none;
  }
  .container_btn_confirmacion {
    padding: 0 20px;
    padding-bottom: 30px;
  }
}
</style>
