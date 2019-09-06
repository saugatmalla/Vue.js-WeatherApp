<template>
  <div class="home">
    <!-- Toolbar -->
    <v-card class="pa-4" flat>
      <v-toolbar dense floating>
        <v-text-field
          hide-details
          single-line
          v-model="location"
          @keyup.enter="update"
          placeholder="City, country"
        ></v-text-field>

        <v-btn icon type="submit">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <!-- Weather Card -->
    <div class="card-wrapper" v-if="forecast.sys">
      <v-card class="mx-auto" color="#F9F9F9" max-width="400">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">{{forecast.name}} , {{forecast.sys.country}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Current Temperature and Icon -->
        <v-card-text>
          <v-row align="center">
            <v-col class="display-3" cols="6">{{forecast.main.temp}}&deg;C</v-col>
            <v-col class="display-3" cols="6">{{icons[forecast.weather[0].main]}}</v-col>
          </v-row>
        </v-card-text>

        <!-- Temperature Min and Max -->
        <v-list-item>
          <v-list-item-subtitle>{{forecast.main.temp_min}}&deg;C / {{forecast.main.temp_max}}&deg;C</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title
            class="text-capitalize"
            v-if="forecast.weather"
          >{{forecast.weather[0].description}}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{forecast.wind.speed}}km/hr</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{forecast.clouds.all}}%</v-list-item-subtitle>
        </v-list-item>
      </v-card>
    </div>
    <!-- error handler
    <div class="card-wrapper" v-else-if=""> </div>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      location: "",
      errors: ""
    };
  },

  computed: {
    ...mapState(["forecast", "icons"])
  },
  mounted() {
    this.$store.dispatch("getForecast");
  },

  methods: {
    update: function() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${ 
            this.location
          }&appid=37c74120d05b58e1807a5286598c9d90&units=metric`,
        )
        .then(data => {
          this.$store.state.forecast = data.data;
          this.location = "";
        })
        .catch(error => {
          //need proper error presentation
          if ((error = "Request failed with status code 404")) {
            this.errors = "Wrong City Name, Please try correct city name";
            this.location = "";
            alert(this.errors);
          }
        });
    }
  }
};
</script>
