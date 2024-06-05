<template>
  <div class="photos-container">
    <div class="carousel-wrapper">
      <carousel :per-page="calculatePerPage()">
        <slide v-for="(group, index) in photoGroups" :key="index">
          <div class="photos-grid">
            <div
              v-for="(participant, idx) in group"
              :key="idx"
              class="photo-card"
              @click="openModal(participant.photo, participant.name, idx)"
            >
              <img
                :src="participant.photo"
                :alt="participant.name"
                class="photo"
              />
              <span class="participant-name">{{ participant.name }}</span>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
    <div v-if="modalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <img :src="selectedPhoto" :alt="selectedName" class="modal-image" />
        <div class="participant-name">{{ selectedName }}</div>
        <div class="modal-buttons">
          <button class="prev" @click="prevImage">Anterior</button>
          <button class="next" @click="nextImage">Siguiente</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'PanelFotosQuedada',
  components: {
    Carousel,
    Slide
  },
  props: {
    participants: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      modalOpen: false,
      selectedPhoto: '',
      selectedName: '',
      selectedIndex: 0
    }
  },
  computed: {
    photoGroups () {
      const groups = []
      const groupSize = this.calculatePerPage()
      for (let i = 0; i < this.participants.length; i += groupSize) {
        groups.push(this.participants.slice(i, i + groupSize))
      }
      return groups
    }
  },
  methods: {
    openModal (photo, name, index) {
      this.selectedPhoto = photo
      this.selectedName = name
      this.selectedIndex = index
      this.modalOpen = true
    },
    closeModal () {
      this.modalOpen = false
    },
    prevImage () {
      if (this.selectedIndex > 0) {
        this.selectedIndex--
        this.selectedPhoto = this.photoGroups.flat()[this.selectedIndex].photo
        this.selectedName = this.photoGroups.flat()[this.selectedIndex].name
      }
    },
    nextImage () {
      if (this.selectedIndex < this.photoGroups.flat().length - 1) {
        this.selectedIndex++
        this.selectedPhoto = this.photoGroups.flat()[this.selectedIndex].photo
        this.selectedName = this.photoGroups.flat()[this.selectedIndex].name
      }
    },
    calculatePerPage () {
      const screenWidth = window.innerWidth
      if (screenWidth <= 572) {
        return 1
      } else if (screenWidth <= 900) {
        return 2
      } else {
        return 3
      }
    }
  }
}
</script>

<style scoped>
.photos-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.carousel-wrapper {
  width: auto;
  display: flex;
  justify-content: center;
}

.carousel {
  position: relative;
  width: auto;
  display: flex;
  justify-content: center;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 8px;
  margin-top: 20px;
  justify-content: center;
  padding: 0 15%;
}

.photo-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
    max-width: 100vw;
}

.photo-card:hover {
  transform: scale(1.05);
}

.photo {
  width: 100%;
  height: 100%;
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

@media screen and (max-width: 768px) {
  .carousel {
    position: relative;
  }
  .photos-container {
    width: 100vw;
  }
  .photos-grid {
    padding: 0 10px; /* Reducir el relleno */
    display: flex;
    align-items: center;
    grid-template-columns: repeat(
      auto-fill,
      minmax(100%, 1fr)
    ); /* Cambiar el número de columnas según el ancho */
  }
  .photo-card {
    width: calc(100% - 16px); /* Hacer que las tarjetas ocupen todo el ancho */
  }
  .photo {
    width: 100%;
    height: auto; /* Permitir que la altura se ajuste automáticamente */
  }
}

@media (width > 1000px) {
  .photo-card {
  width: 350px;
  height: 217px;
}
}
</style>
