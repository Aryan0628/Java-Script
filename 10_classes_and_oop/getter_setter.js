class User{
    constructor(email,password){
        this.email=email;
        this.password=password
    }
    get email(){
        return this._email.toUpperCase()
    }
    set email(value){
        return this._email=value
    }
    get password(){
        return this._password.toUpperCase()
    }
    //getter kiya hai to setter bhi krna padega
    set password(value){
        this._password=value.toUpperCase()
    }
    //set se value store hoti hai get se output me milti hai , to save kuch aur krna hai aur dena kuch aur ho tb kam ayega 
}
const hitesh=new User("hitesh@gmail.com","123")
console.log(hitesh.password);