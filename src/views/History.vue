<template>
    <div class="ion-page">
    <ion-content class="ion-padding">
  <HistoryLists
        :historyLists="historyLists"
        :username="username"
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
           username:null
        }
    },
    created(){
        //this.getAllTxns()
        //this.username = this.$route.params.username;
        //console.log (this.$route.params.username)
    },
    methods:{
    //async getAllTxns() {
      //this.historyLists = await TxnHistory.getAllTransactions(this.$route.params.username);
      
    //}
    }

}
</script>

<style>

</style>