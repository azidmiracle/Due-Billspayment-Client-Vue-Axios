/*
USED IN THE LOGIN  PAGE
THIS MODULE USED FOR THE LOGGING IN CLIENT SIDE USING AXIOS API
TRANSACTION: VERIFY IF THE USERNAME AND PASSWORD EXISTS IN THE DATABASE
*/


import axios from "axios";

let userURL = "https://due-lists.herokuapp.com/user/";

//new instance of a user
class User {
  constructor(id, username, password, mobileNumber, country) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.mobileNumber = mobileNumber;
    this.country = country;
  }

  //It will pass the username and password value to the server side route
  static getUser(username,password) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${userURL}${username},${password}`).then((res) => {
          let data = res.data;
          if (data==null){//if the user does not exist it will return 0
            data="0"
          }
         //console.log(data)
          resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  //create user
  static insertUser(users) {
    return axios.post(userURL, {
      username: users["username"],
      password: users["password"],
      mobileNumber: users["mobileNumber"],
      country: users["country"],
    });
  }

  //delete user
  static deleteUser(id) {
    return axios.delete(`${userURL}${id}`);
  }


}


export { User };
