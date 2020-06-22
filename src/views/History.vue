<template>
    <div class="ion-page">
    <ion-content class="ion-padding">
      <!--If there is value in the   historyLists, it will display the data-->
     <HistoryLists v-if="historyLists.length>0"
        :historyLists="historyLists"
        />
         <!--else it will show no records found-->
      <ion-label v-else>
        No records found</ion-label>  
    </ion-content> 
    </div> 
</template>

<script>
import HistoryLists from "@/components/HistoryLists.vue";//component of the history
export default {
    name:'History',
    props: {
    historyLists: Array,//this array is coming from the History tab
    
  },
  data(){
    
  },
    components:{
        HistoryLists
    },


}
</script>

<style>

</style>