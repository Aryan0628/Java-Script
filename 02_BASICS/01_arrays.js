const myArr = [0, 1, 2, 3, 4, 5]
const myHeroes = ["aryan", "shivank"]
const myArr2 = new Array(1, 2, 3, 4)
console.log(myArr[1]);


//Arry Methodds
myArr.push(6)
myArr.pop()

myArr.unshift(9) //array ke start me kr deta ,, 
myArr.shift(); //aage se htaata hai 

console.log(myArr.includes(9)); //true or false
console.log(myArr.indexOf(9)); //agr nahi hai to -1


const newarr = myArr.join();
//ab newarr string bn gya 
//slice,spice
console.log("A ", myArr); // A [0,1,2,3,4,5]
const myn1 = myArr.slice(1, 3) // 1 aur 2 ayega 
console.log(myn1); // [1,2]
console.log("B", myArr); // B [0,1,2,3,4,5]
const myn2 = myArr.splice(1, 3);
console.log("C ", myArr);[0, 4, 5]
console.log(myn2); //[1,2,3]
// spice main array me change nhi krta hai splice kr deta hai baki slice(a,b) me a se leta hai aur b se ek phle wala leta hai , splice me (a,b) me b deletecount hota hai
