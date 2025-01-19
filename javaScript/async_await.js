
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Some Text");
    }, 5000);
})

async function handlePromise() {
    const val = await p;
    console.log(val);
}

handlePromise();


async function asyncFun() {
    return p;
}


const res = asyncFun();

res.then(res => console.log(res));

