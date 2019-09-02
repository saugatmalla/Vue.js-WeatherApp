<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/">
      <v-toolbar-title class="text-uppercase grey--text">
        
        <span class="font-weight-light">App</span>
        <span>Weather</span>
      
      </v-toolbar-title>
      </router-link>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="white--text text-center" >
              <router-link to="/"  class="white--text">
              Home
              </router-link>
            </v-list-item-title>
            <v-list-item-title class="white--text text-center">
              <router-link to="/weekly" class="white--text">
              Weekly
              </router-link>
            </v-list-item-title >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  }
};
</script>