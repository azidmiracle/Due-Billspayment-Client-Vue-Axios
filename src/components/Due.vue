<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" v-on:click="dismissModal()">
          <ion-icon name="arrow-back"></ion-icon>
        </ion-button>
        <ion-card-title>Edit Bill Details</ion-card-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding="true">
      <form id="dueName" @submit="onUpdate"  action="/azid_miracle/home">
        <ion-item>
          <ion-label position="stacked">Bills name e.g. SSS</ion-label>
          <ion-input
            class="ion-text-uppercase"
            name="bills_name"
            clear-input="true"
            required
            readonly
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
            readonly
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
          <ion-label position="stacked">Scheduled Day e.g. 20</ion-label>
          <ion-input
            type="number"
            :value="scheduled_day"
            @input="scheduled_day = $event.target.value"
            clear-input="true"
            readonly
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
            readonly
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
        <ion-grid name="grid" v-if="isEdit==true">
          <ion-row class="ion-justify-content-evenly">
            <ion-col class="ion-padding">
              <input type="reset" value="CLEAR" class="btn" />
            </ion-col>
            <ion-col class="ion-padding">
              <input type="submit" value="UPDATE" class="btn btn-submit" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-content>
    <ion-fab vertical="bottom" horizontal="start" slot="fixed" @click="editDues()">
      <ion-fab-button color="secondary">
        <ion-icon name="create"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed" @click="openAddTxnModal">
      <ion-fab-button color="secondary">
        <ion-icon name="card"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script>
import { Due } from "@/modules/DueListService.js";
import addTransaction from "../views/addTransaction.vue";
export default {
  name: "Due",
  props:{
            duename: String,
            duenameDetails: Object ,
            username:String
  },
  data() {
    return {
      //duename: null,
      id: null,
      //username:null,
      //duenameDetails: {},
      bills_name: null,
      benefeciary_name: null,
      frequency: null,
      scheduled_day: null,
      amount: null,
       currency: null,
      isEdit: false,
      updatedDue:{}
    };
  },
  methods: {
    editDues() {
      this.isEdit = true;
      //make all textboxes editable
      let input_tags = document.querySelectorAll("ion-input");
      for (let i = 0; i < input_tags.length; ++i) {
        input_tags[i].readonly = false;
      }
    },
    onUpdate(e) {
      e.preventDefault();
      let isConfirmed = confirm("Do you want to update this bill?");
      if (isConfirmed) {
        //create new instance of user
        this.updatedDue = {
          bills_name: this.bills_name,
          benefeciary_name: this.benefeciary_name,
          frequency: this.frequency,
          scheduled_day: this.scheduled_day,
          amount: this.amount,
          currency: this.currency
        };
        Due.updateDue(this.id, this.updatedDue);
      }
    },

    async openAddTxnModal() {
      let modal = await this.$ionic.modalController.create({
        component: addTransaction,
        componentProps: {
          propsData: {
            bills_name: this.bills_name,
            _amount:this.amount,
            _currency:this.currency,
            due_id:this.id,
            username:this.username,

            
          }
        }
      });

      // show the modal
      await modal.present();

      // update the lists
      //await modal.onDidDismiss().then(() => this.getAlldues());
    },
    //when the close button is clicked, it will dismiss the modal and pass the value of the new bill
    dismissModal() {
      this.$ionic.modalController.dismiss(this.updatedDue);
    }
  },
  mounted: function() {
    this.id = this.duenameDetails.id;
    this.bills_name = this.duenameDetails.bills_name;
    this.benefeciary_name = this.duenameDetails.benefeciary_name;
    this.frequency = this.duenameDetails.frequency;
    this.scheduled_day = this.duenameDetails.scheduled_day;
    this.amount = this.duenameDetails.amount;
     this.currency = this.duenameDetails.currency;
   
  }
};
</script>
<style >
.btn {
  background-color: red; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.btn-submit {
  background-color: #4caf50;
} /* Blue */
</style>