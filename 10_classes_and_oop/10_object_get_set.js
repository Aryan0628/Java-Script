const User={
    _email:'snadhya@gmial.com',
    _password:"abc",
    //underscore mtlb private property define kr rha huun
    //sbke ke liye nhi hoga

    get email(){
        return this._email.toUpperCase()
    },
    set email(value){
        this.email=value
    }
}
const tea=Object.create(User)
console.log(tea.email);
