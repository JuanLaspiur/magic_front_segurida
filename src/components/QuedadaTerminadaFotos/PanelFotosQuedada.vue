<template>
  <div class="photos-container">
    <div class="photos-grid">
      <div
        v-for="(participant, index) in participants"
        :key="index"
        class="photo-card"
      >
        <img :src="participant.photo" :alt="participant.name" class="photo" />
        <span class="participant-name">{{ participant.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelFotosQuedada',
  props: {
    participants: {
      type: Array,
      required: true
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
}

.photo-card {
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
}
@media (max-width: 572px) {
  .photos-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
