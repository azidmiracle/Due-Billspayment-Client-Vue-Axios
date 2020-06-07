<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title slot="start">Add Transaction</ion-title>
        <ion-buttons slot="end">
          <ion-button v-on:click="dismissModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding="true">
      <form @submit="addTxn">
        <ion-item>
          <ion-label>{{bills_name}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-icon name="calendar"></ion-icon>
          <ion-datetime  display-timezone="utc"   
           :value="date_paid"
            @ionChange="date_paid = $event.target.value"></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Amount paid in pesos e.g. 1500</ion-label>
          <ion-input
            type="number"
            :value="amount"
            @input="amount = $event.target.value"
            clear-input="true"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Paid by</ion-label>
          <ion-input
            type="text"
            :value="paid_by"
            @input="paid_by = $event.target.value"
            clear-input="true"
            required
          ></ion-input>
        </ion-item>
         <ion-item>
          <ion-label position="stacked">Mode of Payment</ion-label>
          <ion-input
            type="text"
            :value="mode_payment"
            @input="mode_payment = $event.target.value"
            clear-input="true"
            required
          ></ion-input>
        </ion-item>
        <ion-button
          :disabled="amount==null"
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
import { Transaction } from "@/modules/TransactionService.js";
export default {
  name: "addTransaction",
  props: {
    bills_name: String,
    _amount:String,
    due_id:Number,
  },
  data() {
    return {
      newTxn: {},
      lastId: 0,
      date_paid:new Date(),
      paid_by: null,
      mode_payment:null,
      amount: this._amount,

    };
  },
  methods: {
    addTxn(e) {
      e.preventDefault();
      let isConfirmed = confirm("Do you want to enroll this bill?");

      if (isConfirmed) {
        //create new instance of user
        this.newTxn = new Transaction(
          6,
          this.due_id,
          this.date_paid,
          this.amount,
          this.paid_by,
          this.mode_payment,


         
        );
        Transaction.insertTransaction(this.newTxn);
      }
    },
    //when the close button is close, it will dismiss the modal and pass the value of the new bill
    dismissModal() {
      this.$ionic.modalController.dismiss(this.newTxn);
    }
  },
  mounted() {
    this.username = "azid_miracle"; //--NOTE: THIS WILL BE CHANGED LATER
  }
};
</script>

<style scoped>
</style>