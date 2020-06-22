/*
USED IN THE SETTINGS  PAGE
THIS MODULE USED FOR THE USER DETAILS CLIENT SIDE USING AXIOS API
TRANSACTION: VIEW THE USER USERNAME AND PASSWORD
*/

import axios from "axios";
let userURL = "https://due-lists.herokuapp.com/settings/";

class User {

  static getUserDetails(user_id) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${userURL}${user_id}`).then((res) => {
          let data = res.data;
          resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }


}


export { User };
