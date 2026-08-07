const score=400
const balance =new Number(100)
console.log(balance);

console.log(balance.toString()) //string ban jaye 
console.log(balance.toString().length)
console.log(balance.toFixed(2));//100.00

const othernumber =123.8966
console.log(othernumber.toPrecision(4));//123.9


const hundreds=1000000
console.log(hundreds.toLocalString('en-IN'));

//***********Maths***********************/
console.log(Math);
//obeject as an output 
console.log(Math.abs(-4)); //4
console.log(Math.round(4.3));//4
console.long(Math.ceil(4.2));//5
console.log(Math.floor(4.2));//5
console.log(Math.min(1,2,3)); //similary max


console.log(Math.random());  //0-1 ke bich me deta hai
console.log(Math.random()*10+1);
//taki 0.0453 ye sab avoid kr ske 

const min=10;
const max=20;


console.log(Math.floor(Math.random())*(max-min+1)+min) //ab 10-20 ki range me dekha 