<template>
  <div class="ion-page">

<ion-tabs @IonTabsWillChange="beforeTabChange" @IonTabsDidChange="afterTabChange">

    <!-- Get matched routes with a helper method -->
    <ion-tab tab="home" :routes="getMatchedRoutes">
      <Home />
    </ion-tab>

    <!-- Use v-slot:bottom with Vue ^2.6.0 -->
    <template slot="bottom">
      <ion-tab-bar>
        <!-- Provide custom click handler -->
        <ion-tab-button tab="home" @click="goToAboutTab">
          <ion-icon name="home"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </template>
  </ion-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from "@/views/Home.vue";
export default {
  name: "TabRoot",
  components: {
    Home
  }
};
</script>
