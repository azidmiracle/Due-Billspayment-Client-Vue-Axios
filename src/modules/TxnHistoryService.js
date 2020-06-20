import axios from "axios";

let histURL = "http://localhost:5000/history";
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
