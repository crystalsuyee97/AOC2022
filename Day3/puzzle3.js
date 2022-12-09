const { readFileSync } = require('fs');
// const contents = readFileSync("Day3/practiceinput3.txt", 'utf-8').split(/\r?\s/)
const contents = readFileSync("Day3/input3.txt", 'utf-8').split(/\r?\s/)

console.log(contents)

const upper = Array.from(Array(26)).map((e, i) => i + 65);
const uppercase = upper.map((x) => String.fromCharCode(x));
const lower = Array.from(Array(26)).map((e, i) => i + 97);
const lowercase = lower.map((x) => String.fromCharCode(x));
const alphabet = [...lowercase, ...uppercase];

function deleteDuplicates(array) {
  return array.filter((item, index) => { return array.indexOf(item) === index })
}
function findShared(array1, array2) {
  return array1.filter((item) => array2.includes(item));
}

let result;
let newResult;
let itemPriorityTotal = 0;
// let results = [];
contents.forEach((items) => {
  let firstComp = [];
  let secondComp = [];
  // split items into compartments
  (items.split("")).forEach((item, index) => {
    if (index < items.length/2) {
      firstComp.push(item);
    } else if (index >= items.length/2) {
      secondComp.push(item);
    }
  })
  // find shared items and delete duplicates
  result = findShared(firstComp, secondComp);
  newResult = deleteDuplicates(result)
  // find value of items from alphabet array
  newResult.forEach((item) => {
    itemPriorityTotal += alphabet.indexOf(item) + 1;
  })
})
console.log("item priority", itemPriorityTotal);

// split contents into groups of three
let badgeResult = [];
itemPriorityTotal = 0;
for (let index = 0; index < contents.length; index+=3) {
  let tempArray = [];
  let sharedItems = [];
  tempArray = contents.slice(index, index + 3);
  tempArray = [
    tempArray[0].split(""),
    tempArray[1].split(""),
    tempArray[2].split("")
  ];
  let tempShared = findShared(tempArray[0], tempArray[1]);
  sharedItems = findShared(tempShared, tempArray[2]);
  sharedItems = deleteDuplicates(sharedItems);
  sharedItems.forEach((item) => {
    badgeResult.push(item);
  });
}
console.log(badgeResult)
badgeResult.forEach((item) => {
  itemPriorityTotal += alphabet.indexOf(item) + 1;
})
console.log(itemPriorityTotal)