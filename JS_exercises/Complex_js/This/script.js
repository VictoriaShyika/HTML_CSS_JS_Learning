function hello() {
  console.log("Hello", this);
}

const person = {
  name: "Vika",
  age: 22,
  sayHello: hello,
  sayHelloWindow: hello.bind(window),
  logInfo: function (job, phone) {
    console.group(`${this.name} info`);
    console.log(`Name is ${this.name}`);
    console.log(`Age is ${this.age}`);
    console.log(`Job is ${job}`);
    console.log(`Phone is ${phone}`);
    console.groupEnd();
  },
};

const anya = {
  name: "Anya",
  age: 24,
};

person.logInfo.bind(anya, "Frontend", "099-888-77-66")();
// person.logInfo.call(anya, "Frontend", "099-888-77-66");
// person.logInfo.apply(anya, ["Frontend", "099-888-77-66"]);


// ===============

const array = [1, 2, 3, 4, 5, 6];

// function multBy(arr, n) {
//     return arr.map(function(i){
//         return i * n
//     })
// }

// console.log(multBy(array, 5));

Array.prototype.multBy = function (n) {
  return this.map(function (i) {
    return i * n;
  });
};

console.log(array.multBy(5));
