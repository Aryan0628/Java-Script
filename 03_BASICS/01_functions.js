function sayMyName(){
    console.log('H');
}

sayMyName()
function add(number1,number2 ){
    console.log(number1+number2);
}
add(3,4)
//(3,4) arguments hai 
//(number1 ,number2) parameters hai 
const result=add(10,12);
console.log("Result:",result);
//Result : undefinded , as funciton is not returniing something 
function add(number1,number2 ){
    //let result=number1+number2
    //return result
    return number1 + number2
}
function loginuser(username){
    //agar isme username =="sam" krde to kbhi if me nhi jaywga 
    if(username===undefinded){
        console.log("Please enter a username")
        return
    }
    return `${username}just logged in`
}
console.log(loginuser("hitesh"))
function calculated(...num1){
    //yaha pe ye rest operator
    return num1
}
console.log(calculated(200,300,400))
//[200,300,400]
function calculated(val1,val2,...num1){

    return num1
}
console.log(calculated(200,400,500,2000))
//[500,2000]

const user={
    username:"hitesh",
    price:199
}

function handleObject(anyObject){
    console.log(`Username is ${anyObject.username} and price is ${anyObject.price}`);
}
handleObject(user)
handleObject({
    username:"sam",
    prcie:99
})
//aese bhi pas kr skte hai 

const mynewarray=[200,300,400,500]

function returnsecondvalue(getArray){
    return getArray[1]
}
console.log(returnsecondvalue(mynewarray))

