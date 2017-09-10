import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    //   {
    //     imageUrl: 'https://cdn.lumieretelluride.com/wp-content/uploads/2014/09/telluride-carousel-lumiere-hotel-1024x683.jpg',
    //     id: 'otueorwqperp',
    //     title: 'FAKE > Meetup in Telluride',
    //     description: 'In Colorado!!!',
    //     location: 'Telluride, Colorado USA',
    //     date: new Date()
    //   },
    //   {
    //     imageUrl: 'http://2.bp.blogspot.com/-7XS76XCSIPE/UvTLuMGP5eI/AAAAAAAAA_Q/QHpD7sh2U3A/s1600/resized_99265-banff-city_88-15338_t598.jpg',
    //     id: 'czxcmvzxcmfdghv',
    //     title: 'FAKE > Meetup in Banf',
    //     description: 'In Banf!!!',
    //     location: 'Banf, Canada',
    //     date: new Date()
    //   }
    // ],
    user: null,
    loading: false,
    error: null
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
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
      if (payload.modifier_id) {
        meetup.modifier_id = payload.modifier_id
      }
      if (payload.modified_date) {
        meetup.modified_date = payload.modified_date
      }
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
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          // console.log(data)
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
          console.log(meetups)
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        description: payload.description,
        location: payload.location,
        date: payload.date.toISOString(),
        creator_id: getters.user.id,
        created_date: new Date().toISOString(),
        modifier_id: getters.user.id,
        modified_date: new Date()
      }
      let key
      let imageUrl
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          // console.log(key)
          return key
        })
        .then(key => {
          const filename = payload.image.name
          // console.log(filename)
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          // console.log(imageUrl)
          return firebase.database().ref('meetups').child(key).update({
            imageUrl: imageUrl
          })
        })
        .then(() => {
          // console.log('Commit: ' + key)
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateMeetup ({commit}, payload) {
      commit('setLoading', true)
      const updateObject = {}
      if (payload.title) {
        updateObject.title = payload.title
      }
      if (payload.description) {
        updateObject.description = payload.description
      }
      if (payload.date) {
        updateObject.date = payload.date
      }
      if (payload.modified_date) {
        updateObject.modified_date = payload.modified_date
      }
      if (payload.modifier_id) {
        updateObject.modifier_id = payload.modifier_id
      }

      firebase.database().ref('meetups').child(payload.id).update(updateObject)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
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
    clearError ({commit}) {
      commit('clearError')
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
