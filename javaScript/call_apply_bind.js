let name1 = {
    firstName: 'Aslam',
    lastName: 'Syed',
    printName: function () {
        console.log(this.firstName + ' ' + this.lastName)
    }
}

name1.printName();

let name2 = {
    firstName: 'Azmath',
    lastName: 'Syed'
}

name1.printName.call(name2);


