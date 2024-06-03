<template>
  <div class="full-width q-my-md">
    <!-- botones USUARIO creador -->
    <q-btn
      no-caps
      dense
      color="primary"
      class="full-width"
      @click="modificar(quedada)"
      v-if="user && user._id === quedada.user_id"
    >
      <div class="row items-center no-wrap">
        <q-icon left name="edit" />
        <div class="text-center">Editar Plan</div>
      </div>
    </q-btn>
    <q-btn
      no-caps
      dense
      color="negative"
      class="full-width q-mt-sm"
      @click="cancelarPlan(quedada)"
      v-if="user && quedada && user._id === quedada.user_id"
    >
      <div class="row items-center no-wrap">
        <q-icon left name="close" />
        <div class="text-center">Cancelar Plan</div>
      </div>
    </q-btn>

    <!-- botones PARTICIPANTE -->
    <div v-if="quedada.privacy === 'Premium'">
      <q-btn
        v-if="
          user &&
          user._id !== quedada.user_id &&
          quedada.asistentes.length < quedada.limit &&
          !quedada.asistentes.find(v => v.user_id === user._id) &&
          !quedada.solicitudesDeParticipacion.includes(user._id)
        "
        no-caps
        dense
        style="background-color: #f44336; color: white"
        class="full-width"
        @click="solicitarAsistencia(quedada, true)"
      >
        <div class="row items-center no-wrap">
          <div class="text-center">Solicitar participación</div>
        </div>
      </q-btn>
      <!-- confirmar asistencia -->
      <q-btn
        v-else-if="
          user &&
          user._id !== quedada.user_id &&
          quedada.asistentes.length < quedada.limit &&
          !quedada.solicitudesDeParticipacion.includes(user._id)
        "
        no-caps
        dense
        style="background-color: #0065d8; color: white"
        class="full-width"
        @click="asistir(quedada, true)"
      >
        <div class="row items-center no-wrap">
          <q-icon left name="thumb_up_off_alt" />
          <div class="text-center">Asistir</div>
        </div>
      </q-btn>
      <!-- Dejar plan -->
      <q-btn
        v-else-if="user && user._id !== quedada.user_id"
        no-caps
        dense
        color="negative"
        class="full-width"
        @click="dejarPlan(quedada, false)"
      >
        <div class="row items-center no-wrap">
          <q-icon left name="close" />
          <div class="text-center">Dejar Plan</div>
        </div>
      </q-btn>
    </div>

    <!-- botones quedada común -->
    <div v-else>
      <q-btn
        no-caps
        dense
        style="background-color: #0065d8; color: white"
        class="full-width"
        @click="asistir(quedada, true)"
        v-if="
          user &&
          user._id !== quedada.user_id &&
          quedada.asistentes.length < quedada.limit
        "
      >
        <div class="row items-center no-wrap">
          <q-icon left name="thumb_up_off_alt" />
          <div class="text-center">Asistir</div>
        </div>
      </q-btn>
      <q-btn
        no-caps
        dense
        color="negative"
        class="full-width"
        @click="dejarPlan(quedada, false)"
        v-else-if="
          quedada.status !== 2 &&
          user._id !== quedada.user_id &&
          quedada.asistentes.find(v => v.user_id === user._id)
        "
      >
        <div class="row items-center no-wrap">
          <q-icon left name="close" />
          <div class="text-center">Dejar Plan</div>
        </div>
      </q-btn>
    </div>

    <!-- botones fin PARTICIPANTE -->
  </div>
</template>
<script></script>
<style></style>
