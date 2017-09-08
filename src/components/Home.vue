<template>
    <v-container>
        <v-layout row wrap class='mb-2'>
            <v-flex xs12 sm6 class='text-xs-center text-sm-right'>
                <v-btn router to='/meetups' large class='info'>Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class='text-xs-center text-sm-left'>
                <v-btn router to='/meetup/new' large class='info'>Organize Meetup</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
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
        <v-layout row wrap v-if='!loading'>
            <v-flex xs12>
                <v-carousel style='cursor: pointer;'>
                    <v-carousel-item
                      v-for='meetup in meetups'
                      v-bind:src='meetup.imageUrl'
                      v-bind:key='meetup.id'
                      v-on:click='onLoadMeetup(meetup.id)'>
                      <div class='meetup-title'>
                          {{ meetup.title }}
                      </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class='mt-2'>
            <v-flex xs12 class='text-xs-center'>
                <p>Join our awesome meetups!!!</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
.meetup-title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    padding: 15px;
}
</style>
