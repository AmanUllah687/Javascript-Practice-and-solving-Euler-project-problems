function isLeapYear(year) {
  if(year % 400 === 0) return true;
  if(year % 100 === 0) return false;
  if(year % 4 === 0)   return true;
  return false;
}

function daysInMonth(month, year) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      //          Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
      if(month === 1 && isLeapYear(year)) return 29; // February in leap year
      return days[month];

}
function countSundays() {
  let sundays = 0;
  let day = 1; // 1 Jan 1900 was a Monday (1 = Monday, 0 = Sunday)
  for(let year = 1900; year< 2001; year++) {
    for(let month = 0; month< 12; month++){
      if(year > 1900 && day === 0) sundays++; // count Sundays (0 = Sunday)
      day = (day + daysInMonth(month, year)) % 7;


    }
  }
 return sundays;
}
console.log(countSundays()); // 171