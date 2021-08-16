import { React, useState } from 'react';
import Animation from '../animation/timerr.json';
import LottieAnimation from '../animation/LottieAnimation'


const Form = () => {
    const [date,setDate] = useState();
    const [result,setresult] = useState();
    const [show,setshow] = useState(false);
    const [gif,setgif] = useState(false);

    const reverseStr = (str) => {
      var listOfChars = str.split("");
      var reverseListOfChars = listOfChars.reverse();
      var reversedStr = reverseListOfChars.join("");
      return reversedStr;
    }

    const isPalindrome = (str) =>{
        var reverse = reverseStr(str);
        return str === reverse;
      }
      

    const convertDateToStr = (date)=> {

        var dateSt = { day: '', month: '', year: '' };
      
        if (date.day < 10) {
          dateSt.day = '0' + date.day;
        }
        else {
          dateSt.day = date.day.toString();
        }
      
        if (date.month < 10) {
          dateSt.month = '0' + date.month;
        }
        else {
          dateSt.month = date.month.toString();
        }
      
        dateSt.year = date.year.toString();
        return dateSt;
      }

    const getAllDateFormats = (date) => {
      var dateStr = convertDateToStr(date);

      var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
      var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
      var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
      var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
      var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
      var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

      return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    }

    const checkPalindromeForAllDateFormats = (bdate) =>{
        var listOfPalindromes = getAllDateFormats(bdate);
      
        var flag = false;
      
        for(var i=0; i < listOfPalindromes.length; i++){
          if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
          }
        }
        
        return flag;
      }
      const isLeapYear = (year) =>{
        if(year % 400 === 0){
          return true;
        }
        if(year % 100 === 0){
          return false;
        }
        if(year % 4 === 0){
          return true;
        }
        return false;
      }

      const getNextDate = (date) =>{
        var day = date.day + 1;  // increment the day  => 32
        var month = date.month;
        var year = date.year;
      
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11
      
         // check for february
        if(month === 2){ 
          // check for leap year
          if(isLeapYear(year)){ // 2020 => true
             if(day > 29){ // false
               day = 1;
               month++;  // increment the month
             }
          }
          else {
             if(day > 28){
               day = 1;
               month++;  // increment the month
             }
          }
        }
        // check for other months
        else {
          //  check if the day exceeds the max days in month
          if(day > daysInMonth[month - 1]){ 
            day = 1; 
            month++;  // increment the month
          }
        }
      
        // increment the year if month is greater than 12
        if(month > 12){
          month = 1;
          year++; 
        }
      
        return {
          day: day,  
          month: month,
          year: year
        };
      }

      const getNextPalindromeDate = (date) =>{
        var ctr = 0;
        var nextDate = getNextDate(date);
      
        while(1){
          ctr++;
          var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
          if(isPalindrome){
            break;
          }
          nextDate = getNextDate(nextDate);
        }
        return [ctr, nextDate];
      }


    const runtimer = () =>  {
        setTimeout(() => {
          setgif(false);
          setshow(true);
        }, 3000);
                   

    };


    const checkResult = e => {
        e.preventDefault();
        setshow(false);
        setgif(true);
        
        runtimer();
        var listOfDate = date.split('-'); // ['2020', '10', '11']
        var bdate = {
          day: Number(listOfDate[2]),
          month: Number(listOfDate[1]),
          year: Number(listOfDate[0]),
        };

        var isPalindrome = checkPalindromeForAllDateFormats(bdate);
        if(isPalindrome){
            setresult('Yay! your birthday is a palindrome!! 🥳🥳');
            // setshow(true)
         }else {
            var [ctr, nextDate] = getNextPalindromeDate(bdate);
      
            setresult(
              `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year},
               you missed it by ${ctr} days! 😔`
            );
            // setshow(true)
          }
    }

  return (
    <form onSubmit={checkResult}>
      <input
        type="date"
        value={date}
        max="9999-12-31"
        required
        onChange={(e) => setDate(e.target.value)}
      />
      <button className="button" type="submit">
        check
      </button>
      {gif ? <LottieAnimation lotti={Animation} height={200} width={200} /> :  " "}
      {show ? <h3 className="result">{result}</h3> : " "}
    </form>
  );
}



export default Form;