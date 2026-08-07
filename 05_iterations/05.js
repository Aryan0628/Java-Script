const coding=["js","cpp","java","python","cpp"]
coding.forEach(function (item) {
    console.log(val);
} )

coding.forEach((item)=>{
    console.log(item);
})

function printme(item){
    console.log(item);
}
coding.forEach(printme)



coding.forEach((item,index,arr)=>{
    console.log(item,index,arr);
})
//element index array   teen print krega

const mycoding=[
    {
        langaugename:"javascript",
        languagefilename:"js"
    },
    {
        langaugename:"c++",
        languagefilename:"cpp"
    },
    {
        langaugename:"python",
        languagefilename:"py"
    }
]

mycoding.forEach((item)=>{
    console.log(item.languagename);
})