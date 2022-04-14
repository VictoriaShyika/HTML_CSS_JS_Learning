function createCulcFunction(n) {
  return function () {
    console.log(n * 1000);
  };
}

const culc = createCulcFunction(42);
culc();

function createIncrementor(n) {
  return function (num) {
    return n + num;
  };
}

const addOne = createIncrementor(1);
const addTen = createIncrementor(10);

console.log(addOne(10));
console.log(addOne(42));

console.log(addTen(10));
console.log(addTen(42));

function urlGenerator(domain) {
  return function (url) {
    return `https://${url}.${domain}`;
  };
}

const comUrl = urlGenerator("com");
console.log(comUrl("google"));

//================

function bind(context, fn) {
  return function (...args) {
    fn.apply(context, args)
  };
}
