<template>
  <v-alert error dismissible v-on:input='onClose()' v-bind:value='true'>
      {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
