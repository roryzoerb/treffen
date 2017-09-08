import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'http://kids.nationalgeographic.com/content/dam/kids/photos/articles/History/M-Z/YELLOWSTONE%20VALLEY.adapt.945.1.jpg',
        id: 'alsdfjkklsdfkj',
        title: 'Meetup in Yellowstone',
        description: 'In YNP!!!',
        location: 'Yellowstone Naional Park, Montana USA',
        date: new Date()
      },
      {
        imageUrl: 'https://cdn.lumieretelluride.com/wp-content/uploads/2014/09/telluride-carousel-lumiere-hotel-1024x683.jpg',
        id: 'otueorwqperp',
        title: 'Meetup in Telluride',
        description: 'In Colorado!!!',
        location: 'Telluride, Colorado USA',
        date: new Date()
      },
      {
        imageUrl: 'http://2.bp.blogspot.com/-7XS76XCSIPE/UvTLuMGP5eI/AAAAAAAAA_Q/QHpD7sh2U3A/s1600/resized_99265-banff-city_88-15338_t598.jpg',
        id: 'czxcmvzxcmfdghv',
        title: 'Meetup in Banf',
        description: 'In Banf!!!',
        location: 'Banf, Canada',
        date: new Date()
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          console.log(data)
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              location: obj[key].location,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creator_id: obj[key].creator_id,
              created_date: obj[key].created_date,
              modifier_id: obj[key].modifier_id,
              modified_date: obj[key].modified_date
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        description: payload.description,
        location: payload.location,
        imageUrl: payload.imageUrl,
        date: payload.date.toISOString(),
        creator_id: getters.user.id,
        created_date: new Date().toISOString(),
        modifier_id: getters.user.id,
        modified_date: new Date().toISOString()
      }
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          const key = data.key
          console.log(data)
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
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
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
      .catch((error) => {
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
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
      .catch((error) => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    clearError ({commit}) {
      commit('clearError')
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
