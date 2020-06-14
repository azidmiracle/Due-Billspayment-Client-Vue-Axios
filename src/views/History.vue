<template>
    <historyChart/>
</template>

<script>
import { Transaction } from "@/modules/TransactionService.js";
import historyChart from "@/components/historyChart.vue";
export default {
    name:'History',
    components:{
        historyChart
    },
    mounted(){

    },
    methods:{
    async getAllTxns() {
      this.billsList = await Transaction.getAllTransactions(this.$route.params.username);
      this.billList_Orig = this.billsList; //save the value to the billListoRIG for search purpose
    }
    }

}
</script>

<style>

</style>