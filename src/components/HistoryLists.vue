<template>
  <div>
   
        <ion-item-divider>
 <ion-row>
        <ion-col
          v-for="(list, index) in historyLists"
          v-bind:item="list"
          v-bind:index="index"
          v-bind:key="list._id"
        >
          <ion-button :value="list['_id']" @click="getMonthID(index)">
            <ion-label>
              {{
                getMonthName(list["_id"]["month"]) + " " + list["_id"]["year"]
              }}
            </ion-label>
          </ion-button>
        </ion-col>
      </ion-row>
        </ion-item-divider>
     
     
          <div >
      <ion-card
        v-for="(txn, index) in historyLists[selectedIndex]['allTnxs']"
        v-bind:txn="txn"
        v-bind:index="index"
        v-bind:key="txn._id"
      >
        <ion-card-content>
          <ion-label>{{ txn["txn"]["date_paid"] }}</ion-label
          ><br />
          <ion-label>{{
            txn["bills_name"].toUpperCase() +
              " FOR " +
              txn["benefeciary_name"].toUpperCase()
          }}</ion-label
          ><br />

          <ion-label item-left>{{
            "PAID BY " +
              txn["txn"]["paid_by"].toUpperCase() +
              " THRU " +
              txn["txn"]["mode_payment"].toUpperCase()
          }}</ion-label>
          <br />
          <ion-label item-right text-right>{{
            txn["txn"]["amount"] + " " + txn["txn"]["currency"].toUpperCase()
          }}</ion-label>
        </ion-card-content>
      </ion-card>
      </div>
   
    

  </div>
</template>
<script>
import { MyDate } from "@/modules/DateController.js";
export default {
  name: "HistoryList",
  props: {
    historyLists: Array,
    username: String,
  },
  data() {
    return {
      selectedIndex: 0,
    };
  },
  methods: {
    getMonthID(index) {
      this.selectedIndex = index;
    },
  },
  computed: {
    //get the month
    getMonthName: function() {
      return (monthNum) => MyDate.getMonth(monthNum - 1);
    },
  },
  mounted() {
    //let todayDate = new Date(); //get the date today
    //let prevMonth = new Date(todayDate.setMonth(todayDate.getMonth() - 6)); //get the date previous 12 months
  },
};
</script>

<style></style>
