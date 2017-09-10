<template>
  <v-dialog class='meetup-dialog' lazy v-model='editDialog'>
    <v-btn class='primary' slot='activator'>
      <!-- <v-icon left>edit</v-icon>Edit -->
      Edit
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name='title'
                label='Title'
                id='title'
                v-model='editableTitle'
                required>
              </v-text-field>
              <v-text-field
                name='description'
                label='Description'
                id='description'
                v-model='editableDescription'
                multi-line
                rows=3
                required>
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
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
      editableTitle: this.meetup.title,
      editableDescription: this.meetup.description
    }
  },
  methods: {
    saveChanges () {
      if (this.editableTitle.trim() === '' || this.editableDescription.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        title: this.editableTitle,
        description: this.editableDescription,
        modifier_id: this.$store.getters.user.id,
        modified_date: new Date()

      })
    }
  }
}
</script>


<style scoped>
.meetup-dialog {
    width: 350px;
}
</style>
