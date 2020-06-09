<template>
  <div class="ion-page">
    <ion-content class="ion-padding">
      <IonTabs />
     
    </ion-content>
  </div>
</template>

<script>

// @ is an alias to /src
import IonTabs from "@/components/IonTabs.vue";
export default {
  name: "Home",
  components: {
    IonTabs
  },
  data() {
    return {
      username:null,
    };
  }
  ,
  mounted() {

    this.username=this.$route.params.username;
    
  }
  ,
  methods: {
  
  }
};
</script>
