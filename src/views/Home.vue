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
        <ion-fab-button color="secondary">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </div>
</template>

<script>
import { Due } from "@/modules/DueListService.js";
import addListModal from "./addListModal.vue";
// @ is an alias to /src
import DueList from "@/components/DueList.vue";
export default {
  name: "Home",
  components: {
    DueList,
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
    this.getAlldues();
    this.user_id = this.$route.params.user_id;
    //console.log(this.user_id)

  },
  methods: {
    async getAlldues() {
      this.billsList = await Due.getAllDueLists(this.$route.params.user_id);
      this.billList_Orig = this.billsList; //save the value to the billListoRIG for search purpose
    },
    async openAddListModal() {
      let modal = await this.$ionic.modalController.create({
        component: addListModal,
        componentProps: {
          propsData: {
            timeStamp: new Date(),
            user_id: this.user_id,
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
      this.loadOrigValue();
      this.billsList.forEach((element) => {
        let regExSearch = new RegExp(text, "gi");
        let obj = element.bills_name.search(regExSearch);
        if (obj >= 0) {
          this.billsList_filtered.push(element);
        }
      });
      this.billsList = this.billsList_filtered;
      this.billsList_filtered = []; //clear the filtered arrays
    },
  },
};
</script>
