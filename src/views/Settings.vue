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
    <br>
    <br>
    <ion-row>
      <ion-label>
          <b>USER NAME: </b> {{user.username}}
      </ion-label>
    </ion-row>
    <br>
    <ion-row>
      <ion-label>
          <b>PASSWORD: </b> {{user.password}}
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
    };
  },
  methods: {
    async getUserDetails() {
      this.user = await User.getUserDetails(this.$route.params.user_id);
    },
     logOut() {
      
        this.$router.push({
          name: "signIn"
        }); 
    },
  },
  mounted() {
    this.getUserDetails();
  },
};
</script>

