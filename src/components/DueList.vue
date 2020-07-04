<template>
  <div>
    <ion-card
      v-for="(due, index) in billsList"
      v-bind:item="due"
      v-bind:index="index"
      v-bind:key="due._id"
      color="success"
    >
      <ion-toolbar color="light">
        <ion-title slot="start" class="ion-text-uppercase">
          {{ due.bills_name }}
        </ion-title>
        <ion-button
          slot="end"
          :value="due._id"
          v-on:click="deleteDue(due._id)"
          color="light"
        >
          <ion-icon name="close"></ion-icon>
        </ion-button>
      </ion-toolbar>

      <ion-card-content justify-content-center align-items-center>
        <ion-label>
          <b>Beneficiary Name:</b>
          {{ due.benefeciary_name.toUpperCase() }}
        </ion-label>
        <br />
        <ion-label>
          <b>Frequency:</b>
          {{ getFrequency(due.frequency) }}
        </ion-label>
        <br />
        <ion-label>
          <b>Last Payment Date:</b>
          {{ getLastPayment(due.txn[0])[1] }}
        </ion-label>
        <br />
        <ion-label>
          <b>Next Payment Date:</b>
          {{ getNextPaymentDate(due) }}
        </ion-label>
        <br />
        <ion-item>
          <ion-label>
            <b>See Detail</b>
          </ion-label>
          <ion-button
            slot="end"
            color="warning"
            :value="due.bills_name"
            @click="openDueModal(due.bills_name, due)"
          >
            <ion-icon name="arrow-forward"></ion-icon>
          </ion-button>
        </ion-item>
              <ion-item>
          <ion-label>
            <b>Add to Calendar</b>
          </ion-label>
          <ion-button
            slot="end"
            color="secondary"
            :value="due.scheduled_day"
            @click="openDueModalCalendar(due.bills_name,due.scheduled_day,due.benefeciary_name)"
          >
            <ion-icon name="calendar"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-card-content>
    </ion-card>
  </div>
</template>
<script>
import { MyDate } from "@/modules/DateController.js";
import Due from "../views/Due";
import AddtoGoogleCalender from "../views/AddtoGoogleCalender";
export default {
  name: "DueList",
  props: {
    billsList: Array,//this prop is from the Home.vue
    username: String,//this prop is from the Home.vue
  },
  data() {
    return {
      todayMonth: "",
      todayYear: null,
      key: null,
      nextPaymentDue: null,
    };
  },
  methods: {
    deleteDue(key) {//delete the selected due by emitting the due id to the parent
      this.key = key;
      this.$emit("deleteList", this.key); //emit the key to the Home.vue parent
    },
    updateDetails() {//update the details of the due lists
      this.$emit("updateList"); //emit the key to the Home.vue parent
    },

    //this seeDetails method is not used since the routing does not work properly. So, i decided to use the modal
    seeDetails(bills_name, due) {
      this.$router.push({
        name: "due-name",
        params: {
          duename: bills_name,
          duenameDetails: due,
          username: this.username,
        },
      });
    },
    //When the see details button is clicked, it will pop up the DUE.VUE view (saved in the view folder)
    async openDueModal(bills_name, due) {
      let modal = await this.$ionic.modalController.create({
        component: Due,
        componentProps: {
          propsData: {
            duename: bills_name,
            duenameDetails: due,
            username: this.username,
          },
        },
      });

      // show the modal
      await modal.present();

      // update the lists
      await modal.onDidDismiss().then(() => this.updateDetails());
    },
        //When the see details button is clicked, it will pop up the DUE.VUE view (saved in the view folder)
    async openDueModalCalendar(bills_name,scheduled_day,benefeciary_name) {
      let modal = await this.$ionic.modalController.create({
        component: AddtoGoogleCalender,
        componentProps: {
          propsData: {
            duename: bills_name,
            scheduled_day: scheduled_day,   
            benefeciary_name:benefeciary_name        
          },
        },
      });

      // show the modal
      await modal.present();

      // update the lists
      //await modal.onDidDismiss().then(() => this.updateDetails());
    },
  },
  computed: {
    getLastPayment: function() {
      return function(lastPayment) {
        // sort by value
        //console.log(lastPayment)
        let allDateTxn = []; //create array for date paid only
        lastPayment.forEach((element) => {
          allDateTxn.push(new Date(element.date_paid)); //push the dates to this allDateTxn array
        });
        allDateTxn.sort(function(a, b) {
          return b - a; //sort from the latest date
        });

        let lastPyntDate = new Date(allDateTxn[0]); //get the first value in the array since that is the latest date

        //format the date for display
        let formatted_dateLP =
          MyDate.getMonthNameComplete(lastPyntDate.getMonth()) +
          " " +
          lastPyntDate.getDate() +
          ", " +
          lastPyntDate.getFullYear();
        if (allDateTxn[0] == null) {
          formatted_dateLP = "-";
        }
        let dateArr = [allDateTxn[0], formatted_dateLP]; //create an array. the first index is not formatted, second index is formatted
        return dateArr;
      };
    },
    getNextPaymentDate: function() {
      return function(due) {
        let dt = this.getLastPayment(due.txn[0])[0]; //get the last payment
        if (dt != null) {
          //if there is a last payment done, calculate the next payment
          //get the frequency
          let addMonth = [1, 3, 6, 12]; //for monthly:add 1 month, quarterly: add 3 months etc....

          //add the number of months to get the next payment date
          let newDate = new Date(
            dt.setMonth(dt.getMonth() + addMonth[due.frequency])
          );

          return MyDate.formatDate(newDate);//format the date

        } else {//if there was no last payment done, just get the date this month...         
          return (
            this.todayMonth + " " + due.scheduled_day + ", " + this.todayYear
          );
        }
      };
    },
    getFrequency: function() {
      let frequencyData = ["Monthly", "Quarterly", "Semi-annually", "Annually"];
      return (index) => frequencyData[index];//0:monthly; 1:Quarterly etc...
    },
  },
  created() {//once the compoent is created, it will get the current date. This value will be passed to the getNextPaymentDate function

    this.todayMonth = MyDate.getTodayMonth();
    this.todayYear = MyDate.getTodayYear();
  },
};
</script>


