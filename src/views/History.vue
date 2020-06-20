<template>
    <div class="ion-page">
    <ion-content class="ion-padding">
  <HistoryLists
        :historyLists="historyLists"
        :user_id="user_id"
        />
    </ion-content> 
    </div> 
</template>

<script>
//import { TxnHistory } from "@/modules/TxnHistoryService.js";
//import historyChart from "@/components/historyChart.vue";
import HistoryLists from "@/components/HistoryLists.vue";
export default {
    name:'History',
    props: {
    historyLists: Array,
    
  },
    components:{
       //historyChart,
        HistoryLists
    },
    data(){
        return{
           //historyLists:null,
           user_id:null
        }
    },
    created(){
        //this.getAllTxns()
        //this.user_id = this.$route.params.user_id;
        //console.log (this.$route.params.user_id)
    },
    methods:{
    //async getAllTxns() {
      //this.historyLists = await TxnHistory.getAllTransactions(this.$route.params.user_id);
      
    //}
    }

}
</script>

<style>

</style>