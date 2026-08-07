//for
for(let i=0;i<10;i++){
    const element=i;
    if(element==5){
        console.log("5 is best number")
    }
    console.log(element);
}

for (let i = 1; i <=10; i++) {
    console.log(`Outer loop value:${i}`)
    for (let j = 1; j <=10; j++) {
        //console.log(`Inner loop value ${j} and inner loop ${i} `);
        console.log(i + '*' + j + '=' + i*j);
    }
    
}

let array=["flash","batman","superman"]
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    console.log(element);
    
}

//break and continue 

for (let i = 0; i <=20; i++ ){
    if(i==5){
        console.log("deeteted 5");
        break;
    }
    console.log(`Value of is ${index}`);
        
}
//5 pe ake rok dega 
for (let i = 0; i <=20; i++ ){
    if(i==5){
        console.log("deeteted 5");
        constinue;
    }
    console.log(`Value of is ${index}`);
        
}
//5 nhi print hoga 

