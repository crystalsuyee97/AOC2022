const { readFileSync } = require('fs');

const contents = readFileSync("Day1/input1.txt", 'utf-8').split(/\r?\n/)

let sumArr = [];
let tempVal = 0;
for (let i=0; i < contents.length; i++) {
  if (contents[i] != "") {
    tempVal += Number(contents[i]);
  } else {
    sumArr.push(tempVal);
    tempVal = 0;
  }
}

const max = Math.max(...sumArr);
console.log(max);

sumArr.sort((a, b) => a - b).reverse();
const topThreeSum = sumArr.slice(0, 3).reduce(function(a, b) { return a + b }, 0)
console.log(topThreeSum);