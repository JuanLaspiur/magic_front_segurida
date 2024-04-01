<template><div></div></template>

<script>
export default {
  props: {
    showModal: Boolean,
    editedCategory: Object
  },
  data () {
    return {
      // No necesitas una variable local para manejar el estado del modal aquí
    }
  },
  watch: {
    showModal (newValue) {
      // No necesitas manejar el cambio de la prop aquí
    }
  },
  methods: {
    handleCloseModal () {
      this.$emit('close-modal')
    }
  }
}
</script>
