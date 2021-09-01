<template>
  <div class="page-background">
    <!--##### MOBILE -->
    <div v-if="smAndDown" class="page-content d-flex flex-column align-center" style="margin-top: 28vh;">
        <p class="page-content__title-m">preparem-se</p>
        <p class="page-content__subtitle-m">iv conexão centro-oeste</p>

        <img
            class="page-content__theme-m"
            src="~/static/img/primavera-text.png"
        />

        <p class="page-content__date-m">em 26 de Setembro</p>

        <div> 
            <button
                v-if="showButton"
                class="button button__subscribe-m"
                @click="subscribe()"
            >
                Inscreva-se
            </button>
            <form
              v-if="!showButton && !isSubscribed"
              class="form-m d-flex flex-column"
            >
              <div class="d-flex align-center justify-space-between">
                  <label class="label-m" for="name">Nome</label>
                  <input
                  id="name"
                  v-model="form.name"
                  style="width: 100%"
                  class="input-m"
                  type="text"
                  name="name"
                  placeholder="Digite seu nome completo"
                  />
              </div>
              <div class="d-flex align-center justify-space-between">
                  <label class="label-m" for="email">Email</label>
                  <input
                  id="email"
                  v-model="form.email"
                  style="width: 100%"
                  class="input-m"
                  type="text"
                  name="email"
                  placeholder="Digite seu melhor email"
                  />
              </div>
              <div class="d-flex align-center justify-space-between mt-1">
                  <select
                    id="state"
                    v-model="form.state"
                    class="select-state select-state-m"
                    name="state"
                    form="stateform"
                  >
                    <option value="" disabled="disabled" selected="selected">
                        Estado
                    </option>
                    <option
                        v-for="(state, i) in allStates"
                        :key="i"
                        :value="state.value"
                    >
                        {{ state.short }}
                    </option>
                  </select>

                  <select
                    id="city"
                    v-model="form.city"
                    :disabled="allCities.length == 0"
                    style="width: 100%"
                    class="select-state select-state-m"
                    name="city"
                    form="stateform"
                  >
                    <option value="" disabled="disabled" selected="selected">
                        Cidade
                    </option>
                    <option
                        v-for="(city, i) in allCities"
                        :key="i"
                        :value="city.value"
                    >
                        {{ city.value }}
                    </option>
                  </select>
              </div>
            </form>

            <p v-if="isSubscribed" class="page-content__subscribed-m">
                Inscrição realizada com sucesso!
            </p>
            <div
                v-if="isSubscribed"
                class="d-flex flex-row align-center mb-4"
            >
                <span>
                    <p class="page-content__date-m">
                      Agora é sua vez de contribuir com o conexão!
                    </p>
                    <p class="page-content__date-m">
                      Compartilhe o evento com seus amigos ;)
                    </p>
                </span>
                <div @click="shareViaWhatsApp()">
                    <span
                    class="iconify"
                    data-icon="mdi:whatsapp"
                    style="color: #ef815d"
                    data-width="30"
                    data-height="30"
                    ></span>
                </div>
            </div>

            <button
                v-if="!showButton && !isSubscribed"
                class="button button__send-m"
                @click="handleSubmit('mobile')"
            >
                Enviar
            </button>
        </div>
    </div>

    <!--##### WEB -->
    <div v-else class="page-content page-content-web d-flex flex-column">
        <p class="page-content__title-w">preparem-se</p>
        <p class="page-content__subtitle-w">iv conexão centro-oeste</p>

        <img
            class="page-content__theme-w"
            src="~/static/img/primavera-text.png"
        />

        <p class="page-content__date-w">em 26 de Setembro</p>

        <div> 
            <button
                v-if="showButton"
                class="button button__subscribe-w"
                @click="subscribe()"
            >
                Inscreva-se
            </button>
            <form
            v-if="!showButton && !isSubscribed"
            class="form-w d-flex flex-column"
            >
            <div class="d-flex align-center justify-space-between">
                <label class="label-w" for="name">Nome</label>
                <input
                id="name"
                v-model="form.name"
                style="width: 100%"
                class="input-w"
                type="text"
                name="name"
                placeholder="Digite seu nome completo"
                />
            </div>
            <div class="d-flex align-center justify-space-between">
                <label class="label-w" for="email">Email</label>
                <input
                id="email"
                v-model="form.email"
                style="width: 100%"
                class="input-w"
                type="text"
                name="email"
                placeholder="Digite seu melhor email"
                />
            </div>
            <div class="d-flex align-center justify-space-between mt-1">
                <select
                id="state"
                v-model="form.state"
                class="select-state select-state-w"
                name="state"
                form="stateform"
                >
                <option value="" disabled="disabled" selected="selected">
                    Estado
                </option>
                <option
                    v-for="(state, i) in allStates"
                    :key="i"
                    :value="state.value"
                >
                    {{ state.short }}
                </option>
                </select>

                <select
                id="city"
                v-model="form.city"
                :disabled="allCities.length == 0"
                style="width: 100%"
                class="select-state select-state-w"
                name="city"
                form="stateform"
                >
                <option value="" disabled="disabled" selected="selected">
                    Cidade
                </option>
                <option
                    v-for="(city, i) in allCities"
                    :key="i"
                    :value="city.value"
                >
                    {{ city.value }}
                </option>
                </select>
            </div>
            </form>

            <p v-if="isSubscribed" class="page-content__subscribed-w">
                Inscrição realizada com sucesso!
            </p>
            <div
                v-if="isSubscribed"
                class="d-flex flex-row align-center mb-4"
            >
                <span>
                    <p class="page-content__date-w">
                      Agora é sua vez de contribuir com o conexão!
                    </p>
                    <p class="page-content__date-w">
                      Compartilhe o evento com seus amigos ;)
                    </p>
                </span>
                <div @click="shareViaWhatsApp()">
                    <span
                    class="iconify"
                    data-icon="mdi:whatsapp"
                    style="color: #ef815d"
                    data-width="52"
                    data-height="52"
                    ></span>
                </div>
            </div>

            <button
                v-if="!showButton && !isSubscribed"
                class="button button__send-w"
                @click="handleSubmit('web')"
            >
                Enviar
            </button>
        </div>
    </div>
  </div>
  
