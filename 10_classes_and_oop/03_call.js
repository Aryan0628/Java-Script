function setusername(username){
    //complex db calls
    this.username=username
}
function createuser(username,email,password){
    setusername.call(this.username) //jab .call kroge tbhi call hoga vrna nahi hoga yeh ek trika hai js me

    this.email=email
    this.password=password
}
const chai=new createuser("chai","chai@gmial.com","123")
console.log(chai);