function add(a, b) {
    return a + b;
}

function multiple(a, b) {
    return a * b;
}

function higherOrder(a, b, callBack) {
    console.log(callBack(a, b));
}

higherOrder(10, 20, add);

higherOrder(20, 40, add);

higherOrder(4, 6, multiple);

const arr = [1, 2, 3, 4];

const res = arr.map(a => a * 2);

console.log(res);


Array.prototype.myMap = function(callBack) {

    const result = [];
    console.log(this, callBack);

    for (let index = 0; index < this.length; index++) {
        result.push(callBack(this[index], index, this));
    }

    return result;

}

function multByTwo(a, index, orgArr) {

    console.log(index)
    if (index === 2) {
        console.log('orginal value ', orgArr[2]);
    }
    return a * 2;
}

const mapRes = arr.myMap(multByTwo);

console.log(mapRes);





