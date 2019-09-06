import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    forecast: [],
    city: 'Toronto,ca',
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
  },
  actions: {
    getForecast({ commit }) {
      axios
        .get(
          'https://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&appid=37c74120d05b58e1807a5286598c9d90&units=metric'
        )
        .then((data) => {
          let forecast = data.data;
          commit('SET_FORECAST', forecast);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mutations: {
    SET_FORECAST(state, forecast) {
      state.forecast = forecast;
    },

    UPDATE(state, location) {
      state.city = state.location;
      

    }
  },
});
