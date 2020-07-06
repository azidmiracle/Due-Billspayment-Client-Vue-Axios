<template>
  <ion-content center text-center>
    <ion-grid v-if="isCodeSent == false">
      <form @submit="register">
        <ion-row center>
          <ion-col text-center size-md="5" size-lg="5" size-xs="12">
            <div class="ion-padding">
              <ion-label><b>Reset Password</b></ion-label>

              <ion-item>
                <ion-input
                  type="text"
                  :value="email"
                  @input="email = $event.target.value"
                  placeholder="email"
                  clear-input="true"
                  required
                ></ion-input>
              </ion-item>
            </div>

            <div padding>
              <ion-button
                type="submit"
                size="large"
                expand="block"
                class="borderRad-40"
                color="secondary"
                >Reset</ion-button
              >
            </div>
          </ion-col>
        </ion-row>
      </form>
    </ion-grid>
    <ion-grid v-else>
      <form @submit="verify">
        <ion-row center>
          <ion-col text-center size-md="5" size-lg="5" size-xs="12">
            <ion-label color="danger">Code has been sent to the email you've provided. You may check the spam of your email.</ion-label>
            <div class="ion-padding">
              <ion-label><b>Code</b></ion-label>

              <ion-item>
                <ion-input
                  type="text"
                  :value="code"
                  @input="code = $event.target.value"
                  placeholder="123456"
                  clear-input="true"
                  required
                ></ion-input>
              </ion-item>
            </div>

            <div padding>
              <ion-button
                type="submit"
                size="large"
                expand="block"
                class="borderRad-40"
                color="secondary"
                >Verify Code</ion-button
              >
            </div>
          </ion-col>
        </ion-row>
      </form>
    </ion-grid>
    <ion-item text-center lines="none" padding>
      <ion-label style="display: flex;">
        <p style="margin:auto">
          Already a member? <a href="/signIn">Sign-in</a>
        </p>
      </ion-label>
    </ion-item>
  </ion-content>
</template>

<script>
import { User } from "@/modules/ForgotPasswordService.js";

export default {
  name: "ForgotPassword",
  props: {
    timeout: { type: Number, default: 1000 },
  },
  data() {
    return {
      email: null,
      User: {},
      isCodeSent: false,
      code: null,
    };
  },
  methods: {
    async register(e) {
      e.preventDefault(); //to prevent the page from reloading
      //check if the username and password exists in users database
      this.User = await User.resetPassword(this.email).then(
        () => (this.isCodeSent = true)
      );
      //If username and password matches the value in the user collection, user already exist
    },
    async verify(e) {
      e.preventDefault(); //to prevent the page from reloading

      //check if the username and password exists in users database
      await User.verifyToken(this.email, this.code).then((email) => {
        //console.log(email.length);
        if (email.length != undefined) {
          //alert("Update Successfully.");
          this.$router
            .push({
              name: "ResetPassword",
              params: {
                email: email, //call the home route. Rooute is saved in src/router/index.js
              },
            })
            .then(() => this.loading());
        } else {
          //else, display the alert
          alert("Incorrect code or wrong email address");
        }
      });
      //If username and password matches the value in the user collection, user already exist
    },
    loading() {
      return this.$ionic.loadingController
        .create({
          cssClass: "my-custom-class",
          message: "Please wait...",
          duration: this.timeout,
        })
        .then((loading) => {
          setTimeout(function() {
            loading.dismiss();
          }, this.timeout);
          return loading.present();
        });
    },
  },
};
</script>
