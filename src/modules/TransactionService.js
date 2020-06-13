import axios from "axios";

let DueURL = "http://localhost:3000/dueLists/";
//new instance of a Due
class Transaction {
  constructor(date_paid, amount,currency,paid_by, mode_payment) {
    this.date_paid = date_paid;
    this.amount = amount;
    this.currency = currency;
    this.paid_by = paid_by;
    this.mode_payment = mode_payment;
  }

  static getAllTransactions(due_id) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(DueURL).then((res) => {
          const data = res.data;
          resolve(data.filter(element=>element.id==due_id)[0]["txn"]);
          //resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  //create Due
  static insertTransaction(id,data) {  
    return axios.patch(`${DueURL}${id}`, {
      "txn":data
    }).then(() =>{
      alert("Update Successfully");
    }).catch(err =>{
      alert(err);
    })
  }


  //insert the transaction last paid
  static insertLastPaidToDue(id,last_paid) {
    return axios.patch(`${DueURL}${id}`, {
      last_payment: last_paid,
    })
  }


}

export { Transaction };
