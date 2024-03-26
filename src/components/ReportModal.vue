<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">Reportar evento</div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-mx-lg">
      <div>Indícanos el motivo para que podamos mejorar tu feed.</div>
      <q-option-group
        v-model="group"
        :options="options"
        color="primary"
        @input="handleOption"
      />
      <q-input
        v-if="group === 'otro'"
        v-model="form.reason"
        outlined
        placeholder="Detalla más sobre el problema."
        type="textarea"
      />
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="Cancelar" color="negative" @click="handleCancel" />
      <q-btn flat label="Enviar" color="primary" @click="handleSubmit" />
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
  props: ['reportData'],
  data () {
    return {
      group: null,
      options: [
        {
          label: 'Contenido sexual',
          value: 'Contenido sexual'
        },
        {
          label: 'Contenido violento o repulsivo',
          value: 'Contenido violento o repulsivo'
        },
        {
          label: 'Contenido abusivo o que incita al odio.',
          value: 'Contenido abusivo o que incita al odio.'
        },
        {
          label: 'Actividades peligrosas o dañinas',
          value: 'Actividades peligrosas o dañinas'
        },
        {
          label: 'Contenido engañoso o spam',
          value: 'Contenido engañoso o spam'
        },
        {
          label: 'Otro',
          value: 'otro'
        }
      ],
      form: {
        id: this.reportData.quedada_id,
        reason: ''
      }
    }
  },
  methods: {
    handleOption () {
      if (this.group !== 'otro') {
        this.form.reason = this.group
      } else {
        this.form.reason = ''
      }
    },
    handleCancel () {
      this.$emit('close')
      this.form = {}
      this.group = null
    },
    async handleSubmit () {
      const res = this.$api.patch(`reportar/${this.form.id}`, {
        reason: this.form.reason,
        reportingUser: this.reportData.userObj,
        date: this.reportData.date
      })
      if (res) {
        this.$q.notify({
          message: 'Gracias por avisarnos',
          color: 'positive'
        })
        this.$router.push('/inicio')
      }
    }
  }
}
</script>
<style lang="">

</style>
