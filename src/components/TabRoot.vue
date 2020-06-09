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
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "TabRoot",
  components: {}
};
</script>
