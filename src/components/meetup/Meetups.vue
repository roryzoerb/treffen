<template>
  <v-container>
    <v-layout row wrap v-for='meetup in meetups' v-bind:key='meetup.id' class='mb-2'>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class='info'>
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  v-bind:src='meetup.imageUrl'
                  height='130px'>
                </v-card-media>
              </v-flex xs7 sm8 md9>
              <v-flex>
                <v-card-title primary-title>
                  <div>
                    <h5 class='white--text mb-0'>{{ meetup.title }}</h5>
                    <div>{{ meetup.date | dateTime }}</div>
                  </div>
                </v-card-title>
                <div>
                  <v-btn flat v-bind:to="'/meetups/' + meetup.id">
                    <v-icon left>arrow_forward</v-icon>
                    View Meetup
                  </v-btn>
                </div>
                <!-- <v-card-actions>
                  <v-btn flat>View Meetup</v-btn>
                </v-card-actions> -->
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>

