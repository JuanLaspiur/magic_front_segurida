<template>
  <div class="photos-container">
    <div class="carousel-wrapper">
      <carousel :per-page="1">
        <slide v-for="(group, index) in photoGroups" :key="index">
          <div class="photos-grid">
            <div
              v-for="(participant, idx) in group"
              :key="idx"
              class="photo-card"
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
  computed: {
    photoGroups () {
      const groups = []
      const groupSize = window.innerWidth <= 572 ? 2 : 9 // Define el tamaño del grupo basado en el ancho de la pantalla
      for (let i = 0; i < this.participants.length; i += groupSize) {
        groups.push(this.participants.slice(i, i + groupSize))
      }
      return groups
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
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  margin-top: 20px;
  justify-content: center;
  padding: 0 15%;
}

.photo-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  width: 300px;
  height: 240px;
  z-index: 999;
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

@media (max-width: 572px) {
  .photos-grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .photo-card {
    width: 100%;
  }
}
</style>
