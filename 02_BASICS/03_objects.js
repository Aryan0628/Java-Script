//singleton - jab bhi ham actual literals ki trh declare krte hai to singleton nhi hota , constructor ki trh krte hain to hota hai 
//constructors aur literals object declare krne ke do trike hain
Object.create //constuctor method 
//object literals
const mysym = Symbol("Key1")
const JsUser = {
    name: "Aryan",
    "full name": "Aryan Gupta",
    [mysym]: "myKey1",
    location: "SPN",
    age: 19,
    email: "aryan@gmail.com",
    isLoggedIn: false,
    lastLoginDays: ["Monday", "Saturday"]
}
console.log(JsUser.email)//eltrika
//full name ko dot se kr hi nhi skte 
console.log(JsUser["email"])
console.log(JsUser["full name"])
//email bgi string ki trh leta hai objecg me but likha nijata as a srtirng
console.log(JsUser[mysym]);
//myKey1
JsUser.email = "fnidknnv" //change ho jayegi
//Object.freeze(JsUser)
JsUser.email = "djvnhjfnd"
//freeze krdiya ab ni change hoga na hi error ayega 
JsUser.greeting = function () {
    console.log('hello')
}
JsUser.greeting2 = function () {
    console.log(`hello,${this.name}`);
}
console.log(JsUser.greeting);
//undefined
console.log(JsUser.greeting());
//hello
console.log(JsUser.greeting2());
//hello,Aryan