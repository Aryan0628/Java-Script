const descriptor=Object.getOwnPropertyDescriptor(Math,"PI")


console.log(Math.PI);
Math.PI=5
//nhi overwrite hoga

console.log(descriptor);
//{
//  value:3.141592653589793
//  writable:false, //hardcoded in c++ true hi nhi kr skte//
//  enumerable:false,
//  configurable:false
//}
//khud bhi aese kr skte hai 
const chai={
    name:'ginger chai',
    price:250,
    isAvailbale:true,

    orderchai:function(){
        console.log("chai nhi bani");
    }
}

console.log(Object.getOwnPropertyDescriptor(chai))
//undeifined
console.log(Object.getOwnPropertyDescriptor(chai),"name") 
//ab dega 

Object.defineProperty(chai,'name',{
    writable:false,
    enumerable:false
})

for (let [key,value] of Object.enteries(chai)) {
    if(typeof value!='function'){
        console.log(`${key} : ${value}`);
    }
    
}
//taki functinio na print ho
//but if enumuration becomes false then iteration nhi hoga