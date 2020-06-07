<template>
  <div class="ion-page">
    <ion-content class="ion-padding">
      <DueList :billsList="billsList" v-on:deleteList="onDeleteList"/>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed" @click="openAddListModal">
        <ion-fab-button>
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
    DueList
  },
  data() {
    return {
      billsList: null,
    };
  },
  methods: {
    async getAlldues() {
      this.billsList = await Due.getAllDueLists("azid_miracle");
    },
    async openAddListModal() {

      let modal = await this.$ionic.modalController.create({
        component: addListModal,
        componentProps: {
          propsData: {
            timeStamp: new Date()
          }
        }
      });

      // show the modal
      await modal.present();

      // update the lists
      await modal.onDidDismiss().then(()=>this.getAlldues());

      
    },
      // Triggered when `childToParent` event is emitted by the child.
    onDeleteList (value) {
      this.billsList = value
    }
  },
  mounted() {
    this.getAlldues();
  }
};
</script>
