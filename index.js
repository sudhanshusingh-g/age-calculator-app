window.onload= function(){
    const day=document.getElementById("day");
    const month=document.getElementById("month");
    const year=document.getElementById("year");
    const labels=document.getElementsByTagName("label");
    const span=document.getElementsByTagName("span");
    const error=document.getElementsByClassName("error");
    const submitBtn=document.getElementById("submit");
    const date=new Date();

    let currDay=date.getDate();
    let currMonth=date.getMonth() + 1;
    let currYear=date.getFullYear();
    

    const typeOfError=[
        "",
        "This field is required",
        "Must be a valid month",
        "Must be a valid year",
        "Must be a valid day",
        "Must be a valid date"
    ];

    const errorState=(numberOfError,typeOfDate,typeOfError,color)=>{
        error[numberOfError].innerHTML=typeOfError;
        labels[numberOfError].style.color=color;
        typeOfDate.style.borderColor=color;
    }

    const isLeapYear=(day,month,year)=>{
        month=month-1;
        fullDate=new Date(year,month,day);
        if(day==fullDate.getDate() && month==fullDate.getMonth() && year==fullDate.getFullYear()){
            return true;
        }
        else{
            return false;
        }
    }
    const subtarctAge=()=>{
        let newYear=Math.abs(currYear-year.value);
        let newMonth=0;
        if(currMonth>=month.value){
            newMonth=currMonth-month.value;
        }
        else{
            newYear--;
            newMonth=12+currMonth-month.value;
        }

        let newDay=0;
        if(currDay>=day.value){
            newDay=currDay-day.value;
        }
        else{
            if(isLeapYear(day.value,month.value,year.value)){
                newDay=30+currDay-day.value;
            }
            else{
                newDay=currDay-day.value;
            }

            if(newMonth<0){
                newMonth=11;
                newYear--;
            }
            if(newMonth<currMonth){
                newDay++;
            }
        }
        span[0].innerHTML=newYear;
        span[1].innerHTML=newMonth;
        span[2].innerHTML=newDay;
    }

    const isDayCorrect=()=>{
        if(day.value ==""){
            errorState(0,day,typeOfError[1],"hsl(0, 100%, 67%)");
            return false;
        }
        else if(day.value<=0 || day.value>31){
            errorState(0,day,typeOfError[2],"hsl(0, 100%, 67%)");
            return false;
        }
        else if(isLeapYear(day.value,month.value,year.value)==false){
            errorState(0, day,typeOfError[5],"hsl(0, 100%, 67%)");
            return false;
        }
        else{
            errorState(0, day,typeOfError[0],"hsl(0, 100%, 67%)");
            return true;
        }
    }

    const isMonthCorrect=()=>{
        if(month.value ==""){
            errorState(1,month,typeOfError[1],"hsl(0, 100%, 67%)");
            return false;
        }
        else if(month.value<=0 || month.value>12){
            errorState(1,month,typeOfError[3],"hsl(0, 100%, 67%)");
            return false;
        }
        else if(isLeapYear(day.value,month.value,year.value)==false){
            errorState(1, month,typeOfError[0],"hsl(0, 100%, 67%)");
            return false;
        }
        else{
            errorState(0, day,typeOfError[0],"hsl(0, 100%, 67%)");
            return true;
        }
    }

    const isYearCorrect=()=>{
        if(year.value ==""){
            errorState(2,year,typeOfError[1],"hsl(0, 100%, 67%)");
            return false;
        }
        else if(year.value>currYear){
            errorState(3,year,typeOfError[4],"hsl(0, 100%, 67%)");
            return false;
        }
        else if(isLeapYear(day.value,month.value,year.value)==false){
            errorState(2, year,typeOfError[0],"hsl(0, 100%, 67%)");
            return false;
        }
        else if(year.value==currYear && month.value>currMonth){
            errorState(1, month,typeOfError[3],"hsl(0, 100%, 67%)");
            return false;
        }
        else if(year.value==currYear && month.value==currMonth && day.value>currDay){
            errorState(0, day,typeOfError[2],"hsl(0, 100%, 67%)");
            return false;
        }
        else{
            errorState(2, year,typeOfError[0],"");
            return true;
        }
    }

    submitBtn.addEventListener("click",()=>{
        isDayCorrect();
        isMonthCorrect();
        isYearCorrect();
        if(isDayCorrect() && isMonthCorrect() && isYearCorrect()){
            subtarctAge();
        }
    })
}

