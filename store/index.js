export const state = () => ({
    isLogged: false,
    allLeads: [],
})

export const mutations = {
    updateIsLogged: (state, payload) =>
      (state.isLogged = payload),
    updateAllLeads: (state, payload) =>
      (state.allLeads = payload),
}

export const getters = {
    isUserLogged: (state) => {
        return state.isLogged
    }
}