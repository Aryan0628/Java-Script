//obcet literal

const user={
    username: "hitesh",
    logincount:8,
    signedIn:true,

    getUserDetails:function(){
        console.log("Got user details from database");
        console.log(this);
        //ab isme pura object ayega
        
    }
}

console.log(user.username);
console.log(user.getUserDetails());


//constructor

const promisone=new Promise();
//new construdctor function hai 

function User(username,loginCount,isLoggedIn){
    this.username=username
    //left side waaali varible hai 
    this.loginCount=loginCount;
    this.isLoggedIn=isLoggedIn;
    this.greeting=function(){
        console.log(`welcome ${this.username}`);
    }

    return this
}

const userOne=User("hitesh",12,true)
const userTwo=User("Chai aur code",11,false)
console.log(userOne)
//now it will print overwritten values of userTwo


//new
//1) sbse phle empty objct create hota hia jisse instance bolte hai
//2)constructor function call hota hai new keyword ke karan
//3)this keyword me jo bhi arguments wgera likhe hai constructor me woh  inject hojate hai 
console.log(userOne.constructor)
//result ayega function[user]
//instance pd lo mdn se 

