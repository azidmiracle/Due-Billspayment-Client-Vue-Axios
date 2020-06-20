<template>
<div>
<historyChart/>
    <HistoryLists
     :historyLists="historyLists"
     :username="username"
    />
</div>

    
</template>

<script>
import { TxnHistory } from "@/modules/TxnHistoryService.js";
import historyChart from "@/components/historyChart.vue";
import HistoryLists from "@/components/HistoryLists.vue";
export default {
    name:'History',
    components:{
        historyChart,
        HistoryLists
    },
    data(){
        return{
           historyLists:null,
           username:null
        }
    },
    mounted(){
        this.getAllTxns()
        this.username = this.$route.params.username;
        console.log (this.$route.params.username)
    },
    methods:{
    async getAllTxns() {
      this.historyLists = await TxnHistory.getAllTransactions(this.$route.params.username);
      
    }
    }

}
</script>

<style>

</style>