</template>

<script>
import statesAndCities from '~/static/json/estados-cidades.json'

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
      showButton: true,
      isSubscribed: false,
      followBoxMobile: true,
      form: {
        name: '',
        email: '',
        state: '',
        city: '',
      },
      allStates: [],
      allCities: [],
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
  },
  mounted() {
    this.allStates = this.formatDataFromIbge(this.allStatesOfBrazil)
    // this.sendAnalyticsData()
  },
  methods: {
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
$color-orange: #ef815d;
$color-yellow: #e78f12;
$color-brown:  #754b28;
$color-brown-dark:  #462c16;
$color-brown-light:  #754b2875;

.page-background {
  background: url(https://i.ibb.co/VWxv48h/fullscreen-pagina1-background.png) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;

  @media (max-width: 600px ) {
    background: url(https://i.ibb.co/phcwx08/mobile-pagina1-background.png) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100%;
  }
}

.page-content {
    &-web {
      margin-top: 8vh;
      margin-left: 7vw;
    }

    &__title {
      &-w {
        font-size: 3.5rem;
        text-transform: uppercase;
        font-weight: 800;
        color: $color-orange;
        
      }
      &-m {
        font-size: 1.6rem;
        text-transform: uppercase;
        font-weight: 800;
        color: $color-orange;
      }
    }

    &__subtitle {
      &-w {
        font-size: 2.5rem;
        text-transform: uppercase;
        font-weight: 500;
        margin-top: -28px;
        color: $color-yellow;
      }
      &-m {
        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight: 500;
        margin-top: -18px;
        color: $color-yellow;
      }
    }

    &__theme {
        &-w {
            height: 240px;
            width: 620px;
        }
        &-m {
            height: 120px;
            width: 280px;
        }
    }

    &__date {
        &-w {
            margin-left: 2vw;
            font-size: 1.8rem;
            font-weight: 500;
            color: $color-brown;
        }
        &-m {
            font-size: 1rem;
            font-weight: 500;
            text-align: center;
            color: $color-brown;
            margin-top: 0.5rem;
        }
    }

    .button {
      transition-duration: 0.4s;
      color: $color-brown;
      text-transform: uppercase;
      border: 2px solid $color-brown;
      border-radius: 60px;
      cursor: pointer;
      &:hover {
        outline: none;
        border: 2px solid $color-brown-dark;
        color: $color-brown-dark;
      }
      &__subscribe {
        &-w {
          font-size: 46px;
          font-weight: 500;
          padding: 4px 48px;
          margin: 24px 0;
        }
        &-m {
          font-size: 28px;
          font-weight: 500;
          padding: 6px 32px;
          margin: 42px 0;
        }
      }
      &__send {
        &-w {
          font-size: 18px;
          font-weight: 400;
          padding: 4px 42px;
          margin: 14px 0;
          margin-left: 8.5rem;
        }
        &-m {
          font-size: 18px;
          font-weight: 400;
          padding: 6px 32px;
          margin: 12px 0;
          margin-left: 5rem;
        }
      }
    }

    .input {
      &-w[type='text'] {
        padding: 12px 20px;
        margin: 6px 0;
        display: inline-block;
        border: 2px solid $color-brown;
        border-radius: 24px;
        box-sizing: border-box;
        color: $color-brown;
      }
      &-m[type='text'] {
        padding: 8px 6px;
        margin: 6px 0;
        padding-left: 12px;
        display: inline-block;
        border: 2px solid $color-brown;
        border-radius: 24px;
        box-sizing: border-box;
        color: $color-brown;
      }
    }

    input:focus {
      outline: none;
      border: 2px solid $color-brown-dark;
    }

    .form {
      &-w {
        margin: 10px 0;
        max-width: 34vw;
      }
      &-m {
        margin: 8px 0;
      }
    }

    .label {
      &-w {
        font-size: 20px;
        font-weight: 500;
        color: $color-brown-dark;
        margin-right: 32px;
      }
      &-m {
        font-size: 12px;
        font-weight: 500;
        color: $color-brown-dark;
        margin-right: 26px;
      }
    }

    .select-state {
      -webkit-appearance: none;
      color:  $color-brown;
      margin: 0 4px;
      border: 2px solid  $color-brown;
      border-radius: 24px;
      text-align: center;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition-duration: 0.4s;

      option {
        color: #223254;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      option[value=''][disabled] {
        display: none;
      }

      &:focus {
        outline: none;
        border: 2px solid  $color-brown-dark;
      }

      &:hover {
        outline: none;
        border: 2px solid  $color-brown-dark;
        color:  $color-brown-dark;
      }

      &[disabled] {
        outline: none;
        border: 2px solid $color-brown-light;
        cursor: not-allowed;
      }
    }

    .select-state-w {
      padding: 8px 20px;
      font-size: 20px;

      option {
        font-size: 14px;
      }
    }

    .select-state-m {
      padding: 10px 6px;
      font-size: 14px;

      option {
        font-size: 14px;
      }
    }

    &__subscribed {
      &-w {
        font-size: 2.5rem;
        font-weight: 500;
        color: $color-brown-dark;
        margin: 36px 0 36px 2vw;
      }
      &-m {
        font-size: 1.5rem;
        font-weight: 500;
        color: $color-brown-dark;
        text-align: center;
        margin: 28px 0;
      }
    }

    .iconify {
      transition-duration: 0.4s;
      cursor: pointer;
      margin-left: 12px;

      &:hover {
        margin-bottom: 6px;
      }
    }
}

</style>