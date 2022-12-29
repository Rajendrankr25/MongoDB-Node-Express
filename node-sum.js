const [, , num1, num2] = process.argv; //array destrucuring
const sum = (a, b) => a + b;
console.log(sum(+num1, +num2));