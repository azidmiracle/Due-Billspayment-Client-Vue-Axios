/*
USED IN THE LOGIN  PAGE
THIS MODULE USED FOR THE LOGGING IN CLIENT SIDE USING AXIOS API
TRANSACTION: VERIFY IF THE USERNAME AND PASSWORD EXISTS IN THE DATABASE
*/

import axios from "axios";

let forgotPwdURL =  process.env.VUE_APP_baseUrl+"forgot/";
let resetPwdURL =  process.env.VUE_APP_baseUrl+"reset/";
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
 static resetPassword(email) {
  return axios.post(`${forgotPwdURL}${email}/`, {
    email:email
  }).then(() =>{
    //return response.data.message;
    //console.log(res.data)
  }).catch(err =>{
    alert(err);
  });
}

static verifyToken(email,code) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(`${forgotPwdURL}${email}/${code}`).then((res) => {
        let data = res.data;
       //console.log(data)
        resolve(data);
      });

    } catch (err) {
      reject(err);
    }
  });
}


 //create user
 static updateUserPwd(email,password) {
  return axios.post(resetPwdURL, {
    email: email,
    password: password,
  }).then(() =>{
    alert("Update Successful");
  }).catch(err =>{
    alert(err);
  });
}



}




export { User };
