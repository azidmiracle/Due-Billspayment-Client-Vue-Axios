<template>
  <div class="ion-page" name="ionDivItem">
    <ion-header>
      <ion-toolbar>
        <ion-back-button default-href="tabs/home/" slot="start"></ion-back-button>
        <ion-card-title>Edit Bill Details</ion-card-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding="true">
      <form id="dueName" @submit="onUpdate">
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
        <ion-item>
          <ion-label position="stacked">Description e.g. Monthly payment of SSS</ion-label>
          <ion-input
            :value="description"
            @input="description = $event.target.value"
            clear-input="true"
            spellcheck="true"
            readonly
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
            readonly
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
            readonly
            required
          ></ion-input>
        </ion-item>
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
import removeInvisible from "./removeInvisible";
import { Due } from "@/modules/DueListService.js";
import addTransaction from "../views/addTransaction.vue";
export default {
  name: "Due",
  data() {
    return {
      duename: null,
      id: null,
      username:null,
      duenameDetails: {},
      bills_name: null,
      benefeciary_name: null,
      description: null,
      scheduled_day: null,
      amount: null,
      isEdit: false
    };
  },
  methods: {
    removeClass() {
      //remove the class of the input to make it visible
      let inputTag = document.getElementsByName("ionDivItem")[1];
      console.log(inputTag);
      removeInvisible(inputTag);
    },
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
        let newData = {
          bills_name: this.bills_name,
          benefeciary_name: this.benefeciary_name,
          description: this.description,
          scheduled_day: this.scheduled_day,
          amount: this.amount
        };
        console.log(newData);
        console.log(this.id);
        Due.updateDue(this.id, newData);
      }
    },

    async openAddTxnModal() {
      let modal = await this.$ionic.modalController.create({
        component: addTransaction,
        componentProps: {
          propsData: {
            bills_name: this.bills_name,
            _amount:this.amount,
            due_id:this.id,
            username:this.username
            
          }
        }
      });

      // show the modal
      await modal.present();

      // update the lists
      await modal.onDidDismiss().then(() => this.getAlldues());
    }
  },

  beforeMount: function() {
    this.username = this.$route.params.username;
    this.duename = this.$route.params.duename;
    this.duenameDetails = this.$route.params.duenameDetails;
    this.id = this.duenameDetails.id;
    this.bills_name = this.duenameDetails.bills_name;
    this.benefeciary_name = this.duenameDetails.benefeciary_name;
    this.description = this.duenameDetails.description;
    this.scheduled_day = this.duenameDetails.scheduled_day;
    this.amount = this.duenameDetails.amount;
  },
  mounted: function() {
    this.removeClass();
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