<template>
  <div>
      <ion-grid >

     
      <ion-row  >
           <ion-col v-for="(list,index) in historyLists"
      v-bind:item="list"
      v-bind:index="index"
      v-bind:key="list._id">
                <ion-button>
         <ion-label>{{getMonthName(list["_id"]["month"]) + " " + list["_id"]["year"]}}</ion-label>
      </ion-button>
           </ion-col>
      </ion-row>
       </ion-grid>
  </div>
</template>
<script>
import { MyDate } from "@/modules/DateController.js";
export default {
  name: "HistoryList",
  props: {
    historyLists: Array,
    username: String
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    //get the month
    getMonthName: function() {
      return monthNum => MyDate.getMonth(monthNum-1);
    }

  },
  mounted(){
      //let todayDate = new Date(); //get the date today
      //let prevMonth = new Date(todayDate.setMonth(todayDate.getMonth() - 6)); //get the date previous 12 months

  }
};
</script>

<style>
</style>
