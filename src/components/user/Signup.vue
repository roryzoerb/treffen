<template>
  <v-container>
    <v-layout row v-if='error'>
      <v-flex xs12 sm6 offset-sm3>
        <app-alert v-on:dismissed='onDismissed()' v-bind:text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form v-on:submit.prevent='onSignup()'>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name='email'
                      label='Email'
                      id='email'
                      v-model='email'
                      type='email'
                      required>
                    </v-text-field>
                    <v-text-field
                      name='password'
                      label='Password'
                      id='password'
                      v-model='password'
                      type='password'
                      required>
                    </v-text-field>
                    <v-text-field
                      name='confirmPassword'
                      label='Confirm Password'
                      id='confirmPassword'
                      v-model='confirmPassword'
                      type='password'
                      v-bind:rules='[comparePasswords]'>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type='submit' v-bind:disabled='loading' v-bind:loading='loading'>
                      <span slot='loader' class='custom-loader'>
                        <v-icon light>cached</v-icon>
                      </span>
                      Sign up
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import Component from './Component.vue'
export default {
  // components: { my-component: Component },
  props: [],
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : true
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
      // return true
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      // Vuex
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password
      })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
