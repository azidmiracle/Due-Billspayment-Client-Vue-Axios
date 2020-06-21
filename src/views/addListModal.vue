<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title slot="start">Enroll Bill</ion-title>
        <ion-buttons slot="end">
          <ion-button v-on:click="dismissModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding="true">
      <form @submit="addDueList">
        <ion-item>
          <ion-label position="stacked">Bills name e.g. SSS</ion-label>
          <ion-input
            clear-input="true"
            required
            :value="bills_name"
            @input="bills_name = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Beneficiary name.</ion-label>
          <ion-input
            :value="benefeciary_name"
            @input="benefeciary_name = $event.target.value"
            clear-input="true"
            required
          ></ion-input>
        </ion-item>
 <ion-list>
          <ion-item>
            <ion-label position="stacked">Frequency</ion-label>
            <ion-select  :value="frequency"
            @ionBlur="frequency = $event.target.value" ok-text="Okay" cancel-text="Dismiss">
              <ion-select-option value="0">Monthly</ion-select-option>
              <ion-select-option value="1">Quarterly</ion-select-option>
              <ion-select-option value="2">Semi-annually</ion-select-option>
              <ion-select-option value="3">Annually</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <ion-item>
          <ion-label position="stacked">Scheduled Day e.g. 20 (Min 1; Max 31) </ion-label>
          <ion-input
            type="number"
            min="1" max="31"
            :value="scheduled_day"
            @input="scheduled_day = $event.target.value"
            clear-input="true"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Amount to pay e.g. 1500</ion-label>
          <ion-input
            type="number"
            :value="amount"
            @input="amount = $event.target.value"
            clear-input="true"
            required
          ></ion-input>
        </ion-item>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Currency</ion-label>
            <ion-select  :value="currency"
            @ionBlur="currency = $event.target.value" ok-text="Okay" cancel-text="Dismiss">
              <ion-select-option value="sgd">Singapore Dollar</ion-select-option>
              <ion-select-option value="php">Philippine Peso</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <ion-button
          :disabled="bills_name==null || benefeciary_name==null || frequency==null || scheduled_day==null || amount==null || currency==null"
          type="submit"
          fill="solid"
          expand="block"
          color="danger"
        >Add</ion-button>
      </form>
    </ion-content>
  </div>
</template>

<script>
import { Due } from "@/modules/DueListService.js";
export default {
  name: "addListModal",
  props: {
    title: { type: String, default: "Super Modal" },
    user_id: String
  },
  data() {
    return {
      content: "Content",
      newBill: {},
      bills_name: null,
      benefeciary_name: null,
      frequency: null,
      scheduled_day: null,
      amount: null,
      currency:null,
    };
  },
  methods: {
    addDueList(e) {
      e.preventDefault();
      let isConfirmed = confirm("Do you want to enroll this bill?");

      if (isConfirmed) {
        //create new instance of user
        this.newBill = new Due(
          this.user_id,
          this.bills_name,
          this.benefeciary_name,
          this.frequency,
          this.scheduled_day,
          this.amount,
          this.currency,
          []
        );
        Due.insertDue(this.newBill);
      }
    },
    //when the close button is close, it will dismiss the modal and pass the value of the new bill
    dismissModal() {
      this.$ionic.modalController.dismiss(this.newBill);
    }
  },
  mounted() {
    //console.log(this.user_id)
  }
};
</script>

<style scoped>
</style>