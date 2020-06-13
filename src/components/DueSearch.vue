<template>
  <ion-grid>
    <form @submit="OnSubmit">
      <ion-col>
      </ion-col>
      <ion-col>
        <ion-item>
          <ion-label>Zipcode:</ion-label>
          <ion-input
            type="number"
            :value="zip"
            @input="zip = $event.target.value"
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
  methods:{
      OnSubmit(){
          
      }
  }
};
</script>