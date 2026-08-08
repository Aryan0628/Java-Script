const promiseOne = new Promise(function (resolve, reject) {
    //do an async task
    //batabase calls,cryptography,network

    setTimeout(function () {
        console.log('Asyn task is complete');
        resolve()
    }, 1000)
})
promiseOne.then(function () {
    //then ka connection resolve se hai 
    console.log("promise consumed");

})
//kayi jagah aese bhi hoga 
new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log("Async task 2")
        resolve()
    }, 1000)
}).then(function () {
    console.log("Async 2 resolved")
})


const promiseThree = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve({ username: "chai", email: "chaiaurcode@gmail.com" })

    }, 1000)
})

promiseThree.then(function (user) {
    console.log(user)
    //output as  {username:"chai",email:"chaiaurcode@gmail.com"}
})


const promiseFour = new Promise(function (resolve, reject) {
    setTimeout(function () {
        let error = true;
        if (!error) {
            resolve({ username: "hitesh" })
        } else {
            reject('ERROR: Something went wrong')
        }
    }, 1000)
})

const username = promiseFour.then((user) => {
    console.log(user);
    return user.username
})
console.log(username);
//error,to ye nhi kregne agr username chaiye 

promiseFour
    .then((user) => {
        console.log(user);
        return user.username
    })
    .then((myusername) => {
        console.log(myusername)
    })
    .catch(function (error) {
        console.log(error);
    }).finally(() => console.log("THE promise is either resolve or rejected"))


const promiseFive = new Promise(function (resolve, reject) {
    setTimeout(function () {
        let error = true;
        if (!error) {
            resolve({ username: "javascript", password: "123" })
        } else {
            reject('ERROR: Something went wrong')
        }
    }, 1000)
})


//alg trike se
async function consume() {
    try {
        const response = await promiseFive
        console.log(response);
    } catch (error) {
        console.log(error);
    }

}
consume()
async function getAllUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()//convert hone mee samay lgega isliye await krenge 
        console.log(data)
    }
    catch (error) {
        console.log("E: ", error);
    }
}
getAllUsers()

fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    })
//ye phle ayega output me

//A fetch() promsie only rejects when a network erro is encountered (which is usually when there's a permisssions issue or similar).A fetch() promise does not reject on HTTP errors(404,etc).Instead , a then() handler must check the Respons.ok and /or Response.status properties