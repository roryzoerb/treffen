<template>
  <v-dialog lazy v-model='registerDialog'>
    <v-btn class='primary' slot='activator'>
      <!-- <v-icon left>edit</v-icon>Edit -->
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if='userIsRegistered'>Unregister from Meetup?</v-card-title>
            <v-card-title v-else>Register from Meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your mind later.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
                <v-btn flat class='red--text darken-1' v-on:click='registerDialog=false'>Cancel</v-btn>
                <v-btn flat class='green--text darken-1' v-on:click='confirmRegistration()'>Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  data () {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered () {
      console.log(this.$store.getters.user.id + ' > ' + this.meetupId)
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    }
  },
  methods: {
    confirmRegistration () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerForMeetup', this.meetupId)
      }
    }
  }
}
</script>

<style scoped>
.date-dialog {
    width: 100%;
}
</style>
