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
        <v-layout row wrap>
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                      v-for='meetup in meetups'
                      v-bind:src='meetup.imageUrl'
                      v-bind:key='meetup.id'>
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
  data () {
    return {
      meetups: [
        {
          imageUrl: 'http://kids.nationalgeographic.com/content/dam/kids/photos/articles/History/M-Z/YELLOWSTONE%20VALLEY.adapt.945.1.jpg',
          id: 'alsdfjkklsdfkj',
          title: 'Meetup in Yellowstone'
        },
        {
          imageUrl: 'https://cdn.lumieretelluride.com/wp-content/uploads/2014/09/telluride-carousel-lumiere-hotel-1024x683.jpg',
          id: 'otueorwqperp',
          title: 'Meetup in Telluride'
        },
        {
          imageUrl: 'http://2.bp.blogspot.com/-7XS76XCSIPE/UvTLuMGP5eI/AAAAAAAAA_Q/QHpD7sh2U3A/s1600/resized_99265-banff-city_88-15338_t598.jpg',
          id: 'czxcmvzxcmfdghv',
          title: 'Meetup in Banf'
        }
      ]
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
