<template>
  <div class="hello">
    <ul v-for="(user,index) in users" v-bind:user="user" v-bind:index="index" v-bind:key="user.id">
      <li>
        <span>{{user.username}}</span>
        <button v-on:click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
    <div class="create-user">
      <input type="text" id="create-user" v-model="username" placeholder="Type user name" />
      <input type="password" id="create-pwd" v-model="password" placeholder="Type password" />
      <input type="password" id="create-pwd-1" placeholder="Verify password" />
      <input type="number" id="create-ctry" v-model="mobileNo" placeholder="Type valid mobile number" />   
      <button v-on:click="addUser()">Add</button>
    </div>
    
  </div>
</template>

<script>
//import * as userModule from '@/modules/user.js'
import { User } from "@/modules/UserService.js";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      myData: "",
      users: [],
      lastId: 0,
      username:'',
      password:'',
      mobileNo:'',
      Country:''
    };
  },
  methods: {
    async getAllUsers() {
      this.users = await User.getAllUserLists();
      //get the length of the array
      let userArrayLen = this.users.length;
      //get the id of the last item
      this.lastId = this.users[userArrayLen - 1]["id"] + 1;
    },
    deleteUser(key) {
      User.deleteUser(key);
      console.log(key);
      this.getAllUsers();
    },
    addUser() {
      //create new instance of user
      let newUser = new User(
        this.lastId,
        this.username,
        this.password,
        this.mobileNo,
        this.Country
      );
      User.insertUser(newUser);
      this.getAllUsers();
    }
  },
  mounted() {
    this.getAllUsers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
