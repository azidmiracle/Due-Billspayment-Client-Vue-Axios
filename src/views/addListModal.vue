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
        <ion-item>
          <ion-label position="stacked">Description e.g. Monthly payment of SSS</ion-label>
          <ion-input
            :value="description"
            @input="description = $event.target.value"
            clear-input="true"
            spellcheck="true"
            required
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Scheduled Day e.g. 20</ion-label>
          <ion-input
            type="number"
            :value="scheduled_day"
            @input="scheduled_day = $event.target.value"
            clear-input="true"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Amount to pay in pesos e.g. 1500</ion-label>
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
          :disabled="bills_name==null || benefeciary_name==null || description==null || scheduled_day==null || amount==null"
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
    username: String
  },
  data() {
    return {
      content: "Content",
      newBill: {},
      lastId: 0,
      bills_name: null,
      benefeciary_name: null,
      description: null,
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
          9,
          this.username,
          this.bills_name,
          this.benefeciary_name,
          this.description,
          this.scheduled_day,
          this.amount,
          this.currency
        );
        Due.insertDue(this.newBill);
      }
    },
    //when the close button is close, it will dismiss the modal and pass the value of the new bill
    dismissModal() {
      this.$ionic.modalController.dismiss(this.newBill);
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>