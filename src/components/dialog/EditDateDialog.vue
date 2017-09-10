<template>
  <v-dialog class='date-dialog' lazy v-model='editDialog'>
    <v-btn class='primary' slot='activator'>
      <!-- <v-icon left>edit</v-icon>Edit -->
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model='editableDate' class='date-dialog' actions>
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
            </v-date-picker>
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
      editableDate: null
    }
  },
  methods: {
    saveChanges () {
      const newDate = new Date(this.meetup.date)
      const newYear = new Date(this.editableDate).getUTCFullYear()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newDay = new Date(this.editableDate).getUTCDate()
      newDate.setUTCFullYear(newYear)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCDate(newDay)
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        date: newDate,
        modifier_id: this.$store.getters.user.id,
        modified_date: new Date()
      })
    }
  },
  created () {
    const passedDate = new Date(this.meetup.date)
    this.editableDate = passedDate
  }
}
</script>

<style scoped>
.date-dialog {
    width: 100%;
}
</style>
