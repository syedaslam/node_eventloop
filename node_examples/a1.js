function apiCall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello world');
        }, 2000);
    });
}


async function sayHello() {
    const res = await apiCall();
    console.log('API is saying' + res);
}

sayHello();