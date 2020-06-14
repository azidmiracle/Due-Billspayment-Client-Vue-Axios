<template>
  <ion-grid>
      <ion-row justify-content-center>
        <ion-col align-self-center size-md="5" size-lg="5" size-xs="12">
          <div text-center>
            <h4>Login Page</h4>
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
            <ion-button size="large" expand="block" @click="logIn"
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
      this.User = await User.getUser(this.username);
      let userPwd= this.User["password"]
      console.log(this.User["username"])
      if ( this.User!=null) {
        //match the password
        if (userPwd == this.password) {
          //isFound = true;
          //this.$router.push("/tabs/home");

           this.$router.push({
         name: "home",
           params: { username: this.username }
      });
        }else{
            alert("Wrong Password")
        }
      }else{
          alert("Username does not exist.")
      }
    },
  },
};
</script>

<style></style>
