<template>
    <div class="ion-page">
    <ion-content class="ion-padding">
     <HistoryLists v-if="historyLists.length>0"
        :historyLists="historyLists"
        />
      <ion-label v-else>
        No records found</ion-label>  
    </ion-content> 
    </div> 
</template>

<script>
import HistoryLists from "@/components/HistoryLists.vue";
export default {
    name:'History',
    props: {
    historyLists: Array,
    
  },
  data(){
    
  },
    components:{
       //historyChart,
        HistoryLists
    },


}
</script>

<style>

</style>