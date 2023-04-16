import { createStore } from 'vuex'
import persistedState from 'vuex-persistedstate'

export const store = createStore({
    state () {
        return {
            user: {
                username: "unknown",
                level: "unknown"
            }
        }
    },
    mutations: {
        setUser (state, payload) {
            state.user.username = payload.username
            state.user.level = payload.level
        }
    },
    plugins: [persistedState({ storage: window.sessionStorage })]
})