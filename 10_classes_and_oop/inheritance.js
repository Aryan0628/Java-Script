class user{
    constructor(username){
        this.username=username
    }
    logMe(){
        console.log(`USERNAME IS ${this.username}`)
    }
}


class teacher extends User{
    constructor(username,email,password){
        super(username)
        this.email=email;
        this.password=password
    
    }

    addcourse(){
        console.log(`A new course was added by ${this.username}`);
    }   
}
const chai=new teacher("chai","chai@teacher.com",123)
chai.addcourse()
const masalachai=new user("masalachai")
masalachai.addCourse() //access nahi hai 
masalachai.logMe() //access hai
chai.logMe() //access hai 
//yehi hai inheritance ka khela 
console.log(chai===masalachai) //false
console.log(chai instanceof user); //ture
console.log(user instanceof teacher); //ture

