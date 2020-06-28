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
            class="ion-text-uppercase"
            clear-input="true"
            clear-on-edit="true"
            required
            :value="bills_name"
            @input="bills_name = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Beneficiary name.</ion-label>
          <ion-input
            class="ion-text-uppercase"
            :value="benefeciary_name"
            @input="benefeciary_name = $event.target.value"
            clear-input="true"
            required
          ></ion-input>
        </ion-item>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Frequency</ion-label>
            <ion-select
              :value="frequency"
              @ionBlur="frequency = $event.target.value"
              ok-text="Okay"
              cancel-text="Dismiss"
            >
              <ion-select-option value="0">Monthly</ion-select-option>
              <ion-select-option value="1">Quarterly</ion-select-option>
              <ion-select-option value="2">Semi-annually</ion-select-option>
              <ion-select-option value="3">Annually</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <ion-item>
          <ion-label position="stacked"
            >Scheduled Day e.g. 20 (Min 1; Max 31)
          </ion-label>
          <ion-input
            type="number"
            min="1"
            max="31"
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
            <ion-select
              :value="currency"
              @ionBlur="currency = $event.target.value"
              ok-text="Okay"
              cancel-text="Dismiss"
            >
              <ion-select-option value="sgd"
                >Singapore Dollar</ion-select-option
              >
              <ion-select-option value="php">Philippine Peso</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

        <!--when bills_name, benefeciary_name, frequency, scheduled_day etc... are empty, it will disable the button -->
        <ion-button
          :disabled="
            bills_name == '' ||
              benefeciary_name == '' ||
              frequency == '' ||
              scheduled_day == '' ||
              amount == '' ||
              currency == ''
          "
          type="submit"
          fill="solid"
          expand="block"
          color="danger"
          >Add</ion-button
        >
      </form>
    </ion-content>
  </div>
</template>

<script>
import { Due } from "@/modules/DueListService.js";
export default {
  name: "addListModal",
  props: {
    user_id: String,//this props is from the Home.vue
    timeout: { type: Number, default: 1000 },
  },
  data() {
    return {
      content: "Content",
      newBill: {},
      bills_name: "",
      benefeciary_name: "",
      frequency: "",
      scheduled_day: "",
      amount: "",
      currency: "",
    };
  },
  methods: {
    addDueList(e) {
      e.preventDefault(); //to prevent the page from reloading
      let isConfirmed = confirm("Do you want to enroll this bill?");

      if (isConfirmed) {
        //create new instance of bill
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
        Due.insertDue(this.newBill); //insert the new instance by calling this method insertDue from DueListService.js
        this.loading()
      }
    },
    //when the close button is close, it will dismiss the modal and pass the value of the new bill
    dismissModal() {
      this.$ionic.modalController.dismiss(this.newBill);
    },
    loading() {
      return this.$ionic.loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Adding Bill...',
          duration: this.timeout,
        })
        .then(loading => {
          setTimeout(function() {
            loading.dismiss()
          }, this.timeout)
          return loading.present()
        })
    },
  },
};
</script>
