class user{
    constructor(username){
        this.username=username
    }
    logMe(){
        console.log(`Username:${this.username}`)
    }
    static createid(){
        return `123`
        //static jab use kro jAB apko acces nhi dena

    }
}
const hitesh=new user("hitesh")
console.log(hitesh.createId()) //error kyki staitc kr diya , kam chalane se jada kam ko rokna jruri hota hai. 

class Teacher extends user{
    constructor(username,email){
        super(username)
        this.email=email
    }
}
const iphone =new Teacher("iphone",'iphone@gmail.com')
iphone.logMe() //answer degs
console.log(iphone.createId()); //undefined