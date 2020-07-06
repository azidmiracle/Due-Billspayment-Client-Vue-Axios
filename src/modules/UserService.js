/*
USED IN THE LOGIN  PAGE
THIS MODULE USED FOR THE LOGGING IN CLIENT SIDE USING AXIOS API
TRANSACTION: VERIFY IF THE USERNAME AND PASSWORD EXISTS IN THE DATABASE
*/

import axios from "axios";

let userURL =  process.env.VUE_APP_baseUrl+"user/";
let DueURL =  process.env.VUE_APP_baseUrl+"dueLists";
//new instance of a user
class User {
  constructor(username, email,password, name) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    //this.mobileNumber = mobileNumber;
    //this.country = country;
  }

  //It will pass the username and password value to the server side route
  static getUser(username,password) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${userURL}${username},${password}`).then((res) => {
          let data = res.data;
          if (Object.keys(data).length === 0){//if the user does not exist it will return 0
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

 //It will pass the username and password value to the server side route
 static checkUser(username) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(`${userURL}${username}`).then((res) => {
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
  static insertUser(user) {
    return axios.post(userURL, {
      username: user["username"],
      email: user["email"],
      password: user["password"],
      name: user["name"],
      //mobileNumber: users["mobileNumber"],
      //country: users["country"],
    }).then(() =>{
      //return response.data.message;
      alert("Registration Successful");
    }).catch(err =>{
      alert(err);
    });
  }

  //delete user
  static deleteUser(id) {
    return new Promise((resolve, reject) => {
      try {
        axios.delete(`${userURL}${id}`).then(()=>axios.delete(`${DueURL}/${id}`))
        
      } catch (err) {
        reject(err);
      }
    });

  }



}

export { User };
