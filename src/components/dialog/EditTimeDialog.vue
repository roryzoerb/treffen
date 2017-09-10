<template>
  <v-dialog class='time-dialog' lazy v-model='editDialog'>
    <v-btn class='primary' slot='activator'>
      <!-- <v-icon left>edit</v-icon>Edit -->
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model='editableTime' class='time-dialog' actions format='24hr'>
              <template scope='{save, cancel}'>
                <v-btn
                  flat
                  class='blue--text darken-1'
                  v-on:click='editDialog=false'>
                  Cancel
                </v-btn>
                <v-btn
                  flat
                  class='blue--text darken-1'
                  v-on:click='saveChanges()'>
                  Save
                </v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editableTime: null
    }
  },
  methods: {
    saveChanges () {
      const newDate = new Date(this.meetup.date)
      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        date: newDate,
        modifier_id: this.$store.getters.user.id,
        modified_date: new Date()
      })
    }
  },
  created () {
    const passedTime = new Date(this.meetup.date).toTimeString()
    this.editableTime = passedTime
  }
}
</script>

<style scoped>
.time-dialog {
    width: 100%;
}
</style>
