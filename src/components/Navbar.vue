<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        
        <span class="font-weight-light">App</span>
        <span>Weather</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list>
        <v-list-item v-for="link in links" :key="link.id" router :to="link.route" @click="drawer = false">
          <v-list-item-content >
            <v-list-item-title class="white--text text-center" >
              {{link.name}}
            </v-list-item-title>
          
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
      drawer: false,
      links: [
        {id: 0, name: "Home", route: "/"},
        {id: 1, name: "About", route: "/weekly"}
      ]
    };
  }
};
</script>