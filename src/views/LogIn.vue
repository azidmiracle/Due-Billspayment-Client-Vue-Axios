<template>
  <ion-content center text-center>
    <ion-grid>
      <ion-row>
        <img
          src="https://diazloria.com/duelists/LOGO.jpg"
          style="border-radius: 50%;"
        />
      </ion-row>
      <ion-row center>
        <ion-col text-center size-md="5" size-lg="5" size-xs="12">
          <div class="ion-padding">
            <div style="display: flex;">
                <p><b> Please sign-in </b></p>
            </div>
            
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
                type="password"
                :value="password"
                @input="password = $event.target.value"
                placeholder="Password"
                required
              ></ion-input>
            </ion-item>
          </div>

          <div padding>
            <ion-button
              size="large"
              expand="block"
              @click="logIn"
          
              class="borderRad-40"
              color="secondary"
              >Login</ion-button
            >
             <ion-label style="display: flex;">              
                  <p style="margin:auto">Not yet a member? <a href="/Register">Register Here</a></p>
             </ion-label>
              <ion-label style="display: flex;">              
                  <p style="margin:auto">Forgot your <a href="/ForgotPassword">password?</a></p>
             </ion-label>
             
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import { User } from "@/modules/UserService.js";

export default {
  name: "LogIn",
   props: {
    timeout: { type: Number, default: 1000 },
  },
  data() {
    return {
      username: null,
      password: null,
      User: {},
    };
  },
  methods: {
    async logIn() {
      //check if the username and password exists in users database
      this.User = await User.getUser(this.username, this.password);
      //console.log(this.User)
      //If username and password matches the value in the user collection, redirect to log-in page
      if (this.User != 0) {
        this.$router.push({
          name: "home",
          params: {
            user_id: this.User["_id"],//call the home route. Rooute is saved in src/router/index.js
          },
        }).then(()=>this.loading());
      } else {//else, display the alert
        alert("Username does not exist.");
      }
    },
      loading() {
      return this.$ionic.loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Logging in...',
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
