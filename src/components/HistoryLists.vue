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
          <ion-button
            :value="index"
            @click="getMonthID(index)"
            :color="selectedMonthClass(index)"
            class="btn-hover"
          >
            <ion-label>
              {{
                getMonthName(list["_id"]["month"]) + " " + list["_id"]["year"]
              }}
            </ion-label>
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-item-divider>

    <div>
      <ion-card
        v-for="(txn, index) in historyLists[selectedIndex]['allTnxs']"
        v-bind:txn="txn"
        v-bind:index="index"
        v-bind:key="txn._id"
      >
        <ion-card-content>
          <ion-label>{{ getFormattedDate(txn["txn"]["date_paid"]) }}</ion-label
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
            txn["txn"]["currency"].toUpperCase() + " " + txn["txn"]["amount"]
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
    user_id: String,
  },
  data() {
    return {
      selectedIndex: 0,//default to the first tab when initially loaded
    };
  },
  methods: {
    getMonthID(index) {
      this.selectedIndex = index;//when the tab is clicked, it will get the index value
    },
    selectedMonthClass(index) {//color attribute of the button is binded in this selectedClass class name. It will dynamically change the color of the button
      let selectedClass = "";
      if (this.selectedIndex === index) {//if it is the selected button, it will change the color to secondary
        selectedClass = "success";

        //console.log(index)
      } else {
        selectedClass = "light";//others not selected will set the color to light
      }

      return selectedClass;
    },
  },
  computed: {
    //get the month
    getMonthName: function() {
      return (monthNum) => MyDate.getMonthName(monthNum - 1);
    },
    getFormattedDate: function() {
      return function(date) {
        let newDate = new Date(date);
        return MyDate.formatDate(newDate);
      };
    },
  }
};
</script>
