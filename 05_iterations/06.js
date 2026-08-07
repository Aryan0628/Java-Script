const coding=["js","cpp","java","python","cpp"]
const values=coding.forEach((item)=>{
    return item
})
console.log(values);
//undefined print hoga , kyki for each return ni krta

const mynums=[1,2,3,4,5,6,7,8,9,10]

const newnums=mynums.filter((num)=>num>4)
console.log(newnums);
//[5,6,7,8,9,10]
const newnums1=mynums.filter((num)=>{
    num>4
})
// aese krke kroge to empty array mileha 
const newnums3=mynums.filter((num)=>{
     return num>4
})
//aese return krke kr agr curly braces laga rhe ho to kyki ek scope shuru ho jata hai



const newnums4=[]
mynums.forEach((num)=>{
    if(num>4){
        newnums4.push
    }
})
console.log(newnums);



//book wala example  8:34:00 se 
