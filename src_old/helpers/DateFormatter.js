const monthStrings = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

class DateFormatter {
  constructor(utc) {
    this._date = new Date(utc);
  }

  getMonth() {
    return monthStrings[this._date.getMonth()];
  }

  getYear() {
    return this._date.getFullYear();
  }
}

export default DateFormatter;
