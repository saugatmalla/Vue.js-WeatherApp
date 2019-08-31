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
    <v-card class="mx-auto" color="#F9F9F9" max-width="400" v-if="forecast">
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
        <v-list-item-subtitle> 
          {{forecast.main.temp_min}}&deg;C / {{forecast.main.temp_max}}&deg;C
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="text-capitalize">{{forecast.weather[0].description}}</v-list-item-title>
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
      // errors: {},
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
        })

        // need error handling
    }
  }
};
</script>
