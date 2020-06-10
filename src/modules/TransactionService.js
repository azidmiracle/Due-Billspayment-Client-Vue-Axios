import axios from "axios";

let txnURL = "http://localhost:3000/transaction/";
let DueURL = "http://localhost:3000/dueLists/";
//new instance of a Due
class Transaction {
  constructor(id, due_id, date_paid, amount,currency,paid_by, mode_payment) {
    this.id = id;
    this.due_id = due_id;
    this.date_paid = date_paid;
    this.amount = amount;
    this.currency = currency;
    this.paid_by = paid_by;
    this.mode_payment = mode_payment;
  }

  static getAllTransactions() {
    return new Promise((resolve, reject) => {
      try {
        axios.get(txnURL).then((res) => {
          const data = res.data;
          resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  //create Due
  static insertTransaction(transaction) {
    return axios.post(txnURL, {
      id: transaction["id"],
      due_id: transaction["due_id"],
      date_paid: transaction["date_paid"],
      amount:transaction["amount"],
      currency:transaction["currency"],
      paid_by: transaction["paid_by"],
      mode_payment: transaction["mode_payment"],
    }).then(() =>{
      //return response.data.message;
      alert("Insert Successfully");
    }).catch(err =>{
      alert(err);
    });
  }
  //delete Due
  static deleteDue(id) {
    return axios.delete(`${txnURL}${id}`);
  }

  //insert the transaction last paid
  static insertLastPaidToDue(id,last_paid) {
    return axios.patch(`${DueURL}${id}`, {
      last_payment: last_paid,
    })
  }


}

export { Transaction };
