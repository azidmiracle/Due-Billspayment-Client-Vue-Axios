<template>
  <div class="ion-page">
            <ion-list >
        <ion-item>
          <ion-label position="stacked">No. of months to display</ion-label>
          <ion-select
            :value="noMonth"
            @ionChange="getAllTxns($event.target.value)"
            ok-text="Okay"
            cancel-text="Dismiss"
          >
            <ion-select-option value="3">Past 3 Months</ion-select-option>
            <ion-select-option value="6">Past 6 Months</ion-select-option>
            <ion-select-option value="9">Past 9 Months</ion-select-option>
            <ion-select-option value="12">Past 12 Months</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
    <ion-content class="ion-padding">
        <ion-fab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        @click="getAllTxns()"
      >
        <ion-fab-button color="warning" alt="refresh">
          <ion-icon name="refresh"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <!--If there is value in the   historyLists, it will display the data-->
      <HistoryLists
        v-if="historyLists.length > 0"
        :historyLists="historyLists"
      />
      <!--else it will show no records found-->
      <ion-label v-else> No records found</ion-label>
    </ion-content>
  </div>
</template>

<script>
import HistoryLists from "@/components/HistoryLists.vue"; //component of the history
import { TxnHistory } from "@/modules/TxnHistoryService.js";
export default {
  name: "History",
  props: {
    timeout: { type: Number, default: 500 },
  },
  components: {
    HistoryLists,
  },
  data() {
    return {
      historyLists: [],
      noMonth:3
    };
  },

  created() {
    this.getAllTxns(this.noMonth);
  },
  methods: {
    loadingUpdate() {
      return this.$ionic.loadingController
        .create({
          cssClass: "my-custom-class",
          message: "Loading Transaction History...",
          duration: this.timeout,
        })
        .then((loading) => {
          setTimeout(function() {
            loading.dismiss();
          }, this.timeout);
          return loading.present();
        });
    },
    async getAllTxns(noMonth) {
      this.historyLists = await TxnHistory.getAllTransactions(
        this.$route.params.user_id,
        noMonth
      );
      this.loadingUpdate()
    },
  },
};
</script>

<style></style>
