let mydate=new Date()
console.log(mydate.toString());
console.log(mydate.toDateString())
console.log(mydate.toLocaleString());
console.log(typeof mydate);
//object

let mycreateddate=new Date(2023,0,23)
console.log(mycreateddate);
//Mon Jan 23 2023
let mycreateddate1=new Date(2023,0,23,5,3)
console.log(mycreateddate1.toLocaleDateString());
//1/23/2023  5:03:00 AM

let mytimestamp=Date.now() 
console.log(mytimestamp);//1 JAN 1970  se aj tk ka time dega milisec me 
console.log(mycreatedate.getTime());//Jan 23 2023 tak ka time dega miliseconds me 
console.log(Math.floor(Date.now()/1000));//second me dedega 



let newDate=new Date();
console.log(newDate);
console.log(newDay.getMonth());//month number dega lekin 0 se shuru hota

newDate.toLocaleString('default',{
    weekday:"long"
    //timeZone:
})


