<template>
    <v-row justify="center" align="center">
        <YLogin v-if="!isLoggedIn"/>
        <YDashboard v-else />
    </v-row>
</template>

<script>
import YLogin from '~/components/YLogin.vue'
import YDashboard from '~/components/YDashboard.vue'

export default({
  name: 'YspLeadsAdmin',
  components: {
    YLogin,
    YDashboard,
  },
  data () {
    return {}
  },
  computed: {
    isLoggedIn() {
        return this.$store.getters.isUserLogged;
    }
  },
  methods: {

  }
})
</script>