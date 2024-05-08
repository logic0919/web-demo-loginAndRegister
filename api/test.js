const test = {
    a: 10,
    b: 20
}
const res = { ...test, b: 40 }
console.log(res);// { a: 10, b: 40 }