import axios from 'axios';

let CountryURL='http://localhost:3000/countries/'

//new instance of a Country
 class Country{
    constructor (id,countryName){
        this.id=id
        this.countryName=countryName
    } 

    static getAllCountryLists() {
        return new Promise((resolve, reject) => {
          try {
            axios.get(CountryURL).then((res) => {
              const data = res.data;  
              resolve(
                data
              );
            });
          } catch (err) {
            reject(err);
          }
        });
      }

  //create Country
  static insertCountry(Countrys) {
    return axios.post(CountryURL, {
        "id": Countrys["id"],
        "Countryname":Countrys["Countryname"],
    });
  }

        //delete Country
    static deleteCountry(id) {
        return axios.delete(`${CountryURL}${id}`);
    }


}


export {Country}


