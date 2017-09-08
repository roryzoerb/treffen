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
              <v-btn raised class='primary' v-on:click='pickFile()'>Upload Image</v-btn>
              <input type='file'
                v-show='true'
                ref='dlgFileInput'
                accept='image/*'
                @change='filePicked'>
              <!-- <v-text-field
                name='imageUrl'
                label='Image URL'
                id='image-url'
                v-model='imageUrl'
                required>
              </v-text-field> -->
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
              <h5>Choose a date &amp; time</h5>
            </v-flex>
          </v-layout>
          <v-layout row class='mb-2'>
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model='date'></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model='time' format='24hr'></v-time-picker>
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
      imageUrl: '',
      date: new Date(),
      time: new Date(),
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
        this.description !== '' &&
        this.location !== '' &&
        this.imageUrl !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    createMeetup () {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const meetupData = {
        title: this.title,
        description: this.description,
        location: this.location,
        imageUrl: this.imageUrl,
        image: this.image,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    pickFile () {
      this.$refs.dlgFileInput.click()
    },
    filePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
