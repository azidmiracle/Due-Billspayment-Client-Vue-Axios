import axios from "axios";

let DueURL = "http://localhost:5000/dueLists";

//new instance of a Due
class Due {
  constructor(
    username,
    bills_name,
    benefeciary_name,
    frequency,
    scheduled_day,
    amount,
    currency
  ) {
    this.username=username;
    this.bills_name = bills_name;
    this.benefeciary_name = benefeciary_name;
    this.frequency = frequency;
    this.scheduled_day = scheduled_day;
    this.amount = amount;
    this.currency = currency;
    this.txn=[]
  }

  static getAllDueLists(username) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${DueURL}/${username}`).then((res) => {
          const data = res.data;
          console.log(data)
          resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  //create Due
  static insertDue(Dues) {  
    return axios.post(DueURL, {
      username: Dues["username"],
      bills_name: Dues["bills_name"],
      benefeciary_name: Dues["benefeciary_name"],
      frequency: Dues["frequency"],
      scheduled_day: Dues["scheduled_day"],
      amount: Dues["amount"],
      currency: Dues["currency"],
      txn: []
    }).then(() =>{
      //return response.data.message;
      alert("Insert Successfully");
    }).catch(err =>{
      alert(err);
    })
  }

  //create Due
  static updateDue(id,Dues) {  
    return axios.patch(`${DueURL}/${id}`, {
    bills_name: Dues["bills_name"],
      benefeciary_name: Dues["benefeciary_name"],
      frequency: Dues["frequency"],
      scheduled_day: Dues["scheduled_day"],
      amount: Dues["amount"],
      currency: Dues["currency"]
    }).then(() =>{
      //return response.data.message;
      alert("Update Successfully");
    }).catch(err =>{
      alert(err);
    })
  }

  //delete Due
  static deleteDue(id) {
    return axios.delete(`${DueURL}/${id}`);
  }


}

export { Due };
