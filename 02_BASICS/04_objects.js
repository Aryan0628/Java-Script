//const tinderUser=new Object() ye ssingleton object 
const tinderUser = {} // ye singleton nahi hai 
tinderUser.id = "123ab"
tinderUser.name = "Aryan"
console.log(tinderUser); // output dono ka same ayega //output me add hoke ayega 
const regularuser = {
    email: "some@gmail.com",
    fullname: {
        userfullname: {
            firestname: "Hitesh",
            lastname: "Gupts"
        }
    }
}
console.log(regularuser.fullname?.userfullname.firstname);
//? agr ayi to kro ni ayi to ni ,API me use 
const obj1 = { 1: "a", 2: "b" }
const obj2 = { 3: "a", 4: "b" }

const obj3 = Object.assign({}, obj1, obj2)
console.log(obj3);
//{}<- ye target ho jata hai 
//obj1 target hojata hai 
//{'1':'a','2':'b','3':'a','4':'b'}

const obj31 = { ...obj1, ...obj2 }
//ye best hai 

const users = [
    {
        id: 1,
        email: "aryan@gmail.com"
    },
    {
        id: 2,
        email: "nfen"
    },
    {
        id: 2,
        email: "dnvnfhj"
    }

]

users[1].email

console.log(Object.keys(tinderUser));
console.log(Object.values(tinderUser));
//arrays me deta hai answer

console.log(Object.entries(tinderUser));
//[['id','123ab'],['name','Aryan']]

console.log(tinderUser.hasOwnProperty('id'))//true

const course = {
    coursename: "js in hindi",
    price: "999",
    courseInstructor: "Aryan"
}

const { courseInstructor: instructor } = course

console.log(instructor)
//hitesh

//json(java script object notation)
//{
//   "name":"aryan",
//   "coursename":"js is hindi",
//  "price":"free"
//}
//array bhi mil skta hai api me , jitns bhi api hai json format me hai

