<template>
  <div class="page-background">
    <!--##### MOBILE -->
    <div v-if="smAndDown" class="page-content" style="border-radius: 30px;">
        <div class="page-content__header-m d-flex align-center">
          <img
              class="page-content__theme-title-m ml-12"
              src="~/static/img/conexoes-title.png"
            />
        </div>

        <div class="page-content-mobile d-flex flex-column justify-space-between">
          <div class="d-flex flex-column align-center">
            <img
              class="page-content__theme-m mt-2"
              src="~/static/img/conexoes-text-mobile.png"
            />

            <YSubscriptionForm
              class="mt-5"
              button-title="Faça seu Chek-in"
              submit-button-title="Embarcar!"
              :is-mobile="smAndDown"
              :states="allStates"
              :cities="allCities"
            />
          </div>

          <img
            class="page-content__theme-infos-m ml-4"
            src="~/static/img/conexoes-infos-mobile.png"
          />

          <img
            class="page-content__theme-code-m ml-4"
            src="~/static/img/conexoes-code-mobile.png"
          />
        </div>
    </div>

    <!--##### WEB -->
    <div v-else class="page-content" style="border-radius: 60px;">
        <div class="page-content__header-w d-flex align-center">
          <img
              class="page-content__theme-title-w ml-12"
              src="~/static/img/conexoes-title.png"
            />
        </div>

        <div class="page-content-web d-flex justify-space-between">
          <div class="d-flex flex-column align-center">
            <img
              class="page-content__theme-w mt-2"
              src="~/static/img/conexoes-text.png"
            />

            <!-- <button
              v-if="showButton"
              class="button button__subscribe-w mt-16 mr-6"
              @click="subscribe()"
              >
                Faça seu Chek-in
            </button> -->
            
            <YSubscriptionForm
              class="mt-5"
              button-title="Faça seu Chek-in"
              submit-button-title="Embarcar!"
              :is-mobile="smAndDown"
              :states="allStates"
              :cities="allCities"
            />
          </div>

          <img
            class="page-content__theme-infos-w mt-2"
            src="~/static/img/conexoes-infos.png"
          />
        </div>

        
    </div>
  </div>
  
</template>

<script>
import statesAndCities from '~/static/json/estados-cidades.json'
import { supabase } from "~/plugins/supabase";

const ACTUAL_CONECXAO = 5;

