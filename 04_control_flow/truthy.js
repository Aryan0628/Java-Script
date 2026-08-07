const userEmail="hitesh@gmail.com"
if(userEmail){
    console.log("got");
}
else{
    console.log("dont have");
}
//falsy values

//false,0,-0,BigInt 0n,"",null,undefined,NaN

//truthy values 
//"0",'false'," ",[],{},function(){}

if(userEmail.length===0){
    console.log("Array is empty");

}

const emptyobj={}

if(Object.keys(emptyobj).length===0){
    console.log("Array is empty")
}
false==0
//true
false=''
//true
0==''
//true

//Nullish Coalescing Operator (??): null undefined

let val;
val=5 ?? 10
val=null ?? 10
val=undefinded??15
val=nul??10??20
console.log(val);
//5
//10(null nhi ayega)
//15(undefined nhi ayega)
//10 ayegs 

//Terniary Operator
condition ? true:false

const iceTeaPrice=100
iceTeaPrice>=80?console.log("less than 80"):console.log("more than 80")
