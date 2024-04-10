<template>
  <div class="q-pa-lg" style="padding: 90px">
    <h4>Gestión de insignas</h4>
    <TablaUsuariosInsigna />
    <UsuariosConInsigna />
  </div>
</template>

<script>
import TablaUsuariosInsigna from '../../components/insignas/TablaUsuariosInsigna'
import UsuariosConInsigna from '../../components/insignas/UsuariosConInsigna'

export default {
  components: {
    TablaUsuariosInsigna,
    UsuariosConInsigna
  }
}
</script>

<style></style>
