<template>
  <div class="ion-page">

<ion-tabs>
       <ion-tab tab="menu">
        <ion-vue-router name="menuRoute"></ion-vue-router>
      </ion-tab>
      <ion-tab tab="home" :routes="['home','due-name']" :to="{name:'home'}">
        <ion-vue-router name="homeRoute"></ion-vue-router>
      </ion-tab>    
      <ion-tab-bar slot="top">
        <ion-tab-button tab="menu" :to="{name:'menu'}">
          <ion-icon name="menu"></ion-icon>
          <ion-label>Menu</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="home">
          <ion-icon name="home"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
 
      </ion-tab-bar>
    </ion-tabs>

    <!--
    <ion-tab tab="music">
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Music</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen class="ion-padding">
        <h1>Music</h1>
      </ion-content>
    </ion-tab>
    <ion-tab-bar slot="top">
      <ion-tab-button tab="music">
        <ion-label>Music</ion-label>
        <ion-icon name="musical-note"></ion-icon>
      </ion-tab-button>
      <ion-tab-button tab="movies">
        <ion-label>Movies</ion-label>
        <ion-icon name="videocam"></ion-icon>
      </ion-tab-button>
      <ion-tab-button tab="games">
        <ion-label>Games</ion-label>
        <ion-icon name="game-controller"></ion-icon>
      </ion-tab-button>
    </ion-tab-bar>-->
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "IonTabs",
  components: {},
  data() {
    return {};
  }
};
</script>