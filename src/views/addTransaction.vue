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
          <ion-datetime
            display-timezone="utc"
            :value="date_paid"
            @ionChange="date_paid = $event.target.value"
          ></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Amount paid e.g. 1500</ion-label>
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
          :disabled="amount==null || paid_by==null || mode_payment==null"
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
    _amount: String,
    due_id: Number,
    _currency: String,
    user_id:String
  },
  data() {
    return {
      newTxn: {},
      lastId: 0,
      date_paid: new Date(),
      paid_by: null,
      mode_payment: null,
      amount: this._amount,
      currency: this._currency,
      allTxns:[]
    };
  },
  methods: {
    addTxn(e) {
      e.preventDefault();
      let isConfirmed = confirm("Transaction cannot be deleted or edited anymore once added. \n Do you want to add this transaction?");

      if (isConfirmed) {
        //create new instance of user
        this.newTxn = new Transaction(
          this.date_paid,
          this.amount,
          this.currency,
          this.paid_by,
          this.mode_payment
        );
        
        //push to the allTransactions
        //this.allTxns.push( this.newTxn)
        Transaction.insertTransaction(this.due_id,this.newTxn); //
      }
    },
    //when the close button is close, it will dismiss the modal and pass the value of the new bill
    dismissModal() {
      this.$ionic.modalController.dismiss(this.newTxn);
    }
  },
  async mounted() {
    this.allTxns= await Transaction.getThisTxn(this.due_id)
  }
};
</script>

<style scoped>
</style>