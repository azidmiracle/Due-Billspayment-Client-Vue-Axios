<template>
  <ion-content center text-center>
    <ion-grid>
      <form @submit="register">
        <ion-row center>
          <ion-col text-center size-md="5" size-lg="5" size-xs="12">
            <div class="ion-padding">
              <ion-label><b>Password Reset</b></ion-label>           
              <ion-item>
                <ion-label position="stacked">New Password</ion-label>
                <ion-input
                  type="password"
                  :value="password"
                  @input="password = $event.target.value"
                  placeholder="xxxxxx"
                  clear-input="true"
                  required
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Confirm New Password</ion-label>
                <ion-input
                  type="password"
                  :value="password_2"
                  @input="password_2 = $event.target.value"
                  placeholder="xxxxxx"
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
  name: "ResetPassword",
  props: {
    timeout: { type: Number, default: 1000 },
  },
  data() {
    return {
      email:null,
      password: null,
      password_2: null,
    };
  },
  created(){
      this.email=this.$route.params.email;
  },
  methods: {
    async register(e) {
      e.preventDefault(); //to prevent the page from reloading 
        //check if both password mathces
        if (this.password == this.password_2) {
          //create new instance of user
          //insert the new instance by calling this method insertUser from UserService.js
          User.updateUserPwd(this.email,this.password).then(() =>
            
            this.$router.push({
              name: "signIn", //redirect to sign in page
            })
          );
          this.loading();
        } else {
          alert("Password does not match.");
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
