<template>
  <div class="home">

    <!-- Toolbar -->
    <v-card class="pa-4" flat>
      <v-toolbar dense floating>
        <v-text-field hide-details single-line v-model="location" @keyup.enter="update" placeholder="City,country"></v-text-field>

        <v-btn icon type="submit" @click="update">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <!-- Weather Card -->
    <div class='card-wrapper' v-if="forecast.sys">
    <v-card class="mx-auto" color="#F9F9F9" max-width="400" v-if="forecast">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline" v-if="forecast.sys">{{forecast.name}} , {{forecast.sys.country}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>


      <!-- Current Temperature and Icon -->
      <v-card-text>
        <v-row align="center">
          <v-col class="display-3" cols="6" v-if="forecast.main">{{forecast.main.temp}}&deg;C</v-col>
          <v-col class="display-3" cols="6" v-if="forecast.weather">{{icons[forecast.weather[0].main]}}</v-col>
        </v-row>
      </v-card-text>


      <!-- Temperature Min and Max -->
      <v-list-item>
        <v-list-item-subtitle v-if="forecast.main"> 
          {{forecast.main.temp_min}}&deg;C / {{forecast.main.temp_max}}&deg;C
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="text-capitalize" v-if="forecast.weather">{{forecast.weather[0].description}}</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon v-if="forecast.wind">
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle v-if="forecast.wind">{{forecast.wind.speed}}km/hr</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon v-if="forecast.clouds">
          <v-icon>mdi-cloud-download</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle v-if="forecast.clouds">{{forecast.clouds.all}}%</v-list-item-subtitle>
      </v-list-item>
    </v-card>
    </div>
    <div class="card-wrapper" v-else>
      <p class="text-capitalize blockquote"> {{this.errors}} or Wrong Format <br> <span class="subtitle-1">Try searching in this format (City, country)  </span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      time: 0,
      forecast: "",
      location: "",
      city: "Toronto,ca",
      country: "ca",
      // Icons
      icons: {
        Clear: "😐",
        Rain: "🌧️",
        Fog: "🌫️",
        Snow: "⛄️",
        Wind: "💨",
        Clouds: "☁️",
        Haze: "🌫️",
        Mist: "🌈",
        Rainbow: "🌈",
        Sunny: "☀️",
        Night: "🌃"
      },
      errors: {},
    };
  },
  mounted() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        this.city +
        "ca&appid=37c74120d05b58e1807a5286598c9d90&units=metric"
    )
      .then(response => response.json())
      .then(data => {
        this.forecast = data;
        
      });
  },

  methods: {
    update: function() {
      this.city = this.location;
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          this.city +
          "ca&appid=37c74120d05b58e1807a5286598c9d90&units=metric"
      )
        .then(response => response.json())
        .then(data => {
          this.forecast = data;
          this.location = '';

          if(this.forecast.cod == '404') {
            this.errors = this.forecast.message;
          }
           else {
            return this.forecast;
          }
        })
        
    }
  }
};
</script>
