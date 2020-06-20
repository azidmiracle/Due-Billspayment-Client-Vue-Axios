<template>
  <div class="ion-page">
<ion-tabs >
    <!-- Get matched routes with a helper method -->
    <ion-tab tab="History" :routes="['History']" :to="{name:'History'}">
      <History :historyLists="historyLists"/>
    </ion-tab>
    <ion-tab tab="home" :routes="['home','due-name']" :to="{name:'home'}">
      <Home/>
    </ion-tab>
    <!-- Use v-slot:bottom with Vue ^2.6.0 -->
    <template slot="bottom">
      <ion-tab-bar>
        <!-- Provide custom click handler -->
         <ion-tab-button tab="History" @click="ionTabsWillChange">
          <ion-icon name="stats"></ion-icon>
          <ion-label>History</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="home">
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
import History from "@/views/History.vue";
import Home from "@/views/Home.vue";
import { TxnHistory } from "@/modules/TxnHistoryService.js";
export default {
  name: "TabRoot",
  components: {
    Home,
    History
  },
  data(){
    return {
         historyLists:[]
    }
  },
  created(){
        this.getAllTxns()
    },
  methods:{
    ionTabsWillChange(){
     this.getAllTxns()
    },
    async getAllTxns() {
      this.historyLists = await TxnHistory.getAllTransactions(this.$route.params.username);
      
    }
  }
};
</script>
