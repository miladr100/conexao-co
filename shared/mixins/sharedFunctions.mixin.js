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
        }
    }
}