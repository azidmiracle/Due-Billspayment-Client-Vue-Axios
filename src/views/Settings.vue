<template>
  <div class="ion-padding">
    <ion-row>
      <ion-col size="3">
        <img :src="user.image" style="border-radius: 50%;" alt="Avatar" />
      </ion-col>
      <ion-col>
        <ion-row>
          <ion-label style="font-size:12px">
            {{ user.name.toUpperCase() }}
          </ion-label>
        </ion-row>
        <ion-row>
          <ion-button color="secondary" class="borderRad-20" @click="logOut">
            <ion-icon name="power" style="margin: 16px"></ion-icon>
            <ion-label> LOG OUT</ion-label>
          </ion-button>
        </ion-row>
      </ion-col>
    </ion-row>
    <br />
    <br />
    <ion-row>
      <ion-label>
        <b>USER NAME:</b>
        <ion-input readonly> {{ user.username }}</ion-input></ion-label
      >

      <br />
    </ion-row>

    <br />
    <!--
    <ion-row>
      <ion-label>
        <b>PASSWORD:</b>
        <ion-input :type="pwdType" :value="user.password"> </ion-input>

         When the isPwdShown is false, show this button 
        <ion-button
          v-if="isPwdShown === false"
          color="warning"
          class="borderRad-20"
          size="small"
          @click="showPwd"
        >
          <ion-icon name="eye" style="margin: 16px"></ion-icon>
          <ion-label> Show Password</ion-label>
        </ion-button>
         When the isPwdShown is true, show this button -
        <ion-button
          v-else
          color="warning"
          class="borderRad-20"
          size="small"
          @click="hidePwd"
        >
          <ion-icon name="eye-off" style="margin: 16px"></ion-icon>
          <ion-label> Hide Password</ion-label>
        </ion-button>
      </ion-label>
    </ion-row>-->
   <ion-footer class="bottom-footer" lines="none">
  <ion-toolbar>
    <p>Version 1.0 Last Update on June 28,2020</p>
  </ion-toolbar>
</ion-footer>
  </div>
</template>

<script>
import { User } from "@/modules/UserSettingsService.js";
export default {
  name: "Settings",
  props: {timeout: { type: Number, default: 1500 },},
  data() {
    return {
      user: null,

      //--this is used in showing/hiding the show/hide password button.
      pwdType: "password",// default value set to password ex. ******
      isPwdShown: false,//set the value to false. meaning, hide password
    };
  },
  methods: {
    async getUserDetails() {
      this.user = await User.getUserDetails(this.$route.params.user_id);//call the method getUserDetails saved in UserSettingsService.js
    },
    logOut() {//when the log-out button is clicked, redirect to signIn page
      window.location.href = "/signIn";
      this.loading()
    },
    loading() {
      return this.$ionic.loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Logging out...',
          duration: this.timeout,
        })
        .then(loading => {
          setTimeout(function() {
            loading.dismiss()
          }, this.timeout)
          return loading.present()
        })
    },
    showPwd() {//when the show password is clicked
      this.pwdType = "text";//set the type from password to text
      this.isPwdShown = true;
    },
    hidePwd() {//when the hide password is clicked
      this.pwdType = "password";//set the type from text  to password
      this.isPwdShown = false;
    },
  },
  mounted() {
    this.getUserDetails();//when the page is mounted, load the user details
  },
};
</script>

<style scoped>
.bottom-footer{
  position:fixed;
  right:0;
  bottom:0;
}
</style>
