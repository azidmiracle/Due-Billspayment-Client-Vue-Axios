import axios from "axios";

let userURL = "http://localhost:3000/users/";

//new instance of a user
class User {
  constructor(id, username, password, mobileNumber, country) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.mobileNumber = mobileNumber;
    this.country = country;
  }

  static getAllUserLists() {
    return new Promise((resolve, reject) => {
      try {
        axios.get(userURL).then((res) => {
          const data = res.data;
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
      id: users["id"],
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

//check if the user exists in the user collection
function checkExistingUser(userCollection, accountNumber) {
  let accontuNumberArr = userCollection.map((element) => element.accountNumber);
  let isFound = false;
  if (accontuNumberArr.indexOf(accountNumber) >= 0) {
    isFound = true;
  }
  return isFound;
}

export { User, checkExistingUser };
