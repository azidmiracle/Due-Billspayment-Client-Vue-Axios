<template>
  <div >
    <ion-card v-for="(due, index) in billsList" v-bind:index="index" v-bind:key="due.id">
      <ion-item>
        <ion-button slot="end" :value="due.id" v-on:click="deleteDue(due.id)">
          <ion-icon name="close" ></ion-icon>
        </ion-button>
      </ion-item>

      <ion-card-header>
        <ion-card-title>{{ due.bills_name }}</ion-card-title>
      </ion-card-header>

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
         <ion-item>
        <ion-button slot="end" >
         <ion-icon name='arrow-forward'></ion-icon>
        </ion-button>
      </ion-item>
      </ion-card-content>
    </ion-card>

  </div>
</template>
<script>

import { Due } from "@/modules/DueListService.js";
import { MyDate } from "@/modules/DateController.js";

export default {
  name: "DueList",
  props: {
    msg: String,
    billsList:Array,

  },
  data() {
    return {
      //dues: [],
      todayMonth: "",
      todayYear: null,
      billChild:this.billsList,//initially, the billList array from parent is pass to this variable,
      
    };
  },
  methods: {
    async getAlldues() {
      this.billChild = await Due.getAllDueLists('azid_miracle');
    },
    deleteDue(key) {
      Due.deleteDue(key);
      this.getAlldues()//emit to the parent);
      console.log(key)
      this.$emit('deleteList', this.billChild)
    }
  },
  created() {
    this.todayMonth = MyDate.getTodayMonth();
    this.todayYear = MyDate.getTodayYear();
  }
};
</script>

<style></style>
