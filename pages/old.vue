<template>
  <div class="page">
    <!--##### MOBILE -->
    <div v-if="smAndDown" class="page-content d-flex flex-column align-center">
      <div
        v-if="followBoxMobile"
        class="
          social-m
          d-flex
          flex-column
          align-center
          justify-center
          mt-12
          px-5
          py-4
        "
      >
        <p class="social-m-btn" @click="followBoxMobile = false">X</p>
        <p class="page-content__date-m mb-2" style="color: white">Siga-nos</p>
        <div @click="followInstagram()">
          <span
            class="iconify"
            data-icon="mdi:instagram"
            style="color: #c13584"
            data-width="34"
            data-height="34"
            @click="followInstagram()"
          ></span>
        </div>
        <div @click="followFacebook()">
          <span
            class="iconify"
            data-icon="mdi:facebook"
            style="color: #3b5998"
            data-width="34"
            data-height="34"
            @click="followFacebok()"
          ></span>
        </div>
      </div>

      <p class="page-content__title-m page-content__title-m-top">
        2º Nomeação de
      </p>
      <p class="page-content__title-m">Jovens</p>
      <p class="page-content__title-m">Embaixadores</p>
      <p class="page-content__title-m">pela Paz</p>

      <p class="page-content__text mt-16">
        Um evento que contará com vários jovens de
      </p>
      <p class="page-content__text top--un4">
        destaque, das mais diversas áreas, discutindo
      </p>
      <p class="page-content__text top--un4">
        sobre o que mais importa para você!
      </p>

      <p class="page-content__moto-m">Qual o seu legado?</p>

      <p class="page-content__date-m">Dia 14 de agosto às 16 horas</p>

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
          class="d-flex flex-row justify-center align-center top--un30 mb-4"
        >
          <span>
            <p class="page-content__date-m">
              Agora é sua vez de contribuir com a paz!
            </p>
            <p class="page-content__date-m top--un4">
              Compartilhe o evento com seus amigos ;)
            </p>
          </span>
          <div @click="shareViaWhatsApp()">
            <span
              class="iconify"
              data-icon="mdi:whatsapp"
              style="color: #fada39"
              data-width="30"
              data-height="30"
            ></span>
          </div>
        </div>
      </div>

      <button
        v-if="!showButton && !isSubscribed"
        class="button button__send-m"
        @click="handleSubmit('mobile')"
      >
        Enviar
      </button>
      <img v-else class="img-ysp-m" src="~/static/img/ysp_logo.png" />
    </div>

    <!--##### WEB -->
    <div v-else class="page-content d-flex flex-column align-center">
      <div class="social-w d-flex flex-column align-center mt-12 ml-12">
        <p class="page-content__date-w">Siga-nos</p>
        <div @click="followInstagram()">
          <span
            class="iconify"
            data-icon="mdi:instagram"
            style="color: #c13584"
            data-width="42"
            data-height="42"
          ></span>
        </div>
        <div @click="followFacebook()">
          <span
            class="iconify"
            data-icon="mdi:facebook"
            style="color: #3b5998"
            data-width="42"
            data-height="42"
          ></span>
        </div>
      </div>

      <p class="page-content__title-w page-content__title-w-top">
        2º Nomeação de
      </p>
      <p class="page-content__title-w">Jovens</p>
      <p class="page-content__title-w">Embaixadores</p>
      <p class="page-content__title-w">pela Paz</p>

      <p class="page-content__moto-w">Qual o seu legado?</p>

      <p class="page-content__date-w">Dia 14 de agosto às 16 horas</p>

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
          class="d-flex flex-row justify-center align-center top--un30 mb-4"
        >
          <span>
            <p class="page-content__date-w">
              Agora é sua vez de contribuir com a paz!
            </p>
            <p class="page-content__date-w top--un4">
              Compartilhe o evento com seus amigos ;)
            </p>
          </span>
          <div @click="shareViaWhatsApp()">
            <span
              class="iconify"
              data-icon="mdi:whatsapp"
              style="color: #fada39"
              data-width="46"
              data-height="46"
            ></span>
          </div>
        </div>
      </div>

      <button
        v-if="!showButton && !isSubscribed"
        class="button button__send-w"
        @click="handleSubmit('web')"
      >
        Enviar
      </button>
      <img v-else class="img-ysp-w" src="~/static/img/ysp_logo.png" />
    </div>
    <div class="page-background">
      <img
        class="page-background__background"
        src="~/static/img/fullscreen-background.png"
      />
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
    this.sendAnalyticsData()
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
        created_at: new Date(),
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
        const deviceType = this.smAndDown ? 'mobile' : 'web'
        this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
        this.$axios.post('analytics', { type: typeData, device: deviceType })
      } catch (err) {
        console.error(err)
      }
    },
    shareViaWhatsApp() {
      let header = 'Oi oi, tudo bem? :)'
      const name = this.form.name?.split(' ')[0]
      if (name) header = `Oi oi, aqui é ${this.form.name.split(' ')[0]} :)`
      const message = window.encodeURIComponent(`${header}
      👋 Vim te convidar para a 2ª nomeação de Jovens Embaixadores da Paz, com discussões sobre "Qual é o seu legado?"
      Conheça experiências e lições de vida de jovens de destaque, e saiba como eles superam os desafios da vida para construir um legado!!
      📆 Sábado, 14 de agosto, às 16 hrs 
      
      Inscreva-se agora pelo link: https://embaixadorespaz.vercel.app/`)
      window
        .open(`https://api.whatsapp.com/send?text=${message}`, '_blank')
        .focus()
      this.sendAnalyticsData('share_whatsapp')
    },
    followInstagram() {
      console.log('OI Insta')
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
.page {
  .social {
    &-w {
      position: absolute;
      z-index: 3;
      left: 0;
    }
    &-m {
      position: fixed;
      z-index: 3;
      left: 0;
      background-color: #f2de7981;
      border-radius: 8px;

      &-btn {
        top: 0;
        right: 0;
        margin: -6px -8px 0 0;
        position: absolute;
        padding: 2px 8px;
        font-size: 14px;
        color: white;
        border-radius: 50%;
        background-color: red;
      }
    }
  }

  .page-content {
    position: relative;
    z-index: 2;

    &__title {
      &-w {
        font-size: 78px;
        font-weight: 800;
        color: #f2de79;
        margin: 0px 0 -48px 0;
        &-top {
          font-size: 58px;
          margin: 24px 0 0 0;
        }
      }
      &-m {
        font-size: 48px;
        font-weight: 700;
        color: #f2de79;
        margin: 8px 0 -38px 0;
        &-top {
          font-size: 38px;
          margin: 24px 0 0 0;
        }
      }
    }

    &__subtitle {
      &-w {
        font-size: 34px;
        font-weight: 400;
        color: #f2de79;
        text-align: center;
        margin: 48px 0 0 0;
      }
      &-m {
        font-size: 18px;
        font-weight: 500;
        color: #f2de79;
        text-align: center;
        margin: 48px 0 0 0;
      }
    }

    &__text {
      font-size: 14px;
      font-weight: 400;
      color: #f2de79;
      text-align: center;
      margin: 28px 0 0 0;
    }

    &__moto {
      &-w {
        font-size: 36px;
        font-weight: 800;
        color: #f2de79;
        text-align: center;
        text-transform: uppercase;
        margin: 42px 0 0 0;
      }
      &-m {
        font-size: 24px;
        font-weight: 800;
        color: #f2de79;
        text-align: center;
        text-transform: uppercase;
        margin: 24px 0 0 0;
      }
    }

    &__date {
      &-w {
        font-size: 20px;
        font-weight: 500;
        color: #f2de79;
        text-align: center;
        margin: -4px 0 0 0;
      }
      &-m {
        font-size: 14px;
        font-weight: 500;
        color: #f2de79;
        text-align: center;
        margin: 4px 0 0 0;
      }
    }

    &__subscribed {
      &-w {
        font-size: 36px;
        font-weight: 400;
        color: #f2de79;
        text-align: center;
        margin: 36px 0;
      }
      &-m {
        font-size: 24px;
        font-weight: 500;
        color: #f2de79;
        text-align: center;
        margin: 42px 0;
      }
    }

    .button {
      transition-duration: 0.4s;
      color: #f2de79;
      text-transform: uppercase;
      border: 2px solid #f2de79;
      border-radius: 60px;
      cursor: pointer;
      &:hover {
        outline: none;
        border: 2px solid #fada39;
        color: #fada39;
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
        }
        &-m {
          font-size: 18px;
          font-weight: 400;
          padding: 6px 32px;
          margin: 12px 0;
        }
      }
    }

    .opacity {
      &--1 {
        opacity: 0.7;
      }
      &--2 {
        opacity: 0.5;
      }
      &--3 {
        opacity: 0.35;
      }
      &--4 {
        opacity: 0.18;
      }
    }

    .top {
      &--un4 {
        margin-top: -4px;
      }
      &--un14 {
        margin-top: -14px;
      }
      &--un12 {
        margin-top: -12px;
      }
      &--un30 {
        margin-top: -30px;
      }
      &--un70 {
        margin-top: -70px;
      }
      &--un110 {
        margin-top: -110px;
      }
    }

    .img-ysp {
      &-w {
        height: 70px;
      }
      &-m {
        height: 40px;
      }
    }

    .label {
      &-w {
        font-size: 20px;
        font-weight: 500;
        color: #f2de79;
        margin-right: 32px;
      }
      &-m {
        font-size: 12px;
        font-weight: 500;
        color: #f2de79;
        margin-right: 26px;
      }
    }

    .input {
      &-w[type='text'] {
        padding: 12px 20px;
        margin: 6px 0;
        display: inline-block;
        border: 2px solid #f2de79;
        border-radius: 24px;
        box-sizing: border-box;
        color: #f2de79;
      }
      &-m[type='text'] {
        padding: 8px 6px;
        margin: 6px 0;
        padding-left: 12px;
        display: inline-block;
        border: 2px solid #f2de79;
        border-radius: 24px;
        box-sizing: border-box;
        color: #f2de79;
      }
    }

    .form {
      &-w {
        margin: 10px 0;
        min-width: 34vw;
      }
      &-m {
        margin: 18px 0;
      }
    }

    input:focus {
      outline: none;
      border: 2px solid #fada39;
    }

    .select-state {
      -webkit-appearance: none;
      color: #f2de79;
      margin: 0 4px;
      border: 2px solid #f2de79;
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
        border: 2px solid #fada39;
      }

      &:hover {
        outline: none;
        border: 2px solid #fada39;
        color: #fada39;
      }

      &[disabled] {
        outline: none;
        border: 2px solid #fada3998;
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

    .iconify {
      transition-duration: 0.4s;
      cursor: pointer;
      margin-left: 12px;

      &:hover {
        margin-bottom: 6px;
      }
    }
  }
  .page-background {
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      min-width: 50%;
      min-height: 50%;
    }
  }
}
</style>
