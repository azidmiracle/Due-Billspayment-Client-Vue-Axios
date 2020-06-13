<template>
  <ion-grid>
    <form @submit="OnSubmit">
      <ion-col>
      </ion-col>
      <ion-col>
        <ion-item>
          <ion-label>Bills Name:</ion-label>
          <ion-input
            type="number"
            :value="bills_name"
            @input="bills_name = $event.target.value"
            name="zip"
            placeholder="Type bills name here"
          ></ion-input>
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-button type="submit" color="primary" expand="block">Find</ion-button>
      </ion-col>
    </form>
  </ion-grid>
</template>

<script>
export default {
  name: "DueSearch",
  data(){
      return{
         bills_name:null,
      }
  },
  methods:{
      OnSubmit(){       
      }
  }
};
</script>