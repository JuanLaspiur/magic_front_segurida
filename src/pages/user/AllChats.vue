<template>
    <div class="inicio_container">
      <div class="inicio_col_left">
        <SideBar/>
      </div>
      <div class="inicio_col_right">
        <div class="fixed">
          <RightSidebar />
        </div>
      </div>
      <div class="inicio shadow-1 " style="height: 100vh" >
        <q-header class="bg-priamry">
          <q-toolbar class="row justify-between text-black">
              <div class="row no-wrap">
                <q-btn flat @click="$router.go(-1)" color="white" round dense icon="arrow_back"/>
                  <q-item class="q-pl-sm text-white">
                    <q-item-section avatar >
                            <q-avatar size="40px">
                                <q-img :src="user._id ? baseuPerfil + user._id : ''" class="full-height"/>
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label class="text-h6 text-bold ellipsis-2-lines">Sala de chat</q-item-label>
                        </q-item-section>
                    </q-item>
              </div>
              <div>
                <q-input style="" v-model="filter" dark outlined placeholder="Buscar" @input="filterFn(filter)">
                    <template v-slot:append>
                        <q-icon name="search" color="white" />
                    </template>
                </q-input>
              </div>
            </q-toolbar>
        </q-header>

        <div v-if="chats.length" class="q-py-md">
            <div v-for="(item, index) of chatsSorted" :key="index" class="q-ma-sm " style="border-radius: 10px">
                <q-item clickable v-ripple @click="$router.push('/chat/' + item._id)">
                    <q-item-section avatar>
                      <q-avatar size="50px">
                        <q-img :src="item.privado ? baseuPerfil + item.user_principal : baseuQuedada + item.evento_id" class="full-height"/>
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label class="text-subtitle1 text-bold ellipsis-2-lines">{{item.full_name}}</q-item-label>
                        <q-item-label class="text-grey-7 ellipsis">{{item.last_message}}</q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption>{{item.date}}</q-item-label>
                    </q-item-section>
                </q-item>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import env from '../../env'
import SideBar from './SideBar.vue'
import RightSidebar from './RightSidebar.vue'
export default {
  components: { SideBar, RightSidebar },
  data () {
    return {
      baseuPerfil: '',
      baseuQuedada: '',
      filter: '',
      user: {},
      allChats: [],
      chats: [],
      chatsSorted: []
    }
  },
  async mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    await this.getUser()
    await this.getChats()
  },
  watch: {
    chats: {
      handler (newValue, old) {
        this.sortChats(newValue)
      }
    }
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user = res
        }
      })
    },
    getChats () {
      this.$q.loading.show({
        message: 'Cargando datos...'
      })
      this.$api.get('all_chats').then(res => {
        if (res) {
          this.allChats = res
          this.chats = res
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    filterFn (val) {
      if (val === '') {
        this.chats = this.allChats
      } else {
        const needle = val.toLowerCase()
        this.chats = this.allChats.filter(v => v.full_name.toLowerCase().indexOf(needle) > -1)
      }
    },
    sortChats (arr) {
      this.chatsSorted = [...arr]
      this.chatsSorted.sort((a, b) => {
        const dateA = new Date(a.updated_at)
        const dateB = new Date(b.updated_at)
        return dateB - dateA
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .bordes {
    border: 3px solid $accent;
  }
  @import url(../../scss/user/AllChats.scss);
</style>
