<template>
  <v-container>
    <v-layout row wrap v-if='loading'>
      <v-flex xs12 class='text-xs-center'>
        <v-progress-circular 
          indeterminate
          class='primary--text'
          v-bind:width='3'
          v-bind:size='150'
          v-if='loading'>Loading...
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class='primary--text'>{{ meetup.title }}</h6>
          </v-card-title>
          <v-card-media
            v-bind:src='meetup.imageUrl'
            height='400px'>
          </v-card-media>
          <v-card-text>
            <div class='info--text'>{{ meetup.date | dateTime }} - {{ meetup.location }}</div>
            <div v-if='userIsCreator' class='my-buttons'>
              <div><app-edit-date-dialog v-bind:meetup='meetup'></app-edit-date-dialog></div>
              <div><app-edit-time-dialog v-bind:meetup='meetup'></app-edit-time-dialog></div>
            </div>
            <div>{{ meetup.description }}</div>
            <div>Creator: {{ meetup.creator_id }}</div>
            <div>Created: {{ meetup.created_date | dateTime }}</div>
            <div>Modifier: {{ meetup.modifier_id }}</div>
            <div>Modified: {{ meetup.modified_date | dateTime }}</div>
          </v-card-text>
          <v-card-actions>
            <template v-if='userIsCreator'>
              <!-- <v-spacer></v-spacer> -->
              <app-edit-meetup-dialog v-bind:meetup='meetup'></app-edit-meetup-dialog>
            </template>
            <v-spacer></v-spacer>
            <!-- <v-btn class='primary'><v-icon left>fa-hand-pointer-o</v-icon>Register</v-btn> -->
            <v-btn class='primary'>Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },
    loading () {
      return this.$store.getters.loading
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creator_id
    }
  }
}
</script>

<style scoped>
.my-buttons {
  display:flex;
  flex-direction:row;
}
</style>

