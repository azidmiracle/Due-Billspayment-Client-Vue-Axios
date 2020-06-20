<template>
  <ion-grid>
    <ion-row>
      <img src="https://diazloria.com/Diaz-loria.jpg" style="border-radius: 50%;" />
    </ion-row>
    <ion-row justify-content-center>
      <ion-col align-self-center size-md="5" size-lg="5" size-xs="12">
        <div text-center>
          <h4>Welcome Mark and Emely Loria</h4>
        </div>
        <div padding>
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
          <ion-button size="large" expand="block" @click="logIn" class="borderRad-40"
            >Login</ion-button
          >
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { User } from "@/modules/UserService.js";
export default {
  name: "LogIn",

  data() {
    return {
      username: null,
      password: null,
      isExisting: false,
      User: {},
    };
  },
  methods: {
    async logIn() {
      //check if the username and password exists in users database
      this.User = await User.getUser(this.username, this.password);
      //let userPwd= this.User["password"]
      if (this.User != 0) {

        this.$router.push({
          name: "home",
          params: {
            user_id: this.User["_id"],
          },
        });
      } else {
        alert("Username does not exist.");
      }
    },
  },
};
</script>
