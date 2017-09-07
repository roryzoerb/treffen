import Vue from 'vue'
import Vuex from 'vuex'

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
    user: {
      id: 'dlsfkjweuwiexcvb',
      registeredMeetups: [
        'otueorwqperp'
      ]
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        description: payload.description,
        imageUrl: payload.imageUrl,
        date: payload.date,
        id: 'kfdlsfjslakl12'
      }
      commit('createMeetup', meetup)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort(function (meetupA, meetupB) {
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
    }
  }
})
