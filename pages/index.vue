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
              class="page-content__subscription-form-m mb-8"
              button-title="Faça seu Chek-in"
              submit-button-title="Embarcar!"
              :is-mobile="smAndDown"
              :states="allStates"
              :cities="allCities"
              :names="leadNames"
              :is-subscribed="isSubscribed"
              :selected-lead="selectedLead"
              @chosedState="getAndSetStaticCities"
              @submitForm="handleSubmit"
              @selectedName="searchSelectedLead"
            />
          </div>

          <img
            class="page-content__theme-infos-m mb-10 ml-4"
            src="~/static/img/conexoes-infos-mobile.png"
          />

          <img
            class="page-content__theme-code-m mb-5 ml-4"
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

      <v-row class="page-content-web" justify="space-between">
        <v-col cols="9" class="d-flex flex-column">
          <img
            class="page-content__theme-w mt-2"
            src="~/static/img/conexoes-text.png"
          />
          
          <YSubscriptionForm
            class="page-content__subscription-form-w d-flex justify-center ml-4"
            button-title="Faça seu Chek-in"
            submit-button-title="Embarcar!"
            :is-mobile="smAndDown"
            :states="allStates"
            :cities="allCities"
            :names="leadNames"
            :is-subscribed="isSubscribed"
            :selected-lead="selectedLead"
            @chosedState="getAndSetStaticCities"
            @submitForm="handleSubmit"
            @selectedName="searchSelectedLead"
          />
        </v-col>

        <v-col cols="3">
            <img 
              class="page-content__theme-infos-w mt-2"
              src="~/static/img/conexoes-infos.png"
            />

            <img
              class="page-content__theme-code-w"
              src="~/static/img/conexoes-code-mobile.png"
            />
        </v-col>
      </v-row>
    </div>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h6" style="color: #011e41;">
            Erro de cadastro!
        </v-card-title>
        <v-card-text>O email -{{errorLead.email}}- já está cadastrado com o nome -{{errorLead.name}}-. Deseja usar este email para atualizar o cadastro?</v-card-text>
        <v-card-actions>
            <v-btn
                color="#3cb4e5"
                text
                @click="dialog = false"
            >
                Usar outro e-mail
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                color="#3cb4e5"
                text
                @click="useSelectedLeadEmail"
            >
                Usar este e-mail
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  
</template>

<script>
import YSubscriptionForm from '~/components/YSubscriptionForm'
import statesAndCities from '~/static/json/estados-cidades.json'
// import { supabase } from "~/plugins/supabase";
import sharedFunctions from '~/shared/mixins/sharedFunctions.mixin'

const ACTUAL_CONECXAO = 5;

export default {
  name: 'YspLeadsIndex',
  components: {
    YSubscriptionForm,
  },
  mixins: [sharedFunctions],
  async asyncData({ $axios }) {
    const allStatesOfBrazil = await $axios.$get(
      `${process.env.brasilApi}ibge/uf/v1`
    )
    return { allStatesOfBrazil }
  },
  data() {
    return {
      isSubscribed: false,
      followBoxMobile: true,
      dialog: false,
      errorLead: {
        name: '',
      },
      selectedLead: {},
      allStates: [],
      allCities: [],
      oldLeads: [],
      leadNames: [],
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
  async mounted() {
    this.getAndSetStaticStates();
    await this.getAllLeadsAsync();
    this.leadNames = this.oldLeads.reduce((acc, cur) => { return [...acc, cur.name]}, [])
    // this.sendAnalyticsData()
  },
  methods: {
    async getAllLeadsAsync() {
        const allLeads = await this.getLeadsAsync();
        this.oldLeads = allLeads.filter(lead => lead.conexao !== ACTUAL_CONECXAO);
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
    async getAndSetCitiesByStateCodeAsync(state) {
      try {
        const { data } = await this.$axios.get(
          `${process.env.ibgeApi}localidades/estados/${state.id}/municipios`
        )
        this.allCities = this.formatDataFromIbge(data)
      } catch (err) {
        console.error(err)
      }
    },
    getAndSetStaticStates() {
      this.allStates = statesAndCities.estados.map((state, index) => {
        return {
          id: index,
          short: state.sigla,
          value: state.nome,
        }
      })
    },
    getAndSetStaticCities(stateSelected) {
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
    getDataToSubmit(form) {
      return {
        name: form.name,
        email: form.email.toLowerCase(),
        state: form.state,
        city: form.city,
        conexao: ACTUAL_CONECXAO,
      }
    },
    searchSelectedLead(leadName) {
      const selectedLead = this.oldLeads.filter(lead => lead.name.toLowerCase().trim() === leadName.toLowerCase().trim())
      if (selectedLead !== 0) 
        this.selectedLead = {
          name: selectedLead[0].name,
          email: selectedLead[0].email,
          state: selectedLead[0].state,
          city: selectedLead[0].city,
        }
    },
    async createNewLeadAsync(form, deviceType) {
      try {
        const checkEmailLead = await this.selectLeadByEmail(form.email)
        if(checkEmailLead.length > 0) {
          this.errorLead = checkEmailLead[0];
          this.dialog = true;
          return
        }
        this.insertNewLeadAsync({
          ...this.getDataToSubmit(form),
          device: deviceType,
        });
        this.isSubscribed = true;
      } catch (e) {
        console.error(e)
      }
    },
    async handleSubmit(data) {
      if(Object.keys(this.selectedLead).length > 0) {
        try {
            await this.updateLeadAsync({
            ...this.getDataToSubmit(data.form),
            device: data.type,
          });
          this.isSubscribed = true;
        } catch (e) {
          console.error(e)
        }
      }
      else this.createNewLeadAsync(data.form, data.type);
    },
    useSelectedLeadEmail() {
      this.selectedLead = this.errorLead;
      this.dialog = false;
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
    min-height: 90vh;
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
        }
    }

    &__theme-code {
        &-w {
            height: 52px;
            width: 248px;
            position: absolute;
            bottom: 12vh;
            right: 8vw;
        }
        &-m {
            height: 42px;
            width: 186px;
        }
    }

    &__subscription-form {
      &-w {
        max-width: 46vw;
      }
      &-m {
        min-height: 40vh;
        max-width: 80vw;
        min-width: 70vw;
        margin: 18px 0;
      }
    }
}

</style>