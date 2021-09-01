<template>
    <v-row justify="center" align="center" class="mx-2">
        <v-col cols="12" lg="6" md="8" sm="10">
            <v-card class="d-flex flex-column">
                <v-card-title class="d-flex justify-center">Login Admin</v-card-title>
                <v-card-text>
                    <v-form ref="form" lazy-validation>
                        <v-text-field
                        v-model="email"
                        :counter="18"
                        label="Email"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="password"
                        :counter="12"
                        label="Senha"
                        required
                        ></v-text-field>
                    </v-form>
                </v-card-text>

                <v-card-actions class="mx-2 mb-4">
                    <v-btn class="mr-4" :disabled="!isValidForm" @click="submit">
                        Login
                    </v-btn>
                    <v-btn @click="clear">
                        Limpar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default({
  name: 'YLogin',
  data () {
    return {
        email: '',
        password: '',
    }
  },
  computed: {
      isValidForm() {
          return !!(this.email && this.password)
      }
  },
  methods: {
    submit() {
        if(this.isValidForm) {
          if(this.validateLogin()) {
            this.$store.commit('updateIsLogged', true)
            this.$toast.open({message: "Sucesso!", type: "success"})
          }
        } else this.$toast.open({message: "Por favor preencha o login e a senha", type: "warning"})
    },
    validateLogin() {
        if (this.email !== 'yspadmin@ysp.com') {
            this.$toast.open({message: "Erro! email não cadastrado", type: "error"})
            return false
        }
        if (this.password !== 'yspadmin123') {
            this.$toast.open({message: "Erro! senha inválida", type: "error"})
            return false
        }
        return true
    },
    clear() {
        this.email = ''
        this.password = ''
    }
  }
})
</script>