export default {
  name: 'YspLeadsIndex',
  async asyncData({ $axios }) {
    const allStatesOfBrazil = await $axios.$get(
      `${process.env.brasilApi}ibge/uf/v1`
    )
    return { allStatesOfBrazil }
  },
  data() {
    return {
      
      followBoxMobile: true,
      
      allStates: [],
      allCities: [],
      oldLeads: [],
    }
  },
  computed: {
    smAndUp() {
      return this.$vuetify.breakpoint.smAndUp
    },
    mdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    xsOnly() {
      return this.$vuetify.breakpoint.xsOnly
    },
  },
  watch: {
    'form.state'(paylod) {
      if (paylod) {
        const chosenState = this.allStates.find(
          (state) => state.value === paylod
        )
        this.form.city = ''
        this.getAndSetCitiesByStateCodeAsync(chosenState)
      }
    },
    'form.name'(payload) {
      if(payload) {
        console.log(this.oldLeads.filter(lead => lead.name.toLowerCase().includes(payload.toLowerCase())))
      }
    }
  },
  mounted() {
    this.allStates = this.formatDataFromIbge(this.allStatesOfBrazil)
    // this.getLeadsAsync();
    // this.sendAnalyticsData()
  },
  methods: {
    async getLeadsAsync() {

          const { data } = await supabase
              .from("leads")
              .select(`*`)
            this.oldLeads = this.organizeLeads(data.filter(lead => lead.conexao !== ACTUAL_CONECXAO))
            // console.log(this.oldLeads);
    },
    subscribe() {
      this.sendAnalyticsData('button_subscribe')
      this.showButton = false
    },
    formatDataFromIbge(states) {
      return states.reduce((acc, state) => {
        return [
          ...acc,
          {
            value: state.nome,
            short: state.sigla,
            id: state.id,
          },
        ]
      }, [])
    },
    getAndSetCitiesByStateCodeAsync(state) {
      try {
        // const { data } = await this.$axios.get(
        // `${process.env.ibgeApi}localidades/estados/${state.id}/municipios`
        // )
        // this.allCities = this.formatDataFromIbge(data)
        this.getStaticCities(state)
      } catch (err) {
        console.error(err)
      }
    },
    getStaticCities(stateSelected) {
      const cities = statesAndCities.estados.filter(
        (state) => state.sigla === stateSelected.short
      )[0]
      const formattedCities = cities.cidades.map((city, index) => {
        return {
          id: index,
          value: city,
        }
      })
      this.allCities = formattedCities
    },
    validate() {
      if (!this.form.name) {
        this.$toast.open({
          message: 'Por favor preencha seu nome completo',
          type: 'warning',
        })
        return false
      }
      if (!this.form.email) {
        this.$toast.open({
          message: 'Por favor preencha seu email',
          type: 'warning',
        })
        return false
      }
      const regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!this.form.email.match(regexEmail)) {
        this.$toast.open({
          message: 'Por favor insira um email válido',
          type: 'warning',
        })
        return false
      }
      // if(!this.form.state) {
      //   this.$toast.open({message: "Por favor selecione seu estado", type: "warning"})
      //   return false
      // }
      // if(!this.form.city) {
      //   this.$toast.open({message: "Por favor selecione sua cidade", type: "warning"})
      //   return false
      // }
      return true
    },
    getDataToSubmit() {
      return {
        name: this.form.name,
        email: this.form.email.toLowerCase(),
        state: this.form.state,
        city: this.form.city,
      }
    },
    handleSubmit(deviceType) {
      if (!this.isSubscribed && this.validate()) {
        try {
          this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
          this.$axios.post('leads', {
            ...this.getDataToSubmit(),
            device: deviceType,
          })
          this.isSubscribed = true
        } catch (err) {
          this.$toast.open({
            message: 'Falha ao enviar dados, por favor tente novamente.',
            type: 'error',
          })
        }
      }
    },
    sendAnalyticsData(typeData = 'page_read') {
      try {
        // const deviceType = this.smAndDown ? 'mobile' : 'web'
        // this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
        // this.$axios.post('analytics', { type: typeData, device: deviceType })
      } catch (err) {
        console.error(err)
      }
    },
    shareViaWhatsApp() {
      let header = 'Oi oi, tudo bem? :)'
      const name = this.form.name?.split(' ')[0]
      if (name) header = `Oi oi, aqui é ${this.form.name.split(' ')[0]} :)`
      const message = window.encodeURIComponent(`${header}
      👋 Vim te convidar para a 4ª Conexão Centro Oeste, com o tema A Primavera que existe em você!"
      Conheça experiências e lições de vida de jovens, e saiba como eles superam os desafios da vida com o florescer da juventude!
      📆 Domingo, 26 de setembro, às 16 hrs (Brasília) e 15 hrs (MS e MT)
      
      Inscreva-se agora pelo link: https://https://conexaoco.vercel.app/`)
      window
        .open(`https://api.whatsapp.com/send?text=${message}`, '_blank')
        .focus()
      this.sendAnalyticsData('share_whatsapp')
    },
    followInstagram() {
      window
        .open('https://www.instagram.com/ysplatinamerica/', '_blank')
        .focus()
    },
    followFacebook() {
      window.open('https://www.facebook.com/ysplatinamerica', '_blank').focus()
    },
  },
}
</script>

<style lang="scss" scoped>
$color-primary:  #3cb4e5;
$color-primary-dark:  #011e41;
$color-primary-light:  #082a53;
$color-secondary: #f0f1f1;
$color-tertiary: #e78f12;

.page-background {
  background: url(https://i.ibb.co/QPw4c79/mapa.png) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;

  @media (max-width: 600px ) {
    background: url(https://i.ibb.co/QPw4c79/mapa.png) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100%;
  }
}

.page-content {
    background-color: $color-secondary;
    height: 88vh;
    margin-top: 4vh;
    margin-left: 4vw;
    margin-right: 4vw;
    
    &-web {
      margin-top: 1vh;
      margin-left: 2vw;
      margin-right: 3vw;
    }

    &-mobile {
      margin-top: 1vh;
      margin-left: 2vw;
      margin-right: 3vw;
    }

    &__header {
      &-w {
        height: 20vh;
        width: 100%;
        background-color: $color-primary-dark;
        border-top-left-radius: 60px;
        border-top-right-radius: 60px;
      }
      &-m {
        height: 16vh;
        width: 100%;
        background-color: $color-primary-dark;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
      }
    }

    &__theme {
        &-w {
            height: 14vh;
            width: 52vw;
        }
        &-m {
            height: 12vh;
            width: 75vw;
            max-width: 420px;
        }
    }

    &__theme-title {
        &-w {
            height: 14.6vh;
            width: 336px;
        }
        &-m {
            height: 66px;
            width: 226px;
        }
    }

    &__theme-infos {
        &-w {
            height: 240px;
            width: 246px;
        }
        &-m {
            height: 74px;
            width: 296px;
            position: absolute;
            bottom: 20vh;
        }
    }

    &__theme-code {
        &-w {
            height: 14.6vh;
            width: 336px;
        }
        &-m {
            height: 42px;
            width: 186px;
            position: absolute;
            bottom: 10vh;
        }
    }
}

</style>