import axios from "axios";

let DueURL = "http://localhost:5000/dueLists/txn/";
//new instance of a Due
class Transaction {
  constructor(date_paid, amount,currency,paid_by, mode_payment) {
    this.date_paid = date_paid;
    this.amount = amount;
    this.currency = currency;
    this.paid_by = paid_by;
    this.mode_payment = mode_payment;
  }

  static getThisTxn(id) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${DueURL}${id}`).then((res) => {
          const data = res.data;
          resolve(data);
          //resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  //create Due
  static insertTransaction(id,data) {  
    return axios.post(`${DueURL}${id}`, {
      "txn":data
    }).then(() =>{
      alert("Update Successfully");
    }).catch(err =>{
      alert(err);
    })
  }

}

export { Transaction };
