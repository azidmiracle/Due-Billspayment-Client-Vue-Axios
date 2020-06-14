import axios from "axios";

let DueURL = "http://localhost:3000/dueLists/";
//new instance of a Due
class TxnHistory {

  static getAllTxn(_username) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(DueURL).then((res) => {
          const data = res.data;
          resolve(data.filter(element=>element.username==_username));
          //resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

}

export { TxnHistory };
