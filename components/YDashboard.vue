<template>
    <div class="d-flex flex-column">
        <v-row justify="center" class="mt-6 px-4">
            <v-col cols="4" lg="1" md="1" sm="4" xs="4" align="center" class="mr-4">
                <v-btn class="mb-2" @click="update()">Atualizar</v-btn>
                <v-btn @click="exit()">Sair</v-btn>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">200</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">META DE INSCRITOS</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{subscriptionProgress}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">PROGRESSO</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfSubscriptions}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Nº Inscritos</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfMs}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Inscritos MS</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfMt}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Inscritos MT</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfGo}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Inscritos GO</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfDf}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Inscritos DF</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfOthers}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Inscritos Outros Estados</v-card-subtitle>  
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
import { supabase } from "~/plugins/supabase";

const ACTUAL_CONECXAO = 4;

  export default {
    name: "YDashboard",
    components: {
    },
    data () {
      return {
        allLeads: [],
        oldLeads: [],
        numbOfSubscriptions: 0,
        numbOfMs: 0,
        numbOfMt: 0,
        numbOfGo: 0,
        numbOfDf: 0,
        numbOfOthers: 0,
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
    computed: {
        subscriptionProgress() {
            return `${Math.trunc((this.numbOfSubscriptions/200)*100)}%`;
        }
    },
    async mounted() {
        await this.update();
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
                const { data } = await supabase
                    .from("leads")
                    .select(`*`)
                this.allLeads = this.organizeLeads(data.filter(lead => lead.conexao === ACTUAL_CONECXAO))
                this.oldLeads = this.organizeLeads(data.filter(lead => lead.conexao !== ACTUAL_CONECXAO))
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
        calcAnalytics() {
            this.numbOfMs = this.organizeLeads(this.allLeads.filter(lead => lead.state === "Mato Grosso do Sul")).length
            this.numbOfGo = this.organizeLeads(this.allLeads.filter(lead => lead.state === "Goiás")).length
            this.numbOfDf = this.organizeLeads(this.allLeads.filter(lead => lead.state === "Distrito Federal")).length
            this.numbOfMt = this.organizeLeads(this.allLeads.filter(lead => lead.state === "Mato Grosso")).length
            this.numbOfOthers = this.numbOfSubscriptions - this.numbOfMs - this.numbOfGo - this.numbOfDf - this.numbOfMt
        },
        async update() {
            await this.getAllLeadsAsync()
            // await this.getAccessAnalyticsAsync()
            this.calcAnalytics()
            this.$toast.open({message: "Dados atualizados com sucesso!", type: "success"})
        },
        exit() {
            this.$store.commit('updateIsLogged', false)
        },
    }
  }
</script>