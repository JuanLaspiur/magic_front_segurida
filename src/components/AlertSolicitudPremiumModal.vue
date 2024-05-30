<template>
  <div v-if="visible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <img src="../assets/logo_final_png-02.png" alt="Logo" class="modal-logo">
      <h3 class="modal-title">{{ title }}</h3>
      <p class="modal-message">{{ message }}</p>
      <button class="close-button" @click="close">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertSolicitudPremiumModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Mensaje'
    },
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index:999999;
}

.modal-content {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-logo {
  width: 150px;
  margin-bottom: 20px;
}

.modal-title {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
  font-size: 24px;
}

.modal-message {
  margin-bottom: 20px;
  color: #666;
}

.close-button {
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #d32f2f;
}
</style>
