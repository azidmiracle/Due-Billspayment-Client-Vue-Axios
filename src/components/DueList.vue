<template>
  <div class="lists">
    <ion-card
      v-for="(due, index) in billsList"
      v-bind:index="index"
      v-bind:key="due.id"
      color="dark"
    >
      <ion-toolbar color="medium">
        <ion-title slot="start">{{ due.bills_name.toUpperCase() }}</ion-title>
        <ion-button slot="end" :value="due.id" v-on:click="deleteDue(due.id)" color="danger">
          <ion-icon name="close"></ion-icon>
        </ion-button>
      </ion-toolbar>

      <ion-card-content justify-content-center align-items-center>
        <ion-label>Beneficiary Name: {{ due.benefeciary_name }}</ion-label>
        <br />
        <ion-label>Description: {{ due.description }}</ion-label>
        <br />
        <ion-label>Last Payment: {{ due.last_payment }}</ion-label>
        <br />
        <ion-label>
          Due Date:
          {{ todayMonth + " " + due.month_day + ", " + todayYear }}
        </ion-label>
        <br />
        <ion-item >
          <ion-label>See Details</ion-label>
          <ion-button slot="end" color="secondary">
            <ion-icon name="arrow-forward"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-card-content>
    </ion-card>
  </div>
</template>
<script>
import { MyDate } from "@/modules/DateController.js";

export default {
  name: "DueList",
  props: {
    msg: String,
    billsList: Array
  },
  data() {
    return {
      //dues: [],
      todayMonth: "",
      todayYear: null,
      billChild: this.billsList, //initially, the billList array from parent is pass to this variable,
      key: null
    };
  },
  methods: {
    deleteDue(key) {
      this.key = key;
      this.$emit("deleteList", this.key);
    }
  },
  created() {
    this.todayMonth = MyDate.getTodayMonth();
    this.todayYear = MyDate.getTodayYear();
  }
};
</script>

<style>

.lists{
  
}
</style>
