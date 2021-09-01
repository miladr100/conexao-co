<template>
    <div class="d-flex flex-column">
        <v-row justify="center" class="mt-6 px-4">
            <v-col cols="4" lg="2" md="2" sm="4" xs="4" align="center" >
                <v-btn class="mb-2" @click="update()">Atualizar</v-btn>
                <v-btn @click="exit()">Sair</v-btn>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfSubscriptions}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Nº Inscritos</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfAccess}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Nº Acessos</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="3" md="4" sm="5" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfButtonSubscribe}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Nº Cliques Inscrição</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfShareWhatsApp}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Share Wpp</v-card-subtitle>  
                </v-card>
            </v-col>
        </v-row>
        <v-data-table
            :headers="headers"
            :items="allLeads"
            :items-per-page="5"
            class="elevation-1 mt-2"
        ></v-data-table>
    </div>
</template>

<script>

  export default {
    name: "YDashboard",
    components: {
    },
    data () {
      return {
        allLeads: [],
        numbOfSubscriptions: 0,
        numbOfAccess: 0,
        numbOfButtonSubscribe: 0,
        numbOfShareWhatsApp: 0,
        headers: [
            { text: 'ID', value: 'id' },
            { text: 'Criado em', value: 'created_at' },
            {
                text: 'Nome',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Email', value: 'email', sortable: false },
            { text: 'Estado', value: 'state', align: 'start', sortable: false },
            { text: 'Cidade', value: 'city', align: 'start', sortable: false },
            { text: 'Dispositivo', value: 'device', sortable: false },
        ],
      }
    },
    async mounted() {
        await this.getAllLeadsAsync()
        await this.getAccessAnalyticsAsync()
    },
    methods: {
        async getAccessAnalyticsAsync() {
            try {
                this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
                const { data } = await this.$axios.get('analytics?select=type')
                const pageRead = data.filter(lead => lead.type === 'page_read')
                const buttonSubscribe = data.filter(lead => lead.type === 'button_subscribe')
                const shareWhatsapp = data.filter(lead => lead.type === 'share_whatsapp')
                this.numbOfAccess = pageRead.length
                this.numbOfButtonSubscribe = buttonSubscribe.length
                this.numbOfShareWhatsApp = shareWhatsapp.length
            } catch (err) {
                this.$toast.open({message: "Falha ao obter analytics", type: "error"})
            }
        },
        async getAllLeadsAsync() {
            try {
                this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
                const { data } = await this.$axios.get('leads')
                this.allLeads = this.organizeLeads(data)
                this.numbOfSubscriptions = this.allLeads.length
            } catch (err) {
                this.$toast.open({message: "Falha ao obter leads", type: "error"})
            }
        },
        organizeLeads(arrLeads) {
            return arrLeads.map(lead => {
                if(!lead.state) lead.state = ' - '
                if(!lead.city) lead.city = ' - '
                if(!lead.device) lead.device = ' - '
                if(!lead.phone) lead.phone = ' - '
                lead.created_at = this.$moment(lead.created_at).format("DD/MM/YYYY")
                return lead
            })
        },
        async update() {
            await this.getAllLeadsAsync()
            await this.getAccessAnalyticsAsync()
            this.$toast.open({message: "Dados atualizados com sucesso!", type: "success"})
        },
        exit() {
            this.$store.commit('updateIsLogged', false)
        }
    }
  }
</script>