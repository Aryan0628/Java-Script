let myname="hitesh.         "
console.log(myname.trueLength);
//method chahta hun



let myheroes=["thor","spiderman"]
let heropower={
    thor:"hammer",
    spiderman:"sling",


    getspiderpower:function(){
        console.log(`spider power is ${this.spiderman}`)
    }

}
Object.prototype.hitesh=function(){
    console.log(`hitesh is present in all objects`);
}
Array.prototype.heyhitesh=function(){
    console.log(`Hitesh says hello`);
}
heropower.hitesh()
myheroes.hitesh()

// hitesh is present in all objects 
// aese isliye kyki object se hi arrays pas hote hai to highest heirarachy access krk usko prototoye se ek method deifned kr diya wog array ke pas bhi hoga ]

heropower.heyhitesh() // ye nhi dega 
myheroes.heyhitesh()// ye dega 
//kyki array me inject kiya na ki object me to object wala nahi dega array wala output dega 




//inheritance
const user={
    namae:"chai"
}
const teacher={
    makevideo:true
}
const trachingsupport={
    isAvailable:false
}
const TAsupport={
    makeassignment:'JS ASSIGNMENT',
    fullTime:true,
    __proto__:teeachingsupport //access milgya uss object ka 
}
teacher.__proto__=User


//mordern syntax
Object.setPrototypeOf(teeachingsupport,teacher)


let anotherusername="chai aur code.      "

String.prototype.trueLength=function(){
    console.log(`${this}`); //chai aur code 
    console.log(`${this.name}`); //undefinded
    console.log(`true length is ${this.trim().length}`); //11
}
anotherusername.trueLength()
"hitesh".trueLength()
"iceTea".trueLength()