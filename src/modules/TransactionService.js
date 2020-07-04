/*
USED IN THE HOME PAGE
THIS MODULE USED FOR THE TRANSACTION IN CLIENT SIDE USING AXIOS API
TRANSACTION: ADD TRANSACTION
*/

import axios from "axios";


let txnURL = process.env.VUE_APP_baseUrl+"dueLists/txn";


//new instance of a Due
class Transaction {
  constructor(date_paid, amount,currency,paid_by, mode_payment) {
    this.date_paid = date_paid;
    this.amount = amount;
    this.currency = currency;
    this.paid_by = paid_by;
    this.mode_payment = mode_payment;
  }

//get specific transaction
  static getThisTxn(id) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${txnURL}/${id}`).then((res) => {
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
    return axios.post(`${txnURL}/${id}`, {
      "txn":data
    }).then(() =>{
      alert("Update Successfully");
    }).catch(err =>{
      alert(err);
    })
  }

}

export { Transaction };
