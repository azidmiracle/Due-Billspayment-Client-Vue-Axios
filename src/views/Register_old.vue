<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title >Registration</ion-title>      
      </ion-toolbar>
    </ion-header>
    <ion-content padding="true">
      <form @submit="addUser">
       <ion-item>
              <ion-input
                type="text"
                :value="username"
                @input="username = $event.target.value"
                placeholder="Username"
                required
              ></ion-input>
            </ion-item>
         <ion-item>
              <ion-input
                type="text"
                :value="name"
                @input="name = $event.target.value"
                placeholder="Name"
                required
              ></ion-input>
            </ion-item>
         <ion-item>
              <ion-input
                type="password"
                :value="password"
                @input="password = $event.target.value"
                placeholder="Password"
                required
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-input
                type="password"
                :value="password_2"
                @input="password_2 = $event.target.value"
                placeholder="Verify Password"
                required
              ></ion-input>
            </ion-item>
        <!--when bills_name, benefeciary_name, frequency, scheduled_day etc... are empty, it will disable the button -->
        <ion-button
          :disabled="
            bills_name == '' ||
              benefeciary_name == '' ||
              frequency == '' ||
              scheduled_day == '' ||
              amount == '' ||
              currency == ''
          "
          type="submit"
            size="large"
            expand="block"
            class="borderRad-40"
            color="secondary"
          >Register</ion-button
        >
      </form>
      <ion-item text-center lines="none" padding>
      <ion-label>
        <p>Already a member? <a href="/signIn">Sign-in</a></p>
      </ion-label>
    </ion-item>
    </ion-content>
  </div>
</template>

<script>
import { User } from "@/modules/UserService.js";
export default {
  name: "Register",
  props: {
    timeout: { type: Number, default: 1000 },
  },
  data() {
    return {
 username: null,
      name: null,
      password: null,
      password_2:null,
      User: {},
    };
  },
  methods: {
    addUser(e) {
      e.preventDefault(); //to prevent the page from reloading
      let isConfirmed = confirm("Do you want to registerl?");

      if (isConfirmed) {
        //create new instance of bill
        this.newBill = new User(
          this.user_id,
          this.bills_name,
          this.benefeciary_name,
          this.frequency,
          this.scheduled_day,
          this.amount,
          this.currency,
          []
        );
        User.insertUser(this.newBill); //insert the new instance by calling this method insertUser from UserListService.js
        this.loading()
      }

    

    },
    loading() {
      return this.$ionic.loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Adding Bill...',
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
