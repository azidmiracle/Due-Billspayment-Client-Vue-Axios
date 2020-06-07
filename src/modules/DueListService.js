import axios from "axios";

let DueURL = "http://localhost:3000/dueLists/";

//new instance of a Due
class Due {
  constructor(
    id,
    username,
    bills_name,
    benefeciary_name,
    description,
    month_day,
    amount
  ) {
    this.id = id;
    this.username=username;
    this.bills_name = bills_name;
    this.benefeciary_name = benefeciary_name;
    this.description = description;
    this.month_day = month_day;
    this.amount = amount;
    
  }

  static getAllDueLists(_username) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(DueURL).then((res) => {
          const data = res.data;
          resolve(data.filter(element=>element.username=_username));
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  //create Due
  static insertDue(Dues) {
    
    return axios.post(DueURL, {
      id: Dues["id"],
      username: Dues["username"],
      bills_name: Dues["bills_name"],
      benefeciary_name: Dues["benefeciary_name"],
      description: Dues["description"],
      month_day: Dues["month_day"],
      amount: Dues["amount"],
    }).then(() =>{
      //return response.data.message;
      alert("Insert Successfully");
    }).catch(err =>{
      alert(err);
    })
  }
  //delete Due
  static deleteDue(id) {
    return axios.delete(`${DueURL}${id}`);
  }


}

export { Due };
