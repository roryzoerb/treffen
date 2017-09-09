import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AppAlert from './components/shared/AppAlert.vue'
import EditMeetupDialog from './components/dialog/EditMeetupDialog.vue'
import EditDateDialog from './components/dialog/EditDateDialog.vue'
import EditTimeDialog from './components/dialog/EditTimeDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('dateTime', DateFilter)
Vue.component('app-alert', AppAlert)
Vue.component('app-edit-meetup-dialog', EditMeetupDialog)
Vue.component('app-edit-date-dialog', EditDateDialog)
Vue.component('app-edit-time-dialog', EditTimeDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyABvaQwEe6pyXSrKYzMQCJVTL72sLRDmis',
      authDomain: 'rrzsolutions-001.firebaseapp.com',
      databaseURL: 'https://rrzsolutions-001.firebaseio.com',
      projectId: 'rrzsolutions-001',
      storageBucket: 'gs://rrzsolutions-001.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
