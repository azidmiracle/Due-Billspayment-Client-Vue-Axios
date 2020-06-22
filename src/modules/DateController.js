var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

class MyDate {
  static getTodayMonth() {//get the month today and return the month name example June
    let dateToday = new Date();
    let monthName = month[dateToday.getMonth()];
    return monthName;
  }

  static getTodayYear(){//get the full year of todays date
    let dateToday = new Date();
    let year = dateToday.getFullYear();

    return year
  }
  static getMonthName(monthNum) {   //get the month name but up to 3 characters only. for example for june, it will return Jun
    return month[monthNum].slice(0, 3);
  }

  static getMonthNameComplete(monthNum) {  //return the complete month name 
    return month[monthNum];
  }

  static formatDate(date){//format the date example June 1, 2020
    let formattedDate=this.getMonthNameComplete(date.getMonth()) +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear()
    return formattedDate
  }

}

export  {MyDate};//export the date
