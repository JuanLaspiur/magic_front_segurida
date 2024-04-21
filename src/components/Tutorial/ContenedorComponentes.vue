<template>
  <div>
    <Tutorial v-if="isAnchoSuficienteGrande" :user="user" />
    <TutorialMovile v-if="isAnchoSuficiente" :user="user" />
  </div>
</template>

<script>
import Tutorial from './Tutorial'
import TutorialMovile from './TutorialMovile'

export default {
  props: {
    user: {
      type: Object
    }
  },
  components: {
    Tutorial,
    TutorialMovile
  },
  computed: {
    isAnchoSuficiente () {
      return window.innerWidth <= 1080
    },
    isAnchoSuficienteGrande () {
      return window.innerWidth > 1080
    }
  }
}
</script>

<style>
/* Inicialmente, oculta los componentes */
.Tutorial,
.TutorialMovile {
  display: none;
}

/* Establece la transición */
.Tutorial,
.TutorialMovile {
  transition: opacity 0.5s ease;
}

/* Cuando los componentes están visibles, establece su opacidad a 1 */
.Tutorial.visible,
.TutorialMovile.visible {
  opacity: 1;
}
</style>
