const user={
    username:"hitesh",
    price:999,
    welcomeMessage:function(){
        console.log(`${this.username},welcome to website`);
    }
}
//this(current context ki bat krta hai) manje uss scope andr jitne varibale hai gggggf
user.welcomeMessage()
user.username="sam"
user.welcomeMessage()
//ab sam ayega 
console.log(this);
//{}
function chai(){
    console.log(this);
}
chai()
//bahut sali value aati hai 
function chai(){
    let username="hitesh"
    console.log(this.username);
}
chai()
//undefined dega ,, ye this.username wala method function me nhi use kr skte
const chai=()=>{
    let username="hitesh"
    console.log(this.username);
}
chai()
//undefined
const chai=()=>{
    let username="hitesh"
    console.log(this);
}
chai() //{}
//arrow function 
const addtwo=(num1,num2)=>{
    return num1+num2
}
console.log(addtwo(3,4));
const addtwo2=(num1,num2)=> num1+num2
console.log(addtwo2(3,4))
//implicit return
const addtwo3=(num1,num2)=>({username:"hitesh"})
//isko curly braces me hi dalna pdega kyki ye object hai , object ko bina curly braces ke returnn nhi kr skte , vrna undefinde answer dega 
const myarray=[1,2,3,4]
myarray.forEach(()=>{})
array.forEach((item, index, array) => {
    // item: current value
    // index: index of current value
    // array: full array
});
//syntax of foreach


