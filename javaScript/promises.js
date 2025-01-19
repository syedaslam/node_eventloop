const promise = createUser({name: 'Aslam', email: 'abc@gmail.com'});


promise.then(res => {
    console.log(res);
})


function createUser(userData) {
    const result = new Promise((res, reg) => {
        if (userData) {
            res({success: 'User created', statusCode: 200})
        }
    })
    return result;
}