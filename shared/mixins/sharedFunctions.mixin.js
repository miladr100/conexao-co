import { supabase } from "~/plugins/supabase";

export default {
    methods: {
        organizeLeads(arrLeads) {
            return arrLeads.map(lead => {
                const newLead = {...lead }
                if(!lead.state) newLead.state = ' - '
                if(!lead.city) newLead.city = ' - '
                if(!lead.device) newLead.device = ' - '
                if(!lead.phone) newLead.phone = ' - '
                const time = `${newLead.created_at.split("T")[0]}`
                newLead.created_at = time
                return newLead
            })
        },
        async getLeadsAsync() {
            try {
                const { data } = await supabase
                    .from("leads")
                    .select(`*`)
                return data
            } catch (err) {
                this.$toast.open({message: "Falha ao obter leads", type: "error"})
            }
        },
        async updateLeadAsync(dataLead) {
            const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
            const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            try {
                await supabase
                .from('leads')
                .update([{...dataLead, updated_at: localISOTime}])
                .eq('email', dataLead.email)
            } catch (err) {
                this.$toast.open({
                    message: 'Falha ao enviar dados, por favor tente novamente.',
                    type: 'error',
                })
            }
        },
        async selectLeadByEmail(emailLead) {
            const { data: leads } = await supabase
                .from('leads')
                .select("*")
                .eq('email', emailLead)
            return leads;
        },
        async insertNewLeadAsync(dataLead) {
            try {
                const { data, error } = await supabase
                    .from('leads')
                    .insert([dataLead])
                console.log(error)
                return data
            } catch (err) {
                this.$toast.open({
                    message: 'Falha ao enviar dados, por favor tente novamente.',
                    type: 'error',
                })
            }
        }
    }
}