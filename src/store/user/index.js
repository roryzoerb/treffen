import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.regKeys[id] = payload.regKey
    },
    unregisterFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.regKeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerForMeetup ({commit, getters}, payload) {
      const user = getters.user
      commit('setLoading', true)
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerForMeetup', {
            id: payload,
            regKey: data.key
          })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.regKeys) {
        return
      }
      const regKey = user.regKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(regKey).remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterFromMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false)
          commit('clearError')
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            regKeys: {}
          }
          commit('setUser', newUser)
        }
      )
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false)
          commit('clearError')
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            regKeys: {}
          }
          commit('setUser', newUser)
          // commit('loadMeetups')
        }
      )
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        regKeys: {}
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      // once - not a permanent listener
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then(data => {
          const registrations = data.val()
          let registeredMeetups = []
          let swapped = {}
          for (let registration in registrations) {
            registeredMeetups.push(registrations[registration])
            swapped[registrations[registration]] = registration
          }
          // console.log(registeredMeetups)
          // console.log(swapped)
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            regKeys: swapped
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
