<template>
  <div class="ion-padding">
    <ion-row>
      <ion-col size="3">
        <img :src="user.image" style="border-radius: 50%;" />
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
    <ion-row>
      <ion-label>
        <b>PASSWORD:</b>
        <ion-input :type="pwdType" :value="user.password"> </ion-input>
        <ion-button v-if="isPwdShown===false" color="warning" class="borderRad-20" size="small" @click="showPwd">
            <ion-icon name="eye" style="margin: 16px"></ion-icon>
            <ion-label> Show Password</ion-label>
          </ion-button>
       <ion-button v-else color="warning" class="borderRad-20" size="small" @click="hidePwd">
            <ion-icon name="eye-off" style="margin: 16px"></ion-icon>
            <ion-label> Hide Password</ion-label>
          </ion-button>
      </ion-label>
    </ion-row>
  </div>
</template>

<script>
import { User } from "@/modules/UserSettingsService.js";
export default {
  name: "Settings",
  props: {},
  data() {
    return {
      user: null,
      pwdType:"password",
      isPwdShown:false
    };
  },
  methods: {
    async getUserDetails() {
      this.user = await User.getUserDetails(this.$route.params.user_id);
    },
    logOut() {
      this.$router.push({
        name: "signIn",
      });
    },
    showPwd(){
       this.pwdType="text"
       this.isPwdShown=true
    },
    hidePwd(){
       this.pwdType="password"
       this.isPwdShown=false
    }
  },
  mounted() {
    this.getUserDetails();
  },
};
</script>
