
/*
USED IN THE HOME PAGE
THIS MODULE USED FOR THE DUE TRANSACTION IN CLIENT SIDE USING AXIOS API
TRANSATIONS SUCH AS ADD BILLS, UPDATE BILLS AND DELETE DUE 

*/

import axios from "axios";
//import base URL

let DueURL=process.env.VUE_APP_baseUrl+"dueLists";

//new instance of a Due
class Due {
  constructor(
    user_id,
    bills_name,
    benefeciary_name,
    frequency,
    scheduled_day,
    amount,
    currency
  ) {
    this.user_id=user_id;
    this.bills_name = bills_name;
    this.benefeciary_name = benefeciary_name;
    this.frequency = frequency;
    this.scheduled_day = scheduled_day;
    this.amount = amount;
    this.currency = currency;
    this.txn=[]
  }

  static getAllDueLists(user_id) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${DueURL}/${user_id}`).then((res) => {
          const data = res.data;
          //console.log(DueURL)
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
      user_id: Dues["user_id"],
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
