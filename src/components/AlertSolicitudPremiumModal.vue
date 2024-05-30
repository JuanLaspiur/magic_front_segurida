<template>
  <div v-if="visible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <button @click="close">Cerrar</button>
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
}
.modal-content {
  background: rgb(216, 47, 47);
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}
</style>
