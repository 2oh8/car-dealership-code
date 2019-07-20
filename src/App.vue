<template>
  <v-app dark>
    <v-toolbar app>
      <!-- <v-toolbar-side-icon> -->
      <img height="35px" src='//logo.clearbit.com/appdetex.com?size=35?grayscale=true'>
      <!-- </v-toolbar-side-icon> -->
      <v-btn v-if="$router.history.current.name !== 'home'" flat icon @click="$router.go(-1)">
        <v-icon> keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <span>Detex</span>
        <span class="font-weight-light">Motors</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="aboutDialog = true" small round color="#be2231">
        <v-icon color="white">remove_red_eye</v-icon>&nbsp; About this App
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid grid-list-xs>
        <router-view />
      </v-container>

      <v-dialog v-model="aboutDialog" width="500">

        <v-card>
          <v-card-title class="headline grey darken-4" primary-title>
            <!-- <v-toolbar-side-icon> -->
            <img height="35px" src='//logo.clearbit.com/appdetex.com?size=35?grayscale=true'>
            <!-- </v-toolbar-side-icon> -->
            <v-btn v-if="$router.history.current.name !== 'home'" flat icon @click="$router.go(-1)">
              <v-icon> keyboard_arrow_left</v-icon>
            </v-btn>
            <v-toolbar-title class="headline text-uppercase">
              <span>Detex</span>
              <span class="font-weight-light">Motors</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text>
            <h2>DetexMotors</h2>
            <p>- an app by <a href="https://2oh8.github.io/">2oh8 on GitHub</a></p>
            <!-- <br> -->
            <p>Features:</p>
            <ul>
              <li>Search, sort and filter vehicles by make, model, color, or range of years (via slider)</li>
              <li>App will display logos of vehicle manufactures via <a href="https://clearbit.com/logo">ClearBit
                  API</a></li>
              <li>App will load dynamic random image of a car based on manufacturer name via <a
                  href="https://www.unsplash.com/">Unsplash API</a></li>
              <li>App will dynamically render color on vehicle list based on vehicle's listed color</li>
            </ul>
            <br>
            <p>Made Using:</p>
            <ul>
              <li><a href="https://vuejs.org/">Vue.js</a></li>
              <li><a href="https://vuetifyjs.com/">Vuetify</a></li>
              <li><a href="https://material.io/icons">Material Icons</a></li>
            </ul>
            <br>
            <p>Bugs:</p>
            <ul>
              <li>Multiple filters of the same kind will not work (e.g. colors: cars that are red OR blue)</li>
              <li>Using year sliders will mess up filters</li>
            </ul>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#be2231" @click="aboutDialog = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>




    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        //
        aboutDialog: false
      }
    }
  }
</script>