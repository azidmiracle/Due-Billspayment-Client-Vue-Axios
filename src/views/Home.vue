<template>
  <div class="ion-page">
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Search Bill's Name</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          :value="bills_name"
          @input="bills_name = $event.target.value"
          @ionBlur="searchDue(bills_name)"
          show-cancel-button="always"
          @ionCancel="loadOrigValue" 
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <DueList
        :billsList="billsList"
        v-on:deleteList="onDeleteList"
        :user_id="user_id"
        v-on:updateList="updateList"
      />
      <ion-fab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        @click="openAddListModal"
      >
        <ion-fab-button color="warning">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </div>
</template>

<script>
import { Due } from "@/modules/DueListService.js";
import addListModal from "./addListModal.vue";
import DueList from "@/components/DueList.vue";
export default {
  name: "Home",
   props: {
    timeout: { type: Number, default: 1000 },
  },
  components: {
    DueList,//child component is DueList.vue

  },
  data() {
    return {
      billsList: null,
      billList_Orig: null, //save the lists of due for searching purposes
      user_id: null,
      billsList_filtered: [],
      bills_name: null,
    };
  },
  mounted() {
    //when mounted, get all the dues from the server
    this.getAlldues();
    //get the user id from the route params and save it in this user_id variable
    this.user_id = this.$route.params.user_id;

  },
  methods: {
    async getAlldues() {
      this.billsList = await Due.getAllDueLists(this.$route.params.user_id);
      this.billList_Orig = this.billsList; //save the value to the billListoRIG for search purpose
    },
    async openAddListModal() {
      //this will open the addListModal.vue modal
      let modal = await this.$ionic.modalController.create({
        component: addListModal,
        componentProps: {
          propsData: {
            user_id: this.user_id,//pass this data to the add addListModal.vue
          },
        },
      });

      // show the modal
      await modal.present();

      // update the lists
      await modal.onDidDismiss().then(() => this.getAlldues());
    },
    // Triggered when `childToParent` event is emitted by the child.
    onDeleteList(value) {
      let isDeleted = confirm("All transaction related to this bills name will be deleted. \n Do you want to delete?");
      if (isDeleted) {
        Due.deleteDue(value).then(() => this.getAlldues());
        this.loadingDelete()
      }
      //console.log(value);
    },
    updateList() {//this is called everytime the child component has changes
      this.getAlldues();
    },
    loadOrigValue() {//use for search engine. this is not to avoid loading again the data from server side
      this.billsList = this.billList_Orig; //put back the old value
    },
    searchDue(text) {
      this.loadOrigValue();//load the previous values
      this.billsList.forEach((element) => {
        //search the text in the bills_name array
        let regExSearch = new RegExp(text, "gi");//using regular expression g:global, i:not case sensitive
        let obj = element.bills_name.search(regExSearch);
        if (obj >= 0) {//if the bills name match, push the object to billsList_filtered array
          this.billsList_filtered.push(element);
        }
      });
      this.billsList = this.billsList_filtered;//pass the value of the billsList_filtered to billsList so it can display the data
      this.billsList_filtered = []; //clear the filtered arrays
    },
     loadingDelete() {
      return this.$ionic.loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Deleting Bill...',
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
