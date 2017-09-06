<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1>
        <v-card class='info'>
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  src='http://kids.nationalgeographic.com/content/dam/kids/photos/articles/History/M-Z/YELLOWSTONE%20VALLEY.adapt.945.1.jpg'
                  height='130px'>
                </v-card-media>
              </v-flex xs7 sm8 md9>
              <v-flex>
                <v-card-title primary-title>
                  <div>
                    <h5 class='white--text mb-0'>My Meetup</h5>
                    <div>July 17th, 2017</div>
                  </div>
                </v-card-title>
                <div>
                  <v-btn flat to='/meetups/1'>
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