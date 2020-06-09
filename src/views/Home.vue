<template>
  <div class="ion-page">
    <ion-content class="ion-padding">
      <DueList :billsList="billsList" v-on:deleteList="onDeleteList" :username="username"/>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed" @click="openAddListModal"> 
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
   // IonTabs
  },
  data() {
    return {
      billsList: null,
      username:null,
    };
  }
  ,
  mounted() {
    this.getAlldues();
    this.username=this.$route.params.username;
    
  }
  ,
  methods: {
    async getAlldues() {
      this.billsList = await Due.getAllDueLists(this.$route.params.username);
    },
    async openAddListModal() {
      let modal = await this.$ionic.modalController.create({
        component: addListModal,
        componentProps: {
          propsData: {
            timeStamp: new Date(),
            username:this.username
          }
        }
      });

      // show the modal
      await modal.present();

      // update the lists
      await modal.onDidDismiss().then(() => this.getAlldues());
    },

    // Triggered when `childToParent` event is emitted by the child.
    onDeleteList(value) {
      let isDeleted = confirm("Do you want to delete?");
      if (isDeleted) {
        Due.deleteDue(value);
      }
      this.getAlldues(); //emit to the parent);
      console.log(value);
    }
  }
};
</script>
