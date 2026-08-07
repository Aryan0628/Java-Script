const sayDate=function(){
        let date=new Date();
        let ne=date.toLocaleDateString();
        console.log(ne);
}
let validinterval;
document.querySelector('#start').addEventListener('click',function(){
    validinterval=setInterval(sayDate,1000);
    console.log(validinterval)
})
document.querySelector('#stop').addEventListener('click',function(){
    clearInterval(validinterval);
})

