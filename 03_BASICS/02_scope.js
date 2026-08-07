let a =300 //glob scope 
if(true){
    let a=10
    const b=20
    var c =30
}
//console.log(a);
//console.log(b);
// ye dono nhi honge 
//console.log(c);//ye ho jayeyag 
//var ko isliye avoid krte hain 
function one(){
    const username="aryan"
    function two(){
        const website="youtube"
        console.log(username);
    }
    // ye errror dega ,console.log(website);
    two()

}
one()
if(true){
    const username="hitesh"
    if(username=="hitesh"){
        const website="youtube"
        console.log(username+website);
    }
    // ye error dega, console.log(website);
}
// ye bhi eror dega, console.log(username);
//+++++++++++=interesting++++++++++++++
addone(5)
function addone(num){
    return num+1
}
// ye error nhi dega aur 6 dega answer me
addTwo(5)
const addTwo=function(num){
    return num+2
}
//ye error dega 


