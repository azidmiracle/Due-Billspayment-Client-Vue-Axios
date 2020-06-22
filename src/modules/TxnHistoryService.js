
/*
USED IN THE HISTORY  PAGE
THIS MODULE USED FOR THE TRANSACTION IN CLIENT SIDE USING AXIOS API
TRANSACTION: VIEW TRANSACTION HISTORY
*/

import axios from "axios";

let histURL = "https://due-lists.herokuapp.com/history";
//new instance of a Due
class TxnHistory {


//get all transaction
static getAllTransactions(username) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(`${histURL}/${username}`).then((res) => {
        const data = res.data;
        //console.log(data)
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
}
}

export { TxnHistory };
