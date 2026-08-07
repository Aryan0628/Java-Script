const myobject={
    js:'javascript',
    cpp:'c++',
    rb:"ruby",
    swift:"swift by apple"
}
for (const key in myobject) {
    console.log(key);
}
//saari keys dedega

for (const key in myobject) {
    console.log(`${key} shortcut is for ${myobject[key]}`);
}

const arr=["js","ruby","py","java","cpp"]
for (const key in arr) {
    console.log(key);
}
// 0 1 2 3 4 
const map=new Map()
//map ek object  hai 
map.set('IN','INDIA')
map.set('USA',"United States of America")
map.set('Fr',"France")
map.set('IN','INDIA')

for (const key in map) {
    console.log(key);
}
//ye iteratable hi nahi hai 