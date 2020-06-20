import axios from "axios";

let userURL = "http://localhost:5000/settings/";

//new instance of a user
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
