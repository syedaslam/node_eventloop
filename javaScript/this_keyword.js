
//  'this' keyword in gobal space

console.log(this); // window object

const student = {
    name: 'John',
    age: 25,
    greet(arg) {
        console.log(this.name, arg); // student object
    }
}

const student2 = {
    name: 'Jane',
    age: 25
}

student.greet.call(student2, {name: 'Vijaya'}); // student object

student.greet.apply(student2, [{name: 'Hello'}]); // student object


const print = student.greet.bind(student2); // student object

print();


const arrFun = () => {
    const innerFun = () => {
        console.log(this); // student object
    }
    innerFun();
    console.log(this); // window object
}

arrFun();

const obj = {
    name: 'Vijaya',
    age: 25,
    x: () => {
        const y = () => {
            console.log(this); // obj object
        }
        y();
    }
}

obj.x();


