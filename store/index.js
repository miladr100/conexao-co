export const state = () => ({
    isLogged: false,
})

export const mutations = {
    updateIsLogged: (state, payload) =>
      (state.isLogged = payload),
}

export const getters = {
    isUserLogged: (state) => {
        return state.isLogged
    }
}