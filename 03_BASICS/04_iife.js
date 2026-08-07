//Imediately Invoked Function Expressions (IIFE)
(function chai(){
    console.log(`DB CONNECTED`);
})();//(semicolon se end hota hai tbhi dusra fucntion chalega)
//jo function immediately excute ho jaye woh iife aur global scope ke pollution se problem hoti hai to waha ke decalaration hai unhe htane ke liye 

((name)=>{
    console.log(`DB CONNECTED TWO ${name}`)
})('hitesh');
