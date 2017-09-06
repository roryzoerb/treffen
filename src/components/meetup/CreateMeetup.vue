<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h6>Create a new meetup</h6>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent='createMeetup()'>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name='title'
                label='Title'
                id='title'
                v-model='title'
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name='location'
                label='Location'
                id='location'
                v-model='location'
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name='imageUrl'
                label='Image URL'
                id='image-url'
                v-model='imageUrl'
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <img v-bind:src='imageUrl' width='350px'>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name='description'
                label='Description'
                id='description'
                v-model='description'
                multi-line
                rows=3
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class='primary' v-bind:disabled='!formIsValid' type='submit'>Create Meetup</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      location: '',
      date: '',
      imageUrl: ''
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
        this.description !== '' &&
        this.location !== '' &&
        this.imageUrl !== ''
    }
  },
  methods: {
    createMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        description: this.description,
        location: this.location,
        imageUrl: this.imageUrl,
        date: new Date(),
        id: new Date().toDateString()
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups/' + meetupData.id)
    }
  }
}
</script>
