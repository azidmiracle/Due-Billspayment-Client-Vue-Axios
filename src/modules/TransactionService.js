import axios from "axios";

let txnURL = "http://localhost:3000/transaction/";

//new instance of a Due
class Transaction {
  constructor(id, due_id, date_paid, paid_by, mode_payment) {
    this.id = id;
    this.due_id = due_id;
    this.date_paid = date_paid;
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
      paid_by: transaction["paid_by"],
      mode_payment: transaction["mode_payment"],
    });
  }
  //delete Due
  static deleteDue(id) {
    return axios.delete(`${txnURL}${id}`);
  }

  //get the transaction last paid
  static getLastPaid() {
    //get all the transaction with the id
    const history = Transaction.getAllTransactions(); //.filter(element=>element.due_id==due_id);

    return history;
  }
}

export { Transaction };
