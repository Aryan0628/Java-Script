const name="hitesh"
const repocount=50

console.log(`Hello my name is ${name} and my repo count is ${repocount}`);

const gamename=new String('hitesh-hc')
console.log(gamename[0]); //h
console.log(gamename.__proto__);

console.log(gamename.length); //9
console.log(gamename.toUpperCase());
console.log(gamename.charAt(2)); //t
console.log(gamename.indexOf('i'));//1

const newString=gamename.substring(0,4);
console.log(newString); //hite //substirng me -8 se doge to bhi 0 se lega 

const anotherString=gamename.slice(-8,4) //(9-8)=>(1,4)
console.log(anotherstring); //ite

const newstringone= "     hitesh    "
console.log(newstringone.trim()); //spaces ht jayegi


const url="https://hitesh.com/hitesh%20chodharay"
url.replace('%20','-')
console.log(url.includes('hitesh'))
//exist in url returns true 
console.log(gamename.split('-'))
//['hitesh','hc']