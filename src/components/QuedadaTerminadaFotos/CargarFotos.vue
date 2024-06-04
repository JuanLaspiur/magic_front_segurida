<template>
  <div class="photos-container">
    <div class="photos-grid">
      <div class="photo-card" v-for="(participant, index) in participants" :key="index" @click="openModal(participant.photo, participant.name, index)">
        <img :src="participant.photo" :alt="participant.name" class="photo" />
        <span class="participant-name">{{ participant.name }}</span>
      </div>
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
export default {
  name: 'CargarFotos',
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
        this.selectedPhoto = this.participants[this.selectedIndex].photo
        this.selectedName = this.participants[this.selectedIndex].name
      }
    },
    nextImage () {
      if (this.selectedIndex < this.participants.length - 1) {
        this.selectedIndex++
        this.selectedPhoto = this.participants[this.selectedIndex].photo
        this.selectedName = this.participants[this.selectedIndex].name
      }
    }
  }
}
</script>

<style scoped>

.photos-container {
  display: flex;
  justify-content: center;
}

.photos-grid {
  display: flex;
  margin-top: 20px;
  gap:30px;
  padding: 0 15%;
}

.photo-card {
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

@media (width < 1642px) {
  .photo-card {
  width: 345px;
  height: 213.7px; /* Golden ratio height based on width */
}
}
</style>
