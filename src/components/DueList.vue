<template>
  <div class="lists">
    <ion-card
      v-for="(due, index) in billsList"
      v-bind:index="index"
      v-bind:key="due.id"
      color="dark"
    >
      <ion-toolbar color="light">
        <ion-title slot="start" class="ion-text-uppercase">{{ due.bills_name}}</ion-title>
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
          {{ getNextPaymentDate(due) }}
        </ion-label>
        <br />
        <ion-item>
          <ion-label>See Details</ion-label>
          <ion-button
            
            slot="end"
            color="secondary"
            :value=" due.bills_name"
            @click="openDueModal(due.bills_name,due)"
          >
            <ion-icon name="arrow-forward"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-card-content>
    </ion-card>
  </div>
</template>
<script>
import { MyDate } from "@/modules/DateController.js";
import Due from "@/components/Due.vue";
export default {
  name: "DueList",
  props: {
    msg: String,
    billsList: Array,
    username:String
  },
  data() {
    return {
      //dues: [],
      todayMonth: "",
      todayYear: null,
      billChild: this.billsList, //initially, the billList array from parent is pass to this variable,
      key: null,
      nextPaymentDue: null
    };
  },
  methods: {
    deleteDue(key) {
      this.key = key;
      this.$emit("deleteList", this.key);//emit the key to the Home.vue parent
    },
    updateDetails(){
      this.$emit("updateList");//emit the key to the Home.vue parent
    },
    seeDetails(bills_name, due) {
      this.$router.push({
        name: "due-name",
        params: { duename: bills_name, duenameDetails: due , username: this.username}
      });
    },
    async openDueModal(bills_name, due) {
      let modal = await this.$ionic.modalController.create({
        component: Due,
        componentProps: {
          propsData: {
            duename: bills_name,
            duenameDetails: due ,
            username:this.username
          }
        }
      });

      // show the modal
      await modal.present();

      // update the lists
      await modal.onDidDismiss().then(() => this.updateDetails());
    },
  },
  computed: {
    getNextPaymentDate: function () {
      return due=> this.todayMonth + " " + due.scheduled_day + ", " + this.todayYear;
    }
  },
  created() {
    this.todayMonth = MyDate.getTodayMonth();
    this.todayYear = MyDate.getTodayYear();

  }
};
</script>

<style>
.lists {
}
</style>
