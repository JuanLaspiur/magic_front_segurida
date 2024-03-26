<template>
  <div class="container">
    <div class="colum_2 ">
        <div v-if="data.length" class="q-py-md">
          <div v-for="(item, index) of data" :key="index" class="q-mb-sm" >
              <q-card>
                  <q-item clickable v-ripple @click="$router.push('/chat_mediacion/' + item._id)">
                      <q-item-section avatar>
                          <q-avatar size="50px">
                              <q-img :src="item.user1 === user._id ? baseu + item.user2 : baseu + item.user1" class="full-height"/>
                          </q-avatar>
                      </q-item-section>

                      <q-item-section>
                          <q-item-label class="text-subtitle1 text-bold ellipsis-2-lines">{{item.user_id === user._id ? item.otherInfo ? item.otherInfo.name + ' ' + (item.otherInfo.last_name? item.otherInfo.last_name : '') : '' : item.userInfo ? item.userInfo.name + ' ' + (item.otherInfo.last_name? item.otherInfo.last_name : '') : ''}}</q-item-label>
                          <q-item-label caption class="ellipsis-2-lines">{{item.description}}</q-item-label>
                      </q-item-section>

                      <q-item-section side top>
                          <q-item-label caption>{{item.date}}</q-item-label>
                      </q-item-section>

                      <div class="absolute-bottom-right q-pr-md">
                          <div class="text-primary text-caption">{{item.status === 1 ? 'Pendiente' : item.status === 2 ? 'Activa' : 'Finalizada'}}</div>
                      </div>
                  </q-item>
              </q-card>
          </div>
      </div>
      <div v-else class="text-center q-py-lg">No hay mediaciones</div>
    </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      user: {},
      data: []
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'perfil_img/'
    this.getUser()
    this.getRecords()
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.user = v
        }
      })
    },
    getRecords () {
      this.$api.get('mediacion_by_user_id').then(res => {
        if (res) {
          this.data = res
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
