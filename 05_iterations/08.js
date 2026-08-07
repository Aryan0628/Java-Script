const arr=[1,2,3]


const mytotal=arr.reduce(function(acc,curval) {
    console.log(`acc:${acc} nd curval:${curval}`)
    return acc+curval
},0)


//arrow metohd
const mytotal1=arr.reduce((acc,curval)=>(acc+curval),0)
console.log(mytotal1)


const shopping=[
    {
        itemname:"javascript",
        price:99
    },
    {
        itemname:"cpp",
        price:99
    }
]
const price=shopping.reduce((acc,item)=>(acc+item.price),0)
console.log(price)

