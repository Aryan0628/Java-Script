//for of

//["","",""]
//[{},{},{}]

const arr=[1,2,3,4,5]

for (const num of arr) {
    console.log(num);
}
// 1
// 2
// 3
// 4
// 5

const greetings="Hello World!"
for (const greet of greetings) {
    console.log(`Each char is ${greet}`)
}


//Maps

const map=new Map()
//map ek object  hai 
map.set('IN','INDIA')
map.set('USA',"United States of America")
map.set('Fr',"France")
map.set('IN','INDIA')

console.log(map);
//Map(3) {
//    'IN' => 'INDIA',
//    'USA' => 'United States of America',
//    'Fr' => 'France'
//}
//unique values 


for (const [key,value] of map) {
    console.log(key,':-',value);
}
//    IN  :- INDIA,
//    USA :- United States of America,
//    Fr' :- France
const myobject={
    'game1':'NFS',
    'game 2':'Spiderman'
}
for (const [key,value] of myobject) {
    console.log(key,':-',value);
    
}
//myobject is not iterable , object ko iterate krnane ka alg trika hai 
