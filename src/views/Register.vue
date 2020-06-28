<template>
  <ion-content center text-center>
    <ion-grid>
      <form @submit="register">
        <ion-row center>
          <ion-col text-center size-md="5" size-lg="5" size-xs="12">
            <div class="ion-padding">
              <ion-label><b>Registration</b></ion-label>

              <ion-item>
                <ion-input
                  type="text"
                  :value="username"
                  @input="username = $event.target.value"
                  placeholder="Username"
                  clear-input="true"
                  required
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  type="text"
                  :value="name"
                  @input="name = $event.target.value"
                  placeholder="Name"
                  clear-input="true"
                  required
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  type="password"
                  :value="password"
                  @input="password = $event.target.value"
                  placeholder="Password"
                  clear-input="true"
                  required
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-input
                  type="password"
                  :value="password_2"
                  @input="password_2 = $event.target.value"
                  placeholder="Verify Password"
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
                >Register</ion-button
              >
            </div>
          </ion-col>
        </ion-row>
      </form>
    </ion-grid>
    <ion-item text-center lines="none" padding>
      <ion-label>
        <p>Already a member? <a href="/signIn">Sign-in</a></p>
      </ion-label>
    </ion-item>
  </ion-content>
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
      password_2: null,
      User: {},
    };
  },
  methods: {
    async register(e) {
      e.preventDefault(); //to prevent the page from reloading
      //check if the username and password exists in users database
      this.User = await User.checkUser(this.username);
      //If username and password matches the value in the user collection, user already exist
      if (this.User != 0) {
        alert("Username already used.");
      } else {
        //check if both password mathces
        if (this.password == this.password_2) {
          
          //create new instance of user
          this.User = new User(this.username, this.password, this.name);
          //insert the new instance by calling this method insertUser from UserService.js
          User.insertUser(this.User).then(() =>
            this.$router.push({
              name: "signIn", //redirect to sign in page
            })
          ); 
          this.loading();
        } else {
          alert("Password does not match.");
        }
      }
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
